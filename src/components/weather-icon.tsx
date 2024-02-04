import {weatherIconMap} from "@/lib/utils";

const WeatherIcon = ({
  code,
  className = "icon",
}: {
  code: number;
  className?: string;
}) => {
  const IconComponent = weatherIconMap[code] || weatherIconMap[800];

  return <IconComponent className={className} />;
};

export default WeatherIcon;
