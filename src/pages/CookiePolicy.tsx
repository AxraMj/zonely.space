import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Helmet } from 'react-helmet-async';

const CookiePolicy = () => {
  return (
    <ThemeProvider>
      <Helmet>
        <title>Cookie Policy - Zonely.space</title>
        <meta name="description" content="Learn about how Zonely.space uses cookies to enhance your experience with time zone conversions, currency rates, and site preferences." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://zonely.space/cookie-policy" />
        <meta property="og:title" content="Cookie Policy - Zonely.space" />
        <meta property="og:description" content="Learn about how Zonely.space uses cookies to enhance your experience with time zone conversions and currency rates." />
        <meta property="og:url" content="https://zonely.space/cookie-policy" />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
            <div className="prose prose-lg max-w-none space-y-6">
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">What Are Cookies</h2>
                <p className="text-muted-foreground mb-4">
                  Cookies are small text files that are stored on your computer or mobile device when you visit a website. They help us provide you with a better experience by remembering your preferences.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">How We Use Cookies</h2>
                <p className="text-muted-foreground mb-4">
                  Zonely.space uses cookies for:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Remembering your time zone preferences</li>
                  <li>Saving your favorite currency pairs</li>
                  <li>Maintaining your theme settings (light/dark mode)</li>
                  <li>Analytics to improve our services</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Types of Cookies We Use</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-medium mb-2">Essential Cookies</h3>
                    <p className="text-muted-foreground">Required for the website to function properly, including user preferences and session management.</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Analytics Cookies</h3>
                    <p className="text-muted-foreground">Help us understand how visitors interact with our website to improve user experience.</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Preference Cookies</h3>
                    <p className="text-muted-foreground">Remember your settings and preferences for future visits.</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Managing Cookies</h2>
                <p className="text-muted-foreground mb-4">
                  You can control cookies through your browser settings. Note that disabling cookies may affect the functionality of Zonely.space.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                <p className="text-muted-foreground">
                  If you have questions about our use of cookies, please contact us at{' '}
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

export default CookiePolicy;
