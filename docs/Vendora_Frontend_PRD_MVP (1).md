# Vendora Frontend PRD (MVP)

## Overview

Vendora is a multi-vendor marketplace with Guest, Customer, Vendor and
Admin roles.

## Goals

-   Single React application
-   AI-generated UI
-   Manual API integration
-   Responsive design
-   Reusable components

## User Roles

### Guest

-   Browse products
-   Browse stores
-   Browse categories
-   Login/Register

### Customer

-   Profile
-   Addresses
-   Cart
-   Checkout
-   Orders

### Vendor

-   Application
-   Store
-   Products
-   Orders

### Admin

-   Dashboard
-   Users
-   Vendors
-   Products
-   Orders

## Public Routes

-   /
-   /login
-   /register
-   /forgot-password
-   /products
-   /products/:id
-   /categories
-   /stores
-   /stores/:slug
-   /stores/:slug/products

## Customer Routes

-   /account
-   /account/addresses
-   /cart
-   /orders
-   /orders/:id

## Vendor Routes

-   /vendor
-   /vendor/application
-   /vendor/store
-   /vendor/products
-   /vendor/orders

## Admin Routes

-   /admin
-   /admin/users
-   /admin/vendors
-   /admin/products
-   /admin/orders

## API Modules

-   Auth
-   Address
-   Category
-   Product
-   Store
-   Cart
-   Order
-   Vendor
-   Admin

## Shared Components

Navbar Footer Sidebar Cards Forms Tables Pagination Search Skeleton
Modal Toast

## Future Modules

-   Reviews
-   Wishlist
-   Coupons
-   Notifications
-   Analytics
-   Google Login
-   Recommendations
-   Recently Viewed
-   Inventory Alerts

## Notes

-   Generate UI only.
-   Do not invent backend endpoints.
-   Use reusable React components.
-   API integration will be done manually.
