import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowRight, Store, Heart, MapPin } from "lucide-react";
import heroMarketplace from "@/assets/hero-marketplace.jpg";
import { CATEGORIES } from "@/types/shop";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroMarketplace}
            alt="Local marketplace"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/80" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Discover Amazing
              <span className="text-primary"> Local Shops</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Support your community by exploring unique local businesses,
              artisans, and services near you. Every purchase makes a
              difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/discover">
                <Button variant="hero" size="lg" className="w-full sm:w-auto">
                  Start Exploring
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                List Your Business
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Store className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Discover Local</h3>
              <p className="text-muted-foreground">
                Find unique shops, crafts, and services in your neighborhood
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Support Community</h3>
              <p className="text-muted-foreground">
                Every purchase helps local businesses and families thrive
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy to Find</h3>
              <p className="text-muted-foreground">
                Get directions, contact info, and hours all in one place
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Browse by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {CATEGORIES.filter((cat) => cat !== "All").map((category) => (
              <Link
                key={category}
                to={`/discover?category=${encodeURIComponent(category)}`}
                className="p-6 bg-card border border-border rounded-lg text-center hover:shadow-lg hover:border-primary transition-all duration-300 group"
              >
                <h3 className="font-semibold group-hover:text-primary transition-colors">
                  {category}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Own a Local Business?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join our community and reach more local customers
          </p>
          <Button variant="secondary" size="lg">
            Get Started Today
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
