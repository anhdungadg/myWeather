using myWeatherAPI.Models;
using myWeatherAPI.Utils;
using Newtonsoft.Json;

namespace myWeatherAPI.Services
{
    public class WeatherService : IWeatherService
    {
        private readonly HttpClient _httpClient;
        private readonly IApiKeyManager _apiKeyManager;

        public WeatherService(HttpClient httpClient, IApiKeyManager apiKeyManager)
        {
            _httpClient = httpClient;
            _apiKeyManager = apiKeyManager;
        }

        /// <summary>
        /// Asynchronously retrieves weather information based on the provided zip code.
        /// </summary>
        /// <param name="zipCode">The zip code for the location of interest.</param>
        /// <returns>The weather response object containing the current weather information.</returns>
        public async Task<WeatherResponse> GetWeatherAsync(string zipCode)
        {
            var content = "";
            string apiKey = _apiKeyManager.GetWeatherApiKey();

            if (!string.IsNullOrEmpty(apiKey))
            {
                var requestUri = $"http://api.weatherstack.com/current?access_key={apiKey}&query={zipCode}";
                var response = await _httpClient.GetAsync(requestUri);
                response.EnsureSuccessStatusCode();
                content = await response.Content.ReadAsStringAsync();
            }
            else
            {
                // Mockdata
                content = GenerateMockData();

            }
            var weatherResponse = JsonConvert.DeserializeObject<WeatherResponse>(content);
            if (weatherResponse == null) { throw new Exception("An error occurred"); }
            return weatherResponse;
        }

        private string GenerateMockData()
        {
            Random random = new Random();
            var rand1 = random.Next(101);
            var rand2 = random.Next(1010);

            return $@"
{{
    ""request"": {{
        ""type"": ""Zipcode"",
        ""query"": ""30076"",
        ""language"": ""en"",
        ""unit"": ""m""
    }},
    ""location"": {{
        ""name"": ""Roswell"",
        ""country"": ""USA"",
        ""region"": ""Georgia"",
        ""lat"": ""34.026"",
        ""lon"": ""-84.312"",
        ""timezone_id"": ""America/New_York"",
        ""localtime"": ""2024-03-30 00:41"",
        ""localtime_epoch"": 1711759260,
        ""utc_offset"": ""-4.0""
    }},
    ""current"": {{
        ""observation_time"": ""04:41 AM"",
        ""temperature"": {rand1},
        ""weather_code"": 113,
        ""weather_icons"": [
            ""https://cdn.worldweatheronline.com/images/wsymbols01_png_64/wsymbol_0008_clear_sky_night.png""
        ],
        ""weather_descriptions"": [
            ""Clear""
        ],
        ""wind_speed"": 4,
        ""wind_degree"": 10,
        ""wind_dir"": ""N"",
        ""pressure"": {rand2},
        ""precip"": 0,
        ""humidity"": 52,
        ""cloudcover"": 0,
        ""feelslike"": 11,
        ""uv_index"": 1,
        ""visibility"": 16,
        ""is_day"": ""no""
    }}
}}";

        }
    }
}
