import Button from "@/app/components/atoms/Button";

export default function ContratPage() {
  return (
    <div className="w-full mx-auto pt-8">
      <div className="p-8 bg-light rounded-2xl">
        <h1 className="text-4xl font-bold text-dark mb-6 font-inclusive">
          Mon contrat
        </h1>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-base text-dark font-inclusive">
              Vous êtes affilié·e au contrat de prévoyance santé formule{" "}
              <a href="#" className="text-greenMain underline font-inclusive">
                Essentielle
              </a>
              , n°HD548IP69873
            </p>
            <p className="text-base text-dark font-inclusive">
              Vous avez une question sur votre contrat ?
            </p>
          </div>

          <div className="flex gap-4">
            <Button variant="green">Consultez vos garanties</Button>
            <Button
              variant="outline"
              className="border-greenMain text-greenMain hover:bg-greenMain/10"
            >
              Nous contacter
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
