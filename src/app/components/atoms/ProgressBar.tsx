interface ProgressBarProps {
  percentage: number;
  color: "green" | "purple" | "blue" | "pink" | "orange";
  label?: string;
}

const progressBarColors = {
  green: "bg-greenMain",
  purple: "bg-purple",
  blue: "bg-blue",
  pink: "bg-pink-2",
  orange: "bg-orange",
};

export default function ProgressBar({
  percentage,
  color,
  label,
}: ProgressBarProps) {
  return (
    <div>
      {label && (
        <span className="text-sm text-dark font-inclusive block mb-2">
          {label}
        </span>
      )}
      <div className="w-full h-2 bg-gray-2 rounded-full overflow-hidden">
        <div
          className={`h-full ${progressBarColors[color]} transition-all duration-300 rounded-full`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
