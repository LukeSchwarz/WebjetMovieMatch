using Newtonsoft.Json;

namespace WebJetMoviesApi.WebJet.Models;
public class MovieModel
{
	[JsonProperty(Required = Required.Always)]
	public string Title { get; set; }

	[JsonProperty(Required = Required.Always)]
	public string Year { get; set; }

	[JsonProperty(Required = Required.Always)]
	public string ID { get; set; }

	[JsonProperty(Required = Required.Always)]
	public string Type { get; set; }

	[JsonProperty(Required = Required.Always)]
	public string Poster { get; set; }
}
