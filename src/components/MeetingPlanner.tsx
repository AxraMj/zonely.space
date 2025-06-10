
import { useState } from 'react';
import { Users, Clock, Plus, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { countries } from '@/data/countries';

interface Participant {
  id: string;
  city: string;
  timezone: string;
}

export const MeetingPlanner = () => {
  const [participants, setParticipants] = useState<Participant[]>([
    { id: '1', city: 'United States', timezone: 'America/New_York' },
    { id: '2', city: 'United Kingdom', timezone: 'Europe/London' },
  ]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const addParticipant = () => {
    if (!selectedCountry) return;
    
    const country = countries.find(c => c.name === selectedCountry);
    if (!country) return;

    const newParticipant: Participant = {
      id: Date.now().toString(),
      city: country.name,
      timezone: country.timezone,
    };
    
    setParticipants([...participants, newParticipant]);
    setSelectedCountry('');
  };

  const removeParticipant = (id: string) => {
    setParticipants(participants.filter(p => p.id !== id));
  };

  const getTimeForTimezone = (hour: number, timezone: string) => {
    const date = new Date();
    date.setHours(hour, 0, 0, 0);
    
    return new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      hour: '2-digit',
      hour12: true
    }).format(date);
  };

  const isWorkingHour = (hour: number, timezone: string) => {
    const date = new Date();
    date.setHours(hour, 0, 0, 0);
    
    const localHour = new Date(date.toLocaleString('en-US', { timeZone: timezone })).getHours();
    return localHour >= 9 && localHour <= 17;
  };

  const getBestMeetingTimes = () => {
    const bestTimes = [];
    
    for (let hour = 0; hour < 24; hour++) {
      const workingCount = participants.filter(p => isWorkingHour(hour, p.timezone)).length;
      if (workingCount === participants.length) {
        bestTimes.push(hour);
      }
    }
    
    return bestTimes;
  };

  const availableCountries = countries.filter(country => 
    !participants.some(p => p.city === country.name)
  );

  const filteredCountries = availableCountries.filter(country =>
    country.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const bestTimes = getBestMeetingTimes();

  return (
    <div id="meeting" className="max-w-4xl mx-auto space-y-6">
      {/* Add Participants */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Meeting Participants (195+ Countries)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex-1 justify-start">
                  {selectedCountry || "Select a country"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0">
                <Command>
                  <div className="flex items-center border-b px-3">
                    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                    <input
                      placeholder="Search countries..."
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
                    />
                  </div>
                  <CommandList className="max-h-60">
                    <CommandEmpty>No country found.</CommandEmpty>
                    <CommandGroup>
                      {filteredCountries.slice(0, 20).map(country => (
                        <CommandItem
                          key={country.code}
                          onSelect={() => {
                            setSelectedCountry(country.name);
                            setOpen(false);
                            setSearchValue('');
                          }}
                        >
                          <div className="flex items-center gap-2 w-full">
                            <span className="text-lg">{country.flag}</span>
                            <div className="flex-1">
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
            <Button onClick={addParticipant} disabled={!selectedCountry}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {participants.map(participant => {
              const country = countries.find(c => c.name === participant.city);
              return (
                <Badge key={participant.id} variant="secondary" className="flex items-center gap-2">
                  {country?.flag} {participant.city}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
                    onClick={() => removeParticipant(participant.id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Time Grid */}
      {participants.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Time Comparison
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="text-left p-2">Time (UTC)</th>
                    {participants.map(participant => {
                      const country = countries.find(c => c.name === participant.city);
                      return (
                        <th key={participant.id} className="text-center p-2 min-w-[120px]">
                          <div className="flex items-center justify-center gap-1">
                            {country?.flag} {participant.city}
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 24 }, (_, hour) => (
                    <tr key={hour} className="border-t">
                      <td className="p-2 font-mono">
                        {hour.toString().padStart(2, '0')}:00
                      </td>
                      {participants.map(participant => {
                        const isWorking = isWorkingHour(hour, participant.timezone);
                        return (
                          <td key={participant.id} className="p-2 text-center">
                            <div className={`p-1 rounded text-xs ${
                              isWorking 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' 
                                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
                            }`}>
                              {getTimeForTimezone(hour, participant.timezone)}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Best Meeting Times */}
      {participants.length > 1 && (
        <Card>
          <CardHeader>
            <CardTitle>🎯 Best Meeting Times</CardTitle>
          </CardHeader>
          <CardContent>
            {bestTimes.length > 0 ? (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Times when all participants are in their working hours (9 AM - 5 PM):
                </p>
                <div className="flex flex-wrap gap-2">
                  {bestTimes.map(hour => (
                    <Badge key={hour} variant="default">
                      {hour.toString().padStart(2, '0')}:00 UTC
                    </Badge>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">
                No overlapping working hours found. Consider scheduling outside normal business hours or using asynchronous communication.
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
