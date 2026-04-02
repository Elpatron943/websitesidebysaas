import React from 'react';

export default function HomePage() {
  return (
    <div className="bg-[#0f172a] text-white min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-5xl font-bold mb-4">Comparez les SaaS avec de vraies données d'achat</h1>
        <p className="italic mb-6">Real buyer data. Real SaaS battles.</p>
        <div className="flex space-x-4">
          <button className="bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded">Commencer maintenant</button>
          <button className="bg-violet-600 hover:bg-violet-800 text-white font-bold py-2 px-4 rounded">En savoir plus</button>
        </div>
      </section>

      {/* Comment ça marche Section */}
      <section className="px-8 py-16">
        <h2 className="text-3xl font-semibold text-center mb-8">Comment ça marche</h2>
        <div className="grid grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-2">1. Partagez</h3>
            <p>Les acheteurs partagent leurs contrats.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">2. Anonymisation</h3>
            <p>Les données sont anonymisées et agrégées.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">3. Comparez</h3>
            <p>Comparez avec les vrais prix du marché.</p>
          </div>
        </div>
      </section>

      {/* Pourquoi Side by SaaS Section */}
      <section className="px-8 py-16 bg-indigo-900">
        <h2 className="text-3xl font-semibold text-center text-indigo-200 mb-8">Pourquoi Side by SaaS</h2>
        <ul className="space-y-4">
          <li>Pas de biais marketing, prix réels, contexte acheteur réel.</li>
          <li>Au-delà des annuaires d&apos;avis classiques : des insights basés sur les achats réels.</li>
        </ul>
      </section>

      {/* Pour qui Section */}
      <section className="px-8 py-16">
        <h2 className="text-3xl font-semibold text-center mb-8">Pour qui ?</h2>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-2">Acheteurs de logiciels SaaS</h3>
            <p>Découvrez les options SaaS les plus efficaces.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Éditeurs SaaS</h3>
            <p>Présentez vos produits à un public ciblé.</p>
          </div>
        </div>
      </section>

      {/* CTA Final Section */}
      <section className="flex flex-col items-center py-16">
        <h2 className="text-3xl font-semibold mb-4">Commencer gratuitement</h2>
        <button className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded">S'inscrire maintenant</button>
      </section>
    </div>
  );
}