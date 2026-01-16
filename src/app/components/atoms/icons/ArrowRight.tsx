interface IconArrowRightProps {
  size?: number;
  fill?: string;
  className?: string;
}

const IconArrowRight = ({
  size = 16,
  fill,
  className = "",
}: IconArrowRightProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={fill || className}
    >
      <path
        d="M6 12L10 8L6 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconArrowRight;
