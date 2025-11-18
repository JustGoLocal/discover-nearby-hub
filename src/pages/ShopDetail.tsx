import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Phone, Clock, Navigation } from "lucide-react";
import { mockShops } from "@/data/mockShops";
import shopBakeryImg from "@/assets/shop-bakery.jpg";
import shopCraftsImg from "@/assets/shop-crafts.jpg";
import shopClothingImg from "@/assets/shop-clothing.jpg";
import shopGroceryImg from "@/assets/shop-grocery.jpg";

const imageMap: Record<string, string> = {
  bakery: shopBakeryImg,
  crafts: shopCraftsImg,
  clothing: shopClothingImg,
  grocery: shopGroceryImg,
};

const ShopDetail = () => {
  const { id } = useParams();
  const shop = mockShops.find((s) => s.id === id);

  if (!shop) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Shop not found</h1>
            <Link to="/discover">
              <Button variant="outline">Back to Discover</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${shop.location.lat},${shop.location.lng}`;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1">
        {/* Hero Image */}
        <div className="relative h-96 overflow-hidden">
          <img
            src={imageMap[shop.image] || shopBakeryImg}
            alt={shop.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        </div>

        <div className="container mx-auto px-4 -mt-32 relative z-10">
          {/* Back Button */}
          <Link to="/discover">
            <Button variant="ghost" className="mb-4 bg-background/80 backdrop-blur">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Discover
            </Button>
          </Link>

          {/* Content Card */}
          <div className="bg-card rounded-lg border border-border p-8 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Info */}
              <div className="lg:col-span-2">
                <div className="mb-4">
                  <Badge className="mb-2">{shop.category}</Badge>
                  <h1 className="text-4xl font-bold mb-4">{shop.name}</h1>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {shop.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                  {shop.attributes.map((attr) => (
                    <Badge key={attr} variant="secondary">
                      {attr}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Contact Info Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-secondary rounded-lg p-6 space-y-6 sticky top-24">
                  <div>
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-primary" />
                      Location
                    </h3>
                    <p className="text-muted-foreground mb-3">{shop.address}</p>
                    <a
                      href={googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" className="w-full">
                        <Navigation className="w-4 h-4 mr-2" />
                        Get Directions
                      </Button>
                    </a>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Phone className="w-5 h-5 text-primary" />
                      Contact
                    </h3>
                    <a
                      href={`tel:${shop.phone}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {shop.phone}
                    </a>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary" />
                      Hours
                    </h3>
                    <p className="text-muted-foreground">{shop.hours}</p>
                  </div>

                  <Button variant="default" className="w-full">
                    Contact Shop
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ShopDetail;
