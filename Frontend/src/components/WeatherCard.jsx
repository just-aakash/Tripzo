import {
  Cloud,
  Droplets,
  Wind,
  Thermometer,
} from "lucide-react";

function weatherDescription(code) {
  if (code === 0) return "Clear sky";
  if ([1, 2, 3].includes(code)) return "Partly cloudy";
  if ([45, 48].includes(code)) return "Foggy";
  if ([51, 53, 55].includes(code)) return "Drizzle";
  if ([61, 63, 65].includes(code)) return "Rain";
  if ([71, 73, 75].includes(code)) return "Snow";
  if ([80, 81, 82].includes(code)) return "Rain showers";
  if ([95, 96, 99].includes(code)) return "Thunderstorm";

  return "Weather unavailable";
}

export default function WeatherCard({ weather }) {
  if (!weather?.current) {
    return null;
  }

  const current = weather.current;

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-xl">

      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/40">
            Current weather
          </p>

          <h3 className="mt-2 text-xl font-medium">
            {weatherDescription(current.weather_code)}
          </h3>
        </div>

        <Cloud size={28} className="text-white/60" />
      </div>

      <div className="mb-7 text-5xl font-light">
        {Math.round(current.temperature_2m)}°
      </div>

      <div className="grid grid-cols-3 gap-3">

        <WeatherStat
          icon={<Thermometer size={17} />}
          label="Feels"
          value={`${Math.round(current.apparent_temperature)}°`}
        />

        <WeatherStat
          icon={<Droplets size={17} />}
          label="Humidity"
          value={`${current.relative_humidity_2m}%`}
        />

        <WeatherStat
          icon={<Wind size={17} />}
          label="Wind"
          value={`${Math.round(current.wind_speed_10m)} km/h`}
        />

      </div>

    </div>
  );
}

function WeatherStat({ icon, label, value }) {
  return (
    <div className="rounded-2xl bg-black/20 p-4">
      <div className="mb-2 text-white/50">
        {icon}
      </div>

      <div className="text-xs text-white/40">
        {label}
      </div>

      <div className="mt-1 text-sm">
        {value}
      </div>
    </div>
  );
}
