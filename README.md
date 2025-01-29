# Expense Tracker

## Overview
The Expense Tracker is a full-stack web application designed to help users manage their finances. It allows users to track their expenses, analyze their spending patterns, and gain valuable insights into their financial habits. This application employs a secure JWT-based authentication system, with features like transaction management and spending insights.

---

## Approach Taken

### 1. Database Setup

- **MongoDB Atlas**: 
  - MongoDB Atlas was chosen for its cloud-hosted database solution, eliminating the need for local database management and providing automatic scaling and backups.
  - The database structure is designed with two key entities: **User** and **Transaction**.
    - The **User** schema stores the user’s name, email, password (hashed), and associated transactions.
    - The **Transaction** schema stores information related to each financial transaction, such as the amount, category, description, date, and the user associated with the transaction.
  - The MongoDB Atlas environment was configured with proper access controls, ensuring secure connections and efficient database performance through connection pooling and monitoring.

---

### 2. JWT Authentication Implementation

- **Purpose**: 
  - To implement secure, stateless authentication for the application. The user’s identity is verified using a JSON Web Token (JWT), which is stored in HTTP-only cookies to prevent exposure to JavaScript.
  
- **Login Flow**:
  - Upon successful login with credentials (email and password), the server generates a JWT that is sent back to the client and stored in an HTTP-only cookie. This ensures secure handling of authentication tokens.
  
- **Authentication Middleware**:
  - The JWT is included in the request headers for subsequent requests to protected routes. The server checks the validity of the token, and if valid, allows access. If the token is invalid or expired, an error is returned.
  
- **Token Expiry & Refresh**:
  - The JWT has an expiry time (e.g., 1 hour). When the token expires, a refresh token mechanism allows the user to obtain a new JWT, keeping them logged in without needing to re-enter credentials.

---

### 3. Expense Management

- **Purpose**: 
  - To enable users to track their spending by adding, updating, and deleting financial transactions.
  
- **Features**:
  - **Add Transaction**: Users can record new expenses by providing details such as title, amount, category, description, and transaction type.
  - **View Transactions**: Users can retrieve a list of all their transactions, sorted by date or category.
  - **Delete Transaction**: Users can remove any transaction from their list of expenses.
  
- **Backend Implementation**:
  - The server implements RESTful API endpoints to handle the CRUD operations for transactions. The transactions are stored in MongoDB and are associated with the authenticated user.

---

### 4. Spending Insights

- **Purpose**:
  - To provide users with an overview of their spending habits by offering insights into total spending, breakdown by category, and monthly trends.
  
- **Features**:
  - **Total Spending**: The application aggregates all transactions to show the total amount spent by the user.
  - **Category Breakdown**: The spending is categorized (e.g., Food, Transport, Entertainment), helping the user understand where most of their money is being spent.
  - **Monthly Trends**: The application groups transactions by month, displaying spending trends over time.

- **Backend Implementation**:
  - The server calculates the spending summary by aggregating the transaction data from the database. This includes calculating total spending, categorizing the expenses, and grouping them by month for trend analysis.

---

### 5. Frontend Implementation

- **React Application**:
  - The frontend of the application is built using **React**, providing a dynamic and responsive user interface.
  - The user interface is divided into reusable components that handle the presentation of data and user interactions.
  - Material-UI is used for consistent and modern styling, while **Recharts** is employed for visualizing spending insights in the form of charts and graphs.
  
- **State Management**:
  - Centralized state management using React’s Context API helps maintain the application’s state across various components and ensures seamless interaction between frontend and backend.

---

### 6. Security Measures

- **Password Hashing**:
  - User passwords are hashed before being stored in the database to ensure they are not stored in plain text.
  
- **JWT Storage**:
  - JWT tokens are stored in **HTTP-only cookies** to ensure they are not exposed to JavaScript, reducing the risk of cross-site scripting (XSS) attacks.
  
- **Data Validation**:
  - Input validation is performed on both the client and server sides to prevent malicious data from being processed and stored in the database.

---

### 7. Performance Considerations

- **Database Optimization**:
  - MongoDB Atlas is leveraged for efficient query handling with proper indexing strategies.
  - Connection pooling is used to manage database connections efficiently.

- **Backend Optimization**:
  - Efficient database queries, proper data validation, and error handling ensure that the server performs well under load.

- **Frontend Optimization**:
  - React components are optimized for performance, with lazy loading and state management techniques to reduce unnecessary re-renders.

---

### Conclusion

The **Expense Tracker** was developed with a focus on security, efficiency, and user experience. Key decisions such as using MongoDB Atlas, implementing JWT authentication, and providing insightful spending analytics through charts and graphs were aimed at ensuring a seamless and secure experience for users.

By combining a secure backend with a responsive frontend and data-driven insights, the application enables users to track and manage their finances effectively.
