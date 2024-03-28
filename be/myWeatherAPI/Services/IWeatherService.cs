using myWeatherAPI.Models;

namespace myWeatherAPI.Services
{
    public interface IWeatherService
    {
        Task<WeatherResponse> GetWeatherAsync(string zipCode);
    }

}
