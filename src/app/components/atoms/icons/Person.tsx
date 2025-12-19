interface IconPersonProps {
  size?: number;
  fill?: string;
}

const IconPerson = ({ size = 24, fill }: IconPersonProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={fill}
    >
      <path
        d="M8 1C8.79565 1 9.55871 1.31607 10.1213 1.87868C10.6839 2.44129 11 3.20435 11 4C11 4.79565 10.6839 5.55871 10.1213 6.12132C9.55871 6.68393 8.79565 7 8 7C7.20435 7 6.44129 6.68393 5.87868 6.12132C5.31607 5.55871 5 4.79565 5 4C5 3.20435 5.31607 2.44129 5.87868 1.87868C6.44129 1.31607 7.20435 1 8 1ZM8 8.5C11.315 8.5 14 9.8425 14 11.5V13H2V11.5C2 9.8425 4.685 8.5 8 8.5Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default IconPerson;
