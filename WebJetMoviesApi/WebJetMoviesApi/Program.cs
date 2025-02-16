using Polly;
using WebJetMoviesApi.WebJet;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
	options.AddPolicy("AllowFrontend",
		policy => policy.WithOrigins("http://localhost:5173")
						.AllowAnyMethod()
						.AllowAnyHeader());
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Bind API settings from appsettings.json.
builder.Services.Configure<WebjetApiOptions>(builder.Configuration.GetSection("WebjetApiOptions"));

// Register HttpClient for WebjetMoviesApi.
builder.Services.AddHttpClient<WebjetMoviesApi>().AddStandardResilienceHandler();

builder.Services.AddResiliencePipeline("default", x => {
	x.AddRetry(new Polly.Retry.RetryStrategyOptions()
	{
		ShouldHandle = new PredicateBuilder().Handle<Exception>(), // TODO: Do the prohibited exception.
		Delay = TimeSpan.FromSeconds(3),
		MaxRetryAttempts = 2,
		BackoffType = DelayBackoffType.Exponential,
		UseJitter = true, // Add some randomness.
	})
	.AddTimeout(TimeSpan.FromSeconds(30));
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseCors("AllowFrontend");

app.UseHttpsRedirection();

app.MapControllers();

app.Run();