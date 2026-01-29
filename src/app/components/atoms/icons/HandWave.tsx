import Image from "next/image";

interface IconHandWaveProps {
  size?: number;
  className?: string;
}

const IconHandWave = ({ size = 48, className = "" }: IconHandWaveProps) => {
  return (
    <Image
      src="/images/icons/hand-modale-icon.png"
      alt=""
      width={size}
      height={size}
      className={className}
      aria-hidden
    />
  );
};

export default IconHandWave;
