import { useState, useEffect } from 'react';
import { Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { countries } from '@/data/countries';

export const TimeConverter = () => {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [fromOpen, setFromOpen] = useState(false);
  const [toOpen, setToOpen] = useState(false);
  const [fromTime, setFromTime] = useState('');

  // Set current time as default
  useEffect(() => {
    const now = new Date();
    const utcHours = now.getUTCHours().toString().padStart(2, '0');
    const utcMinutes = now.getUTCMinutes().toString().padStart(2, '0');
    setFromTime(`${utcHours}:${utcMinutes}`);
  }, []);

  const getTimeForTimezone = (time: string, timezone: string) => {
    if (!time || !timezone) return '';
    
    const [hours, minutes] = time.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    
    return new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  const getTimeDifference = (fromTz: string, toTz: string) => {
    if (!fromTz || !toTz) return '';
    
    const now = new Date();
    
    // Get offset in minutes for both timezones
    const fromDate = new Date(now.toLocaleString('en-US', { timeZone: fromTz }));
    const toDate = new Date(now.toLocaleString('en-US', { timeZone: toTz }));
    const utcDate = new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }));
    
    const fromOffset = (fromDate.getTime() - utcDate.getTime()) / (1000 * 60 * 60);
    const toOffset = (toDate.getTime() - utcDate.getTime()) / (1000 * 60 * 60);
    
    const diffHours = Math.round(toOffset - fromOffset);
    
    if (diffHours === 0) return 'Same time zone';
    
    const absHours = Math.abs(diffHours);
    const direction = diffHours > 0 ? 'ahead' : 'behind';
    
    return `${absHours} hour${absHours !== 1 ? 's' : ''} ${direction}`;
  };

  const fromCountry = countries.find(c => c.name === fromLocation);
  const toCountry = countries.find(c => c.name === toLocation);

  return (
    <div id="time-converter" className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Time Converter (195+ Countries)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Location Selectors */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="space-y-2">
              <label className="text-sm font-medium">From</label>
              <Popover open={fromOpen} onOpenChange={setFromOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    {fromLocation ? (
                      <div className="flex items-center gap-2">
                        <span>{fromCountry?.flag}</span>
                        {fromLocation}
                      </div>
                    ) : (
                      "Select location"
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0">
                  <Command>
                    <CommandInput placeholder="Search locations..." />
                    <CommandList className="max-h-60">
                      <CommandEmpty>No location found.</CommandEmpty>
                      <CommandGroup>
                        {countries.map(country => (
                          <CommandItem
                            key={country.code}
                            onSelect={() => {
                              setFromLocation(country.name);
                              setFromOpen(false);
                            }}
                          >
                            <div className="flex items-center gap-2">
                              <span>{country.flag}</span>
                              <div>
                                <div className="font-medium">{country.name}</div>
                                <div className="text-xs text-muted-foreground">{country.timezone}</div>
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

            <div className="flex justify-center">
              <ArrowRight className="h-5 w-5 text-muted-foreground" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">To</label>
              <Popover open={toOpen} onOpenChange={setToOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    {toLocation ? (
                      <div className="flex items-center gap-2">
                        <span>{toCountry?.flag}</span>
                        {toLocation}
                      </div>
                    ) : (
                      "Select location"
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0">
                  <Command>
                    <CommandInput placeholder="Search locations..." />
                    <CommandList className="max-h-60">
                      <CommandEmpty>No location found.</CommandEmpty>
                      <CommandGroup>
                        {countries.map(country => (
                          <CommandItem
                            key={country.code}
                            onSelect={() => {
                              setToLocation(country.name);
                              setToOpen(false);
                            }}
                          >
                            <div className="flex items-center gap-2">
                              <span>{country.flag}</span>
                              <div>
                                <div className="font-medium">{country.name}</div>
                                <div className="text-xs text-muted-foreground">{country.timezone}</div>
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

          {/* Time Input */}
          <div className="space-y-2">
            <label htmlFor="time-input" className="text-sm font-medium">Time to convert</label>
            <input
              id="time-input"
              type="time"
              value={fromTime}
              onChange={(e) => setFromTime(e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md bg-background"
            />
          </div>

          {/* Results */}
          {fromLocation && toLocation && fromTime && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
              <div className="text-center">
                <div className="text-lg font-semibold">{fromTime}</div>
                <div className="text-sm text-muted-foreground">{fromLocation}</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold">
                  {getTimeForTimezone(fromTime, toCountry?.timezone || '')}
                </div>
                <div className="text-sm text-muted-foreground">{toLocation}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {getTimeDifference(fromCountry?.timezone || '', toCountry?.timezone || '')}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
