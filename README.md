# Expense Tracker

## Note:
Use **email**: `test@gmail.com` and **password**: `1234` for prefilled data.

## Overview
The Expense Tracker is a full-stack web application designed to help users manage their finances. It allows users to track their expenses, analyze their spending patterns, and gain valuable insights into their financial habits. This application employs a secure JWT-based authentication system, with features like transaction management and spending insights.

---

## Getting Started

### Prerequisites
- Install [Node.js](https://nodejs.org/) (LTS version recommended)
- Install [MongoDB](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/atlas/database)

### Clone the Repository
```sh
git clone https://github.com/yourusername/expense-tracker.git
cd expense-tracker
```

### Backend Setup
1. Navigate to the backend folder:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a **.env** file in the `backend` directory and set the required environment variables:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```
4. Start the backend server:
   ```sh
   npm run dev
   ```
   The server should start on `http://localhost:5000/`

### Frontend Setup
1. Navigate to the frontend folder:
   ```sh
   cd ../frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a **.env** file in the `frontend` directory and set the required environment variables:
   ```env
   REACT_APP_BACKEND_URL=http://localhost:5000
   ```
4. Start the frontend server:
   ```sh
   npm start
   ```
   The frontend should be available on `http://localhost:3000/`

---

## Approach Taken

### 1. Database Setup
- **MongoDB Atlas**:
  - Chosen for its cloud-hosted database solution, eliminating local database management.
  - Database structure includes:
    - **User** schema: Stores user details and transactions.
    - **Transaction** schema: Stores transaction details like amount, category, date, and user association.
  - Proper access controls ensure secure connections, with monitoring enabled.

---

### 2. JWT Authentication Implementation
- **Login Flow**:
  - Upon login, a JWT is generated and stored in HTTP-only cookies.
- **Middleware**:
  - Validates JWT for protected routes.
- **Token Expiry & Refresh**:
  - JWT expires after a set duration, and a refresh mechanism keeps users logged in.

---

### 3. Expense Management
- **Features**:
  - **Add Transaction**: Users can record expenses.
  - **View Transactions**: Users can list and sort transactions.
  - **Delete Transaction**: Users can remove transactions.
- **Backend Implementation**:
  - RESTful API endpoints for CRUD operations.

---

### 4. Spending Insights
- **Purpose**:
  - Provide an overview of spending habits.
- **Features**:
  - **Total Spending**: Aggregates all transactions.
  - **Category Breakdown**: Displays categorized spending.
  - **Monthly Trends**: Analyzes trends over time.
- **Backend Implementation**:
  - Uses aggregation to summarize transaction data.

---

### 5. Frontend Implementation
- **React & Material-UI**:
  - UI components ensure a modern, responsive design.
- **State Management**:
  - Context API maintains global state.
- **Charts & Graphs**:
  - Recharts library visualizes spending insights.

---

### 6. Security Measures
- **Password Hashing**:
  - Ensures stored passwords remain encrypted.
- **JWT Storage**:
  - Stored in HTTP-only cookies to prevent XSS attacks.
- **Data Validation**:
  - Input validation on both client and server sides.

---

### 7. Performance Considerations
- **Database Optimization**:
  - Indexing and connection pooling for efficient queries.
- **Backend Optimization**:
  - Well-structured API endpoints and error handling.
- **Frontend Optimization**:
  - React optimizations like lazy loading and efficient state management.

---