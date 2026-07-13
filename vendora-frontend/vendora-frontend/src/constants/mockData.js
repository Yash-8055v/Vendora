// Mock data — isolated here per AI rules ("keep mock data isolated").
// TODO: Replace every export below with real API calls via src/services once
// backend integration begins. Do not invent endpoint shapes beyond
// 08_API_MAPPING.md.
//
// Image sourcing: all photos are real, hot-linked Unsplash CDN images
// (images.unsplash.com) — no local downloads needed. `w=` / `q=` params are
// used to right-size them for cards vs. hero/banner use.

const unsplash = (id, w = 800) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const MOCK_CATEGORIES = [
  {
    id: "c1",
    name: "Home & Living",
    productCount: 482,
    image: unsplash("photo-1586023492125-27b2c045efd7", 600),
  },
  {
    id: "c2",
    name: "Fashion",
    productCount: 1290,
    image: unsplash("photo-1489987707025-afc232f7ea0f", 600),
  },
  {
    id: "c3",
    name: "Electronics",
    productCount: 764,
    image: unsplash("photo-1498049794561-7780e7231661", 600),
  },
  {
    id: "c4",
    name: "Beauty",
    productCount: 310,
    image: unsplash("photo-1522335789203-aabd1fc54bc9", 600),
  },
  {
    id: "c5",
    name: "Sports & Outdoors",
    productCount: 198,
    image: unsplash("photo-1517649763962-0c623066013b", 600),
  },
  {
    id: "c6",
    name: "Handmade",
    productCount: 540,
    image: unsplash("photo-1565193566173-7a0ee3dbe261", 600),
  },
];

export const MOCK_STORES = [
  {
    id: "s1",
    slug: "north-and-pine",
    name: "North & Pine",
    description: "Handmade wooden home goods.",
    rating: 4.8,
    banner: unsplash("photo-1449247709967-d4461a6a6103", 1200),
    avatar: unsplash("photo-1493663284031-b7e3aefcae8e", 200),
  },
  {
    id: "s2",
    slug: "lumen-studio",
    name: "Lumen Studio",
    description: "Minimalist lighting design.",
    rating: 4.6,
    banner: unsplash("photo-1524758631624-e2822e304c36", 1200),
    avatar: unsplash("photo-1518481612222-68bbe828ecd1", 200),
  },
  {
    id: "s3",
    slug: "terra-ceramics",
    name: "Terra Ceramics",
    description: "Small-batch stoneware.",
    rating: 4.9,
    banner: unsplash("photo-1565193566173-7a0ee3dbe261", 1200),
    avatar: unsplash("photo-1565193298357-c5b46b0d4dbc", 200),
  },
];

export const MOCK_ADDRESSES = [
  { id: "a1", name: "Home", phone: "+91 98765 43210", line: "221B, Koregaon Park, Pune, Maharashtra 411001", isDefault: true },
  { id: "a2", name: "Office", phone: "+91 91234 56789", line: "500 MG Road, Suite 12, Pune, Maharashtra 411036", isDefault: false },
];

export const MOCK_ORDERS = [
  { id: "10293", date: "2026-06-18", itemsCount: 2, total: 18990, status: "delivered" },
  { id: "10301", date: "2026-06-21", itemsCount: 1, total: 4790, status: "shipped" },
  { id: "10315", date: "2026-06-24", itemsCount: 3, total: 30900, status: "pending" },
];

export const MOCK_VENDOR_PRODUCTS = [
  { id: "p1", name: "Oak Side Table", price: 14190, stock: 12, status: "published" },
  { id: "p4", name: "Linen Throw Blanket", price: 6590, stock: 0, status: "published" },
  { id: "p7", name: "Walnut Bookshelf", price: 30750, stock: 4, status: "draft" },
];

export const MOCK_VENDOR_ORDERS = [
  { id: "20011", customer: "Alex Kim", date: "2026-06-22", total: 14190, status: "pending" },
  { id: "20014", customer: "Priya Shah", date: "2026-06-23", total: 6590, status: "confirmed" },
  { id: "20019", customer: "Marco Diaz", date: "2026-06-24", total: 30750, status: "shipped" },
];

export const MOCK_VENDOR_STATS = {
  totalSales: 936000,
  pendingOrders: 3,
  activeProducts: 18,
  storeRating: 4.8,
};

export const MOCK_ADMIN_STATS = {
  totalUsers: 8420,
  totalVendors: 312,
  totalOrders: 15600,
  revenue: 36172500,
};

export const MOCK_VENDOR_APPLICATIONS = [
  { id: "va1", businessName: "Coastal Candle Co.", contactName: "Riya Patel", date: "2026-06-20", status: "pending" },
  { id: "va2", businessName: "Forge & Fern", contactName: "Sam Liu", date: "2026-06-21", status: "pending" },
  { id: "va3", businessName: "Quiet Hours Studio", contactName: "Dana Brooks", date: "2026-06-19", status: "pending" },
];

export const MOCK_USERS = [
  { id: "u1", name: "Alex Kim", email: "alex@example.com", role: "customer", status: "active" },
  { id: "u2", name: "Priya Shah", email: "priya@example.com", role: "customer", status: "active" },
  { id: "u3", name: "North & Pine", email: "hello@northandpine.com", role: "vendor", status: "active" },
  { id: "u4", name: "Marco Diaz", email: "marco@example.com", role: "customer", status: "suspended" },
];

export const MOCK_ADMIN_VENDORS = [
  { id: "v1", name: "North & Pine", email: "hello@northandpine.com", status: "active", products: 24 },
  { id: "v2", name: "Lumen Studio", email: "hi@lumenstudio.com", status: "active", products: 18 },
  { id: "v3", name: "Terra Ceramics", email: "shop@terraceramics.com", status: "suspended", products: 9 },
];

export const MOCK_ADMIN_ORDERS = [
  { id: "30021", customer: "Alex Kim", vendor: "North & Pine", date: "2026-06-22", total: 14190, status: "delivered" },
  { id: "30034", customer: "Priya Shah", vendor: "Lumen Studio", date: "2026-06-23", total: 18400, status: "shipped" },
  { id: "30041", customer: "Marco Diaz", vendor: "Terra Ceramics", date: "2026-06-24", total: 4790, status: "cancelled" },
];

// Each product now carries: `price` (the current/discounted price shown as the
// "real" price), `discountPercent` (drives the strikethrough MRP + % badge),
// `image` (primary card image) and `images` (gallery for the product detail
// carousel). Prices are realistic INR figures for an Indian ecommerce catalog.
export const MOCK_PRODUCTS = [
  {
    id: "p1",
    name: "Oak Side Table",
    price: 14190,
    discountPercent: 18,
    category: "Home & Living",
    storeId: "s1",
    storeName: "North & Pine",
    stock: 12,
    rating: 4.7,
    reviewCount: 38,
    image: unsplash("photo-1533090161767-e6ffed986c88", 800),
    images: [
      unsplash("photo-1533090161767-e6ffed986c88", 1000),
      unsplash("photo-1567538096630-e0c55bd6374c", 1000),
      unsplash("photo-1550254478-ead40cc54513", 1000),
      unsplash("photo-1519947486511-46149fa0a254", 1000),
    ],
  },
  {
    id: "p2",
    name: "Arc Floor Lamp",
    price: 18400,
    discountPercent: 15,
    category: "Home & Living",
    storeId: "s2",
    storeName: "Lumen Studio",
    stock: 3,
    rating: 4.5,
    reviewCount: 21,
    image: unsplash("photo-1507473885765-e6ed057f782c", 800),
    images: [
      unsplash("photo-1507473885765-e6ed057f782c", 1000),
      unsplash("photo-1524758631624-e2822e304c36", 1000),
      unsplash("photo-1513506003901-1e6a229e2d15", 1000),
    ],
  },
  {
    id: "p3",
    name: "Hand-thrown Mug Set",
    price: 4790,
    discountPercent: 20,
    category: "Handmade",
    storeId: "s3",
    storeName: "Terra Ceramics",
    stock: 0,
    rating: 4.9,
    reviewCount: 64,
    image: unsplash("photo-1514228742587-6b1558fcca3d", 800),
    images: [
      unsplash("photo-1514228742587-6b1558fcca3d", 1000),
      unsplash("photo-1565193566173-7a0ee3dbe261", 1000),
      unsplash("photo-1517686469429-8bdb88b9f907", 1000),
    ],
  },
  {
    id: "p4",
    name: "Linen Throw Blanket",
    price: 6590,
    discountPercent: 25,
    category: "Home & Living",
    storeId: "s1",
    storeName: "North & Pine",
    stock: 27,
    rating: 4.6,
    reviewCount: 17,
    image: unsplash("photo-1616627561950-9f746e330187", 800),
    images: [
      unsplash("photo-1616627561950-9f746e330187", 1000),
      unsplash("photo-1601924994987-69e26d50dc26", 1000),
      unsplash("photo-1522708323590-d24dbb6b0267", 1000),
    ],
  },
  {
    id: "p5",
    name: "Pendant Light",
    price: 11990,
    discountPercent: 10,
    category: "Home & Living",
    storeId: "s2",
    storeName: "Lumen Studio",
    stock: 8,
    rating: 4.4,
    reviewCount: 9,
    image: unsplash("photo-1540932239986-30128078f3c5", 800),
    images: [
      unsplash("photo-1540932239986-30128078f3c5", 1000),
      unsplash("photo-1524758631624-e2822e304c36", 1000),
      unsplash("photo-1493552152660-f915ab47ae9d", 1000),
    ],
  },
  {
    id: "p6",
    name: "Stoneware Vase",
    price: 5390,
    discountPercent: 12,
    category: "Handmade",
    storeId: "s3",
    storeName: "Terra Ceramics",
    stock: 2,
    rating: 4.8,
    reviewCount: 45,
    image: unsplash("photo-1578500494198-246f612d3b3d", 800),
    images: [
      unsplash("photo-1578500494198-246f612d3b3d", 1000),
      unsplash("photo-1578500351865-f6c754489f3f", 1000),
      unsplash("photo-1565193566173-7a0ee3dbe261", 1000),
    ],
  },
  {
    id: "p7",
    name: "Walnut Bookshelf",
    price: 30750,
    discountPercent: 22,
    category: "Home & Living",
    storeId: "s1",
    storeName: "North & Pine",
    stock: 5,
    rating: 4.9,
    reviewCount: 12,
    image: unsplash("photo-1594620302200-9a762244a156", 800),
    images: [
      unsplash("photo-1594620302200-9a762244a156", 1000),
      unsplash("photo-1594620302200-9a762244a156", 1000),
      unsplash("photo-1550581190-9c1c48d21d6c", 1000),
    ],
  },
  {
    id: "p8",
    name: "Table Lamp Duo",
    price: 14850,
    discountPercent: 8,
    category: "Home & Living",
    storeId: "s2",
    storeName: "Lumen Studio",
    stock: 15,
    rating: 4.3,
    reviewCount: 6,
    image: unsplash("photo-1543198126-42302a4a4267", 800),
    images: [
      unsplash("photo-1543198126-42302a4a4267", 1000),
      unsplash("photo-1513506003901-1e6a229e2d15", 1000),
      unsplash("photo-1524758631624-e2822e304c36", 1000),
    ],
  },
];

export const MOCK_REVIEWS = [
  { id: "r1", productId: "p1", author: "Maya T.", rating: 5, date: "2026-05-02", comment: "Exactly as pictured, sturdy and well-finished. Took two of us to carry but assembly was simple." },
  { id: "r2", productId: "p1", author: "Daniel R.", rating: 4, date: "2026-04-18", comment: "Lovely table, slightly smaller than I expected but still happy with it." },
  { id: "r3", productId: "p1", author: "Sofia K.", rating: 5, date: "2026-03-30", comment: "The wood grain is gorgeous in person. Fast shipping from the vendor too." },
  { id: "r4", productId: "p3", author: "Liam P.", rating: 5, date: "2026-05-11", comment: "Each mug is slightly different, which is exactly the handmade charm I wanted." },
  { id: "r5", productId: "p3", author: "Anya S.", rating: 5, date: "2026-04-27", comment: "Bought as a gift and ended up ordering a second set for myself." },
  { id: "r6", productId: "p6", author: "Noah B.", rating: 4, date: "2026-05-06", comment: "Beautiful glaze, a little smaller than expected but still lovely on a shelf." },
];

export const MOCK_COUPONS = [
  { code: "WELCOME10", label: "10% off your first order", discountPercent: 10 },
  { code: "FREESHIP", label: "Free shipping on this order", discountFlat: 99 },
  { code: "VENDORA20", label: "20% off orders over ₹12,000", discountPercent: 20, minSubtotal: 12000 },
];

export const MOCK_NOTIFICATIONS = [
  { id: "n1", title: "Order shipped", body: "Order #10301 is on its way.", date: "2026-06-24T10:00:00", read: false },
  { id: "n2", title: "Price drop", body: "Pendant Light is now ₹11,990, down from ₹13,300.", date: "2026-06-23T15:30:00", read: false },
  { id: "n3", title: "Back in stock", body: "Hand-thrown Mug Set restocking soon — you're on the list.", date: "2026-06-21T09:15:00", read: true },
  { id: "n4", title: "Welcome to Vendora", body: "Your account was created successfully.", date: "2026-06-18T08:00:00", read: true },
];

// Hero carousel — full-bleed lifestyle/ecommerce imagery for the homepage.
export const MOCK_HERO_SLIDES = [
  {
    id: "h1",
    image: unsplash("photo-1483985988355-763728e1935b", 1600),
    eyebrow: "New Season",
    title: "Independent stores, one marketplace.",
    subtitle: "Discover thoughtfully made products from vendors who care about their craft.",
    ctaLabel: "Shop New Arrivals",
    ctaTo: "/products",
  },
  {
    id: "h2",
    image: unsplash("photo-1441986300917-64674bd600d8", 1600),
    eyebrow: "Up to 25% Off",
    title: "Refresh your space this season.",
    subtitle: "Handpicked home & living pieces from small-batch makers, delivered to your door.",
    ctaLabel: "Explore Home & Living",
    ctaTo: "/products?category=Home%20%26%20Living",
  },
  {
    id: "h3",
    image: unsplash("photo-1487222477894-8943e31ef7b2", 1600),
    eyebrow: "Trending Now",
    title: "Beauty & fashion, curated for you.",
    subtitle: "Trusted vendors, verified reviews, and fast fulfillment on every order.",
    ctaLabel: "Discover Fashion",
    ctaTo: "/products?category=Fashion",
  },
];
