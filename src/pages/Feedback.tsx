
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

const Feedback = () => {
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = 'Feedback from Zonely.space';
    const body = `Email: ${email}\n\nFeedback:\n${feedback}`;
    window.location.href = `mailto:support@zonely.space?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Feedback</h1>
            
            <div className="space-y-6">
              <p className="text-muted-foreground text-lg">
                We'd love to hear from you! Your feedback helps us improve Zonely.space and provide better tools for time zone conversion, currency exchange, and meeting planning.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="email">Email (optional)</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="feedback">Your Feedback *</Label>
                  <Textarea
                    id="feedback"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Tell us what you think about Zonely.space. What features do you love? What could we improve? Any bugs you've encountered?"
                    className="mt-2 min-h-32"
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={!feedback.trim()}>
                  Send Feedback
                </Button>
              </form>

              <div className="border-t pt-6">
                <h2 className="text-xl font-semibold mb-4">Other Ways to Reach Us</h2>
                <div className="space-y-2 text-muted-foreground">
                  <p>📧 Email: <a href="mailto:support@zonely.space" className="text-primary hover:underline">support@zonely.space</a></p>
                  <p>🕐 Response time: Usually within 24 hours</p>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Feedback;
