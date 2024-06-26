#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

ENV APP_SETTINGS_WEATHERSTACK_API=610acf4c1d203448cd6f671955c5e8aa
ENV APP_SETTINGS_VAULTADDRESS=http://test
ENV APP_SETTINGS_VAULTTOKEN=http://test

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["myWeatherAPI.csproj", "."]
RUN dotnet restore "./myWeatherAPI.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "./myWeatherAPI.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./myWeatherAPI.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "myWeatherAPI.dll"]