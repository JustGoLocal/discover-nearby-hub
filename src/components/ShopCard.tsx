import { Link } from "react-router-dom";
import { MapPin, Phone } from "lucide-react";
import { Shop } from "@/types/shop";
import { Badge } from "@/components/ui/badge";
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

interface ShopCardProps {
  shop: Shop;
}

export const ShopCard = ({ shop }: ShopCardProps) => {
  return (
    <Link to={`/shop/${shop.id}`} className="group">
      <div className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-all duration-300 h-full">
        <div className="relative overflow-hidden aspect-video">
          <img
            src={imageMap[shop.image] || shopBakeryImg}
            alt={shop.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3">
            <Badge className="bg-primary text-primary-foreground">
              {shop.category}
            </Badge>
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
            {shop.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {shop.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-3">
            {shop.attributes.map((attr) => (
              <Badge key={attr} variant="secondary" className="text-xs">
                {attr}
              </Badge>
            ))}
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span className="truncate">{shop.address}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
