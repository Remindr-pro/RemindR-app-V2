import Image from "next/image";

export default function Logo({ size = 100 }: { size?: number }) {
  return (
    <div className="flex justify-center mb-12">
      <Image
        src="/images/logos/remindr-badge.png"
        alt="RemindR Logo"
        width={size}
        height={size}
        priority
        className="w-auto h-auto"
      />
    </div>
  );
}
