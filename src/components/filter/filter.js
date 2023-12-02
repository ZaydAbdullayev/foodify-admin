export const UniversalFilter = (data, key, value) => {
  return data.filter((item) => {
    if (Array.isArray(item[key])) {
      return item[key].includes(value);
    }
    if (typeof item[key] === "string") {
      return item[key].toLowerCase().includes(value.toLowerCase());
    }
    return item[key] === value;
  });
};

export const productData = [
  {
    id: 1,
    name: "Ergonomic Office Chair",
    category: "Furniture",
    price: 199.99,
    rating: 4.5,
    colors: ["Black", "Gray", "Blue"],
    manufacturer: "ComfortCo",
  },
  {
    id: 2,
    name: "Wireless Bluetooth Earbuds",
    category: "Electronics",
    price: 59.99,
    rating: 4.2,
    colors: ["White", "Black", "Red"],
    manufacturer: "SoundStream",
  },
  {
    id: 3,
    name: "Organic Matcha Green Tea",
    category: "Food & Beverages",
    price: 24.99,
    rating: 4.8,
    flavors: ["Traditional", "Mint", "Ginger"],
    brand: "ZenLife Organics",
  },
  {
    id: 4,
    name: "Smart Home Security Camera",
    category: "Home & Garden",
    price: 129.99,
    rating: 4.6,
    resolution: "1080p",
    brand: "SecureGuard",
  },
  {
    id: 5,
    name: "Leather Messenger Bag",
    category: "Fashion",
    price: 79.99,
    rating: 4.3,
    colors: ["Brown", "Black", "Tan"],
    brand: "UrbanStyle",
  },
  {
    id: 6,
    name: "Fitness Tracker Watch",
    category: "Sports & Outdoors",
    price: 49.99,
    rating: 4.1,
    features: ["Heart Rate Monitor", "Step Counter", "Sleep Tracker"],
    brand: "ActiveLife",
  },
  {
    id: 7,
    name: "Portable Espresso Maker",
    category: "Appliances",
    price: 89.99,
    rating: 4.7,
    colors: ["Silver", "Black", "Red"],
    brand: "BrewMaster",
  },
  {
    id: 8,
    name: "Digital Drawing Tablet",
    category: "Art & Craft",
    price: 159.99,
    rating: 4.9,
    features: ["Pressure Sensitivity", "Wireless Connectivity"],
    brand: "ArtTech",
  },
  {
    id: 9,
    name: "Memory Foam Mattress",
    category: "Bedroom",
    price: 499.99,
    rating: 4.4,
    sizes: ["Twin", "Full", "Queen", "King"],
    brand: "SleepWell",
  },
  {
    id: 10,
    name: "Vegetarian Cookbook",
    category: "Books",
    price: 29.99,
    rating: 4.0,
    author: "HealthyChef",
  },
];
