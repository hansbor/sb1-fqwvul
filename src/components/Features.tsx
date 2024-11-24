import React from 'react';
import { 
  BarChart2, 
  FileText, 
  Building2, 
  ClipboardList, 
  PieChart,
  FolderKanban,
  Wallet,
  Receipt,
  Building,
  Database,
  Calculator,
  LayoutGrid
} from 'lucide-react';

const features = [
  {
    name: 'Kraftfull ekonomimotor',
    description: 'Förenklar, effektiviserar och automatiserar ekonomihanteringen med ett anpassningsbart gränssnitt och smidig sök- och sorteringsfunktion.',
    icon: BarChart2,
    details: [
      'Automatiserad bokföring',
      'Realtidsrapportering',
      'Anpassningsbara dashboards',
      'Avancerad sökfunktion'
    ]
  },
  {
    name: 'Fakturering',
    description: 'Hantera alla inkommande och utgående fakturor automatiskt med vår kraftfulla faktureringsmotor.',
    icon: Receipt,
    details: [
      'E-faktura hantering',
      'Automatiska påminnelser',
      'Betalningsintegrationer',
      'Fullständig fakturahistorik'
    ]
  },
  {
    name: 'Bankintegration',
    description: 'Integration med de flesta svenska och nordiska banker för smidig betalningshantering direkt i systemet.',
    icon: Building,
    details: [
      'Direktkoppling till banker',
      'Automatiska betalningar',
      'Realtidsuppdateringar',
      'Säker transaktionshantering'
    ]
  },
  {
    name: 'Anläggningsregister',
    description: 'Full kontroll över företagets tillgångar och deras värde, oavsett ägandeform.',
    icon: Database,
    details: [
      'Tillgångsöversikt',
      'Värderingshistorik',
      'Avskrivningshantering',
      'Ägandeformshantering'
    ]
  },
  {
    name: 'Kostnadsfördelning',
    description: 'Avancerad kostnadsbärarstruktur för träffsäker fördelning och realistisk projektöversikt.',
    icon: Calculator,
    details: [
      'Automatisk fördelning',
      'Kostnadsspårning',
      'Realtidsanalys',
      'Anpassningsbara rapporter'
    ]
  },
  {
    name: 'Projektredovisning',
    description: 'Integrerad projekthantering med realtidsstatus för alla projektrelaterade aktiviteter och resurser.',
    icon: LayoutGrid,
    details: [
      'Integrerad huvudbok',
      'Realtidsöversikt',
      'Resurshantering',
      'Automatisk projektuppföljning'
    ]
  }
];

export default function Features() {
  return (
    <div id="features" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
            Funktioner
          </h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
            Allt du behöver för att lyckas
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Omfattande verktyg och funktioner utformade för att ta ditt företag till nästa nivå
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <div className="space-y-6">
                  <div>
                    <span className="flex h-12 w-12 items-center justify-center rounded-md bg-indigo-600">
                      <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold tracking-tight text-gray-900">
                      {feature.name}
                    </h3>
                    <p className="text-lg text-gray-500">{feature.description}</p>
                  </div>
                  <ul className="space-y-3">
                    {feature.details.map((detail, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="flex-shrink-0">
                          <div className="h-1.5 w-1.5 rounded-full bg-indigo-600"></div>
                        </div>
                        <span className="text-gray-600">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}