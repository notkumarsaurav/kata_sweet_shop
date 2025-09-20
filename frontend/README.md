# KATA Sweet Shop Management System

A full-stack web application built as part of a TDD (Test-Driven Development) Kata. This system allows for the management of a sweet shop's inventory, including features for user authentication, role-based access control (Admin vs. User), and complete CRUD (Create, Read, Update, Delete) operations for sweets.

## ✨ Features

- **Full User Authentication**: Secure user registration and login using JWT (JSON Web Tokens).
- **Role-Based Access Control**: Distinct privileges for regular users and administrators. Admins can add, update, and delete sweets, while regular users can only view and purchase.
- **Complete Inventory Management**: Functionality to add new sweets, edit existing ones, delete them, and manage stock levels (purchase and restock).
- **Dynamic Frontend**: A responsive and interactive user interface built with React and Material-UI.
- **Robust Backend**: A powerful RESTful API built with Node.js, Express, and Prisma ORM.
- **Database Integration**: Persists all data in a PostgreSQL database.
- **Comprehensive Testing**: Backend logic is thoroughly tested using Vitest, following a TDD workflow.

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Material-UI, Axios, React Router
- **Backend**: Node.js, Express.js, Prisma, PostgreSQL
- **Testing**: Vitest
- **Authentication**: JWT, bcrypt.js

## 📸 Screenshots

*(You should replace these placeholders with your actual screenshots)*

**Login Page**


**Main Inventory (Admin View)**


**Main Inventory (User View)**


## 🚀 Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

- Node.js (v18 or later)
- npm
- Git
- A running PostgreSQL instance

### Local Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/notkumarsaurav/Kata_sweet_shop.git](https://github.com/notkumarsaurav/Kata_sweet_shop.git)
    cd Kata_sweet_shop
    ```

2.  **Setup the Backend:**
    ```bash
    cd backend
    npm install
    ```
    - Create a `.env` file in the `backend` directory and add your database connection string:
      ```env
      DATABASE_URL="postgresql://YOUR_USER:YOUR_PASSWORD@localhost:5432/sweetshop"
      JWT_SECRET="YOUR_SUPER_SECRET_KEY_GOES_HERE"
      ```
    - Run the database migration to create the tables:
      ```bash
      npx prisma migrate dev
      ```

3.  **Setup the Frontend:**
    ```bash
    cd ../frontend
    npm install
    ```
    - Create a `.env` file in the `frontend` directory and add the API base URL:
      ```env
      VITE_API_BASE_URL=http://localhost:3000/api
      ```

4.  **Run the Application:**
    - In the **backend** terminal, run:
      ```bash
      npm run dev
      ```
    - In a **separate frontend** terminal, run:
      ```bash
      npm run dev
      ```
    - The frontend will be available at `http://localhost:5173` (or another port if 5173 is busy).

## 🧪 Running Tests

To run the backend tests and see the coverage report, navigate to the `backend` directory and run:

```bash
npm test -- --coverage
```

## 🤖 My AI Usage

This project was developed with significant assistance from Google's Gemini, adhering to the AI co-authorship policy of the kata. The AI was utilized as a pair programming partner throughout the development lifecycle.

-   **Backend Development**: Gemini provided the foundational code for the Express server, Prisma schema, and service-layer logic. It guided the implementation of complex features like JWT-based user authentication, password hashing with `bcrypt`, and role-based access control using custom middleware.
-   **Frontend Development**: It supplied the boilerplate and logic for key React components, including the implementation of a global `AuthContext` for state management, creating dynamic components that react to user roles, and setting up an Axios instance with interceptors to automatically handle authentication tokens.
-   **Test-Driven Development (TDD)**: Gemini generated the test files for the backend services, following the TDD methodology. It wrote failing tests first and then provided the application code to make them pass. It also refactored the tests to handle asynchronous database operations and proper test database cleanup.
-   **Debugging**: Throughout the project, Gemini was instrumental in debugging a wide range of errors, from simple syntax mistakes to complex issues like CORS policies, React Router configuration problems, and failed test suites. It explained the root cause of each error and provided the corrected code.

**Reflection**: Using an AI assistant like Gemini dramatically accelerated the development process. It acted as an expert resource, providing best-practice patterns (like Axios interceptors and Context API) and eliminating long periods of being "stuck" on a bug. This allowed me to focus more on understanding the high-level architecture and the flow of the application rather than getting bogged down in implementation details or syntax.