using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using myWeatherAPI.Services;
using System.ComponentModel.DataAnnotations;

namespace myWeatherAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class WeatherForecastController : ControllerBase
    {
        private readonly IWeatherService _weatherService;
        public WeatherForecastController(IWeatherService weatherService)
        {
            _weatherService = weatherService;
        }

        // 
        [HttpGet(Name = "GetWeather")]
        [EnableRateLimiting("fixed")]
        public async Task<IActionResult> GetWeather([FromQuery][RegularExpression(@"^\d{5}(-\d{4})?$")] string zipCode)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var weatherResponse = await _weatherService.GetWeatherAsync(zipCode);
            var weather = new
            {
                Location = weatherResponse.Location,
                Current = weatherResponse.Current,
                ShouldGoOutside = !weatherResponse.Current.IsRaining,
                ShouldWearSunscreen = weatherResponse.Current.UvIndex > 3,
                CanFlyKite = !weatherResponse.Current.IsRaining && weatherResponse.Current.Wind_speed > 15
            };
            return Ok(weather);
        }
        // -----------------




        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;

        //public WeatherForecastController(ILogger<WeatherForecastController> logger)
        //{
        //    _logger = logger;
        //}

        [HttpGet(Name = "GetWeatherForecast1")]
        public IEnumerable<WeatherForecast> Get()
        {
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
        }





    }
}
