import { Navbar } from '@/components/landing/Navbar';
import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { Footer } from '@/components/landing/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <section id="how-it-works">
          <HowItWorks />
        </section>
        <section id="about" className="py-24 bg-card">
          <div className="container px-4 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6">
              Rooted in <span className="text-gradient">Tradition</span>,
              <br />Powered by <span className="text-gradient">AI</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            AyurKin bridges 5,000 years of Ayurvedic wisdom with cutting-edge artificial intelligence 
              to deliver personalized health guidance that respects Indian culture and local food habits.
            </p>
            <div className="grid sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="p-6 rounded-2xl bg-background border border-border">
                <div className="text-4xl mb-3">🌿</div>
                <h3 className="font-display font-semibold mb-2">Ayurvedic Wisdom</h3>
                <p className="text-sm text-muted-foreground">Grounded in classical Ayurvedic principles</p>
              </div>
              <div className="p-6 rounded-2xl bg-background border border-border">
                <div className="text-4xl mb-3">🤖</div>
                <h3 className="font-display font-semibold mb-2">AI Intelligence</h3>
                <p className="text-sm text-muted-foreground">OCR, NLU, and predictive analytics</p>
              </div>
              <div className="p-6 rounded-2xl bg-background border border-border">
                <div className="text-4xl mb-3">🇮🇳</div>
                <h3 className="font-display font-semibold mb-2">Made for India</h3>
                <p className="text-sm text-muted-foreground">Local cuisines, Indic languages support</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
