# MSU E-commerce Website

## Setting Up Appwrite

This project uses Appwrite as the backend for authentication and database. Follow these steps to set up Appwrite for this project:

### 1. Create an Appwrite Account

If you don't have an Appwrite account, sign up at [cloud.appwrite.io](https://cloud.appwrite.io).

### 2. Create a New Project

1. Log in to your Appwrite console
2. Create a new project named "MSU Souvenirs"
3. Copy the Project ID for later use

### 3. Set Up Authentication

1. Go to the "Auth" section in your Appwrite project
2. Enable Email/Password authentication
3. Configure the URL whitelist to include your development and production URLs

### 4. Create a Database

1. Go to the "Databases" section and create a new database named "msu-souvenirs"
2. Copy the Database ID for later use

### 5. Create Collections

Create the following collections in your database:

#### Users Collection

1. Create a collection named "users"
2. Add the following attributes:
   - userId (string, required)
   - name (string, required)
   - email (string, required)
   - phone (string, optional)
   - addresses (array of objects, optional)
3. Set up appropriate permissions (allow read/write for authenticated users)
4. Copy the Collection ID for later use

#### Products Collection

1. Create a collection named "products"
2. Add the following attributes:
   - name (string, required)
   - description (string, required)
   - price (number, required)
   - images (array of strings, required)
   - category (string, required)
   - isNew (boolean, required)
   - features (array of strings, optional)
   - rating (number, optional)
   - reviews (number, optional)
   - inStock (boolean, required)
3. Set up appropriate permissions (allow read for all, write for administrators)
4. Copy the Collection ID for later use

#### Orders Collection

1. Create a collection named "orders"
2. Add the following attributes:
   - userId (string, required)
   - items (array of objects, required)
   - total (number, required)
   - status (string, required)
   - shippingAddress (object, required)
   - createdAt (datetime, required)
   - updatedAt (datetime, required)
3. Set up appropriate permissions (allow read/write for authenticated users)
4. Copy the Collection ID for later use

### 6. Set Up Environment Variables

Create a `.env.local` file in the root of your project with the following variables:

