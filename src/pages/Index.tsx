
import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { WorldClock } from '@/components/WorldClock';
import { TimeConverter } from '@/components/TimeConverter';
import { CurrencyConverter } from '@/components/CurrencyConverter';
import { MeetingPlanner } from '@/components/MeetingPlanner';
import { Footer } from '@/components/Footer';
import { CookieConsent } from '@/components/CookieConsent';
import { ThemeProvider } from '@/components/ThemeProvider';

const Index = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <section className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Zonely.space: Your Time & Currency Tool
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Convert time, currency, and view world clocks by continent. Perfect for travelers and businesses - easily convert time between cities and check currency rates in one place.
            </p>
          </section>

          {/* World Clock Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">🌍 World Clock</h2>
            <p className="text-lg text-muted-foreground mb-6 text-center max-w-2xl mx-auto">
              View current time across multiple time zones with beautiful analog and digital displays
            </p>
            <WorldClock />
          </section>

          {/* Currency Converter Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">💱 Currency Converter</h2>
            <p className="text-lg text-muted-foreground mb-6 text-center max-w-2xl mx-auto">
              Get real-time exchange rates and convert currencies for over 150 countries
            </p>
            <CurrencyConverter />
          </section>

          {/* Time Converter Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">⏰ Time Conversion</h2>
            <p className="text-lg text-muted-foreground mb-6 text-center max-w-2xl mx-auto">
              Compare times between any two locations instantly along with their time difference
            </p>
            <TimeConverter />
          </section>

          {/* Meeting Planner Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">🗓️ Meeting Planner</h2>
            <p className="text-lg text-muted-foreground mb-6 text-center max-w-2xl mx-auto">
              Find the best meeting times across different time zones for global teams
            </p>
            <MeetingPlanner />
          </section>
        </main>

        <Footer />
        <CookieConsent />
      </div>
    </ThemeProvider>
  );
};

export default Index;
