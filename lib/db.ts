import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'msu_souvenirs',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Product types
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  isNew: boolean;
  rating: number;
  reviews: number;
  inStock: boolean;
  images: string[];
  features: string[];
}

// Order types
export interface OrderItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  size?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  shippingAddress: {
    name: string;
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phone: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

// User profile type
export interface UserProfile {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone?: string;
  addresses: {
    id: string;
    name: string;
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phone: string;
    isDefault: boolean;
  }[];
}

// Database functions
export async function getProducts(category?: string, limit = 10, offset = 0): Promise<Product[]> {
  try {
    let query = `
      SELECT p.*, 
        GROUP_CONCAT(DISTINCT pi.image_url) as images,
        GROUP_CONCAT(DISTINCT pf.feature) as features
      FROM products p
      LEFT JOIN product_images pi ON p.id = pi.product_id
      LEFT JOIN product_features pf ON p.id = pf.product_id
    `;

    const params: any[] = [];
    if (category && category !== "All") {
      query += " WHERE p.category = ?";
      params.push(category);
    }

    query += " GROUP BY p.id LIMIT ? OFFSET ?";
    params.push(limit, offset);

    const [rows] = await pool.query(query, params);
    return processProductRows(rows as any[]);
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function getProductById(id: number): Promise<Product | null> {
  try {
    const query = `
      SELECT p.*, 
        GROUP_CONCAT(DISTINCT pi.image_url) as images,
        GROUP_CONCAT(DISTINCT pf.feature) as features
      FROM products p
      LEFT JOIN product_images pi ON p.id = pi.product_id
      LEFT JOIN product_features pf ON p.id = pf.product_id
      WHERE p.id = ?
      GROUP BY p.id
    `;

    const [rows] = await pool.query(query, [id]);
    const products = processProductRows(rows as any[]);
    return products[0] || null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

function processProductRows(rows: any[]): Product[] {
  return rows.map(row => ({
    id: row.id,
    name: row.name,
    description: row.description,
    price: parseFloat(row.price),
    category: row.category,
    isNew: Boolean(row.is_new),
    rating: parseFloat(row.rating),
    reviews: row.reviews,
    inStock: Boolean(row.in_stock),
    images: row.images ? row.images.split(',') : [],
    features: row.features ? row.features.split(',') : []
  }));
}

export default pool;