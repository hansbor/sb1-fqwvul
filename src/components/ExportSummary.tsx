import React, { useState, useRef } from 'react';
import { Mail, FileText, X, FileSpreadsheet, Share2 } from 'lucide-react';
import { utils, write } from 'xlsx';
import { transactionTypes } from './TransactionTypesCalculator';

interface ExportSummaryProps {
  calculationData: {
    selectedPackage: string;
    packagePrice: number;
    volumes: Record<string, number>;
    transactionCosts: Record<string, number>;
    selectedAddons: string[];
    addonsCost: number;
    total: number;
  };
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('sv-SE', { 
    style: 'currency', 
    currency: 'SEK',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(Math.round(price)).replace('SEK', 'kr');
};

export default function ExportSummary({ calculationData }: ExportSummaryProps) {
  const [showSummary, setShowSummary] = useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);

  const generatePlainTextSummary = () => {
    const lines = [
      'BUSINESS NXT - KOSTNADSSAMMANSTÄLLNING',
      '=====================================',
      '',
      'GRUNDPAKET',
      '---------',
      `${calculationData.selectedPackage}: ${formatPrice(calculationData.packagePrice)}/mån`,
      '',
      'TRANSAKTIONSVOLYMER OCH PRISER',
      '---------------------------'
    ];

    Object.entries(calculationData.volumes)
      .filter(([_, volume]) => volume > 0)
      .forEach(([type, volume]) => {
        const transactionType = transactionTypes[type];
        lines.push(`\n${transactionType.name}`);
        lines.push(`Volym: ${volume} st`);
        lines.push(`Kostnad: ${formatPrice(calculationData.transactionCosts[type])}/mån`);
        lines.push('\nStafflade priser:');
        transactionType.tiers.forEach(tier => {
          lines.push(`${tier.min}-${tier.max} st: ${tier.price} kr/st (${tier.package})`);
        });
      });

    if (calculationData.selectedAddons.length > 0) {
      lines.push('');
      lines.push('TILLÄGGSTJÄNSTER');
      lines.push('---------------');
      calculationData.selectedAddons.forEach(addon => {
        lines.push(addon);
      });
      lines.push(`Totalt tillägg: ${formatPrice(calculationData.addonsCost)}/mån`);
    }

    lines.push('');
    lines.push('TOTAL MÅNADSKOSTNAD');
    lines.push('------------------');
    lines.push(`${formatPrice(calculationData.total)}/mån`);

    return lines.join('\n');
  };

  const generateExcelData = () => {
    const data: any[][] = [
      ['Business NXT - Kostnadssammanställning'],
      [],
      ['Grundpaket'],
      [calculationData.selectedPackage, formatPrice(calculationData.packagePrice) + '/mån'],
      [],
      ['Transaktionsvolymer och priser']
    ];

    Object.entries(calculationData.volumes)
      .filter(([_, volume]) => volume > 0)
      .forEach(([type, volume]) => {
        const transactionType = transactionTypes[type];
        data.push(
          [transactionType.name],
          ['Volym', `${volume} st`],
          ['Kostnad', formatPrice(calculationData.transactionCosts[type]) + '/mån'],
          ['Stafflade priser:'],
          ['Volym', 'Pris per transaktion', 'Paket']
        );
        
        transactionType.tiers.forEach(tier => {
          data.push([`${tier.min}-${tier.max} st`, `${tier.price} kr`, tier.package]);
        });
        
        data.push([]);
      });

    if (calculationData.selectedAddons.length > 0) {
      data.push(
        ['Tilläggstjänster'],
        ...calculationData.selectedAddons.map(addon => [addon]),
        ['Totalt tillägg', formatPrice(calculationData.addonsCost) + '/mån'],
        []
      );
    }

    data.push(
      ['Total månadskostnad', formatPrice(calculationData.total) + '/mån']
    );

    return data;
  };

  const exportToExcel = () => {
    const data = generateExcelData();
    const ws = utils.aoa_to_sheet(data);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Kostnadsberäkning');
    
    // Auto-size columns
    const max_width = data.reduce((w, r) => Math.max(w, r.length), 0);
    ws['!cols'] = Array(max_width).fill({ wch: 20 });

    // Generate and download file
    const wbout = write(wb, { bookType: 'xlsx', type: 'binary' });
    const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'business-nxt-kostnadsberakning.xlsx';
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportToGoogleSheets = () => {
    const data = generateExcelData();
    const csvContent = data
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    // Open Google Sheets in a new tab with the import dialog
    window.open(`https://docs.google.com/spreadsheets/d/create?usp=sheets_home&ths=true`, '_blank');
    
    // Also download the CSV file for manual import
    const a = document.createElement('a');
    a.href = url;
    a.download = 'business-nxt-kostnadsberakning.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Convert string to ArrayBuffer for Excel export
  const s2ab = (s: string) => {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
  };

  const summaryContent = `
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
      <div class="text-center mb-6">
        <h2 class="text-2xl font-bold text-gray-900">Business NXT</h2>
        <p class="text-gray-600">Kostnadssammanställning</p>
      </div>

      <div class="space-y-6">
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Grundpaket</h3>
          <div class="bg-gray-50 p-4 rounded-md">
            <div class="flex justify-between">
              <span>${calculationData.selectedPackage}</span>
              <span class="font-medium">${formatPrice(calculationData.packagePrice)}/mån</span>
            </div>
          </div>
        </div>

        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Transaktionsvolymer och priser</h3>
          ${Object.entries(calculationData.volumes)
            .filter(([_, volume]) => volume > 0)
            .map(([type, volume]) => `
              <div class="bg-gray-50 p-4 rounded-md mb-4">
                <div class="flex justify-between items-center mb-4">
                  <div>
                    <span class="font-medium">${transactionTypes[type].name}</span>
                    <span class="text-gray-500 ml-2">${volume} st</span>
                  </div>
                  <span class="font-medium">${formatPrice(calculationData.transactionCosts[type])}/mån</span>
                </div>
                
                <div class="mt-4">
                  <h4 class="text-sm font-medium text-gray-700 mb-2">Stafflade priser:</h4>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                    ${transactionTypes[type].tiers.map(tier => `
                      <div class="flex justify-between text-sm bg-white p-2 rounded">
                        <span>${tier.min}-${tier.max} st</span>
                        <span class="text-gray-600">${tier.price} kr/st</span>
                        <span class="text-gray-500">${tier.package}</span>
                      </div>
                    `).join('')}
                  </div>
                </div>
              </div>
            `).join('')}
        </div>

        ${calculationData.selectedAddons.length > 0 ? `
          <div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Tilläggstjänster</h3>
            <div class="bg-gray-50 p-4 rounded-md space-y-2">
              ${calculationData.selectedAddons.map(addon => `
                <div class="flex justify-between">
                  <span>${addon}</span>
                </div>
              `).join('')}
              <div class="pt-2 border-t border-gray-200">
                <div class="flex justify-between">
                  <span class="font-medium">Totalt tillägg</span>
                  <span>${formatPrice(calculationData.addonsCost)}/mån</span>
                </div>
              </div>
            </div>
          </div>
        ` : ''}

        <div class="pt-4 border-t border-gray-200">
          <div class="flex justify-between items-center text-lg font-bold">
            <span>Total månadskostnad</span>
            <span class="text-indigo-600">${formatPrice(calculationData.total)}/mån</span>
          </div>
        </div>
      </div>
    </div>
  `;

  const generateEmailContent = () => {
    const subject = 'Business NXT - Kostnadsberäkning';
    const plainTextContent = generatePlainTextSummary();
    const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(plainTextContent)}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="mt-8 space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => setShowSummary(true)}
          className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
        >
          <FileText className="mr-2 h-5 w-5" />
          Visa sammanställning
        </button>
        <button
          onClick={generateEmailContent}
          className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
        >
          <Mail className="mr-2 h-5 w-5" />
          Skicka via e-post
        </button>
        <button
          onClick={exportToExcel}
          className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 transition-colors"
        >
          <FileSpreadsheet className="mr-2 h-5 w-5" />
          Exportera till Excel
        </button>
        <button
          onClick={exportToGoogleSheets}
          className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 transition-colors"
        >
          <Share2 className="mr-2 h-5 w-5" />
          Öppna i Google Sheets
        </button>
      </div>

      {showSummary && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="relative w-full max-w-4xl">
            <button
              onClick={() => setShowSummary(false)}
              className="absolute -top-2 -right-2 p-1 bg-white rounded-full shadow-lg hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
            <div 
              ref={summaryRef}
              className="bg-white rounded-lg shadow-xl overflow-y-auto max-h-[90vh]"
              dangerouslySetInnerHTML={{ __html: summaryContent }}
            />
          </div>
        </div>
      )}
    </div>
  );
}