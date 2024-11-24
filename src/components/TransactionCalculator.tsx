import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

type PriceTier = {
  min: number;
  max: number;
  description: string;
  package: string;
  price: number;
};

const priceTiers: PriceTier[] = [
  { min: 0, max: 100, description: '0-100 st', package: 'Standard Plus', price: 2.16 },
  { min: 101, max: 500, description: '101-500 st', package: 'Plus', price: 1.62 },
  { min: 501, max: 1000, description: '501-1000 st', package: 'Komplett', price: 1.29 },
  { min: 1001, max: 3000, description: '1001-3000 st', package: 'Komplett', price: 1.19 },
  { min: 3001, max: 5000, description: '3001-5000 st', package: 'Komplett', price: 1.08 },
  { min: 5001, max: 10000, description: '5001-10000 st', package: 'Komplett', price: 0.81 },
  { min: 10001, max: 20000, description: '10001-20000 st', package: 'Komplett', price: 0.54 },
  { min: 20001, max: 50000, description: '20001-50000 st', package: 'Komplett', price: 0.27 },
  { min: 50001, max: 500000, description: '50001-500000 st', package: 'Komplett', price: 0.11 },
];

const calculateTieredPrice = (volume: number): { total: number; breakdown: Array<{ tier: PriceTier; count: number; subtotal: number }> } => {
  let remaining = volume;
  let total = 0;
  const breakdown: Array<{ tier: PriceTier; count: number; subtotal: number }> = [];

  for (const tier of priceTiers) {
    if (remaining <= 0) break;

    const tierRange = tier.max - tier.min + 1;
    const transactionsInTier = Math.min(remaining, tierRange);
    const subtotal = transactionsInTier * tier.price;

    breakdown.push({
      tier,
      count: transactionsInTier,
      subtotal,
    });

    total += subtotal;
    remaining -= transactionsInTier;
  }

  return { total: Number(total.toFixed(2)), breakdown };
};

const getCurrentTier = (volume: number): PriceTier | undefined => {
  return priceTiers.find(tier => volume >= tier.min && volume <= tier.max);
};

export default function TransactionCalculator() {
  const [volume, setVolume] = useState<number>(1);
  const [calculation, setCalculation] = useState<{
    total: number;
    breakdown: Array<{ tier: PriceTier; count: number; subtotal: number }>;
  } | null>(null);

  const handleCalculate = () => {
    const result = calculateTieredPrice(volume);
    setCalculation(result);
  };

  return (
    <div id="calculator" className="py-12 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <Calculator className="h-12 w-12 text-indigo-600 mx-auto" />
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900">
            Fakturaprocess Kalkylator
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Beräkna kostnaden för leverantörsfakturahantering exkl Autoinvoice
          </p>
        </div>

        <div className="mt-8 bg-white p-8 rounded-lg shadow-lg">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Antal fakturor
              </label>
              <input
                type="number"
                min="1"
                max="500000"
                value={volume}
                onChange={(e) => setVolume(Math.max(1, Math.min(500000, parseInt(e.target.value) || 1)))}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
              />
              {getCurrentTier(volume) && (
                <p className="mt-2 text-sm text-indigo-600">
                  Aktuell prisnivå: {getCurrentTier(volume)?.description} ({getCurrentTier(volume)?.package})
                </p>
              )}
            </div>

            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Prisnivåer:</h3>
              <div className="grid grid-cols-1 gap-2 text-sm text-gray-600">
                {priceTiers.map((tier, index) => (
                  <div key={index} className="flex justify-between items-center py-1">
                    <div>
                      <span className="font-medium">{tier.description}</span>
                      <span className="text-gray-500 ml-2">({tier.package})</span>
                    </div>
                    <span className="font-medium">{tier.price} kr/st</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleCalculate}
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md font-medium hover:bg-indigo-700 transition-colors"
            >
              Beräkna kostnad
            </button>

            {calculation && (
              <div className="mt-6 p-4 bg-gray-50 rounded-md">
                <h3 className="text-lg font-medium text-gray-900">Kostnadsöversikt</h3>
                <div className="mt-4 space-y-4">
                  <div className="space-y-2">
                    {calculation.breakdown.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          {item.count} st ({item.tier.package}) à {item.tier.price} kr
                        </span>
                        <span className="font-medium">{item.subtotal.toFixed(2)} kr</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total kostnad:</span>
                      <span>{calculation.total} kr</span>
                    </div>
                    <div className="mt-1 text-sm text-gray-500 text-right">
                      {(calculation.total / volume).toFixed(2)} kr genomsnittligt per faktura
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}