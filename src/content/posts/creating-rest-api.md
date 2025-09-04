---
title: Creating a RESTful API with Node.js and Express
date: 2025-03-15
tags: [javascript, nodejs, backend, express]
draft: true
---

# Creating a RESTful API with Node.js and Express

In this post, I'll walk through the process of building a simple but robust RESTful API using Node.js and Express.

## Why Build an API?

Before diving into the code, let's discuss why you might want to build your own API:

- To provide data to front-end applications
- To create a microservice architecture
- To practice backend development skills
- To integrate with third-party services

## Setting Up the Project

First, let's initialize a new Node.js project and install the necessary dependencies:

```bash
mkdir rest-api-demo
cd rest-api-demo
npm init -y
npm install express mongoose dotenv cors helmet
npm install nodemon --save-dev
```

## Project Structure

I organized my project with the following structure:

```
rest-api-demo/
├── config/
│   └── db.js
├── controllers/
│   └── productController.js
├── models/
│   └── Product.js
├── routes/
│   └── productRoutes.js
├── .env
├── .gitignore
├── app.js
└── package.json
```

## Creating the Express Server

Here's the basic setup for our Express server in `app.js`:

```javascript
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');
require('dotenv').config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', require('./routes/productRoutes'));

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

## Implementing CRUD Operations

In `controllers/productController.js`, I implemented all the CRUD operations:

```javascript
const Product = require('../models/Product');

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, count: products.length, data: products });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get single product
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }
    
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Create new product
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }
    
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }
    
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
```

## Lessons Learned

Building this API taught me several important concepts:

1. **Proper Error Handling** - Implementing try/catch blocks for all async operations
2. **RESTful Design** - Following REST conventions for endpoints
3. **Code Organization** - Using the MVC pattern to separate concerns
4. **Middleware Usage** - Leveraging Express middleware for security and parsing

## Next Steps

In future iterations, I plan to add:

- Authentication with JWT
- Rate limiting
- Request validation
- Pagination and filtering
- Automated testing

Have you built a RESTful API before? What challenges did you face?
