import { useState } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/ThemeProvider';
import { useNavigate, useLocation } from 'react-router-dom';

export const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (sectionId: string) => {
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
    setIsMenuOpen(false);
  };

  const handleLogoClick = () => {
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLogoClick}
              className="flex items-center space-x-2 text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
            >
              <img src="/favicon-32x32.png" alt="Zonely.space Logo" className="w-8 h-8" />
              <span>Zonely.space</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => handleNavigation('time-converter')}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Time Converter
            </button>
            <button 
              onClick={() => handleNavigation('world-clock')}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              World Clock
            </button>
            <button 
              onClick={() => handleNavigation('currency')}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Currency
            </button>
            <button 
              onClick={() => handleNavigation('meeting')}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Meeting Planner
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-9 w-9"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t animate-slide-in-right">
            <div className="flex flex-col space-y-2">
              <button 
                onClick={() => handleNavigation('time-converter')}
                className="px-4 py-2 text-sm font-medium hover:bg-accent rounded-md transition-colors text-left"
              >
                Time Converter
              </button>
              <button 
                onClick={() => handleNavigation('world-clock')}
                className="px-4 py-2 text-sm font-medium hover:bg-accent rounded-md transition-colors text-left"
              >
                World Clock
              </button>
              <button 
                onClick={() => handleNavigation('currency')}
                className="px-4 py-2 text-sm font-medium hover:bg-accent rounded-md transition-colors text-left"
              >
                Currency
              </button>
              <button 
                onClick={() => handleNavigation('meeting')}
                className="px-4 py-2 text-sm font-medium hover:bg-accent rounded-md transition-colors text-left"
              >
                Meeting Planner
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
