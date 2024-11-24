import React from 'react';
import { Check, Shield, Zap, Clock } from 'lucide-react';

const tiers = [
  {
    name: 'Business NXT Standard',
    price: 8500,
    description: 'Perfekt för mindre företag som vill digitalisera sin verksamhet',
    features: [
      'Upp till 5 användare',
      'Grundläggande bokföring',
      'Fakturering (Standard Plus)',
      'Kundreskontra',
      'Leverantörsreskontra',
      'Standardrapporter',
      'E-post support',
      '5GB lagring',
      'API-åtkomst',
    ],
    icon: Shield,
  },
  {
    name: 'Business NXT Plus',
    price: 12800,
    description: 'För växande företag med behov av mer avancerade funktioner',
    features: [
      'Upp till 20 användare',
      'Allt i Standard, plus:',
      'Avancerad bokföring',
      'Automatiska påminnelser',
      'Anpassade rapporter',
      'Prioriterad support',
      'Projektredovisning',
      '50GB lagring',
      'Anpassade integrationer',
      'Avancerad säkerhet',
    ],
    icon: Zap,
    highlighted: true,
  },
  {
    name: 'Business NXT Komplett',
    price: 21400,
    description: 'Komplett lösning för större företag med omfattande behov',
    features: [
      'Obegränsat antal användare',
      'Allt i Plus, plus:',
      'Enterprise-funktioner',
      'Koncernredovisning',
      'Anläggningsregister',
      'Support dygnet runt',
      'Obegränsad lagring',
      'Anpassad driftsättning',
      'SLA-garanti',
      'Dedikerad kontoansvarig',
    ],
    icon: Clock,
  },
];

const addons = [
  {
    name: 'Business NXT Logistik',
    price: 5200,
    description: 'Komplett logistik- och lagerhantering',
    features: [
      'Lagerhantering',
      'Inköpsorder',
      'Leveransplanering',
      'Automatisk påfyllning',
      'Streckkodsskanning',
    ],
  },
  {
    name: 'OneStop Reporting Komplett',
    price: 1600,
    description: 'Avancerad rapportering och analys',
    features: [
      'Anpassade rapporter',
      'Realtidsanalys',
      'Data export',
      'Visualiseringar',
      'Prognos verktyg',
    ],
  },
];

export default function Pricing() {
  return (
    <div id="pricing" className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
            Enkla, transparenta priser
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Välj den perfekta planen för dina företagsbehov
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3 lg:gap-x-8">
          {tiers.map((tier) => {
            const Icon = tier.icon;
            return (
              <div
                key={tier.name}
                className={`relative p-8 bg-white border ${
                  tier.highlighted
                    ? 'border-indigo-600 ring-2 ring-indigo-600'
                    : 'border-gray-200'
                } rounded-2xl shadow-sm flex flex-col`}
              >
                {tier.highlighted && (
                  <div className="absolute top-0 right-6 -translate-y-1/2">
                    <span className="inline-flex rounded-full bg-indigo-600 px-4 py-1 text-sm font-semibold text-white">
                      Populärast
                    </span>
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <Icon className="h-8 w-8 text-indigo-600" />
                    <h3 className="text-xl font-semibold text-gray-900">{tier.name}</h3>
                  </div>
                  <p className="mt-4 text-gray-500">{tier.description}</p>
                  <p className="mt-8 flex items-baseline text-gray-900">
                    <span className="text-5xl font-extrabold tracking-tight">
                      {tier.price}
                    </span>
                    <span className="ml-1 text-xl font-semibold">kr/mån</span>
                  </p>
                  <ul className="mt-6 space-y-6">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex">
                        <Check className="flex-shrink-0 w-6 h-6 text-green-500" />
                        <span className="ml-3 text-gray-500">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  className={`mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium ${
                    tier.highlighted
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                      : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
                  } transition-colors`}
                >
                  Kom igång
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Tilläggstjänster
          </h3>
          <div className="grid gap-8 lg:grid-cols-2">
            {addons.map((addon) => (
              <div
                key={addon.name}
                className="bg-white p-8 border border-gray-200 rounded-2xl shadow-sm"
              >
                <div className="flex justify-between items-baseline">
                  <h4 className="text-xl font-semibold text-gray-900">{addon.name}</h4>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-gray-900">
                      {addon.price}
                    </span>
                    <span className="ml-1 text-gray-500">kr/mån</span>
                  </div>
                </div>
                <p className="mt-4 text-gray-500">{addon.description}</p>
                <ul className="mt-6 space-y-4">
                  {addon.features.map((feature) => (
                    <li key={feature} className="flex">
                      <Check className="flex-shrink-0 w-5 h-5 text-green-500" />
                      <span className="ml-3 text-gray-500">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="mt-8 w-full bg-indigo-50 text-indigo-700 hover:bg-indigo-100 py-3 px-6 border border-transparent rounded-md text-center font-medium transition-colors">
                  Lägg till
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Vanliga frågor om priser
          </h3>
          <dl className="space-y-8">
            <div>
              <dt className="text-lg font-medium text-gray-900">
                Finns det några dolda avgifter?
              </dt>
              <dd className="mt-2 text-gray-500">
                Nej, alla priser är transparenta och inkluderar alla grundläggande funktioner. 
                Transaktionskostnader beräknas separat baserat på din användning.
              </dd>
            </div>
            <div>
              <dt className="text-lg font-medium text-gray-900">
                Kan jag byta plan senare?
              </dt>
              <dd className="mt-2 text-gray-500">
                Ja, du kan uppgradera eller nedgradera din plan när som helst. 
                Ändringar träder i kraft vid nästa faktureringsperiod.
              </dd>
            </div>
            <div>
              <dt className="text-lg font-medium text-gray-900">
                Hur fungerar faktureringen?
              </dt>
              <dd className="mt-2 text-gray-500">
                Vi fakturerar månadsvis i förskott för grundpaketet. 
                Transaktionskostnader och tilläggstjänster faktureras i efterskott baserat på användning.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}