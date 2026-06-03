export interface WardrobeItem {
  id: string;
  name: string;
  category: string;
  color: string;
  colorHex: string;
  brand: string;
  store: string;
  price: string;
  priceNum: number;
  wearCount: number;
  isFavorite: boolean;
  season: string;
  material?: string;
  size?: string;
  imageUrl: string;
}

const brands = [
  { name: "H&M", store: "H&M" },
  { name: "Zara", store: "Zara" },
  { name: "Nike", store: "Nike" },
  { name: "Adidas", store: "Adidas" },
  { name: "Levi's", store: "Levi's" },
  { name: "Uniqlo", store: "Uniqlo" },
  { name: "Puma", store: "Puma" },
  { name: "Roadster", store: "Myntra" },
  { name: "Van Heusen", store: "Myntra" },
  { name: "Allen Solly", store: "Myntra" },
  { name: "Manyavar", store: "Myntra" },
  { name: "Fabindia", store: "Amazon" },
  { name: "Decathlon", store: "Decathlon" },
  { name: "Clarks", store: "Amazon" },
  { name: "Titan", store: "Titan" },
  { name: "Ray-Ban", store: "Amazon" },
  { name: "Hidesign", store: "Amazon" },
  { name: "Tommy Hilfiger", store: "Myntra" },
  { name: "U.S. Polo Assn.", store: "Myntra" },
  { name: "Forever 21", store: "Myntra" },
  { name: "Hush Puppies", store: "Flipkart" },
  { name: "Kalamandir", store: "Ajio" },
  { name: "Libas", store: "Myntra" },
  { name: "Biba", store: "Myntra" },
  { name: "Metro Shoes", store: "Ajio" },
  { name: "Woodland", store: "Woodland" },
  { name: "Tanishq", store: "Tanishq" },
  { name: "Louis Philippe", store: "Myntra" },
  { name: "Peter England", store: "Myntra" },
  { name: "Jack & Jones", store: "Myntra" },
  { name: "Mast & Harbour", store: "Myntra" },
  { name: "WROGN", store: "Myntra" },
  { name: "Mango", store: "Mango" },
  { name: "Bershka", store: "Bershka" },
  { name: "Pull & Bear", store: "Pull & Bear" },
  { name: "Superdry", store: "Myntra" },
  { name: "Vans", store: "Amazon" },
  { name: "Converse", store: "Amazon" },
  { name: "Skechers", store: "Flipkart" },
  { name: "Reebok", store: "Myntra" },
  { name: "New Balance", store: "Amazon" },
  { name: "Diesel", store: "Myntra" },
  { name: "Arrow", store: "Myntra" },
  { name: "Park Avenue", store: "Myntra" },
  { name: "Indian Terrain", store: "Myntra" },
  { name: "Being Human", store: "Myntra" },
  { name: "UCB", store: "Myntra" },
  { name: "Spykar", store: "Myntra" },
  { name: "Flying Machine", store: "Myntra" },
  { name: "Numero Uno", store: "Myntra" },
  { name: "Killer", store: "Myntra" },
  { name: "GAP", store: "Myntra" },
  { name: "Marks & Spencer", store: "Amazon" },
  { name: "Max", store: "Max" },
  { name: "Westside", store: "Westside" },
];

const colors: { name: string; hex: string }[] = [
  { name: "Black", hex: "#0d0d0d" },
  { name: "White", hex: "#f5f5f5" },
  { name: "Navy", hex: "#1a2744" },
  { name: "Grey", hex: "#808080" },
  { name: "Blue", hex: "#2c6fbb" },
  { name: "Light Blue", hex: "#7ba3d6" },
  { name: "Red", hex: "#c0392b" },
  { name: "Maroon", hex: "#800020" },
  { name: "Green", hex: "#228b22" },
  { name: "Olive", hex: "#556b2f" },
  { name: "Pink", hex: "#d4739d" },
  { name: "Beige", hex: "#d4c5a9" },
  { name: "Brown", hex: "#6b3a2a" },
  { name: "Tan", hex: "#c4a265" },
  { name: "Yellow", hex: "#e0a800" },
  { name: "Purple", hex: "#6a0dad" },
  { name: "Coral", hex: "#e8786a" },
  { name: "Teal", hex: "#008080" },
  { name: "Burgundy", hex: "#800020" },
  { name: "Khaki", hex: "#c3b091" },
  { name: "Indigo", hex: "#3f51b5" },
  { name: "Peach", hex: "#ffdab9" },
  { name: "Mint", hex: "#98ff98" },
  { name: "Lavender", hex: "#e6e6fa" },
  { name: "Gold", hex: "#c9a84c" },
  { name: "Silver", hex: "#c0c0c0" },
  { name: "Cream", hex: "#fffdd0" },
  { name: "Charcoal", hex: "#36454f" },
  { name: "Rust", hex: "#8b4513" },
  { name: "Mauve", hex: "#e0b0ff" },
  { name: "Multi", hex: "#6a0dad" },
];

const seasons = ["Summer", "Winter", "All-Season", "Autumn", "Spring", "Party", "Wedding", "Festival"];

const materials = [
  "Cotton", "Polyester", "Denim", "Linen", "Wool", "Silk", "Rayon",
  "Nylon", "Spandex", "Leather", "Suede", "Canvas", "Jersey", "Velvet",
  "Cashmere", "Lace", "Chiffon", "Georgette", "Crepe", "Satin",
];

const sizes = {
  Tops: ["XS", "S", "M", "L", "XL", "XXL"],
  Bottoms: ["28", "30", "32", "34", "36", "38"],
  Footwear: ["7", "8", "9", "10", "11", "12"],
  Outerwear: ["XS", "S", "M", "L", "XL"],
  Dresses: ["XS", "S", "M", "L", "XL"],
  "Ethnic Wear": ["S", "M", "L", "XL", "XXL"],
  Activewear: ["XS", "S", "M", "L", "XL"],
  Accessories: ["One Size"],
};

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function pick<T>(arr: T[], rand: () => number): T {
  return arr[Math.floor(rand() * arr.length)];
}

const categoryTemplates: Record<string, { prefixes: string[]; suffixes: string[] }> = {
  Tops: {
    prefixes: ["Slim Fit", "Regular Fit", "Oversized", "Classic", "Casual", "Formal", "Printed", "Solid", "Striped", "Checked", "Cotton", "Linen", "Denim", "Knitted", "Polo", "V-Neck", "Round Neck", "Henley", "Half Sleeves", "Full Sleeves", "Collar", "Mandarin"],
    suffixes: ["T-Shirt", "Shirt", "Blouse", "Top", "Tank Top", "Crop Top", "Tunic", "Kurta", "Sweater", "Hoodie", "Pullover", "Cardigan", "Bodycon Top", "Peplum Top", "Off-Shoulder Top"],
  },
  Bottoms: {
    prefixes: ["Slim Fit", "Regular Fit", "Relaxed", "Straight", "Skinny", "Tapered", "Bootcut", "Wide Leg", "Cargo", "Chino", "Formal", "Casual", "Jogger", "Track", "Denim", "Stretch", "High Waist", "Low Rise", "Paper Bag"],
    suffixes: ["Jeans", "Trousers", "Shorts", "Chinos", "Joggers", "Track Pants", "Leggings", "Palazzos", "Skirt", "Culottes", "Cargos", "Dhoti Pants", "Harem Pants", "Capris"],
  },
  Footwear: {
    prefixes: ["Running", "Casual", "Formal", "Sports", "Leather", "Canvas", "Suede", "Brogue", "Slip-On", "Lace-Up", "High Top", "Low Top", "Ankle", "Knee High", "Wedge", "Platform"],
    suffixes: ["Sneakers", "Loafers", "Oxfords", "Boots", "Sandals", "Slippers", "Flats", "Heels", "Pumps", "Trainers", "Moccasins", "Espadrilles", "Derbys", "Monks"],
  },
  Outerwear: {
    prefixes: ["Lightweight", "Heavy", "Insulated", "Quilted", "Classic", "Modern", "Vintage", "Military", "Bomber", "Denim", "Leather", "Wool", "Cotton", "Puffer", "Rain", "Windbreaker"],
    suffixes: ["Jacket", "Blazer", "Coat", "Trench Coat", "Hoodie", "Parka", "Bomber Jacket", "Denim Jacket", "Leather Jacket", "Puffer Jacket", "Raincoat", "Vest", "Waistcoat", "Cardigan"],
  },
  Dresses: {
    prefixes: ["Floral", "Solid", "Printed", "Embroidered", "Lace", "Silk", "Cotton", "Bodycon", "A-Line", "Fit & Flare", "Maxi", "Midi", "Mini", "Shift", "Wrap", "Slip", "Shirt", "Sweater"],
    suffixes: ["Dress", "Gown", "Jumpsuit", "Playsuit", "Romper", "Kaftan", "Sundress", "Cocktail Dress", "Party Dress", "Evening Gown"],
  },
  "Ethnic Wear": {
    prefixes: ["Embroidered", "Printed", "Solid", "Silk", "Cotton", "Designer", "Traditional", "Contemporary", "Handloom", "Banarasi", "Kanchi", "Paithani", "Bandhani", "Leheriya"],
    suffixes: ["Kurta", "Sherwani", "Saree", "Lehenga", "Salwar Suit", "Anarkali", "Churidar", "Patiala", "Dhoti", "Kurta Set", "Nehru Jacket", "Bandhgala", "Indo-Western"],
  },
  Activewear: {
    prefixes: ["Performance", "Breathable", "Quick Dry", "Compression", "Training", "Running", "Yoga", "Gym", "Sport", "Athletic", "Mesh", "Thermal"],
    suffixes: ["T-Shirt", "Shorts", "Leggings", "Track Pants", "Sports Bra", "Tank Top", "Joggers", "Jacket", "Hoodie", "Singlet", "Capris", "Tights"],
  },
  Accessories: {
    prefixes: ["Premium", "Classic", "Modern", "Vintage", "Designer", "Minimal", "Statement", "Leather", "Silver", "Gold", "Rose Gold", "Matte", "Glossy"],
    suffixes: ["Watch", "Belt", "Wallet", "Sunglasses", "Scarf", "Hat", "Cap", "Bag", "Backpack", "Tote", "Clutch", "Earrings", "Necklace", "Bracelet", "Ring", "Tie", "Bow Tie", "Cufflinks", "Handkerchief"],
  },
};

function getImageUrl(productName: string): string {
  return `https://picsum.photos/seed/${encodeURIComponent(productName.replace(/\s+/g, "-"))}/400/400`;
}

function generateProducts(count: number): WardrobeItem[] {
  const products: WardrobeItem[] = [];
  const categories = Object.keys(categoryTemplates);
  const perCategory = Math.ceil(count / categories.length);
  let idCounter = 1;

  for (const category of categories) {
    const templates = categoryTemplates[category];
    for (let i = 0; i < perCategory && products.length < count; i++) {
      const seed = idCounter * 9271 + 3197;
      const rand = seededRandom(seed);
      const rand2 = seededRandom(seed + 1000);
      const brandItem = pick(brands, rand);
      const colorItem = pick(colors, rand2);
      const prefix = pick(templates.prefixes, rand);
      const suffix = pick(templates.suffixes, rand);
      const season = pick(seasons, rand);
      const material = pick(materials, rand);
      const sizeArr = sizes[category as keyof typeof sizes];
      const size = pick(sizeArr, rand);

      const basePrice = Math.floor(rand() * 8000) + 299;
      const priceNum = Math.round(basePrice / 100) * 100;
      const price = `₹${priceNum.toLocaleString("en-IN")}`;

      const wearCount = Math.floor(rand() * 40) + 1;
      const isFavorite = rand() > 0.7;

      const id = `item-${idCounter}`;
      const productName = `${prefix} ${colorItem.name} ${suffix}`;

      products.push({
        id,
        name: productName,
        category,
        color: colorItem.name,
        colorHex: colorItem.hex,
        brand: brandItem.name,
        store: brandItem.store,
        price,
        priceNum,
        wearCount,
        isFavorite,
        season,
        material,
        size,
        imageUrl: getImageUrl(productName),
      });

      idCounter++;
    }
  }

  return products.sort((a, b) => parseInt(a.id.replace("item-", "")) - parseInt(b.id.replace("item-", "")));
}

export const wardrobeProducts: WardrobeItem[] = generateProducts(1000);
