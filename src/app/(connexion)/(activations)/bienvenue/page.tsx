import Button from "@/app/components/atoms/Button";
import Image from "next/image";
import Link from "next/link";

export default function BienvenuePage() {
  return (
    <div className="w-full max-w-md flex flex-col items-center justify-center gap-2 font-inclusive">
      <Image
        src="/images/icons/alarm.png"
        alt="Alarme icon"
        width={100}
        height={100}
        className="w-16 h-16 md:w-[100px] md:h-[100px]"
      />
      <span className="mb-4 text-xs">5 minutes pour l’activer !</span>
      <Button variant="green" href="/identification">
        Commencer
      </Button>
      <span>
        Je peux aussi{" "}
        <Link href="/" className="text-greenMain underline">
          refuser l’accès
        </Link>{" "}
        à mon espace.
      </span>
    </div>
  );
}
