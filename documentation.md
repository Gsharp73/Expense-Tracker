# Documentation

## Overview
This document provides a brief overview of the JWT authentication implementation, the expense management API, and the spending insights endpoint for the Expense Tracker application.

---

## 1. JWT Implementation

### Purpose:
The JWT implementation is used to provide secure and stateless authentication and authorization for the Expense Tracker. Users must authenticate themselves to gain access to protected resources, such as managing transactions and viewing spending insights.

### Flow:
1. **Login**:
   - Users authenticate by submitting their credentials (email and password). 
   - If the credentials are valid, the server generates a JWT token and sends it back to the client.
   - The token is stored securely in HTTP-only cookies to prevent unauthorized access.

2. **Authentication Middleware**:
   - Each time a protected route is accessed, the server checks if a valid JWT token is included in the request.
   - If the token is valid, the user is allowed to proceed. If invalid, the server responds with an error, indicating the need for valid authentication.

3. **Token Expiry and Refresh**:
   - JWT tokens have an expiry time (e.g., 1 hour). When the token expires, users can refresh the token using a refresh token, allowing them to remain logged in without requiring re-authentication.

### Security Measures:
- Passwords are hashed before storing them in the database to ensure sensitive information is protected.
- Tokens are securely stored in HTTP-only cookies to prevent exposure to JavaScript, minimizing the risk of cross-site scripting (XSS) attacks.
- The server validates the tokens using a secret key that is securely stored.

---

## 2. Expense Management

### Purpose:
The expense management functionality allows users to create, update, delete, and view their transactions. This is central to the Expense Tracker as it enables users to monitor their financial activities.

### Features:
- **Add Transaction**: Users can add new transactions with details like title, amount, category, description, transaction type, and date.
- **View Transactions**: Users can retrieve a list of all their recorded transactions.
- **Delete Transaction**: Users can delete a specific transaction when needed.

### Workflow:
- When users submit a new transaction, the server saves the transaction data in the database and associates it with the authenticated user.
- For viewing transactions, the server fetches all the transactions associated with the authenticated user.
- For deleting a transaction, the user provides the transaction ID, and the server deletes it from the database.

---

## 3. Spending Insights Endpoint

### Purpose:
The spending insights endpoint provides users with detailed analytics of their spending patterns, allowing them to understand their financial habits and identify areas for improvement.

### Features:
- **Total Spending**: The endpoint calculates the total amount spent by the user across all transactions.
- **Category Breakdown**: It provides a breakdown of spending by category (e.g., Food, Transport, Entertainment), helping users understand where most of their money is going.
- **Monthly Trends**: Users can see trends in their spending on a monthly basis, which allows them to track how their spending changes over time.

### Workflow:
- The server aggregates the user’s transactions to calculate the total spending and break down the amounts by category.
- Monthly trends are calculated by grouping transactions by their date and summing the amounts for each month.
- The server then responds with a summary of total spending, category breakdowns, and monthly trends.

---

## Conclusion
- **JWT Implementation**: Provides secure and stateless authentication, ensuring only authorized users can access protected resources.
- **Expense Management**: Allows users to manage their transactions by providing essential CRUD operations.
- **Spending Insights**: Offers valuable insights into users' spending habits, including total spending, category breakdowns, and monthly trends, helping them make informed financial decisions.
