
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';

const TermsOfService = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
            <div className="prose prose-lg max-w-none space-y-6">
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">Acceptance of Terms</h2>
                <p className="text-muted-foreground mb-4">
                  By accessing and using Zonely.space, you accept and agree to be bound by the terms and provision of this agreement.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Use License</h2>
                <p className="text-muted-foreground mb-4">
                  Permission is granted to temporarily access Zonely.space for personal, non-commercial transitory viewing only. This includes:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Using our world clock and time zone conversion tools</li>
                  <li>Accessing currency conversion services</li>
                  <li>Utilizing our meeting planning features</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Service Availability</h2>
                <p className="text-muted-foreground mb-4">
                  We strive to maintain high availability of our services, but we cannot guarantee uninterrupted access. Currency rates and time zone data are provided as-is and may have delays.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Disclaimer</h2>
                <p className="text-muted-foreground mb-4">
                  The information on Zonely.space is provided on an 'as is' basis. We make no warranties regarding the accuracy of currency rates or time zone information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Limitations</h2>
                <p className="text-muted-foreground mb-4">
                  In no event shall Zonely.space be liable for any damages arising out of the use or inability to use our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
                <p className="text-muted-foreground">
                  Questions about the Terms of Service should be sent to us at{' '}
                  <a href="mailto:support@zonely.space" className="text-primary hover:underline">
                    support@zonely.space
                  </a>
                </p>
              </section>

              <p className="text-sm text-muted-foreground mt-8">
                Last updated: June 2025
              </p>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default TermsOfService;
