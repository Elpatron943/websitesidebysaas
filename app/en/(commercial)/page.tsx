import React from 'react';

const HomePage = () => {
  return (
    <div className="bg-cream-50 text-stone-900">
      <section className="py-12 text-center">
        <h1 className="font-sans text-4xl font-extrabold pb-4">
          Arrêtez de choisir vos SaaS à l'aveugle.
        </h1>
        <p className="font-sans text-xl">
          Des acheteurs comme vous partagent leurs vraies décisions d'achat.
        </p>
        <button className="mt-6 px-6 py-3 bg-brand-green text-white text-lg rounded hover:bg-brand-green-hover">
          Voir les benchmarks gratuits →
        </button>
        <p className="mt-2 text-stone-700">
          2 847+ acheteurs IT cette semaine
        </p>
      </section>

      <section className="bg-cream-100 py-12">
        <h2 className="font-sans text-3xl font-bold text-center mb-6">
          Ils ont mieux choisi grâce à Side by SaaS
        </h2>
        <div className="flex justify-center space-x-6">
          {/* Example testimonials */}
          <div className="bg-white p-4 rounded shadow-md">
            <p className="font-serif italic">"Grâce à Side by SaaS, nous avons économisé 15% sur nos dépenses SaaS."</p>
            <p className="mt-2 font-sans text-sm">- Alex, Responsable IT</p>
          </div>
          <div className="bg-white p-4 rounded shadow-md">
            <p className="font-serif italic">"Un outil indispensable pour toute équipe technique."</p>
            <p className="mt-2 font-sans text-sm">- Marie, CTO</p>
          </div>
          <div className="bg-white p-4 rounded shadow-md">
            <p className="font-serif italic">"Les benchmarks nous ont permis de prendre de meilleures décisions."</p>
            <p className="mt-2 font-sans text-sm">- John, CISO</p>
          </div>
        </div>
      </section>

      <section className="py-12 text-center">
        <h2 className="font-sans text-3xl font-bold mb-4">
          Comment ça marche
        </h2>
        <ol className="list-decimal list-inside">
          <li>Rechercher</li>
          <li>Comparer</li>
          <li>Décider</li>
        </ol>
        <button className="mt-6 px-6 py-3 bg-brand-green text-white text-lg rounded hover:bg-brand-green-hover">
          Rejoindre la communauté →
        </button>
      </section>

      <section className="bg-cream-100 py-12">
        <h2 className="font-sans text-3xl font-bold text-center mb-6">
          Tarification transparente
        </h2>
        <div className="flex justify-center space-x-6">
          <div className="bg-white p-6 rounded shadow-sm">
            <h3 className="font-sans text-xl font-bold">Gratuit</h3>
            <p className="font-sans text-sm">Complètement gratuit pour commencer</p>
          </div>
          <div className="bg-brand-green p-6 rounded shadow-sm text-white">
            <h3 className="font-sans text-xl font-bold">Pro Acheteur</h3>
            <p className="font-sans text-sm">19€/mois</p>
            <p className="text-xs">Essai gratuit de 30 jours</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;