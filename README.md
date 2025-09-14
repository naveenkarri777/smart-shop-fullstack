🛍️ Smart Shop – Full Stack E-Commerce Application

Smart Shop is a full-stack MERN e-commerce platform where users can browse products, manage their cart, place orders, and make secure payments.
It comes with an admin dashboard to manage products, categories, and orders.

## 🌐 Live Demo

🔗 [Click here to visit Smart Shop](https://smart-shop-fullstack.vercel.app/)



🚀 Tech Stack
Frontend

⚛️ React.js – UI components

🎨 Tailwind CSS + ShadCN/UI – modern styling

⚡ Vite – fast build & development

🎭 Lucide React Icons

📡 Axios / Fetch – API calls

🔑 JWT Authentication – persisted login state

Backend

🟢 Node.js – runtime environment

🚏 Express.js – REST API

🍃 MongoDB + Mongoose – database & ORM

🔑 JWT – authentication

🔒 Bcrypt – password hashing

☁️ Cloudinary – image upload/storage

📦 Multer – file handling

💳 Stripe & Razorpay – payments integration

Deployment

🌐 Frontend → Vercel

🖥️ Backend → Render

☁️ Database → MongoDB Atlas

✨ Features
User Side

👤 User Registration & Login with JWT

🔍 Fuzzy Product Search (find items even with spelling mistakes, e.g., "iphon" → "iPhone")

🔍 Browse products by category

🛒 Add to Cart & Wishlist

💳 Secure payments (Stripe / Razorpay)

📦 Place orders & track order status

🔄 Related products suggestions

🤖 AI Product Assistant (powered by OpenAI API / OpenRouter API)

Admin Side

📊 Admin login with protected routes

➕ Add / Edit / Delete products

🏷️ Manage categories

📦 Manage customer orders (approve, reject, ship)

📤 Upload product images to Cloudinary

📂 Project Structure
smart-shop-fullstack/
│
├── backend/                # Express.js + MongoDB API
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── middleware/         # Auth & validation
│   ├── controllers/        # Business logic
│   ├── server.js           # App entry point
│   └── package.json
│
├── frontend/               # React + Vite + Tailwind
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── context/        # Context API (ShopContext)
│   │   ├── pages/          # Route pages
│   │   ├── assets/         # Images, icons
│   │   └── App.jsx
│   └── package.json
│
└── README.md               # Project documentation

⚙️ Installation & Setup
1. Clone Repo
git clone https://github.com/naveenkarri777/smart-shop-fullstack.git
cd smart-shop-fullstack

2. Setup Backend
cd backend
npm install


Create a .env file in backend/:

PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
CLOUDINARY_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx
STRIPE_SECRET_KEY=xxx
RAZORPAY_KEY_ID=xxx
RAZORPAY_KEY_SECRET=xxx


Run backend  : npm start

3. Setup Frontend
cd ../frontend
npm install
npm run dev

4. Open in Browser

Frontend → http://localhost:5173
Backend → http://localhost:5000

🌍 Deployment

Backend → Deployed on Render

Frontend → Deployed on Vercel

Database → MongoDB Atlas

Update API base URL in frontend/src/context/ShopContext.jsx:

const API_URL = "https://smart-shop-backend.onrender.com/api";

🤖 AI Assistant Feature

Smart Shop includes an AI-powered chat assistant (via OpenAI/OpenRouter API).
Users can ask:

“Does this laptop have SSD?”

“What’s the warranty for this product?”

And the AI will respond based on product details.

🔮 Future Improvements

📱 Mobile responsive enhancements

📦 Inventory stock management

📧 Email notifications for orders

⭐ Product reviews & ratings

🔔 Real-time order tracking with WebSockets


👨‍💻 Author

Naveen Karri

📧 naveenkarri777@gmail.com

🔗 GitHub: naveenkarri777
