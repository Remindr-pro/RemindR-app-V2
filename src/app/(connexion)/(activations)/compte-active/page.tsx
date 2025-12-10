import Button from "@/app/components/atoms/Button";
import Image from "next/image";

export default function CompteActivePage() {
  return (
    <div className="w-full max-w-md flex flex-col items-center justify-center gap-2 font-inclusive">
      <Image
        src="/images/icons/confetti.png"
        alt="Confetti icon"
        width={100}
        height={100}
        className="w-16 h-16 md:w-[100px] md:h-[100px] mb-8"
      />
      <Button variant="green" href="/connexion" className="hidden! md:block!">
        Se connecter à mon espace prévention
      </Button>
      <Button variant="green" href="/connexion" className="block! md:hidden!">
        Se connecter
      </Button>
    </div>
  );
}
