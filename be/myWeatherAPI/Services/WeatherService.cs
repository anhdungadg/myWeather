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

                Random random = new Random();
                var randTemp = random.Next(101);
                var rand2 = random.Next(201);

                //var content = "{\"request\":{\"type\":\"Zipcode\",\"query\":\"30076\",\"language\":\"en\",\"unit\":\"m\"},\"location\":{\"name\":\"Roswell\",\"country\":\"USA\",\"region\":\"Georgia\",\"lat\":\"34.026\",\"lon\":\"-84.312\",\"timezone_id\":\"America\\/New_York\",\"localtime\":\"2024-03-24 09:53\",\"localtime_epoch\":1711273980,\"utc_offset\":\"-4.0\"},\"current\":{\"observation_time\":\"01:53 PM\",\"temperature\":"+ randTemp + ",\"weather_code\":116,\"weather_icons\":[\"https:\\/\\/cdn.worldweatheronline.com\\/images\\/wsymbols01_png_64\\/wsymbol_0002_sunny_intervals.png\"],\"weather_descriptions\":[\"Partly cloudy\"],\"wind_speed\":"+ rand2 + ",\"wind_degree\":100,\"wind_dir\":\"E\",\"pressure\":1018,\"precip\":0,\"humidity\":63,\"cloudcover\":25,\"feelslike\":5,\"uv_index\":3,\"visibility\":16,\"is_day\":\"yes\"}}";
                content = @"
{
    ""request"": {
        ""type"": ""Zipcode"",
        ""query"": ""30076"",
        ""language"": ""en"",
        ""unit"": ""m""
    },
    ""location"": {
        ""name"": ""Roswell"",
        ""country"": ""USA"",
        ""region"": ""Georgia"",
        ""lat"": ""34.026"",
        ""lon"": ""-84.312"",
        ""timezone_id"": ""America/New_York"",
        ""localtime"": ""2024-03-30 00:41"",
        ""localtime_epoch"": 1711759260,
        ""utc_offset"": ""-4.0""
    },
    ""current"": {
        ""observation_time"": ""04:41 AM"",
        ""temperature"": 11,
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
        ""pressure"": 1019,
        ""precip"": 0,
        ""humidity"": 52,
        ""cloudcover"": 0,
        ""feelslike"": 11,
        ""uv_index"": 1,
        ""visibility"": 16,
        ""is_day"": ""no""
    }
}";
                
            }
            var weatherResponse = JsonConvert.DeserializeObject<WeatherResponse>(content);
            if (weatherResponse == null) { throw new Exception("An error occurred"); }
            return weatherResponse;
        }
    }

}
