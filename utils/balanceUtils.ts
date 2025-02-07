import { Source } from '@/components/types'; 
import {CurrencyRates} from './currencyUtils'; 

export function calculateSourceTotals(sources: Source[], rates: CurrencyRates) {
  let totalUSD = 0;
  let totalEUR = 0;
  let totalUAH = 0;

  sources.forEach(source => {
    const usd = parseFloat(source.USD.toString().replace(/\s/g, '').replace(',', '.')) || 0;
    const eur = parseFloat(source.EUR.toString().replace(/\s/g, '').replace(',', '.')) || 0;
    const uah = parseFloat(source.UAH.toString().replace(/\s/g, '').replace(',', '.')) || 0;

    totalUSD += usd;
    totalEUR += eur;
    totalUAH += uah;
  });

  // 🔹 Фіксуємо значення перед конвертацією
  const initialUSD = totalUSD;
  const initialEUR = totalEUR;
  const initialUAH = totalUAH;

  // 🔹 Конвертація всіх валют у гривню
  const convertedUSD = initialUSD * rates.USD;
  const convertedEUR = initialEUR * rates.EUR;
  const totalUAHFinal = initialUAH + convertedUSD + convertedEUR;

  // 🔹 Конвертація всіх валют у долари
  const convertedUAHtoUSD = initialUAH / rates.USD;
  const convertedEURtoUSD = initialEUR * (rates.EUR / rates.USD);
  const totalUSDFinal = initialUSD + convertedUAHtoUSD + convertedEURtoUSD;

  // 🔹 Конвертація всіх валют у євро
  const convertedUAHtoEUR = initialUAH / rates.EUR;
  const convertedUSDtoEUR = initialUSD * (rates.USD / rates.EUR);
  const totalEURFinal = initialEUR + convertedUAHtoEUR + convertedUSDtoEUR;

  return { totalUSD: totalUSDFinal, totalEUR: totalEURFinal, totalUAH: totalUAHFinal };
}
