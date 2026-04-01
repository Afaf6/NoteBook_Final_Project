# 💰 Smart Finance Tracker API

## 📌 Overview

Smart Finance Tracker is a backend API designed to help users manage their finances efficiently. It allows users to track income, expenses, goals, habits, and subscriptions, while also providing intelligent insights based on their financial behavior.

---

## 🚀 Features

### 🔐 Authentication

* User registration & login
* Password hashing using bcrypt
* JWT-based authentication
* Protected routes

### 💵 Income Module

* Add income
* Update income
* Delete income
* Get total income (using aggregation)

### 💸 Expense Module

* Add expense
* Delete expense
* Get monthly expenses

### 🎯 Goals Module

* Create, update, delete goals
* Track goal progress
* Deadline tracking

### 🔁 Habits Module

* Create habits
* Mark habits as completed
* Track completion history
* Streak calculation
* Success rate calculation

### 📺 Subscription Module

* Add, update, delete subscriptions
* Track usage frequency
* Cost-per-use calculation
* Health score system
* Smart recommendations

### 📊 Dashboard

* Total income
* Total expenses (including subscriptions)
* Balance calculation
* Bad subscriptions detection
* Possible savings calculation
* Subscription-to-income ratio
* Smart insights

### 🔔 Notifications System

* Goal deadline alerts
* Subscription warnings
* Stored in database

---

## 🧠 Smart Features

* Detect unused subscriptions
* Suggest cancelling low-usage subscriptions
* Recommend yearly plans for heavy usage
* Analyze financial health
* Generate dynamic insight messages

---

## ⚙️ Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcrypt

---

## 🗂️ Project Structure

```
project/
│
├── controllers/
├── models/
├── routes/
├── middleware/
├── utils/
├── validation/
├── cron/
└── app.js
```

---

## 🔄 API Flow Example (POST Request)

1. Request sent from client (Postman / Frontend)
2. Route receives request
3. Middleware (auth + validation)
4. Controller handles logic
5. Database interaction (MongoDB)
6. Response sent back to client

---

## 📬 Example Endpoints

### Auth

* POST `/api/auth/register`
* POST `/api/auth/login`

### Income

* POST `/api/income/add`
* GET `/api/income/total`

### Expense

* POST `/api/expense/add`
* GET `/api/expense/monthly`

### Subscription

* POST `/api/subscription/add`
* GET `/api/subscription/analytics`

### Dashboard

* GET `/api/dashboard`

---

## 🧪 Testing

* Tested using Postman
* All routes protected using JWT

---

## 💡 Future Improvements

* Real-time notifications (Socket.io)
* Charts & data visualization

---

## 👩‍💻 Author

Developed by Afaf Tawfek 🚀

---

## ⭐ Final Note

This project demonstrates backend development skills including API design, authentication, data analysis, and clean architecture principles.
