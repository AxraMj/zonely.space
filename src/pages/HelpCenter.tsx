import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';

const HelpCenter = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Help Center</h1>
            <div className="space-y-8">
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
                
                <div className="space-y-6">
                  <div className="border rounded-lg p-6">
                    <h3 className="text-xl font-medium mb-2">How accurate are the time zones?</h3>
                    <p className="text-muted-foreground">
                      Our time zone data is updated regularly and includes daylight saving time adjustments. We source data from official time zone databases to ensure accuracy.
                    </p>
                  </div>

                  <div className="border rounded-lg p-6">
                    <h3 className="text-xl font-medium mb-2">How often are currency rates updated?</h3>
                    <p className="text-muted-foreground">
                      Currency exchange rates are updated multiple times daily. However, rates shown are for informational purposes and may vary from actual trading rates.
                    </p>
                  </div>

                  <div className="border rounded-lg p-6">
                    <h3 className="text-xl font-medium mb-2">Can I add custom locations to the world clock?</h3>
                    <p className="text-muted-foreground">
                      Yes! You can search and add any city from our database of 195+ countries and territories to your world clock.
                    </p>
                  </div>

                  <div className="border rounded-lg p-6">
                    <h3 className="text-xl font-medium mb-2">How do I plan meetings across time zones?</h3>
                    <p className="text-muted-foreground">
                      Use our Meeting Planner tool to select participants from different time zones. It will show you the optimal meeting times that work for everyone.
                    </p>
                  </div>

                  <div className="border rounded-lg p-6">
                    <h3 className="text-xl font-medium mb-2">Is Zonely.space free to use?</h3>
                    <p className="text-muted-foreground">
                      Yes! All our tools including world clock, currency converter, and meeting planner are completely free to use.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="border rounded-lg p-6">
                    <h3 className="text-lg font-medium mb-2">🌍 World Clock</h3>
                    <p className="text-muted-foreground text-sm">
                      Add cities from around the world to see current times at a glance.
                    </p>
                  </div>
                  <div className="border rounded-lg p-6">
                    <h3 className="text-lg font-medium mb-2">💱 Currency Converter</h3>
                    <p className="text-muted-foreground text-sm">
                      Convert between 150+ currencies with real-time exchange rates.
                    </p>
                  </div>
                  <div className="border rounded-lg p-6">
                    <h3 className="text-lg font-medium mb-2">🗓️ Meeting Planner</h3>
                    <p className="text-muted-foreground text-sm">
                      Find the best meeting times for participants across different time zones.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default HelpCenter;
