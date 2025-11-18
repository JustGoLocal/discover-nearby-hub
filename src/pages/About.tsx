import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Store, Heart, Users, TrendingUp } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 container mx-auto px-4 py-12">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Just Go Local</h1>
          <p className="text-xl text-muted-foreground">
            Our mission is to connect communities with the amazing local businesses that make them unique.
          </p>
        </div>

        {/* Mission Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-card border border-border rounded-lg p-8">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              Just Go Local was created to strengthen local economies by making it easier for people to discover and support businesses in their neighborhoods. We believe that every purchase from a local shop helps build stronger, more vibrant communities.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Whether you're looking for handmade crafts, fresh produce, unique clothing, or professional services, our platform connects you with passionate local entrepreneurs who care about quality and community.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Store className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Support Local</h3>
              <p className="text-muted-foreground">
                Every local business strengthens our community
              </p>
            </div>

            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Community First</h3>
              <p className="text-muted-foreground">
                Building connections between neighbors
              </p>
            </div>

            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Inclusive</h3>
              <p className="text-muted-foreground">
                Celebrating diverse businesses and communities
              </p>
            </div>

            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Growth</h3>
              <p className="text-muted-foreground">
                Helping local businesses thrive and expand
              </p>
            </div>
          </div>
        </div>

        {/* Impact Section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold mb-8">Our Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-4xl font-bold mb-2">500+</div>
                <div className="text-lg opacity-90">Local Businesses</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">10K+</div>
                <div className="text-lg opacity-90">Community Members</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">50+</div>
                <div className="text-lg opacity-90">Cities & Towns</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
