import Image from "next/image";

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          GG Tracker
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Suivez vos performances sur Valorant et League of Legends en temps réel.
          Analysez vos statistiques et progressez dans votre jeu !
        </p>
      </section>

      {/* Game Selection */}
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Valorant Card */}
        <div className="group relative overflow-hidden rounded-xl bg-gray-900 p-8 hover:bg-gray-800 transition-all duration-300">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Valorant</h2>
            <p className="text-gray-400">
              Consultez vos statistiques détaillées, votre historique de matches,
              et suivez votre progression sur Valorant.
            </p>
            <button className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
              Voir mes stats Valorant
            </button>
          </div>
        </div>

        {/* League of Legends Card */}
        <div className="group relative overflow-hidden rounded-xl bg-gray-900 p-8 hover:bg-gray-800 transition-all duration-300">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">League of Legends</h2>
            <p className="text-gray-400">
              Analysez vos performances par champion, suivez votre progression
              en ranked et découvrez vos meilleures statistiques.
            </p>
            <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              Voir mes stats LoL
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="mt-16">
        <h2 className="text-3xl font-bold text-center mb-8">Fonctionnalités</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 bg-gray-900 rounded-xl">
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const features = [
  {
    title: "Statistiques en temps réel",
    description: "Accédez à vos statistiques mises à jour en temps réel après chaque partie."
  },
  {
    title: "Historique détaillé",
    description: "Consultez l'historique complet de vos matches avec des analyses détaillées."
  },
  {
    title: "Suivi de progression",
    description: "Visualisez votre progression au fil du temps avec des graphiques intuitifs."
  }
];
