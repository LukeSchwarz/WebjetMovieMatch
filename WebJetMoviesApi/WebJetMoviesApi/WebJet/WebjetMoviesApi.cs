using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Polly.Registry;
using System.ComponentModel.DataAnnotations;
using WebJetMoviesApi.WebJet.Models;

namespace WebJetMoviesApi.WebJet
{
	public enum MovieProvider
	{
		Cinemaworld,
		Filmworld
	}

	public class WebjetMoviesApi
	{
		private readonly HttpClient _client;
		private readonly WebjetApiOptions _options;

		public WebjetMoviesApi(IOptions<WebjetApiOptions> options, HttpClient client)
		{
			_client = client;
			_options = options.Value;

			// Set the base address for the HttpClient, this way the GetAsync method will use the base address as the base URL.
			_client.BaseAddress = new Uri(_options.BaseUrl);

			_client.DefaultRequestHeaders.Add("x-access-token", _options.Apikey);
		}

		public async Task<List<MovieModel>> GetMovies(MovieProvider provider)
		{
			try
			{
				// Run the GET request with the resilience pipeline.
				var response = await _client.GetAsync($"/api/{provider.ToString().ToLower()}/movies");
	
				if (!response.IsSuccessStatusCode)
					throw new Exception($"API Error: {response.StatusCode} - {await response.Content.ReadAsStringAsync()}");

				var json = await response.Content.ReadAsStringAsync().ConfigureAwait(false);

				var moviesResponse = JsonConvert.DeserializeObject<MoviesResponse>(json);

				// If the deserialization is successful, return the Movies list, otherwise return an empty list.
				return moviesResponse.Movies ?? new List<MovieModel>();
			}
			catch (Exception e)
			{
				// TODO: Log error properly (replace with ILogger).
				Console.WriteLine($"Error fetching {provider} movies: {e.Message}");

				// Return empty list to prevent crashes.
				return new List<MovieModel>();
			}
		}

		public async Task<DetailedMovieModel> GetMovieDetails(MovieProvider provider, string id)
		{
			try
			{
				var response = await _client.GetAsync($"/api/{provider.ToString().ToLower()}/movie/{id}");

				if (!response.IsSuccessStatusCode)
					throw new Exception($"API Error: {response.StatusCode} - {await response.Content.ReadAsStringAsync()}");

				var json = await response.Content.ReadAsStringAsync().ConfigureAwait(false);

				// Deserialize the response using the wrapper class.
				var movieDetailsResponse = JsonConvert.DeserializeObject<DetailedMovieModel>(json);

				// If the deserialization is successful, return the Movies list, otherwise return an empty list.
				return movieDetailsResponse ?? new DetailedMovieModel() ;
			}
			catch (Exception e)
			{
				// TODO: Log error properly (replace with ILogger).
				Console.WriteLine($"Error fetching {provider} movies: {e.Message}");

				// Return empty list to prevent crashes.
				return new DetailedMovieModel();
			}
		}
	}

	public class WebjetApiOptions
	{
		[Required]
		public string BaseUrl { get; set; } = null!;

		[Required]
		public string Apikey { get; set; } = null!;
	}
}
