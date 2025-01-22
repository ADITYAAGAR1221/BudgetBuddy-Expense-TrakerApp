DB schema
![db shema](https://github.com/user-attachments/assets/174521e9-0966-414b-8dba-0d592cee8913)BudgetBuddy - Expense Tracker App
Project Description:
BudgetBuddy is a comprehensive expense tracker app designed to help users 
efficiently manage their finances. The app allows users to track their income and expenses, 
categorize transactions, and gain insights into their spending habits through intuitive data
visualizations. Built with a user-centric approach, BudgetBuddy combines seamless functionality 
with robust data security, making it an ideal tool for personal financial management.


Key Features:

1. User Authentication:
2. Expense Management:
3. Expense Insights:
4. Filtering and Reporting:
5. User-Friendly Design:
6. Backend and Database:
7. Data Security:

Tech Stack:

Frontend: ReactJS, HTML, CSS, Bootstrap
Backend: Node.js, Express.js
Database: PostgreSQL
Version Control: Git and GitHub


Potential Future Enhancements:
Integration of recurring expenses for subscriptions or regular bills.
Multi-currency support for global users.
Notification system for budget limits or expense tracking reminders.
Advanced analytics for financial forecasting.


BudgetBuddy empowers users to take control of their finances with an 
easy-to-use yet powerful platform. It's not just an app—it's a step towards 
smarter financial decisions.







//Setup instructions.


Setup Instructions for BudgetBuddy
Follow these step-by-step instructions to set up and run the BudgetBuddy application on your local machine:

Prerequisites
Ensure you have the following installed on your system:

Node.js (version 16 or above)
Download Node.js
PostgreSQL (for the database)
Download PostgreSQL
Firebase Account
Create a project in Firebase and enable authentication (email/password).
Git (for cloning the repository)
Download Git
Steps to Set Up
1. Clone the Repository
bash
Copy
Edit
git clone <repository_url>
cd BudgetBuddy
2. Set Up the Backend
Navigate to the backend folder:

bash
Copy
Edit
cd backend
Install dependencies:

bash
Copy
Edit
npm install
Set up the PostgreSQL database:

Create a database (e.g., budgetbuddy_db) using your PostgreSQL client.
Run the provided SQL script (if available) to set up the database schema.
Configure the environment variables:

Create a .env file in the backend directory:
plaintext
Copy
Edit
PORT=5000
DATABASE_URL=postgresql://<username>:<password>@localhost:5432/budgetbuddy_db
JWT_SECRET=your_jwt_secret_key
Replace <username>, <password>, and budgetbuddy_db with your PostgreSQL credentials.
Start the backend server:

bash
Copy
Edit
npm start
The backend will run on http://localhost:5000.

3. Set Up the Frontend
Navigate to the frontend folder:

bash
Copy
Edit
cd ../frontend
Install dependencies:

bash
Copy
Edit
npm install
Configure Firebase:

Copy your Firebase project configuration from the Firebase console.
Create a firebaseConfig.js file in the frontend/src/libs folder and paste the configuration:
javascript
Copy
Edit
const firebaseConfig = {
  apiKey: "your_api_key",
  authDomain: "your_auth_domain",
  projectId: "your_project_id",
  storageBucket: "your_storage_bucket",
  messagingSenderId: "your_messaging_sender_id",
  appId: "your_app_id",
};

export default firebaseConfig;
Start the frontend server:

bash
Copy
Edit
npm start
The frontend will run on http://localhost:3000.

4. Test the Application
Open your browser and navigate to http://localhost:3000.
Sign up or log in using the Firebase authentication system.
Add categories, income, and expenses to see the app in action.
Additional Commands
Backend
Run the backend in development mode:
bash
Copy
Edit
npm run dev
Run migrations for PostgreSQL (if applicable):
bash
Copy
Edit
npm run migrate
Frontend
Build the React app for production:
bash
Copy
Edit
npm run build
Deploy the frontend (optional): Deploy the app to platforms like Netlify, Vercel, or any static hosting service.
Troubleshooting
Database Connection Issues:

Verify your PostgreSQL credentials in the .env file.
Ensure the database is running on the specified port.
Firebase Errors:

Double-check your Firebase project settings and API keys.
Frontend/Backend Communication Issues:

Ensure the backend URL in the frontend matches your running backend server.
After completing these steps, you’ll have BudgetBuddy running locally, ready to track and manage your finances! 🎉




//Sample API usage

Sample API Usage for BudgetBuddy
Below are examples of how to interact with the BudgetBuddy API endpoints. These examples assume the backend is running at http://localhost:5000. Replace localhost with your deployed backend URL if applicable.

1. User Authentication
Sign Up
Endpoint: POST /api/auth/sign-up
Description: Registers a new user.

Request:

json
Copy
Edit
{
  "firstName": "John",
  "email": "john.doe@example.com",
  "password": "securepassword"
}
Response:

json
Copy
Edit
{
  "status": "success",
  "message": "User account created successfully",
  "user": {
    "id": 1,
    "firstName": "John",
    "email": "john.doe@example.com"
  }
}
Sign In
Endpoint: POST /api/auth/sign-in
Description: Logs in an existing user.

Request:

json
Copy
Edit
{
  "email": "john.doe@example.com",
  "password": "securepassword"
}
Response:

json
Copy
Edit
{
  "status": "success",
  "message": "Login successfully",
  "user": {
    "id": 1,
    "firstName": "John",
    "email": "john.doe@example.com"
  },
  "token": "jwt_token_here"
}
2. Categories
Get All Categories
Endpoint: GET /api/categories
Description: Fetches all categories.

Headers:

json
Copy
Edit
{
  "Authorization": "Bearer jwt_token_here"
}
Response:

json
Copy
Edit
{
  "status": "success",
  "categories": [
    { "id": 1, "name": "Food" },
    { "id": 2, "name": "Rent" },
    { "id": 3, "name": "Travel" }
  ]
}
Add Category
Endpoint: POST /api/categories
Description: Adds a new category.

Headers:

json
Copy
Edit
{
  "Authorization": "Bearer jwt_token_here"
}
Request:

json
Copy
Edit
{
  "name": "Entertainment"
}
Response:

json
Copy
Edit
{
  "status": "success",
  "message": "Category added successfully",
  "category": {
    "id": 4,
    "name": "Entertainment"
  }
}
3. Expenses
Add Expense
Endpoint: POST /api/expenses
Description: Adds a new expense record.

Headers:

json
Copy
Edit
{
  "Authorization": "Bearer jwt_token_here"
}
Request:

json
Copy
Edit
{
  "date": "2025-01-20",
  "category_id": 1,
  "amount": 500,
  "description": "Grocery shopping"
}
Response:

json
Copy
Edit
{
  "status": "success",
  "message": "Expense added successfully",
  "expense": {
    "id": 1,
    "date": "2025-01-20",
    "category_id": 1,
    "amount": 500,
    "description": "Grocery shopping"
  }
}
Get Expenses by Category
Endpoint: GET /api/expenses?category_id=1
Description: Fetches all expenses for a specific category.

Headers:

json
Copy
Edit
{
  "Authorization": "Bearer jwt_token_here"
}
Response:

json
Copy
Edit
{
  "status": "success",
  "expenses": [
    {
      "id": 1,
      "date": "2025-01-20",
      "category_id": 1,
      "amount": 500,
      "description": "Grocery shopping"
    }
  ]
}
Delete Expense
Endpoint: DELETE /api/expenses/:id
Description: Deletes an expense by ID.

Headers:

json
Copy
Edit
{
  "Authorization": "Bearer jwt_token_here"
}
Response:

json
Copy
Edit
{
  "status": "success",
  "message": "Expense deleted successfully"
}
4. Summary
Get Expense Summary
Endpoint: GET /api/summary
Description: Generates a summary of expenses grouped by category.

Headers:

json
Copy
Edit
{
  "Authorization": "Bearer jwt_token_here"
}
Response:

json
Copy
Edit
{
  "status": "success",
  "summary": [
    { "category": "Food", "total": 1500 },
    { "category": "Rent", "total": 5000 },
    { "category": "Travel", "total": 800 }
  ]
}
5. Reports
Monthly Expense Report
Endpoint: GET /api/reports?month=01&year=2025
Description: Fetches a monthly expense report grouped by category.

Headers:

json
Copy
Edit
{
  "Authorization": "Bearer jwt_token_here"
}
Response:

json
Copy
Edit
{
  "status": "success",
  "report": [
    { "category": "Food", "total": 1000 },
    { "category": "Travel", "total": 300 }
  ]
}
Testing the APIs
Use tools like Postman or cURL to test the API endpoints.
Ensure you include the JWT token in the Authorization header for protected routes.
With these API endpoints, you can perform all essential operations for the BudgetBuddy app, including user authentication, managing categories, adding expenses, and generating reports.


