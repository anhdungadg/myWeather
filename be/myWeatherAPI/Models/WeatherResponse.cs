namespace myWeatherAPI.Models
{
    public class WeatherResponse
    {
        public Request Request { get; set; }
        public Location Location { get; set; }
        public Current Current { get; set; }
    }

    public class Request
    {
        public string Type { get; set; }
        public string Query { get; set; }
        public string Language { get; set; }
        public string Unit { get; set; }
    }

    public class Location
    {
        public string Name { get; set; }
        public string Country { get; set; }
        public string Region { get; set; }
        public string Lat { get; set; }
        public string Lon { get; set; }
        public string TimezoneId { get; set; }
        public string Localtime { get; set; }
        public int LocaltimeEpoch { get; set; }
        public string UtcOffset { get; set; }
    }

    public class Current
    {
        public string ObservationTime { get; set; }
        public int Temperature { get; set; }
        public int Weather_Code { get; set; }
        public string[] Weather_Icons { get; set; }
        public string[] Weather_Descriptions { get; set; }
        public int Wind_Speed { get; set; }
        public int Wind_Degree { get; set; }
        public string Wind_Dir { get; set; }
        public int Pressure { get; set; }
        public int Precip { get; set; }
        public int Humidity { get; set; }
        public int Cloudcover { get; set; }
        public int Feelslike { get; set; }
        public int Uv_Index { get; set; }
        public int Visibility { get; set; }

        public bool IsRaining { get; internal set; }
    }
}
