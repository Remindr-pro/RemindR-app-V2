interface IconChevronProps {
  size?: number;
  className?: string;
}

const IconChevron = ({ size = 16, className = "" }: IconChevronProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M8 10.2663L4 6.26634L4.93333 5.33301L8 8.39967L11.0667 5.33301L12 6.26634L8 10.2663Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default IconChevron;
