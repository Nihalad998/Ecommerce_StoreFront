# Angular E-Commerce Storefront & Admin Dashboard

A modern, high-performance E-Commerce platform built with Angular 18, Signals, SSR (Server-Side Rendering), Hydration, Tailwind CSS, RxJS, and Chart.js.

This project simulates a real-world online shopping experience with a customer-facing storefront and a fully responsive admin dashboard for product management, order tracking, inventory monitoring, and business analytics.
---

# 🚀 Project Overview

The goal of this project was to build a scalable and production-ready e-commerce application while exploring modern Angular features such as:

* Angular Signals
* Computed Signals
* Standalone Components
* SSR & Hydration
* Infinite Scrolling
* OnPush Change Detection
* RxJS Integration
* Modern Dashboard Architecture

The application consists of two major modules:

## Storefront

A customer-facing shopping platform.

## Admin Dashboard

A business management panel with analytics and inventory insights.

---

# 🌟 Key Features

## Customer Storefront

### Product Catalog

* Browse products from API
* Responsive product grid
* Search functionality
* Category filtering
* Product sorting
* Infinite scrolling
* Optimized image loading

### Product Details

* Product images
* Product description
* Ratings
* Category information
* Price details

### Wishlist

Users can:

* Add products to wishlist
* Remove products from wishlist
* View total wishlist items

Wishlist state is managed using Angular Signals.

---

### Shopping Cart

Features include:

* Add to cart
* Remove from cart
* Increase quantity
* Decrease quantity
* Live total calculation
* Cart badge counter
* Sliding cart drawer

Cart state is maintained using a Signal-based store.

---

### Checkout Flow

* Order summary
* Tax calculation
* Shipping calculation
* Order creation
* Cart clearing after successful checkout

---

### Orders Management

Customers can:

* View previous orders
* Track order status
* View purchased items
* Access detailed order information

---

# 📊 Admin Dashboard

A fully responsive management dashboard designed to simulate a real business environment.

---

## Dashboard Overview

Provides quick insights into:

### Revenue

Real-time revenue metrics.

### Orders

Tracks order volume.

### Customers

Displays customer count.

### Products

Displays total products available.

---

## Recent Orders

Recent orders are automatically derived from the Order Store.

Features:

* Order ID
* Customer Name
* Order Amount
* Order Status
* Recent Activity Tracking

---

## Inventory Alerts

Automatically generated from product stock levels.

Shows:

* Low-stock products
* Product name
* Remaining stock quantity

This simulates inventory monitoring commonly used in real e-commerce systems.

---

## Product Management

Features:

### Product Search

Search by:

* Product name
* Category

### Sorting

Sort by:

* Product ID
* Name
* Stock
* Price

### Low Stock Filter

Quickly identify products requiring replenishment.

### Pagination

Efficient navigation through large product datasets.

---

## Orders Management

Advanced order management system including:

### Search

Search by:

* Order ID
* Customer Name

### Status Filtering

Filter by:

* Delivered
* Pending
* Cancelled

### Order Details Drawer

Displays:

* Customer information
* Purchased items
* Total amount
* Order status

---

## Analytics Dashboard

Built using Chart.js.

Includes:

### Revenue Trend

Visualizes revenue growth over time.

### Orders Trend

Displays monthly order activity.

### Category Distribution

Shows category-wise product distribution.

Charts are generated dynamically using analytics services and real product data.

---

# ⚡ Performance Optimizations

## Angular SSR

Server-side rendering improves:

* SEO
* Initial page load
* User experience

---

## Angular Hydration

Hydration prevents unnecessary DOM re-rendering by attaching Angular logic to server-rendered HTML.

Example:

```text
Angular hydrated 27 component(s) and 733 node(s)
```

This confirms successful hydration.

---

## Infinite Scroll

Instead of rendering all products at once:

```text
1000 Products
↓
20 Loaded Initially
↓
More Loaded On Scroll
```

Benefits:

* Reduced DOM size
* Faster rendering
* Better performance

---

## Image Optimization

Implemented:

* Lazy Loading
* LCP Optimization
* Optimized product images

---

## OnPush Change Detection

Used throughout the dashboard to minimize unnecessary re-renders.

Benefits:

* Improved responsiveness
* Better memory usage

---

## Signals-Based State Management

Application state is managed using Angular Signals.

Stores include:

### Product Store

Handles:

* Products
* Search
* Sorting
* Filtering

### Cart Store

Handles:

* Cart items
* Quantity updates
* Total calculations

### Wishlist Store

Handles wishlist operations.

### Order Store

Handles customer orders.

### UI Store

Manages:

* Cart drawer
* Mobile filters
* UI interactions

---

# 🛠 Tech Stack

## Frontend

* Angular 18
* TypeScript
* Tailwind CSS
* RxJS

## State Management

* Angular Signals
* Computed Signals

## Data Visualization

* Chart.js

## Rendering

* Angular SSR
* Angular Hydration

## Mock Data

* Faker.js

---

# 📈 Challenges Solved

### SSR Compatibility

Resolved browser-specific APIs:

* localStorage
* window
* document

using Angular SSR best practices.

---

### Hydration Issues

Ensured:

* Stable DOM structure
* SSR-safe rendering
* Successful hydration

---

### Large Product Lists

Implemented:

* Infinite scrolling
* Lazy loading

to improve performance.

---

### Reactive Dashboard

Created a dashboard that updates automatically when:

* Orders are placed
* Revenue changes
* Analytics data changes

---
