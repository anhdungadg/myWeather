using Microsoft.AspNetCore.RateLimiting;
using myWeatherAPI.Services;
using Newtonsoft.Json;
using System.Threading.RateLimiting;
using VaultSharp;


var builder = WebApplication.CreateBuilder(args);
var config = builder.Configuration.AddEnvironmentVariables().Build();
var vaultAddress = config["APP_SETTINGS_VAULTADDRESS"];
var appSetting_WeatherStack_API = config["APP_SETTINGS_WEATHERSTACK_API"];

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddHttpClient<IWeatherService, WeatherService>();      // Register IWeatherService
//builder.Services.AddSingleton<IVaultService, VaultService>();
builder.Services.AddSingleton<IVaultClient, VaultClient>();
builder.Services.AddSingleton<IVaultService, VaultService>();


// https://learn.microsoft.com/en-us/aspnet/core/performance/rate-limit?view=aspnetcore-8.0
// There many ways to approach this problem, such as using Ocelot gateway.
// But I choose this solution because the main purpose this is POC project.
builder.Services.AddRateLimiter(_ => _
    .AddFixedWindowLimiter(policyName: "fixed", options =>
    {
        options.PermitLimit = 4;
        options.Window = TimeSpan.FromSeconds(12);
        options.QueueProcessingOrder = QueueProcessingOrder.OldestFirst;
        options.QueueLimit = 2;
    }));

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.Logger.LogInformation("TEST " + DateTime.Now.ToString());
app.Logger.LogCritical(vaultAddress);
app.Logger.LogError(config["APP_SETTINGS__Thungheim"]);

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseRateLimiter();
app.MapGet("/health", () =>
{
    var currentTime = DateTime.Now;
    var result = new { system_time= currentTime};
    var json = JsonConvert.SerializeObject(result);
    return json;
}).RequireRateLimiting("fixed");

app.UseCors(builder => builder.WithOrigins("*").AllowAnyMethod().AllowAnyHeader());


//app.Logger.LogCritical("NguyHIMMM");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

