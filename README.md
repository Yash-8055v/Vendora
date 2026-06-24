# 🛒 Vendora

### Empowering Vendors. Delightful Shopping.

A production-grade **Multi-Vendor eCommerce Marketplace** built with the **MERN Stack**, designed to simulate real-world marketplace platforms like Amazon, Flipkart, Etsy, and eBay.

Vendora is not just another CRUD application. It is a complete engineering-focused marketplace project built to learn and demonstrate:

* Authentication & Authorization
* RBAC (Role Based Access Control)
* Stripe Connect Marketplace Payments
* Vendor Management
* Inventory Management
* Secure APIs
* Caching with Redis
* CI/CD
* Docker
* Monitoring & Observability
* Production Deployment

---

## 🎯 Project Goal

Build a portfolio-quality marketplace that demonstrates enterprise software engineering practices and production-ready architecture.

---

## ✨ Core Features

### Customer Features

* User Registration & Login
* Google OAuth Authentication
* Email Verification
* Password Reset
* Product Search
* Product Filtering
* Product Sorting
* Wishlist
* Shopping Cart
* Secure Checkout
* Stripe Payments
* Order History
* Order Tracking
* Product Reviews & Ratings
* Address Management
* Notifications

### Vendor Features

* Vendor Registration
* Store Creation
* Product Management
* Product Variants
* Inventory Tracking
* Sales Analytics
* Coupon Management
* Order Fulfillment
* Stripe Connect Onboarding
* Revenue Dashboard

### Admin Features

* Vendor Approval
* User Management
* Product Moderation
* Order Monitoring
* Refund Management
* Coupon Management
* Revenue Analytics
* Security Dashboard

### Super Admin Features

* Role Management
* Permission Management
* Feature Flags
* Platform Configuration
* Full System Access

---

# 🏗 Architecture

Vendora follows a **Feature-Based Modular MVC Architecture**.

```text
Client
  ↓
Routes
  ↓
Middleware
  ↓
Controllers
  ↓
Services
  ↓
Models
  ↓
MongoDB
```

---

# 📁 Project Structure

```text
vendora/
│
├── frontend/
│
├── backend/
│   │
│   ├── src/
│   │
│   ├── modules/
│   │   │
│   │   ├── auth/
│   │   ├── users/
│   │   ├── vendors/
│   │   ├── stores/
│   │   ├── products/
│   │   ├── categories/
│   │   ├── cart/
│   │   ├── orders/
│   │   ├── payments/
│   │   ├── reviews/
│   │   ├── coupons/
│   │   └── notifications/
│   │
│   ├── middleware/
│   ├── config/
│   ├── utils/
│   ├── app.js
│   └── server.js
│
├── docs/
│   ├── PRD.md
│   ├── API.md
│   ├── ERD.md
│   ├── RBAC.md
│   └── ARCHITECTURE.md
│
├── .gitignore
├── README.md
└── docker-compose.yml
```

---

# 🛠 Tech Stack

## Frontend

* React
* Vite
* React Router
* TanStack Query
* Tailwind CSS
* ShadCN UI
* React Hook Form
* Zod
* Axios

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Zod Validation

## Authentication

* JWT Access Tokens
* Refresh Tokens
* HttpOnly Cookies
* Google OAuth

## Payments

* Stripe Connect

## Storage

* Cloudinary

## Caching

* Redis

## Monitoring

* OpenTelemetry
* Prometheus
* Grafana

## Logging

* Pino

## Testing

* Jest
* Supertest
* Playwright
* Vitest

## DevOps

* Docker
* Docker Compose
* GitHub Actions

---

# 🔐 Authentication Flow

```text
Register
    ↓
Email Verification
    ↓
Login
    ↓
Access Token + Refresh Token
    ↓
Protected Routes
    ↓
Refresh Token Rotation
```

---

# 👥 User Roles

## Guest

* Browse Products
* Search Products
* View Product Details

## Customer

* Purchase Products
* Manage Cart
* Manage Wishlist
* Review Products
* Track Orders

## Vendor

* Create Store
* Manage Products
* Manage Inventory
* Process Orders
* View Revenue

## Admin

* Manage Users
* Approve Vendors
* Moderate Products
* Handle Refunds

## Super Admin

* Manage Roles
* Manage Permissions
* Configure Platform

---

# 🚀 Development Roadmap

## Phase 1

### Project Setup

* Express Setup
* MongoDB Setup
* Environment Configuration
* Health Check API

---

## Phase 2

### Authentication

* Register
* Login
* Logout
* Refresh Token
* Password Reset

---

## Phase 3

### Authorization

* RBAC Middleware
* Protected Routes
* Role Based Access

---

## Phase 4

### Vendor System

* Vendor Registration
* Vendor Approval
* Store Creation

---

## Phase 5

### Product System

* Product CRUD
* Categories
* Variants
* Inventory

---

## Phase 6

### Customer Marketplace

* Product Listing
* Search
* Filters
* Product Details

---

## Phase 7

### Cart & Wishlist

* Cart CRUD
* Guest Cart
* Cart Merge
* Wishlist

---

## Phase 8

### Orders

* Order Creation
* Order History
* Order Tracking

---

## Phase 9

### Payments

* Stripe Connect
* Payment Webhooks
* Refunds

---

## Phase 10

### Admin Dashboard

* Vendor Management
* Product Moderation
* Analytics

---

## Phase 11

### Performance

* Redis
* Caching
* Optimization

---

## Phase 12

### Production

* Docker
* CI/CD
* Monitoring
* Logging
* Deployment

---

# 🔒 Security Features

* Password Hashing (bcrypt)
* JWT Authentication
* Refresh Token Rotation
* HttpOnly Cookies
* RBAC
* Rate Limiting
* Helmet
* Input Sanitization
* Zod Validation
* Secure Headers
* Audit Logs

---

# 📊 Future Enhancements

* AI Product Recommendations
* Marketplace Advertising
* Multi-Currency Support
* Multi-Language Support
* Mobile Applications
* Vendor Subscription Plans
* Real-Time Chat
* Microservices Architecture

---

# 📈 Learning Outcomes

By building Vendora you will gain hands-on experience with:

* Enterprise Backend Architecture
* Authentication & Authorization
* Marketplace Business Logic
* Payment Systems
* Caching Strategies
* DevOps
* CI/CD Pipelines
* Monitoring & Observability
* Production Deployment
* Scalable System Design

---

# 👨‍💻 Author

**Yash Karande**

Engineering Student | MERN Developer | AI Engineering Learner

Building production-grade software one project at a time.

---

## ⭐ Project Status

🚧 In Development

Current Phase: **Authentication & User Management**
