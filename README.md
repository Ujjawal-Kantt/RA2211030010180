# 📌 Social Media Analytics Web App

A full-stack Social Media Analytics platform that provides real-time insights into user activity and trending posts.

## 🚀 Tech Stack

### **Backend (Microservice)**
- **Node.js & Express** – Server-side framework
- **PostgreSQL (Supabase)** – Database
- **Axios** – API calls to the test server
- **Dotenv** – Environment variable management

### **Frontend (React Web App)**
- **React (JavaScript only)** – UI framework
- **Tailwind CSS** – Styling
- **Framer Motion** – Smooth animations
- **Axios** – API calls
- **React Router** – Navigation

---

## 📁 Folder Structure

```
📦 social-media-analytics
┣ 📂 backend  # Microservice
┃ ┣ 📜 index.js
┃ ┃ 📜 route.js
┃ ┣ 📂 config
┃ ┃ ┗ 📜 db.js
┃ ┗ 📜 .env
┣ 📂 frontend  # React App
┃ ┣ 📜 src
┃ ┃ ┣ 📂 components
┃ ┃ ┣ 📂 pages
┃ ┃ ┣ 📜 App.js
┃ ┃ ┣ 📜 index.js
┃ ┃ ┗ 📜 api.js
┃ ┣ 📜 package.json
┃ ┗ 📜 tailwind.config.js
┗ 📜 README.md
```

---

## 🌐 Backend API (Microservice)

### **1️⃣ `GET /users` → Top 5 Users**
- **Description:** Fetches the top 5 users with the highest number of posts.
- **Example Response:**
```json
[
  { "id": 1, "name": "John Doe", "post_count": 12 },
  { "id": 2, "name": "Jane Doe", "post_count": 10 }
]
```

### **2️⃣ `GET /posts?type=popular` → Trending Posts**
- **Description:** Fetches posts with the most comments.
- **Example Response:**
```json
[
  { "id": 150, "content": "Post about ocean", "comment_count": 35 }
]
```

### **3️⃣ `GET /posts?type=latest` → Live Feed**
- **Description:** Fetches the latest 5 posts in real-time.
- **Example Response:**
```json
[
  { "id": 890, "content": "Post about bat", "created_at": "2025-03-20" }
]
```

### **4️⃣ `GET /fetch-data` → Fetch & Store Data**
- **Description:** Calls the test API, retrieves users, posts, and comments, and stores them in the database.

---

## 🎨 Frontend (React App)

### **Pages & Features**

1️⃣ **Top Users Page** – Displays the top 5 users with the most posts. Uses stylish **animated user cards**. 🏆

2️⃣ **Trending Posts Page** – Shows the most commented posts with **glowing effect badges**. 💬

3️⃣ **Live Feed Page** – Displays real-time posts with **smooth animations and infinite scroll**. 🔥

### **How to Run the Frontend**
```sh
cd frontend
npm install
npm run dev
```

---

## 🚀 Deployment
### **Run Backend (Microservice)**
```sh
cd backend
npm install
node index.js
```

### **Run Frontend (React App)**
```sh
cd frontend
npm run dev
```

---

## ⚠️ Environment Variables (`.env` for Backend)
```ini
TEST_SERVER=http://20.244.56.144/test
COMPANY_NAME=SRMIST
CLIENT_ID=-client-id
CLIENT_SECRET=-client-secret
OWNER_NAME=Ujjawal Kantt
OWNER_EMAIL=uk1287@srmist.edu.in
ROLL_NO=RA2211030010180
```

---

## 📌 Final Notes
- Ensure **backend is running** before starting the frontend.
- Use **Postman** or **Insomnia** to test backend routes.
- **Frontend calls should be made to `http://localhost:5000`, NOT the test server.**

🔥 ** Social Media Analytics app is  fully functional!** 🚀
