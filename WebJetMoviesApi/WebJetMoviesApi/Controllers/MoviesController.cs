using Microsoft.AspNetCore.Mvc;
using WebJetMoviesApi.WebJet;

namespace WebJetMoviesApi.Controllers
{
	[Route("api/movie")]
	[ApiController]
	public class MoviesController : ControllerBase
	{
		private readonly WebjetMoviesApi _webjetMoviesApi;

		public MoviesController(WebjetMoviesApi webjetMoviesApi)
		{
			_webjetMoviesApi = webjetMoviesApi;
		}

		[HttpGet]
		[Route("/cinemaworld/movies")]
		public async Task<IActionResult> GetAllCinemaworldMovies()
		{
			var movies = await _webjetMoviesApi.GetMovies(MovieProvider.Cinemaworld);
			return Ok(movies);
		}

		[HttpGet]
		[Route("/filmworld/movies")]
		public async Task<IActionResult> GetAllFilmworldMovies()
		{
			var movies = await _webjetMoviesApi.GetMovies(MovieProvider.Filmworld);
			return Ok(movies);
		}

		[HttpGet]
		[Route("/cinemaworld/movie/{id}")]
		public async Task<IActionResult> GetAllCinemaworldMovies([FromRoute] string id)
		{
			var movies = await _webjetMoviesApi.GetMovieDetails(MovieProvider.Cinemaworld, id);

			return Ok(movies);
		}

		[HttpGet]
		[Route("/filmworld/movie/{id}")]
		public async Task<IActionResult> GetAllFilmworldMovies([FromRoute] string id)
		{
			var movies = await _webjetMoviesApi.GetMovieDetails(MovieProvider.Filmworld, id);

			return Ok(movies);
		}
	}
}
