namespace myWeatherAPI.Utils
{
    public interface IApiKeyManager
    {
        string GetWeatherApiKey();
    }

    /// <summary>
    /// Manages the API key for accessing weather data.
    /// </summary>
    public class ApiKeyManager(IConfiguration configuration) : IApiKeyManager
    {
        private readonly IConfiguration _configuration = configuration;

        /// <summary>
        /// Retrieves the API key for accessing weather data.
        /// </summary>
        /// <returns>The API key for weather data access.</returns>
        public string GetWeatherApiKey()
        {
            return _configuration["APP_SETTINGS_WEATHERSTACK_API"];
        }
    }
}
