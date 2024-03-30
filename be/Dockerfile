FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /src

# Copy the solution file and myWeatherAPI project file to the container
COPY ["myWeatherAPI/myWeatherAPI.csproj", "./myWeatherAPI/"]
COPY ["myWeatherAPI.Tests/myWeatherAPI.Tests.csproj", "./myWeatherAPI.Tests/"]

# Restore the NuGet packages for both projects
RUN dotnet restore "./myWeatherAPI/myWeatherAPI.csproj"
RUN dotnet restore "./myWeatherAPI.Tests/myWeatherAPI.Tests.csproj"

# Copy the source code for both projects to the container
COPY ["myWeatherAPI/", "./myWeatherAPI/"]
COPY ["myWeatherAPI.Tests/", "./myWeatherAPI.Tests/"]

# Build myWeatherAPI project
WORKDIR /src/myWeatherAPI
RUN dotnet build myWeatherAPI.csproj -c Release -o /app/build

# Run unit tests for myWeatherAPI.Tests project
WORKDIR /src/myWeatherAPI.Tests
RUN dotnet test myWeatherAPI.Tests.csproj -c Release

# Stage 2: Publish
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS publish

# Copy the built app to the container
WORKDIR /app
COPY --from=build /app/build .

# Set environment variables
ENV APP_SETTINGS_WEATHERSTACK_API=610acf4c1d203448cd6f671955c5e8aa

# Expose port 80


# Run the app
ENTRYPOINT ["dotnet", "myWeatherAPI.dll"]
