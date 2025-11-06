export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-tango text-dark mb-4">Accueil</h1>
        <p className="font-inclusive text-foreground mb-6">
          Bienvenue sur RemindR - Votre assistant de rappels intelligent
        </p>
        <div className="space-y-4">
          <div className="p-4 bg-light rounded-lg">
            <h2 className="font-tango text-greenMain text-2xl mb-2">
              Test des polices
            </h2>
            <p className="font-inclusive text-gray-4">
              Cette page teste les polices Tango et Inclusive ainsi que les
              couleurs personnalisées.
            </p>
          </div>
          <div className="p-4 bg-greenMain text-white rounded-lg">
            <h2 className="font-tango text-xl mb-2">Couleurs personnalisées</h2>
            <div className="flex gap-2 flex-wrap">
              <span className="px-3 py-1 bg-red-1 rounded">Rouge</span>
              <span className="px-3 py-1 bg-greenSecondary rounded">
                Vert secondaire
              </span>
              <span className="px-3 py-1 bg-purple rounded">Violet</span>
              <span className="px-3 py-1 bg-blue rounded">Bleu</span>
              <span className="px-3 py-1 bg-orange rounded">Orange</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
