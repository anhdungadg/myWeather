using myWeatherAPI.Models;
using Newtonsoft.Json;

namespace myWeatherAPI.Services
{
    public class WeatherService : IWeatherService
    {
        private readonly HttpClient _httpClient;
        public WeatherService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<WeatherResponse> GetWeatherAsync(string zipCode)
        {
            //var requestUri = $"http://api.weatherstack.com/current?access_key=API_KEY]&query={zipCode}";
            //var response = await _httpClient.GetAsync(requestUri);
            //response.EnsureSuccessStatusCode();
            //var content = await response.Content.ReadAsStringAsync();
     

            Random random = new Random();
            var randTemp = random.Next(101);

            var content = "{\"request\":{\"type\":\"Zipcode\",\"query\":\"30076\",\"language\":\"en\",\"unit\":\"m\"},\"location\":{\"name\":\"Roswell\",\"country\":\"USA\",\"region\":\"Georgia\",\"lat\":\"34.026\",\"lon\":\"-84.312\",\"timezone_id\":\"America\\/New_York\",\"localtime\":\"2024-03-24 09:53\",\"localtime_epoch\":1711273980,\"utc_offset\":\"-4.0\"},\"current\":{\"observation_time\":\"01:53 PM\",\"temperature\":"+ randTemp + ",\"weather_code\":116,\"weather_icons\":[\"https:\\/\\/cdn.worldweatheronline.com\\/images\\/wsymbols01_png_64\\/wsymbol_0002_sunny_intervals.png\"],\"weather_descriptions\":[\"Partly cloudy\"],\"wind_speed\":"+ randTemp + ",\"wind_degree\":100,\"wind_dir\":\"E\",\"pressure\":1018,\"precip\":0,\"humidity\":63,\"cloudcover\":25,\"feelslike\":5,\"uv_index\":3,\"visibility\":16,\"is_day\":\"yes\"}}";
            var weatherResponse = JsonConvert.DeserializeObject<WeatherResponse>(content);
            return weatherResponse;
        }
    }

}
