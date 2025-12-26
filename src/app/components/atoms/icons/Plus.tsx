interface IconPlusProps {
  size?: number;
  fill?: string;
}

const IconPlus = ({ size = 24, fill }: IconPlusProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 11 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={fill}
    >
      <path
        d="M11 6.28571H6.28571V11H4.71429V6.28571H0V4.71429H4.71429V0H6.28571V4.71429H11V6.28571Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default IconPlus;
