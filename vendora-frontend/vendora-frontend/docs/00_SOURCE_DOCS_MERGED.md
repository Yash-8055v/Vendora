## Merged Files List

- 1. 00_START_HERE.md (785 B)
- 2. 01_PRODUCT.md (1.5 KB)
- 3. 02_TECH_STACK.md (3.8 KB)
- 4. 03_DESIGN_SYSTEM.md (5.3 KB)
- 5. 04_APP_STRUCTURE.md (3.7 KB)
- 6. 05_ROUTES_AND_NAVIGATION.md (2.7 KB)
- 7. 06_COMPONENT_LIBRARY.md (3.6 KB)
- 8. 07_PAGES.md (5.6 KB)
- 9. 08_API_MAPPING.md (5.3 KB)
- 10. 09_AI_RULES.md (3.3 KB)
- 11. 10_PROJECT_PROGRESS.md (3 KB)
- 12. 11_FRONTEND_CHECKLIST.md (771 B)
- 13. Vendora_Frontend_PRD_MVP (1).md (1.6 KB)

## 1. 00_START_HERE.md

```md
# 00_START_HERE.md

# Welcome to Vendora Frontend

This folder is the single source of truth for the Vendora frontend.

## Read Order

Vendora Frontend PRD (MVP)

1.  01_PRODUCT.md
2.  02_TECH_STACK.md
3.  03_DESIGN_SYSTEM.md
4.  04_APP_STRUCTURE.md
5.  05_ROUTES_AND_NAVIGATION.md
6.  06_COMPONENT_LIBRARY.md
7.  07_PAGES.md
8.  08_API_MAPPING.md
9.  09_AI_RULES.md
10. 10_PROJECT_PROGRESS.md

## Workflow

1.  Read every document.
2.  Understand backend APIs before generating UI.
3.  Generate reusable components.
4.  Build layouts.
5.  Build pages with mock data.
6.  Leave TODO comments for API integration.
7.  Update PROJECT_PROGRESS.md.

## Rules

- Never invent backend endpoints.
- JavaScript only.
- Follow Design System.
- Reuse components.
- Do not rewrite completed work unless requested.
```

# Vendora Frontend PRD (MVP)

## Overview

Vendora is a multi-vendor marketplace with Guest, Customer, Vendor and
Admin roles.

## Goals

- Single React application
- AI-generated UI
- Manual API integration
- Responsive design
- Reusable components

## User Roles

### Guest

- Browse products
- Browse stores
- Browse categories
- Login/Register

### Customer

- Profile
- Addresses
- Cart
- Checkout
- Orders

### Vendor

- Application
- Store
- Products
- Orders

### Admin

- Dashboard
- Users
- Vendors
- Products
- Orders

## Public Routes

- /
- /login
- /register
- /forgot-password
- /products
- /products/:id
- /categories
- /stores
- /stores/:slug
- /stores/:slug/products

## Customer Routes

- /account
- /account/addresses
- /cart
- /orders
- /orders/:id

## Vendor Routes

- /vendor
- /vendor/application
- /vendor/store
- /vendor/products
- /vendor/orders

## Admin Routes

- /admin
- /admin/users
- /admin/vendors
- /admin/products
- /admin/orders

## API Modules

- Auth
- Address
- Category
- Product
- Store
- Cart
- Order
- Vendor
- Admin

## Shared Components

Navbar Footer Sidebar Cards Forms Tables Pagination Search Skeleton
Modal Toast

## Future Modules

- Reviews
- Wishlist
- Coupons
- Notifications
- Analytics
- Google Login
- Recommendations
- Recently Viewed
- Inventory Alerts

## Notes

- Generate UI only.
- Do not invent backend endpoints.
- Use reusable React components.
- API integration will be done manually.

## 2. 01_PRODUCT.md

```md
# 01_PRODUCT.md

# Vendora Product Specification

## Product Overview

Vendora is a production-grade multi-vendor marketplace connecting
customers, vendors, and administrators on a single platform. The
frontend must resemble a modern startup product rather than a tutorial
project.

## Vision

Build a scalable, premium marketplace with a polished shopping
experience, powerful vendor tools, and an efficient admin panel.

## User Roles

### Guest

- Browse products
- Browse stores
- Browse categories
- Search
- Register/Login

### Customer

- Profile
- Addresses
- Cart
- Checkout
- Orders

### Vendor

- Vendor application
- Store management
- Product management
- Order management

### Admin

- Dashboard
- Users
- Vendors
- Products
- Orders

## Modules

- Authentication
- Categories
- Stores
- Products
- Cart
- Addresses
- Orders
- Vendor
- Admin

## User Journeys

Guest: Home → Browse → Product → Login/Register

Customer: Login → Browse → Cart → Checkout → Orders

Vendor: Apply → Approval → Store → Products → Orders

Admin: Dashboard → Manage Marketplace

## Future Modules

- Reviews
- Wishlist
- Coupons
- Notifications
- Analytics
- Google Login
- Recommendations
- Recently Viewed
- Inventory Alerts

These should only appear as 'Coming Soon' placeholders.

## Product Rules

- Do not invent backend APIs.
- Do not use TypeScript.
- Build reusable UI.
- Keep one consistent design language.
- Prepare for production-quality frontend.
```

## 3. 02_TECH_STACK.md

```md
# 02_TECH_STACK.md

# Vendora Frontend Technical Specification

## Purpose

This document defines the mandatory frontend technologies, coding
standards, project architecture, and development conventions. Every AI
assistant and developer must follow this document.

---

# Core Stack

- React (latest stable)
- Vite (latest stable)
- JavaScript (ES2023+) **ONLY**
- Tailwind CSS (latest stable)
- React Router DOM (latest stable)
- Axios
- React Hook Form
- Zod
- Framer Motion
- Lucide React

## Prohibited

- TypeScript
- Bootstrap
- jQuery
- Redux unless future scaling requires it
- Inline CSS except tiny dynamic cases

---

# Project Structure

    src/
      api/
      assets/
      components/
        common/
        customer/
        vendor/
        admin/
      contexts/
      hooks/
      layouts/
      pages/
        public/
        auth/
        customer/
        vendor/
        admin/
      routes/
      services/
      utils/
      constants/
      styles/

---

# State Management

Initial MVP

- React Context
- Local component state
- Custom hooks

Future

- Redux Toolkit only if Context becomes difficult to maintain.

---

# API Layer

- All HTTP requests must go through Axios.
- One shared Axios instance.
- Base URL from environment variables.
- No direct fetch calls inside components.

Example environment variables

    VITE_API_BASE_URL=

---

# Routing

Use React Router.

Layouts

- PublicLayout
- CustomerLayout
- VendorLayout
- AdminLayout

Support

- Protected routes
- Role-based routing
- Unauthorized page
- Not Found page

---

# Forms

Use:

- React Hook Form
- Zod validation

Every form must include:

- Loading state
- Disabled submit
- Validation messages
- Success toast
- Error toast

---

# Component Rules

- Components should have a single responsibility.
- Prefer composition over duplication.
- Keep business logic outside presentation components.
- Reuse components whenever possible.

---

# Styling Rules

- Tailwind utility classes only.
- Consistent spacing.
- Responsive by default.
- Avoid arbitrary values unless necessary.

---

# Performance

- Lazy load routes.
- Optimize images.
- Memoize only when beneficial.
- Code split large pages.

---

# Accessibility

- Semantic HTML.
- Keyboard navigation.
- Proper labels.
- Focus states.
- ARIA attributes where appropriate.

---

# Naming Convention

Components: PascalCase

Hooks: useSomething

Pages: PascalCase

Utilities: camelCase

Constants: UPPER_SNAKE_CASE where appropriate.

---

# AI Rules

- Never switch to TypeScript.
- Never invent backend APIs.
- Never change endpoint names.
- Keep mock data isolated.
- Add TODO comments where backend integration is pending.
- Maintain PROJECT_PROGRESS.md after significant work.

---

This document is the technical source of truth for the Vendora frontend.
```

## 4. 03_DESIGN_SYSTEM.md

```md
# 03_DESIGN_SYSTEM.md

# Vendora Design System

## Purpose

This document defines the complete visual language for Vendora. Every
page, component and layout must follow these rules.

---

# Brand Personality

Vendora should feel:

- Premium
- Trustworthy
- Modern
- Minimal
- Elegant
- Fast
- Friendly
- Professional

Avoid: - Generic AI templates - Overly colorful interfaces - Heavy
glassmorphism - Cartoon styling

---

# Theme

Light theme only.

Large white space.

Soft shadows.

Rounded corners.

Premium photography.

Subtle gradients.

---

# Color System

Use the Vendora logo as the primary brand color once available.

Semantic colors:

- Success (Green)
- Warning (Amber)
- Error (Red)
- Info (Blue)

Neutral palette should dominate the UI.

---

# Typography

Maximum two font families.

Hierarchy:

- Display
- H1
- H2
- H3
- H4
- Body Large
- Body
- Small
- Caption

Readable line height and generous spacing.

---

# Spacing

Follow an 8px spacing system.

4 / 8 / 12 / 16 / 24 / 32 / 40 / 48 / 64 / 80 / 96

Never use random spacing.

---

# Border Radius

Small: 8px

Medium: 12px

Large: 16px

Cards: 20px

Buttons should remain consistent.

---

# Shadows

Use soft layered shadows.

Cards should appear elevated but not floating excessively.

---

# Layout Grid

Desktop: 12-column grid

Tablet: 8-column grid

Mobile: 4-column grid

Maximum content width: 1280-1440px.

---

# Buttons

Variants:

- Primary
- Secondary
- Outline
- Ghost
- Danger
- Success
- Icon
- Loading

States:

- Default
- Hover
- Active
- Disabled
- Loading
- Focus

---

# Inputs

Support:

- Text
- Email
- Password
- Number
- Search
- Select
- Textarea

Every field includes:

- Label
- Helper text
- Validation message
- Success state
- Error state

---

# Cards

Create reusable:

- Product Card
- Store Card
- Category Card
- Address Card
- Order Card
- Statistics Card
- Dashboard Card

All cards should share a common visual language.

---

# Tables

Support:

- Sorting
- Search
- Pagination
- Status badges
- Empty state
- Loading skeleton

---

# Navigation

Public: Top navigation + footer.

Customer: Sidebar + top bar.

Vendor: Sidebar + analytics header.

Admin: Professional dashboard sidebar with breadcrumbs.

---

# Loading

Every page must include:

- Skeletons
- Loading spinner
- Progress indicators where appropriate.

---

# Empty States

Design custom empty states for:

- Cart
- Orders
- Products
- Addresses
- Vendors
- Admin tables

Use friendly illustrations and clear CTAs.

---

# Error States

Include:

- Error message
- Retry button
- Helpful explanation

---

# Success Feedback

Use toast notifications for:

- Save
- Delete
- Update
- Login
- Logout
- Checkout
- Vendor application

---

# Motion

Use Framer Motion.

Animation guidelines:

- Fast
- Smooth
- Purposeful

Animate:

- Page transitions
- Modals
- Drawers
- Dropdowns
- Card hover
- Buttons
- Hero sections

Avoid excessive motion.

---

# Icons

Use Lucide React only.

Keep icon size and stroke consistent.

---

# Imagery

Use premium ecommerce imagery.

Avoid low-quality stock images.

Use placeholders where backend images are unavailable.

---

# Responsive Rules

Desktop first.

Support:

- Desktop
- Laptop
- Tablet
- Mobile

No horizontal scrolling.

---

# Accessibility

Semantic HTML.

Visible focus states.

Keyboard navigation.

Accessible color contrast.

---

# Design Checklist

Every screen must include:

- Loading state
- Empty state
- Error state
- Success feedback
- Responsive layout
- Consistent spacing
- Consistent typography
- Reusable components
- Accessible interactions

This document is the design source of truth for Vendora.
```

## 5. 04_APP_STRUCTURE.md

```md
# 04_APP_STRUCTURE.md

# Vendora Frontend Application Structure

## Purpose

Defines the project architecture, folder organization and
responsibilities for every directory. All developers and AI tools must
follow this structure.

---

# High Level Architecture

    frontend/
    ├── public/
    ├── src/
    ├── docs/
    ├── .env
    ├── package.json
    └── vite.config.js

---

# Source Structure

    src/
    ├── api/
    ├── assets/
    │   ├── images/
    │   ├── icons/
    │   └── illustrations/
    ├── components/
    │   ├── common/
    │   ├── auth/
    │   ├── ecommerce/
    │   ├── customer/
    │   ├── vendor/
    │   └── admin/
    ├── constants/
    ├── contexts/
    ├── hooks/
    ├── layouts/
    ├── pages/
    │   ├── public/
    │   ├── auth/
    │   ├── customer/
    │   ├── vendor/
    │   └── admin/
    ├── routes/
    ├── services/
    ├── styles/
    ├── utils/
    └── App.jsx

---

# Folder Responsibilities

## api

Axios instance and request configuration.

## assets

Static images, icons, logos and illustrations.

## components

Reusable UI only. No page-level business logic.

## constants

Application constants.

## contexts

Authentication and shared global state.

## hooks

Reusable custom hooks.

## layouts

PublicLayout CustomerLayout VendorLayout AdminLayout

## pages

Route-level screens only.

## routes

Application routing and protected routes.

## services

Business logic and API wrappers.

## styles

Global CSS and Tailwind additions.

## utils

Helper functions.

---

# Layout Hierarchy

Guest → PublicLayout

Customer → CustomerLayout

Vendor → VendorLayout

Admin → AdminLayout

Each layout owns: - Navigation - Sidebar (where applicable) - Footer -
Breadcrumbs - Notifications placeholder

---

# State Management

MVP: - React Context - Local state - Custom hooks

Avoid unnecessary global state.

---

# Environment Variables

    VITE_API_BASE_URL=

Never hardcode API URLs.

---

# Routing Strategy

- Nested routes
- Protected routes
- Role-based redirects
- Lazy loaded pages
- 404 route
- Unauthorized route

---

# Import Rules

Prefer absolute imports where configured.

Avoid deep relative imports.

---

# File Naming

Components: PascalCase.jsx

Hooks: useSomething.js

Utilities: camelCase.js

Contexts: SomethingContext.jsx

---

# Code Organization

Pages assemble components.

Components render UI.

Services communicate with backend.

Hooks contain reusable logic.

Utils contain helper functions.

---

# AI Development Rules

- Never create random folders.
- Follow this structure exactly.
- Reuse existing folders before adding new ones.
- Keep business logic out of UI components.
- Keep components small and reusable.

This document is the architecture source of truth.
```

## 6. 05_ROUTES_AND_NAVIGATION.md

```md
# 05_ROUTES_AND_NAVIGATION.md

# Vendora Routes & Navigation

## Purpose

Defines every frontend route, navigation pattern and access rule. All
routing should follow this document.

---

# Route Groups

## Public

- /
- /products
- /products/:id
- /categories
- /stores
- /stores/:slug
- /stores/:slug/products
- /login
- /register
- /verify-email
- /forgot-password
- /reset-password

Navbar: Home, Products, Categories, Stores, Search, Cart, Login/Profile

---

## Customer (Protected)

Layout: CustomerLayout

Routes: - /account - /account/profile - /account/addresses - /cart -
/checkout - /orders - /orders/:id

Sidebar: Dashboard Profile Addresses Orders Cart Logout

---

## Vendor (Protected)

Layout: VendorLayout

Routes: - /vendor - /vendor/application - /vendor/application-status -
/vendor/store - /vendor/products - /vendor/products/new -
/vendor/products/:id/edit - /vendor/orders

Sidebar: Dashboard Store Products Orders Application Logout

---

## Admin (Protected)

Layout: AdminLayout

Routes: - /admin - /admin/vendors/applications - /admin/users -
/admin/vendors - /admin/products - /admin/orders - /admin/orders/:id

Sidebar: Dashboard Vendor Applications Users Vendors Products Orders
Logout

---

# Navigation Rules

- Active navigation item should be highlighted.
- Breadcrumbs on dashboard pages.
- Preserve search/filter state where practical.
- Mobile uses collapsible drawer navigation.

---

# Route Protection

Guest: Public routes only.

Customer: Customer routes + public.

Vendor: Vendor routes + public.

Admin: Admin routes + public.

Unauthorized access redirects to /unauthorized.

---

# Special Pages

404: Displayed for unknown routes.

Unauthorized: Displayed when role lacks permission.

Maintenance: Reserved for future use.

---

# UX

Every route should support: - Loading skeleton - Error state - Empty
state where applicable - Scroll restoration - Responsive navigation

---

# AI Rules

- Do not create undocumented routes.
- Use nested routing.
- Keep layouts reusable.
- Respect role-based access.

This document is the routing source of truth.
```

## 7. 06_COMPONENT_LIBRARY.md

```md
# 06_COMPONENT_LIBRARY.md

# Vendora Component Library

## Purpose

Define all reusable UI components. Every page should be assembled from
these components instead of creating one-off implementations.

---

# Navigation Components

## Navbar

Contains: - Logo - Search - Categories - Cart - User Menu -
Login/Register (guest) - Responsive mobile menu

## Sidebar

Variants: - Customer - Vendor - Admin

Features: - Active route - Collapse - Icons - Profile section

## Footer

Contains: - Company - Categories - Help - Social links - Copyright

---

# Form Components

- Text Input
- Password Input
- Email Input
- Search Input
- Number Input
- Textarea
- Select
- Checkbox
- Radio
- Toggle Switch
- File Upload
- Image Upload
- OTP Input

All support: - Label - Helper text - Validation - Disabled - Loading -
Error

---

# Buttons

Variants: - Primary - Secondary - Outline - Ghost - Danger - Success -
Icon - Loading

States: - Default - Hover - Active - Focus - Disabled

---

# Ecommerce Components

## Product Card

Contains: - Product image - Name - Price - Category - Rating
placeholder - Add to Cart - Quick View placeholder

## Product Grid

Responsive grid using Product Cards.

## Store Card

Contains: - Logo - Banner - Store name - Description - Visit Store
button

## Category Card

Contains: - Icon/Image - Name - Product count placeholder

## Cart Item

Contains: - Image - Name - Quantity selector - Remove button - Price

## Order Card

Contains: - Order ID - Date - Items count - Total - Status badge - View
Details

## Address Card

Contains: - Name - Phone - Address - Default badge - Edit/Delete actions

---

# Dashboard Components

- Stats Card
- Analytics Chart Placeholder
- Recent Activity Card
- KPI Card
- Dashboard Table

---

# Table Components

Support: - Search - Filters - Sorting - Pagination - Row actions - Empty
state - Loading skeleton

---

# Feedback Components

- Toast
- Alert
- Banner
- Confirmation Dialog
- Success Modal
- Error Modal

---

# Utility Components

- Avatar
- Badge
- Breadcrumb
- Pagination
- Search Bar
- Filter Panel
- Tabs
- Accordion
- Drawer
- Modal
- Dropdown
- Tooltip
- Carousel
- Image Gallery

---

# Loading Components

- Full Screen Loader
- Spinner
- Skeleton Card
- Skeleton Table
- Skeleton Dashboard
- Skeleton Product Grid

---

# Empty States

Reusable empty state component with: - Illustration - Title -
Description - CTA Button

---

# Error States

Reusable error component with: - Illustration - Message - Retry Button

---

# Design Rules

- Reusable before creating new.
- Single responsibility.
- Responsive.
- Accessible.
- Consistent with DESIGN_SYSTEM.md.
- No duplicate UI patterns.

This document is the reusable component source of truth.
```

## 8. 07_PAGES.md

```md
# 07_PAGES.md

# Vendora Page Specifications

## Purpose

This document defines every major screen in the application. Each page
description should be treated as the UI specification.

---

# PUBLIC WEBSITE

## Home

Purpose: Introduce Vendora and help users discover products quickly.

Sections: - Navbar - Hero with search - Featured categories - Featured
stores - Trending products - New arrivals - Why choose Vendora -
Testimonials - Newsletter - Footer

Components: Navbar, SearchBar, ProductCard, StoreCard, CategoryCard,
Carousel, Footer.

States: Loading skeleton, empty placeholders, error banner.

---

## Products Listing

Purpose: Browse marketplace products.

Sections: - Search - Filters - Sort - Product grid - Pagination

Future: Wishlist placeholder.

Backend: GET /products

---

## Product Details

Sections: - Image gallery - Product information - Price - Add to Cart -
Store details - Category - Related products

Backend: GET /products/:id

---

## Categories

Grid of all categories.

Backend: GET /categories

---

## Stores

Grid of stores.

Backend: GET /stores

---

## Store Details

Sections: - Store banner - Logo - Description - Product listing

Backend: GET /stores/:slug GET /stores/:slug/products

---

# AUTHENTICATION

## Login

Fields: Email Password

Actions: Login Forgot Password Register

Backend: POST /login

---

## Register

Fields: Name Email Phone Password

Backend: POST /register

---

## Verify Email

OTP entry.

Backend: GET /send-verification-otp POST /verify-email

---

## Forgot Password

Email form.

Backend: POST /forgot-password

---

## Reset Password

OTP New Password Confirm Password

Backend: POST /verify-reset-password-otp POST /reset-password

---

# CUSTOMER

## Profile

Profile information.

Edit profile placeholder.

---

## Addresses

Address cards.

Actions: Add Edit Delete Set Default

Backend: Address APIs

---

## Cart

Product list.

Quantity controls.

Summary.

Checkout CTA.

Backend: Cart APIs

---

## Checkout

Address selection.

Order summary.

Payment placeholder.

Backend: Create Order

---

## Orders

Search.

Filter.

Order cards.

Backend: GET /orders

---

## Order Details

Timeline.

Items.

Shipping.

Payment.

Backend: GET /orders/:id

---

# VENDOR

## Dashboard

Statistics cards.

Recent orders.

Quick actions.

Analytics placeholder.

---

## Vendor Application

Multi-step form.

Backend: Vendor application API.

---

## Application Status

Pending.

Approved.

Rejected.

---

## Store Management

Edit store profile.

Backend: Store APIs.

---

## My Products

Search.

Filter.

Draft.

Published.

Archived.

Backend: Vendor product APIs.

---

## Create Product

Form with: Name Category Description Images Price Stock

---

## Edit Product

Reuse create product UI.

---

## Vendor Orders

Order table.

Actions: Confirm Ship Out for Delivery Deliver

Backend: Vendor order APIs.

---

# ADMIN

## Dashboard

KPIs.

Charts placeholder.

Recent activity.

---

## Vendor Applications

Approve.

Reject.

Reason dialog.

---

## Users

Search.

Role badges.

Status.

---

## Vendors

Suspend.

Activate.

Store preview.

---

## Products

Archive.

Activate.

Delete.

Preview.

---

## Orders

Refund.

Cancel.

Details.

---

## Order Details

Timeline.

Customer.

Vendor.

Products.

Refund status.

---

# COMMON PAGES

404

Unauthorized

Maintenance

Loading Skeletons

Empty States

Success Pages

These pages should reuse the global design system and components.
```

## 9. 08_API_MAPPING.md

```md
# 08_API_MAPPING.md

# Vendora Frontend API Mapping

## Purpose

This document maps every frontend page to the backend APIs and defines
when each API should be called.

---

# Authentication

## Login

Page: /login

API: POST /auth/login

Trigger: Submit login form.

Success: - Save auth state - Redirect by role - Show success toast

Failure: - Show validation error - Keep form values

Loading: Disable submit button.

---

## Register

API: POST /auth/register

Trigger: Register form submit.

Next: Redirect to email verification.

---

## Verify Email

APIs: GET /auth/send-verification-otp POST /auth/verify-email

---

## Forgot Password

API: POST /auth/forgot-password

---

## Reset Password

APIs: POST /auth/verify-reset-password-otp POST /auth/reset-password

---

# Home

Uses:

GET /products

GET /categories

GET /stores

Display: Featured products Categories Stores

Loading: Skeleton sections.

---

# Products Page

API: GET /products

Query Params: page limit search category minPrice maxPrice sort

Trigger: Initial load Search Filter change Sort change Pagination

Success: Render Product Grid.

Empty: No products found.

---

# Product Details

API: GET /products/:id

Trigger: Page load.

Display: Gallery Details Store Related placeholder

---

# Categories

API: GET /categories

---

# Stores

API: GET /stores

---

# Store Details

APIs:

GET /stores/:slug

GET /stores/:slug/products

---

# Customer Addresses

Create: POST /addresses

List: GET /addresses

Update: PATCH /addresses/:id

Delete: DELETE /addresses/:id

Default: PATCH /addresses/:id/default

---

# Cart

Add: POST /cart/items

Load: GET /cart

Update Quantity: PATCH /cart/items/:productId

Remove: DELETE /cart/items/:productId

Loading: Disable quantity controls during update.

---

# Checkout

Create Order:

POST /orders

On Success: Navigate to success page.

---

# Orders

List:

GET /orders

Details:

GET /orders/:id

Cancel:

PATCH /orders/:id/cancel

---

# Vendor Application

Apply:

POST /vendor/post

Status:

GET /vendor/application-status

Profile:

GET /vendor/me

---

# Store Management

Create: POST /stores

Update: PATCH /stores/:vendorId

Load: GET /stores/:vendorId

---

# Vendor Products

Create: POST /products

List: GET /products/my-products

Details: GET /products/:id

Publish: PATCH /products/:id/publish

Update: PATCH /products/:id

Delete: DELETE /products/:id

---

# Vendor Orders

List: GET /vendor-orders

Confirm: PATCH /vendor-orders/:id/confirm

Ship: PATCH /vendor-orders/:id/ship

Out For Delivery: PATCH /vendor-orders/:id/out-for-delivery

Deliver: PATCH /vendor-orders/:id/deliver

---

# Admin Dashboard

GET /admin/dashboard

---

# Admin Users

GET /admin/users

---

# Admin Vendors

GET /admin/vendors

PATCH /admin/vendors/:id/suspend

PATCH /admin/vendors/:id/active

---

# Vendor Applications

GET /admin/vendor-applications

PATCH /admin/vendor-applications/:id/approve

PATCH /admin/vendor-applications/:id/reject

---

# Admin Products

GET /admin/products

GET /admin/products/:id

PATCH /admin/products/:id/archive

PATCH /admin/products/:id/activate

DELETE /admin/products/:id

---

# Admin Orders

GET /admin/orders

GET /admin/orders/:id

PATCH /admin/orders/:id/cancel

PATCH /admin/orders/:id/refund

---

# Integration Rules

- Never hardcode API URLs.
- Use Axios instance.
- Read base URL from .env.
- Show loading UI for every request.
- Show toast on success.
- Show meaningful error messages.
- Never invent backend endpoints.
- Leave TODO comments where mock data exists.

This document is the frontend-backend integration source of truth.
```

## 10. 09_AI_RULES.md

```md
# 09_AI_RULES.md

# Vendora AI Development Rules

## Purpose

This document defines how any AI assistant (Lovable, Antigravity,
Cursor, Claude, ChatGPT, etc.) should work on the Vendora frontend.

---

# Required Reading Order

Before generating or modifying code, always read:

1.  01_PRODUCT.md
2.  02_TECH_STACK.md
3.  03_DESIGN_SYSTEM.md
4.  04_APP_STRUCTURE.md
5.  05_ROUTES_AND_NAVIGATION.md
6.  06_COMPONENT_LIBRARY.md
7.  07_PAGES.md
8.  08_API_MAPPING.md
9.  10_PROJECT_PROGRESS.md

Treat these documents as the single source of truth.

---

# Primary Responsibilities

- Build production-quality frontend.
- Follow the documented architecture.
- Reuse components whenever possible.
- Keep code clean and maintainable.

---

# Technology Rules

Use ONLY:

- React (latest stable)
- Vite
- JavaScript (NO TypeScript)
- Tailwind CSS
- React Router DOM
- Axios
- React Hook Form
- Zod
- Framer Motion
- Lucide React

Never introduce new libraries unless explicitly requested.

---

# Backend Rules

- Never invent backend APIs.
- Never rename backend endpoints.
- Never assume request or response structures.
- Use mock data until backend integration.
- Add TODO comments showing where APIs should be connected.

Example:

// TODO: Replace with GET /products

---

# Code Quality Rules

- Prefer reusable components.
- Keep components small.
- Separate UI from business logic.
- Use meaningful names.
- Avoid duplicated code.
- Lazy-load routes when appropriate.

---

# UI Rules

Every page must include:

- Loading state
- Empty state
- Error state
- Success feedback
- Responsive layout
- Accessible interactions

Use the design system consistently.

---

# Project Rules

- Never delete existing features without instruction.
- Extend the project instead of rewriting it.
- Maintain consistent folder structure.
- Respect role-based layouts.

---

# Progress Tracking

After completing a meaningful task:

1.  Update 10_PROJECT_PROGRESS.md
2.  Record completed work.
3.  Record current work.
4.  Record next task.

---

# Session Summary

At the end of every AI session provide:

- Files created
- Files modified
- Components created
- Pages completed
- Pending work
- Next recommended task

---

# If Something Is Missing

If documentation is unclear:

- Ask for clarification.
- Do not invent business logic.
- Do not guess backend behavior.

---

# Final Goal

Produce a frontend that is production-ready, scalable, maintainable,
visually consistent and fully compatible with the existing Vendora
backend.
```

## 11. 10_PROJECT_PROGRESS.md

```md
# 10_PROJECT_PROGRESS.md

# Vendora Frontend Project Progress

## Purpose

Track implementation progress so any developer or AI assistant can
continue work without losing context.

---

# Project Status

**Current Phase:** Frontend Planning & Documentation

Backend Status: ✅ Complete for MVP APIs

Frontend Status: 🟡 Planning

Documentation Status: ✅ Version 1 Complete

---

# Documentation

- [x] 01_PRODUCT.md
- [x] 02_TECH_STACK.md
- [x] 03_DESIGN_SYSTEM.md
- [x] 04_APP_STRUCTURE.md
- [x] 05_ROUTES_AND_NAVIGATION.md
- [x] 06_COMPONENT_LIBRARY.md
- [x] 07_PAGES.md
- [x] 08_API_MAPPING.md
- [x] 09_AI_RULES.md
- [x] 10_PROJECT_PROGRESS.md

---

# Frontend Modules

## Public Website

- [ ] Home
- [ ] Products
- [ ] Product Details
- [ ] Categories
- [ ] Stores
- [ ] Store Details

## Authentication

- [ ] Login
- [ ] Register
- [ ] Verify Email
- [ ] Forgot Password
- [ ] Reset Password

## Customer

- [ ] Dashboard
- [ ] Profile
- [ ] Addresses
- [ ] Cart
- [ ] Checkout
- [ ] Orders
- [ ] Order Details

## Vendor

- [ ] Dashboard
- [ ] Vendor Application
- [ ] Application Status
- [ ] Store Management
- [ ] Products
- [ ] Create Product
- [ ] Edit Product
- [ ] Orders

## Admin

- [ ] Dashboard
- [ ] Vendor Applications
- [ ] Users
- [ ] Vendors
- [ ] Products
- [ ] Orders
- [ ] Order Details

---

# Shared Components

- [ ] Navbar
- [ ] Footer
- [ ] Sidebar
- [ ] Product Card
- [ ] Store Card
- [ ] Category Card
- [ ] Search
- [ ] Pagination
- [ ] Modal
- [ ] Drawer
- [ ] Toast
- [ ] Skeleton Loader
- [ ] Empty State
- [ ] Error State

---

# Backend Integration

- [ ] Authentication
- [ ] Categories
- [ ] Products
- [ ] Stores
- [ ] Addresses
- [ ] Cart
- [ ] Orders
- [ ] Vendor
- [ ] Admin

---

# Future Features

- [ ] Reviews
- [ ] Wishlist
- [ ] Coupons
- [ ] Notifications
- [ ] Analytics
- [ ] Google Login
- [ ] Recommendations
- [ ] Recently Viewed
- [ ] Inventory Alerts

---

# Current Task

Generate production-quality frontend UI using Lovable based on the
documentation.

---

# Next Tasks

1.  Create complete UI.
2.  Replace mock data with backend APIs.
3.  Test all flows.
4.  Optimize responsiveness.
5.  Prepare production deployment.

---

# Notes

Update this document after every meaningful milestone.

Never remove completed history. Only append or update status.
```

## 12. 11_FRONTEND_CHECKLIST.md

```md
# 11_FRONTEND_CHECKLIST.md

# Production Checklist

## UI

- [ ] All pages complete
- [ ] All reusable components complete
- [ ] Consistent spacing
- [ ] Responsive layouts

## UX

- [ ] Loading states
- [ ] Skeletons
- [ ] Empty states
- [ ] Error states
- [ ] Success toasts
- [ ] Confirmation dialogs

## Accessibility

- [ ] Keyboard navigation
- [ ] Focus states
- [ ] Semantic HTML
- [ ] Color contrast

## Performance

- [ ] Lazy loading
- [ ] Optimized images
- [ ] Code splitting

## Backend

- [ ] Auth integrated
- [ ] Products
- [ ] Stores
- [ ] Cart
- [ ] Orders
- [ ] Vendor
- [ ] Admin

## Final

- [ ] No mock data
- [ ] No console errors
- [ ] Environment variables configured
- [ ] Build succeeds
```

## 13. Vendora_Frontend_PRD_MVP (1).md

```md
# Vendora Frontend PRD (MVP)

## Overview

Vendora is a multi-vendor marketplace with Guest, Customer, Vendor and
Admin roles.

## Goals

- Single React application
- AI-generated UI
- Manual API integration
- Responsive design
- Reusable components

## User Roles

### Guest

- Browse products
- Browse stores
- Browse categories
- Login/Register

### Customer

- Profile
- Addresses
- Cart
- Checkout
- Orders

### Vendor

- Application
- Store
- Products
- Orders

### Admin

- Dashboard
- Users
- Vendors
- Products
- Orders

## Public Routes

- /
- /login
- /register
- /forgot-password
- /products
- /products/:id
- /categories
- /stores
- /stores/:slug
- /stores/:slug/products

## Customer Routes

- /account
- /account/addresses
- /cart
- /orders
- /orders/:id

## Vendor Routes

- /vendor
- /vendor/application
- /vendor/store
- /vendor/products
- /vendor/orders

## Admin Routes

- /admin
- /admin/users
- /admin/vendors
- /admin/products
- /admin/orders

## API Modules

- Auth
- Address
- Category
- Product
- Store
- Cart
- Order
- Vendor
- Admin

## Shared Components

Navbar Footer Sidebar Cards Forms Tables Pagination Search Skeleton
Modal Toast

## Future Modules

- Reviews
- Wishlist
- Coupons
- Notifications
- Analytics
- Google Login
- Recommendations
- Recently Viewed
- Inventory Alerts

## Notes

- Generate UI only.
- Do not invent backend endpoints.
- Use reusable React components.
- API integration will be done manually.
```
