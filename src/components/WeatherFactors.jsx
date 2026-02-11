import { Thermometer, Droplets, Wind, Clock } from 'lucide-react';

export default function WeatherFactors({ temperature, humidity, windSpeed }) {
  const formatTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <h3 className="text-xl font-semibold font-['Manrope'] mb-6 flex items-center gap-2">
        <Thermometer className="h-5 w-5 text-blue-600" />
        Current Weather Factors
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <Thermometer className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">Temperature</span>
          </div>
          <div className="text-2xl font-bold font-['Manrope'] text-blue-900">
            {temperature !== null && temperature !== undefined ? `${Math.round(temperature)}°C` : '--'}
          </div>
        </div>

        <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-lg p-4 border border-cyan-200">
          <div className="flex items-center gap-2 mb-2">
            <Droplets className="h-4 w-4 text-cyan-600" />
            <span className="text-sm font-medium text-cyan-700">Humidity</span>
          </div>
          <div className="text-2xl font-bold font-['Manrope'] text-cyan-900">
            {humidity !== null && humidity !== undefined ? `${Math.round(humidity)}%` : '--'}
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
          <div className="flex items-center gap-2 mb-2">
            <Wind className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-green-700">Wind Speed</span>
          </div>
          <div className="text-2xl font-bold font-['Manrope'] text-green-900">
            {windSpeed !== null && windSpeed !== undefined ? `${Math.round(windSpeed)} km/h` : '--'}
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-700">Time</span>
          </div>
          <div className="text-lg font-bold font-['Manrope'] text-purple-900">
            {formatTime()}
          </div>
        </div>
      </div>

      {(temperature === null || temperature === undefined) && (
        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-sm text-amber-800">
            Weather data unavailable. Please check OpenWeatherMap API configuration.
          </p>
        </div>
      )}
    </div>
  );
}
