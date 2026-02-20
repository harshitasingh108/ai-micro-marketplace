# AI Micro Marketplace (Full Stack)

A simple micro-marketplace web app built with Node.js, Express, MongoDB and React.  
Users can register/login, browse products, search, paginate and add favorites.

---

## 🔧 Tech Stack

Backend:
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication

Frontend:
- React (to be added)
- Responsive UI

---

## 🚀 Setup (Backend)

1. Clone repo
git clone <your-repo-link>

2. Go to backend
cd backend

3. Install packages
npm install

4. Run server
npm run dev

Server runs on:
http://localhost:3000

---

## 🌱 Seed Data

Run:
node seed.js

This will create:
- 10 products
- 2 users

Test login:
username: harshita  
password: 123456

---

## 🔑 Auth Routes

POST /auth/register  
POST /auth/login  

---

## 📦 Product Routes

POST /products  
GET /products  
GET /products?search=logo&page=1&limit=5  
GET /products/:id  
DELETE /products/:id  

---

## ⭐ Favorites Routes

POST /favorites/add  
POST /favorites/remove  
GET /favorites/:userId  

---

## 📌 Features

- JWT login/register
- Product CRUD
- Search + pagination
- Favorites system
- Seed data
- Clean API structure

---

## 🧠 Author
Harshita
