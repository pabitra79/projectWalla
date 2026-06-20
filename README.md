# 🚀 ProjectWalla — Full Stack College Project Marketplace

A complete full-stack web application for selling college projects to students.

## 📁 Project Structure

```
projectwalla/
├── backend/          # Node.js + Express + MongoDB (MVC)
│   ├── config/       # DB connection
│   ├── controllers/  # Business logic
│   ├── middleware/   # Auth, error handling
│   ├── models/       # Mongoose schemas
│   ├── routes/       # Express routers
│   ├── utils/        # Email utility
│   └── server.js     # Entry point
│
└── frontend/         # React + Tailwind CSS (Vite)
    └── src/
        ├── api/          # Axios instance + API calls
        ├── components/   # Navbar, Footer, Cards, Guards
        ├── context/      # AuthContext (JWT)
        └── pages/        # All 9 pages
            └── admin/    # Admin dashboard
```

---

## ⚙️ Tech Stack

| Layer     | Tech                          |
|-----------|-------------------------------|
| Frontend  | React 18 + Tailwind CSS (Vite)|
| Backend   | Node.js + Express.js          |
| Database  | MongoDB + Mongoose            |
| Auth      | JWT (jsonwebtoken + bcryptjs) |
| Email     | Nodemailer (Gmail SMTP)       |
| Payment   | UPI / QR Code (manual verify) |
| Deploy    | Vercel (frontend) + Render (backend) |

---

## 🛠️ Local Setup

### 1. Clone & Install

```bash
# Backend
cd backend
npm install
cp .env.example .env     # Fill in your values

# Frontend
cd ../frontend
npm install
cp .env.example .env
```

### 2. Configure Backend `.env`

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/projectwalla
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRE=7d

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password

ADMIN_EMAIL=admin@projectwalla.com
ADMIN_PASSWORD=admin123

CLIENT_URL=http://localhost:5173
```

### 3. Configure Frontend `.env`

```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Run the App

```bash
# Terminal 1 — Backend
cd backend
npm run dev      # uses nodemon (install: npm i -g nodemon)
# or
npm start

# Terminal 2 — Frontend

cd frontend
npm run dev
```

Frontend: http://localhost:5173  
Backend API: http://localhost:5000/api

---

## 🌱 Seed Projects (First Time)

After starting the backend, login as admin and click **"Seed Projects"** in the admin dashboard.  
This creates all 12 projects in the database.

Or via API:
```bash
# Get admin token first via /api/auth/login, then:
curl -X POST http://localhost:5000/api/projects/seed \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 👤 Admin Login

```
Email:    admin@projectwalla.com
Password: admin123
```
*(Change these in your `.env` before deploying!)*

---

## 📄 API Endpoints

### Auth
| Method | Route                  | Access  |
|--------|------------------------|---------|
| POST   | /api/auth/register     | Public  |
| POST   | /api/auth/login        | Public  |
| GET    | /api/auth/me           | Private |
| PUT    | /api/auth/update-profile | Private |

### Projects
| Method | Route                  | Access  |
|--------|------------------------|---------|
| GET    | /api/projects          | Public  |
| GET    | /api/projects/:id      | Public  |
| POST   | /api/projects/seed     | Admin   |
| POST   | /api/projects          | Admin   |
| PUT    | /api/projects/:id      | Admin   |
| DELETE | /api/projects/:id      | Admin   |

### Orders
| Method | Route                      | Access  |
|--------|----------------------------|---------|
| POST   | /api/orders                | Student |
| GET    | /api/orders/my             | Student |
| GET    | /api/orders/:id            | Student |
| PUT    | /api/orders/:id/payment    | Student |
| GET    | /api/orders/admin/all      | Admin   |
| PUT    | /api/orders/admin/:id/status | Admin |
| GET    | /api/orders/admin/stats    | Admin   |
| GET    | /api/orders/admin/students | Admin   |

---

## 🌐 Deployment

### Backend → Render (free)
1. Push `backend/` folder to GitHub
2. Create a new Web Service on [render.com](https://render.com)
3. Build Command: `npm install`
4. Start Command: `node server.js`
5. Add all `.env` variables in Render's Environment settings
6. Use MongoDB Atlas URI for `MONGO_URI`

### Frontend → Vercel (free)
1. Push `frontend/` folder to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Framework: Vite
4. Add `VITE_API_URL=https://your-render-url.onrender.com/api`

---

## 🔧 Customization Checklist

- [ ] Replace `UPI_ID` in `Payment.jsx` with your real UPI ID
- [ ] Replace WhatsApp number `919999999999` with yours
- [ ] Replace `help@projectwalla.com` with your email
- [ ] Update Gmail SMTP credentials in `.env`
- [ ] Change `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `.env`
- [ ] Add your real QR code image in the Payment page
- [ ] Update site name/branding in `Navbar.jsx` and `Footer.jsx`

---

## 📱 Pages

| # | Page | Route |
|---|------|-------|
| 1 | Home | `/` |
| 2 | Projects List | `/projects` |
| 3 | Project Detail | `/projects/:id` |
| 4 | Order Form | `/order/:projectId` |
| 5 | Payment | `/payment/:orderId` |
| 6 | About | `/about` |
| 7 | Contact | `/contact` |
| 8 | Login / Register | `/login` `/register` |
| 9 | Student Dashboard | `/dashboard` |
| 10 | Admin Dashboard | `/admin` |

---

Built with ❤️ for student developers.
