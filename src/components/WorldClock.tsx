
import { useState, useEffect } from 'react';
import { Plus, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { AnalogClock } from '@/components/AnalogClock';
import { countries } from '@/data/countries';

interface TimeZone {
  id: string;
  name: string;
  timezone: string;
  flag: string;
  time: Date;
}

export const WorldClock = () => {
  const [timeZones, setTimeZones] = useState<TimeZone[]>([
    { id: '1', name: 'New York', timezone: 'America/New_York', flag: '🇺🇸', time: new Date() },
    { id: '2', name: 'London', timezone: 'Europe/London', flag: '🇬🇧', time: new Date() },
    { id: '3', name: 'Tokyo', timezone: 'Asia/Tokyo', flag: '🇯🇵', time: new Date() },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const updateTimes = () => {
      setTimeZones(zones => 
        zones.map(zone => ({
          ...zone,
          time: new Date()
        }))
      );
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  const addTimeZone = (country: typeof countries[0]) => {
    const newTimeZone: TimeZone = {
      id: Date.now().toString(),
      name: country.name,
      timezone: country.timezone,
      flag: country.flag,
      time: new Date()
    };
    setTimeZones([...timeZones, newTimeZone]);
    setSearchTerm('');
    setShowSearch(false);
  };

  const removeTimeZone = (id: string) => {
    setTimeZones(timeZones.filter(zone => zone.id !== id));
  };

  const formatTime = (date: Date, timezone: string) => {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    }).format(date);
  };

  const formatDate = (date: Date, timezone: string) => {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      weekday: 'long',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !timeZones.some(zone => zone.timezone === country.timezone)
  ).slice(0, 8);

  return (
    <div id="world-clock" className="space-y-6">
      {/* Add New City */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add Country/City
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for any country or city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setShowSearch(true)}
                className="pl-10"
              />
            </div>
            
            {(showSearch || searchTerm) && (
              <div className="border rounded-lg max-h-60 overflow-y-auto">
                <Command>
                  <CommandList>
                    <CommandEmpty>No countries found.</CommandEmpty>
                    <CommandGroup>
                      {filteredCountries.map(country => (
                        <CommandItem
                          key={country.code}
                          onSelect={() => addTimeZone(country)}
                          className="cursor-pointer"
                        >
                          <div className="flex items-center gap-3 w-full">
                            <span className="text-xl">{country.flag}</span>
                            <div className="flex-1">
                              <div className="font-medium">{country.name}</div>
                              <div className="text-sm text-muted-foreground">{country.timezone.replace('_', ' ')}</div>
                            </div>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Time Zone Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {timeZones.map(zone => (
          <Card key={zone.id} className="relative group hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="text-xl">{zone.flag}</span>
                  {zone.name}
                </CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeTimeZone(zone.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center space-y-4">
                {/* Analog Clock */}
                <AnalogClock timezone={zone.timezone} size={140} />
                
                {/* Digital Time */}
                <div className="text-center space-y-2">
                  <div className="text-2xl font-mono font-bold">
                    {formatTime(zone.time, zone.timezone)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {formatDate(zone.time, zone.timezone)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {zone.timezone.replace('_', ' ')}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
