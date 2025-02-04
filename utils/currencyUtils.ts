export interface CurrencyRates {
    USD: number;
    EUR: number;
  }
  
  export async function fetchCurrencyRates(date: string): Promise<CurrencyRates> {
    try {
      const response = await fetch(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json`);
      const data = await response.json();
  
      const usdRate = data.find((item: any) => item.cc === "USD")?.rate ?? 0;
      const eurRate = data.find((item: any) => item.cc === "EUR")?.rate ?? 0;
  
      return { USD: usdRate, EUR: eurRate };
    } catch (error) {
      console.error("Error fetching currency rates:", error);
      return { USD: 0, EUR: 0 };
    }
  }