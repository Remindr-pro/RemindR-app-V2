interface IconPinProps {
  size?: number;
  fill?: string;
  className?: string;
}

const IconPin = ({ size = 24, fill, className = "" }: IconPinProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={fill || className}
    >
      <path
        d="M0.75 18.7508L5.38 14.1198M5.385 14.1148L2.605 11.3348C1.651 10.3818 2.611 8.33884 3.915 8.25684C5.093 8.18184 7.82 8.60884 8.727 7.70184L11.217 5.21184C11.834 4.59384 11.442 3.21184 11.402 2.44984C11.344 1.43384 12.96 0.178844 13.817 1.03584L18.464 5.68384C19.324 6.54184 18.064 8.15284 17.051 8.09884C16.289 8.05884 14.906 7.66684 14.288 8.28384L11.798 10.7738C10.892 11.6808 11.318 14.4068 11.244 15.5848C11.162 16.8898 9.119 17.8498 8.164 16.8948L5.385 14.1148Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconPin;
