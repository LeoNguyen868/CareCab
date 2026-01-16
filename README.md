# CareCab - Re-examination Scheduling System

CareCab (Hệ Thống Đặt Lịch Tái Khám) is a full-stack web application designed to manage and schedule home re-examination appointments. It facilitates communication and coordination between patients, nurses, and administrators.

## 🚀 Tech Stack

### Frontend
- **Framework:** React 19
- **Build Tool:** Vite 7
- **Routing:** React Router 7
- **Styling:** CSS3, Font Awesome

### Backend
- **Framework:** FastAPI
- **Database:** PostgreSQL
- **ORM:** Tortoise ORM
- **Authentication:** JWT, Bcrypt
- **Real-time:** WebSockets

## 📋 Prerequisites

Before you begin, ensure you have met the following requirements:
- **Python** (v3.8+)
- **Node.js** (v18+)
- **pnpm** (npm and yarn are not supported)
- **PostgreSQL** installed and running

## 🛠️ Installation & Setup

### Backend Setup

1. **Navigate to the root directory.**

2. **Create and activate a virtual environment:**
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure Environment Variables:**
   Create a `.env` file in the root directory with the following content:
   ```env
   DATABASE_URL=postgres://user:password@localhost:5432/dbname
   EMAIL_SENDER=your_email@example.com
   EMAIL_PASSWORD=your_email_password
   PORT=8000
   ```

5. **Run the Backend Server:**
   ```bash
   python backend/main.py
   ```
   The API will be available at `http://localhost:8000`.

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the `frontend` directory:
   ```env
   VITE_API_BASE_URL=http://localhost:8000
   ```

4. **Run the Development Server:**
   ```bash
   pnpm dev
   ```
   Access the application at `http://localhost:5173`.

## 📂 Project Structure

```
.
├── backend/            # FastAPI Backend
│   ├── ORMModels/      # Database Models
│   ├── Routers/        # API Routes
│   ├── Utils/          # Utility functions
│   ├── main.py         # Entry point
│   └── ...
├── frontend/           # React Frontend
│   ├── src/            # Source code
│   ├── public/         # Static assets
│   └── ...
└── ...
```

## 🤝 Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.
