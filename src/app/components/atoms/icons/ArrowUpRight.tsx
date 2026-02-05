interface IconArrowUpRightProps {
  size?: number;
  className?: string;
  "aria-hidden"?: boolean;
}

const IconArrowUpRight = ({
  size = 24,
  className = "",
  "aria-hidden": ariaHidden = true,
}: IconArrowUpRightProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden={ariaHidden}
    >
      <path
        d="M7 17L17 7M17 7H9M17 7V15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconArrowUpRight;
