
import { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Show consent banner after a short delay
      const timer = setTimeout(() => {
        setShowConsent(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShowConsent(false);
  };

  const rejectCookies = () => {
    localStorage.setItem('cookie-consent', 'rejected');
    setShowConsent(false);
  };

  if (!showConsent) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 animate-slide-in-right">
      <Card className="max-w-md mx-auto shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Cookie className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1 space-y-3">
              <div className="space-y-1">
                <h4 className="text-sm font-medium">Cookie Consent</h4>
                <p className="text-xs text-muted-foreground">
                  We use essential cookies to ensure our website works properly. 
                  No personal data is collected or shared with third parties.
                </p>
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={acceptCookies}
                  size="sm"
                  className="text-xs"
                >
                  Accept
                </Button>
                <Button 
                  onClick={rejectCookies}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                >
                  Reject
                </Button>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 flex-shrink-0"
              onClick={() => setShowConsent(false)}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
