namespace myWeatherAPI.Utils
{
    public interface IApiKeyManager
    {
        string GetWeatherApiKey();
    }

    public class ApiKeyManager(IConfiguration configuration) : IApiKeyManager
    {
        private readonly IConfiguration _configuration = configuration;

        public string GetWeatherApiKey()
        {
            return _configuration["APP_SETTINGS_WEATHERSTACK_API"];
        }
    }
}
