interface AvatarIconProps {
  size?: number;
  className?: string;
}

const AvatarIcon = ({
  size = 48,
  className = "w-12 h-12",
}: AvatarIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle
      cx="24"
      cy="18"
      r="8"
      stroke="#222323"
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M8 40 C8 32, 15 26, 24 26 C33 26, 40 32, 40 40"
      stroke="#222323"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
    />
  </svg>
);

export default AvatarIcon;
