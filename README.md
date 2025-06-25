
# 📘 Notefy – Smart Study Note Sharing Platform

A full-stack web application that helps students upload, organize, and discover study notes through a personalized and collaborative experience.

---

## ✨ Features

**Note Management**
- Upload notes with title, description, and tags
- Supports PDF, image, and text formats
- View-only or editable dashboards based on login state

**Personal Dashboard**
- Displays user-specific notes, profile image, and greeting
- Editable sections: announcements and today’s plan
- Smart study suggestions shown in sidebar

**Note Discovery**
- Search your notes using subject tags
- Lookup other users by email to view their shared dashboards

---

## 🛠 Setup

### Prerequisites
- Node.js & npm installed
- MongoDB connection string (local or Atlas)
- A browser to open frontend files

---

### 📦 Backend Setup

1. Navigate to the server folder:
```bash
cd server
````

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file based on `.env.example`:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

4. Start the server:

```bash
node server.js
```

---

### 🌐 Frontend Usage

Open these files directly in your browser:

* `login.html` – User login page
* `signup.html` – Registration page
* `dashboard.html` – Personalized user dashboard
* `upload.html` – Upload new study materials
* `view.html` – Search and view your own notes
* `find-user.html` – Find another user by email
* `view-user-dashboard.html` – View shared dashboard of searched user

---

## 🗂 Folder Structure

```
StudyBoard/
├── client/
│   ├── login.html
│   ├── signup.html
│   ├── dashboard.html
│   ├── upload.html
│   ├── view.html
│   ├── find-user.html
│   ├── view-user-dashboard.html
│   ├── view.js
│   └── style.css
│
├── server/
│   ├── models/         # User and Note schemas
│   ├── routes/         # auth, notes, users routes
│   ├── uploads/        # stores user files (excluded from Git)
│   ├── server.js
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── package-lock.json
│
├── package.json (root)
└── README.md
```

---

## ⚠️ Notes

* `uploads/` is excluded from version control using `.gitignore`
* Use `.env.example` as a reference to create your actual `.env` file
* All personal dashboard data (like profile image, plans) is stored in `localStorage` per user

