import { useState, useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ShopCard } from "@/components/ShopCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, SlidersHorizontal } from "lucide-react";
import { mockShops } from "@/data/mockShops";
import { CATEGORIES, ATTRIBUTES } from "@/types/shop";

const Discover = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedAttributes, setSelectedAttributes] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const filteredShops = useMemo(() => {
    return mockShops.filter((shop) => {
      const matchesSearch =
        shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shop.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || shop.category === selectedCategory;

      const matchesAttributes =
        selectedAttributes.length === 0 ||
        selectedAttributes.every((attr) => shop.attributes.includes(attr));

      return matchesSearch && matchesCategory && matchesAttributes;
    });
  }, [searchQuery, selectedCategory, selectedAttributes]);

  const toggleAttribute = (attribute: string) => {
    setSelectedAttributes((prev) =>
      prev.includes(attribute)
        ? prev.filter((a) => a !== attribute)
        : [...prev, attribute]
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Discover Local Shops</h1>
          <p className="text-muted-foreground">
            Browse {mockShops.length} amazing local businesses in your area
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search shops..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden"
            >
              <SlidersHorizontal className="w-5 h-5" />
            </Button>
          </div>

          {/* Category Filters */}
          <div className={showFilters ? "block" : "hidden md:block"}>
            <div className="mb-4">
              <h3 className="text-sm font-semibold mb-3">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((category) => (
                  <Badge
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Attribute Filters */}
            <div>
              <h3 className="text-sm font-semibold mb-3">Attributes</h3>
              <div className="flex flex-wrap gap-2">
                {ATTRIBUTES.map((attribute) => (
                  <Badge
                    key={attribute}
                    variant={selectedAttributes.includes(attribute) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleAttribute(attribute)}
                  >
                    {attribute}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {(selectedCategory !== "All" || selectedAttributes.length > 0) && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {selectedCategory !== "All" && (
                <Badge variant="secondary">
                  {selectedCategory}
                  <button
                    onClick={() => setSelectedCategory("All")}
                    className="ml-1 hover:text-destructive"
                  >
                    ×
                  </button>
                </Badge>
              )}
              {selectedAttributes.map((attr) => (
                <Badge key={attr} variant="secondary">
                  {attr}
                  <button
                    onClick={() => toggleAttribute(attr)}
                    className="ml-1 hover:text-destructive"
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-muted-foreground">
            Showing {filteredShops.length} {filteredShops.length === 1 ? "shop" : "shops"}
          </p>
        </div>

        {/* Shop Grid */}
        {filteredShops.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredShops.map((shop) => (
              <ShopCard key={shop.id} shop={shop} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground mb-4">
              No shops found matching your criteria
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
                setSelectedAttributes([]);
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Discover;
