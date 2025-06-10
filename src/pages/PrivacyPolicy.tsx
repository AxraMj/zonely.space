
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';

const PrivacyPolicy = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
            <div className="prose prose-lg max-w-none space-y-6">
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
                <p className="text-muted-foreground mb-4">
                  At Zonely.space, we collect minimal information to provide our services:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Usage data for analytics purposes</li>
                  <li>Cookie preferences for site functionality</li>
                  <li>Contact information when you reach out to support</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
                <p className="text-muted-foreground mb-4">
                  We use collected information to:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Improve our time zone and currency conversion services</li>
                  <li>Respond to your support requests</li>
                  <li>Analyze usage patterns to enhance user experience</li>
                  <li>Ensure the security and functionality of our platform</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Data Protection</h2>
                <p className="text-muted-foreground mb-4">
                  We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Third-Party Services</h2>
                <p className="text-muted-foreground mb-4">
                  Our services may integrate with third-party APIs for currency exchange rates and time zone data. These services have their own privacy policies.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                <p className="text-muted-foreground">
                  If you have any questions about this Privacy Policy, please contact us at{' '}
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

export default PrivacyPolicy;
