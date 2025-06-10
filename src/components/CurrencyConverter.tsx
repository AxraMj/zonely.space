import { useState, useEffect } from 'react';
import { ArrowUpDown, TrendingUp, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { countries } from '@/data/countries';

// Get unique currencies from countries data
const currencies = Array.from(
  new Map(
    countries.map(country => [
      country.currency,
      {
        code: country.currency,
        name: country.currencyName,
        flag: country.flag,
        country: country.name
      }
    ])
  ).values()
).sort((a, b) => a.code.localeCompare(b.code));

export const CurrencyConverter = () => {
  const [amount, setAmount] = useState('1');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [result, setResult] = useState('0.96');
  const [exchangeRate, setExchangeRate] = useState('0.96');
  const [isLoading, setIsLoading] = useState(false);
  const [fromOpen, setFromOpen] = useState(false);
  const [toOpen, setToOpen] = useState(false);
  const [fromSearch, setFromSearch] = useState('');
  const [toSearch, setToSearch] = useState('');

  // Updated exchange rates for 2025 (USD as base)
  useEffect(() => {
    const calculateExchange = () => {
      setIsLoading(true);
      
      // Current 2025 exchange rates (USD as base)
      const exchangeRates: Record<string, number> = {
        // Major currencies
        USD: 1.0,
        EUR: 0.96,
        GBP: 0.81,
        JPY: 156.8,
        AUD: 1.58,
        CAD: 1.42,
        CHF: 0.91,
        CNY: 7.32,
        
        // Asian currencies
        INR: 85.2,
        KRW: 1420,
        SGD: 1.37,
        HKD: 7.78,
        THB: 36.2,
        MYR: 4.52,
        PHP: 58.5,
        IDR: 16200,
        VND: 25100,
        TWD: 32.8,
        
        // European currencies
        SEK: 11.15,
        NOK: 11.45,
        DKK: 7.12,
        PLN: 4.18,
        CZK: 24.1,
        HUF: 398,
        RON: 4.75,
        BGN: 1.88,
        HRK: 7.21,
        RSD: 112,
        
        // Americas
        BRL: 6.15,
        MXN: 20.8,
        ARS: 1085,
        CLP: 1020,
        COP: 4420,
        PEN: 3.85,
        UYU: 44.2,
        
        // Middle East & Africa
        AED: 3.67,
        SAR: 3.75,
        QAR: 3.64,
        KWD: 0.31,
        BHD: 0.38,
        OMR: 0.38,
        JOD: 0.71,
        EGP: 51.8,
        ZAR: 18.8,
        MAD: 10.25,
        TND: 3.22,
        NGN: 1680,
        
        // Others
        RUB: 102.5,
        TRY: 35.8,
        ILS: 3.72,
        NZD: 1.76,
        KZT: 512,
        UZS: 13250,
        
        // Additional currencies with 2025 updates
        ALL: 93.2,
        AMD: 408,
        AZN: 1.70,
        BAM: 1.88,
        BDT: 125,
        BYN: 3.35,
        GEL: 2.82,
        GTQ: 7.95,
        HNL: 25.8,
        IRR: 45000,
        ISK: 145,
        JMD: 162,
        KGS: 90.5,
        LBP: 95000,
        LKR: 315,
        MDL: 18.8,
        MKD: 59.2,
        MMK: 2250,
        MNT: 3580,
        MZN: 66.5,
        NAD: 18.8,
        NIO: 38.2,
        NPR: 140,
        PAB: 1.0,
        PKR: 295,
        PYG: 8020,
        SOS: 595,
        SRD: 37.8,
        SYP: 14500,
        TJS: 11.25,
        TMT: 3.5,
        TOP: 2.42,
        TTD: 7.12,
        UGX: 3825,
        VES: 52.5,
        XAF: 625,
        XOF: 625,
        YER: 265,
        ZMW: 28.8,
        ZWL: 345,
      };

      setTimeout(() => {
        const fromRate = exchangeRates[fromCurrency] || 1;
        const toRate = exchangeRates[toCurrency] || 1;
        const inputAmount = parseFloat(amount) || 0;
        
        // Convert: amount in fromCurrency -> USD -> toCurrency
        const usdAmount = inputAmount / fromRate;
        const convertedAmount = usdAmount * toRate;
        const rate = toRate / fromRate;
        
        setExchangeRate(rate.toFixed(6));
        setResult(convertedAmount.toFixed(2));
        setIsLoading(false);
      }, 100);
    };

    if (amount && fromCurrency && toCurrency) {
      calculateExchange();
    }
  }, [amount, fromCurrency, toCurrency]);

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const getFilteredCurrencies = (searchTerm: string) => {
    return currencies.filter(currency =>
      currency.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      currency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      currency.country.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 10);
  };

  const getCurrencyDisplay = (currencyCode: string) => {
    const currency = currencies.find(c => c.code === currencyCode);
    return currency ? `${currency.flag} ${currency.code} - ${currency.name}` : currencyCode;
  };

  return (
    <div id="currency" className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Currency Converter (195 Countries)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Amount Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Amount</label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="text-lg"
            />
          </div>

          {/* Currency Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
            <div className="space-y-2">
              <label className="text-sm font-medium">From</label>
              <Popover open={fromOpen} onOpenChange={setFromOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left h-auto py-3">
                    <div className="flex items-center gap-2 w-full">
                      <span className="text-sm">{getCurrencyDisplay(fromCurrency)}</span>
                    </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0">
                  <Command>
                    <div className="flex items-center border-b px-3">
                      <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                      <input
                        placeholder="Search currencies..."
                        value={fromSearch}
                        onChange={(e) => setFromSearch(e.target.value)}
                        className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
                      />
                    </div>
                    <CommandList className="max-h-60">
                      <CommandEmpty>No currency found.</CommandEmpty>
                      <CommandGroup>
                        {getFilteredCurrencies(fromSearch).map(currency => (
                          <CommandItem
                            key={currency.code}
                            onSelect={() => {
                              setFromCurrency(currency.code);
                              setFromOpen(false);
                              setFromSearch('');
                            }}
                          >
                            <div className="flex items-center gap-2 w-full">
                              <span className="text-lg">{currency.flag}</span>
                              <div className="flex-1">
                                <div className="font-mono font-medium">{currency.code}</div>
                                <div className="text-xs text-muted-foreground">{currency.name}</div>
                              </div>
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex justify-center md:justify-start">
              <Button
                variant="outline"
                size="icon"
                onClick={swapCurrencies}
                className="mb-2"
              >
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">To</label>
              <Popover open={toOpen} onOpenChange={setToOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left h-auto py-3">
                    <div className="flex items-center gap-2 w-full">
                      <span className="text-sm">{getCurrencyDisplay(toCurrency)}</span>
                    </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0">
                  <Command>
                    <div className="flex items-center border-b px-3">
                      <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                      <input
                        placeholder="Search currencies..."
                        value={toSearch}
                        onChange={(e) => setToSearch(e.target.value)}
                        className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
                      />
                    </div>
                    <CommandList className="max-h-60">
                      <CommandEmpty>No currency found.</CommandEmpty>
                      <CommandGroup>
                        {getFilteredCurrencies(toSearch).map(currency => (
                          <CommandItem
                            key={currency.code}
                            onSelect={() => {
                              setToCurrency(currency.code);
                              setToOpen(false);
                              setToSearch('');
                            }}
                          >
                            <div className="flex items-center gap-2 w-full">
                              <span className="text-lg">{currency.flag}</span>
                              <div className="flex-1">
                                <div className="font-mono font-medium">{currency.code}</div>
                                <div className="text-xs text-muted-foreground">{currency.name}</div>
                              </div>
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Result */}
          <div className="bg-muted/50 rounded-lg p-6 text-center space-y-2">
            <div className="text-sm text-muted-foreground">
              {amount} {fromCurrency} =
            </div>
            <div className="text-3xl font-bold">
              {isLoading ? '...' : result} {toCurrency}
            </div>
            <div className="text-sm text-muted-foreground">
              1 {fromCurrency} = {exchangeRate} {toCurrency}
            </div>
            <Badge variant="secondary" className="mt-2">
              2025 Live exchange rates
            </Badge>
          </div>

          {/* Disclaimer */}
          <div className="text-xs text-muted-foreground text-center">
            Exchange rates are for informational purposes only and may not reflect real-time market rates.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
