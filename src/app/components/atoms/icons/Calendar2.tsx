interface IconCalendar2Props {
  size?: number;
  fill?: string;
}

const IconCalendar2 = ({ size = 24, fill }: IconCalendar2Props) => {
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
        d="M11.875 11.875H3.125V5H11.875M10 0.625V1.875H5V0.625H3.75V1.875H3.125C2.43125 1.875 1.875 2.43125 1.875 3.125V11.875C1.875 12.2065 2.0067 12.5245 2.24112 12.7589C2.47554 12.9933 2.79348 13.125 3.125 13.125H11.875C12.2065 13.125 12.5245 12.9933 12.7589 12.7589C12.9933 12.5245 13.125 12.2065 13.125 11.875V3.125C13.125 2.79348 12.9933 2.47554 12.7589 2.24112C12.5245 2.0067 12.2065 1.875 11.875 1.875H11.25V0.625M10.625 7.5H7.5V10.625H10.625V7.5Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default IconCalendar2;
