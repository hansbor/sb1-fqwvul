import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import ExportSummary from './ExportSummary';

interface TransactionTier {
  min: number;
  max: number;
  package: string;
  price: number;
}

interface TransactionType {
  name: string;
  tiers: TransactionTier[];
}

export const transactionTypes: Record<string, TransactionType> = {
  invoiceProcess: {
    name: 'Fakturaprocess',
    tiers: [
      { min: 0, max: 100, package: 'Standard Plus', price: 2.16 },
      { min: 101, max: 500, package: 'Plus', price: 1.62 },
      { min: 501, max: 1000, package: 'Komplett', price: 1.29 },
      { min: 1001, max: 3000, package: 'Komplett', price: 1.19 },
      { min: 3001, max: 5000, package: 'Komplett', price: 1.08 },
      { min: 5001, max: 10000, package: 'Komplett', price: 0.81 },
      { min: 10001, max: 20000, package: 'Komplett', price: 0.54 },
      { min: 20001, max: 50000, package: 'Komplett', price: 0.27 },
      { min: 50001, max: 500000, package: 'Komplett', price: 0.11 }
    ]
  },
  paymentProcess: {
    name: 'Betalningsprocess',
    tiers: [
      { min: 0, max: 100, package: 'Standard Plus', price: 3.02 },
      { min: 101, max: 500, package: 'Plus', price: 2.81 },
      { min: 501, max: 1000, package: 'Komplett', price: 2.59 },
      { min: 1001, max: 3000, package: 'Komplett', price: 2.37 },
      { min: 3001, max: 5000, package: 'Komplett', price: 2.16 },
      { min: 5001, max: 10000, package: 'Komplett', price: 1.94 },
      { min: 10001, max: 20000, package: 'Komplett', price: 1.73 },
      { min: 20001, max: 50000, package: 'Komplett', price: 1.51 },
      { min: 50001, max: 500000, package: 'Komplett', price: 1.29 }
    ]
  },
  matchingProcess: {
    name: 'Matchningsprocess',
    tiers: [
      { min: 0, max: 100, package: 'Standard Plus', price: 0.86 },
      { min: 101, max: 500, package: 'Plus', price: 0.76 },
      { min: 501, max: 1000, package: 'Komplett', price: 0.65 },
      { min: 1001, max: 3000, package: 'Komplett', price: 0.54 },
      { min: 3001, max: 5000, package: 'Komplett', price: 0.43 },
      { min: 5001, max: 10000, package: 'Komplett', price: 0.32 },
      { min: 10001, max: 20000, package: 'Komplett', price: 0.22 },
      { min: 20001, max: 50000, package: 'Komplett', price: 0.16 },
      { min: 50001, max: 500000, package: 'Komplett', price: 0.11 }
    ]
  },
  orderProcess: {
    name: 'Orderprocess',
    tiers: [
      { min: 0, max: 100, package: 'Plus', price: 3.24 },
      { min: 101, max: 500, package: 'Plus', price: 2.70 },
      { min: 501, max: 1000, package: 'Komplett', price: 2.16 },
      { min: 1001, max: 3000, package: 'Komplett', price: 1.62 },
      { min: 3001, max: 5000, package: 'Komplett', price: 1.08 },
      { min: 5001, max: 10000, package: 'Komplett', price: 0.54 },
      { min: 10001, max: 20000, package: 'Komplett', price: 0.27 },
      { min: 20001, max: 50000, package: 'Komplett', price: 0.22 },
      { min: 50001, max: 500000, package: 'Komplett', price: 0.11 }
    ]
  },
  externalVerification: {
    name: 'Externa verifikationer',
    tiers: [
      { min: 0, max: 100, package: 'Standard Plus', price: 2.16 },
      { min: 101, max: 500, package: 'Plus', price: 1.62 },
      { min: 501, max: 1000, package: 'Komplett', price: 1.29 },
      { min: 1001, max: 3000, package: 'Komplett', price: 1.19 },
      { min: 3001, max: 5000, package: 'Komplett', price: 1.08 },
      { min: 5001, max: 10000, package: 'Komplett', price: 0.81 },
      { min: 10001, max: 20000, package: 'Komplett', price: 0.54 },
      { min: 20001, max: 50000, package: 'Komplett', price: 0.27 },
      { min: 50001, max: 500000, package: 'Komplett', price: 0.11 }
    ]
  },
  companyVolume: {
    name: 'Extra företag',
    tiers: [
      { min: 2, max: 4, package: 'Alla', price: 540 },
      { min: 5, max: 19, package: 'Alla', price: 480 },
      { min: 20, max: 49, package: 'Alla', price: 430 },
      { min: 50, max: 100, package: 'Alla', price: 370 },
      { min: 101, max: 200, package: 'Alla', price: 320 },
      { min: 201, max: 300, package: 'Alla', price: 270 },
      { min: 301, max: 500, package: 'Alla', price: 240 },
      { min: 501, max: 1000, package: 'Alla', price: 210 }
    ]
  }
};

const packages = [
  { name: 'Business NXT Standard', price: 8500 },
  { name: 'Business NXT Plus', price: 12800 },
  { name: 'Business NXT Komplett', price: 21400 }
];

const addons = [
  { name: 'Business NXT Logistik', price: 5200 },
  { name: 'OneStop Reporting Komplett', price: 1600 },
  { name: 'Extra lagring (pr 100 GB)', price: 2150 },
  { name: 'Extra lagring (pr 500 GB)', price: 4300 }
];

const calculateTieredPrice = (volume: number, tiers: TransactionTier[]): number => {
  let remaining = volume;
  let total = 0;

  for (const tier of tiers) {
    if (remaining <= 0) break;
    const tierRange = tier.max - tier.min + 1;
    const transactionsInTier = Math.min(remaining, tierRange);
    total += transactionsInTier * tier.price;
    remaining -= transactionsInTier;
  }

  return Number(total.toFixed(2));
};

const TransactionTypesCalculator: React.FC = () => {
  const [volumes, setVolumes] = useState<Record<string, number>>({
    invoiceProcess: 0,
    paymentProcess: 0,
    matchingProcess: 0,
    orderProcess: 0,
    externalVerification: 0,
    companyVolume: 0
  });
  const [selectedPackage, setSelectedPackage] = useState<string>('Business NXT Standard');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const handleVolumeChange = (type: string, value: number) => {
    setVolumes(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const handleAddonToggle = (addon: string) => {
    setSelectedAddons(prev =>
      prev.includes(addon)
        ? prev.filter(a => a !== addon)
        : [...prev, addon]
    );
  };

  const calculateTransactionCosts = () => {
    const costs: Record<string, number> = {};
    Object.entries(volumes).forEach(([type, volume]) => {
      if (volume > 0) {
        costs[type] = calculateTieredPrice(volume, transactionTypes[type].tiers);
      } else {
        costs[type] = 0;
      }
    });
    return costs;
  };

  const calculateTotal = () => {
    const packagePrice = packages.find(p => p.name === selectedPackage)?.price || 0;
    const transactionCosts = Object.values(calculateTransactionCosts()).reduce((a, b) => a + b, 0);
    const addonsCost = selectedAddons.reduce((total, addon) => {
      return total + (addons.find(a => a.name === addon)?.price || 0);
    }, 0);
    
    return packagePrice + transactionCosts + addonsCost;
  };

  const getCalculationData = () => {
    const packagePrice = packages.find(p => p.name === selectedPackage)?.price || 0;
    const transactionCosts = calculateTransactionCosts();
    const addonsCost = selectedAddons.reduce((total, addon) => {
      return total + (addons.find(a => a.name === addon)?.price || 0);
    }, 0);

    return {
      selectedPackage,
      packagePrice,
      volumes,
      transactionCosts,
      selectedAddons,
      addonsCost,
      total: calculateTotal()
    };
  };

  return (
    <div id="calculator" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <Calculator className="h-12 w-12 text-indigo-600 mx-auto" />
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900">
            Priskalkylator
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Beräkna din månadskostnad baserat på dina behov
          </p>
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <div className="space-y-8">
            {/* Package Selection */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Välj paket</h3>
              <div className="grid gap-4 sm:grid-cols-3">
                {packages.map(pkg => (
                  <button
                    key={pkg.name}
                    onClick={() => setSelectedPackage(pkg.name)}
                    className={`p-4 rounded-lg border ${
                      selectedPackage === pkg.name
                        ? 'border-indigo-600 bg-indigo-50'
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="font-medium">{pkg.name}</div>
                    <div className="text-lg font-bold">{pkg.price} kr/mån</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Transaction Volumes */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Transaktionsvolymer</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {Object.entries(transactionTypes).map(([type, { name }]) => (
                  <div key={type} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      {name}
                    </label>
                    <input
                      type="number"
                      min={type === 'companyVolume' ? 2 : 0}
                      max={type === 'companyVolume' ? 1000 : 500000}
                      value={volumes[type]}
                      onChange={(e) => handleVolumeChange(type, parseInt(e.target.value) || 0)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Addons */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Tilläggstjänster</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {addons.map(addon => (
                  <label
                    key={addon.name}
                    className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200"
                  >
                    <input
                      type="checkbox"
                      checked={selectedAddons.includes(addon.name)}
                      onChange={() => handleAddonToggle(addon.name)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <div className="flex-1">
                      <div className="font-medium">{addon.name}</div>
                      <div className="text-gray-500">{addon.price} kr/mån</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Total Cost */}
            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center">
                <div className="text-xl font-bold text-gray-900">Total månadskostnad:</div>
                <div className="text-3xl font-bold text-indigo-600">{Math.round(calculateTotal())} kr</div>
              </div>
              <ExportSummary calculationData={getCalculationData()} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionTypesCalculator;