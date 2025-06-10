import { Heart } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleEmailClick = () => {
    window.location.href = 'mailto:support@zonely.space';
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handleToolNavigation = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Zonely.space
            </h3>
            <p className="text-sm text-muted-foreground">
              Your all-in-one platform for world time zones, currency conversion, and meeting planning.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium">Tools</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <button 
                  onClick={() => handleToolNavigation('time-converter')}
                  className="hover:text-foreground transition-colors text-left"
                >
                  Time Converter
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleToolNavigation('world-clock')}
                  className="hover:text-foreground transition-colors text-left"
                >
                  World Clock
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleToolNavigation('currency')}
                  className="hover:text-foreground transition-colors text-left"
                >
                  Currency Converter
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleToolNavigation('meeting')}
                  className="hover:text-foreground transition-colors text-left"
                >
                  Meeting Planner
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <button 
                  onClick={() => handleNavigate('/privacy-policy')}
                  className="hover:text-foreground transition-colors text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigate('/terms-of-service')}
                  className="hover:text-foreground transition-colors text-left"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigate('/cookie-policy')}
                  className="hover:text-foreground transition-colors text-left"
                >
                  Cookie Policy
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <button 
                  onClick={handleEmailClick}
                  className="hover:text-foreground transition-colors text-left"
                >
                  Contact Us (support@zonely.space)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigate('/help-center')}
                  className="hover:text-foreground transition-colors text-left"
                >
                  Help Center
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            © 2025 Zonely.space. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a
              href="https://www.linkedin.com/company/zonely.space/"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-2 rounded-lg transition-all duration-200 hover:bg-[#0A66C2]/10"
              aria-label="Visit Zonely.space on LinkedIn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-6 w-6 fill-muted-foreground group-hover:fill-[#0A66C2] transition-colors duration-200"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
              </svg>
            </a>
            <a
              href="https://t.me/zonelyspacebot"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-2 rounded-lg transition-all duration-200 hover:bg-[#229ED9]/10"
              aria-label="Connect with Zonely.space on Telegram"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-6 w-6 fill-muted-foreground group-hover:fill-[#229ED9] transition-colors duration-200"
              >
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
            </a>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            Made with <Heart className="h-4 w-4 text-red-500" /> for global productivity
          </div>
        </div>
      </div>
    </footer>
  );
};
