export interface Shop {
  id: string;
  name: string;
  description: string;
  category: string;
  attributes: string[];
  image: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  phone: string;
  hours: string;
}

export const CATEGORIES = [
  "All",
  "Food & Groceries",
  "Handmade & Crafts",
  "Clothing & Apparel",
  "Health & Beauty",
  "Local Services",
];

export const ATTRIBUTES = [
  "Women-Owned",
  "Eco-Friendly",
  "Handmade",
  "Subscription Available",
  "Premium Partner",
];
