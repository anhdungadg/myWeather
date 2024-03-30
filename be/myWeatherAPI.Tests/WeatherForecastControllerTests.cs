using myWeatherAPI.Services;
using myWeatherAPI.Controllers;
using Moq;
using Microsoft.AspNetCore.Mvc;


namespace myWeatherAPI.Tests
{
    public class WeatherForecastControllerTests
    {
        private readonly IWeatherService _weatherService;

        [Fact]
        public void Test1()
        {
            // Arrange
            var controller = new WeatherForecastController(_weatherService);

            // Act
            var result = controller.Health();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.NotNull(okResult);
            //Assert.Null(okResult);
        }
    }
}