interface IconSportProps {
  size?: number;
  fill?: string;
  className?: string;
}

const IconSport = ({ size = 16, fill, className = "" }: IconSportProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 31 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={fill || className}
    >
      <path
        d="M23.2502 9.68758C24.1066 9.68758 24.9279 9.34737 25.5335 8.74178C26.1391 8.13619 26.4793 7.31484 26.4793 6.45841C26.4793 5.60199 26.1391 4.78064 25.5335 4.17505C24.9279 3.56946 24.1066 3.22925 23.2502 3.22925C22.3937 3.22925 21.5724 3.56946 20.9668 4.17505C20.3612 4.78064 20.021 5.60199 20.021 6.45841C20.021 7.31484 20.3612 8.13619 20.9668 8.74178C21.5724 9.34737 22.3937 9.68758 23.2502 9.68758Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M7.75002 10.8308L12.9186 9.04053L20.0209 12.4305L12.9186 17.7244L20.0209 22.4002L15.5052 28.4155M22.8109 13.9779L24.543 14.9202L28.4167 11.2803M10.8817 20.373L8.96354 22.8995L2.58594 26.4774"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconSport;
