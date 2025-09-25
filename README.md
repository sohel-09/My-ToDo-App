# Introduction 
# ToDo App

A simple ToDo application with a **frontend**, **backend**, and **MySQL database**, fully containerized using **Docker**. This project demonstrates how to structure a full-stack app with persistent storage and container orchestration.

---

## **Project Structure**
````
ToDo-app/
│
├── frontend/ # Static website served with Nginx
│ ├── index.html
│ ├── style.css
│ ├── script.js
│ └── Dockerfile
│
├── backend/ # Node.js API server
│ ├── server.js
│ ├── package.json
│ └── Dockerfile
│
├── db/ # Database initialization scripts
│ └── init.sql
│
└── docker-compose.yml # Docker Compose file to orchestrate services
```


---

## **Technologies Used**

- Frontend: HTML, CSS, JavaScript  
- Backend: Node.js, Express.js  
- Database: MySQL  
- Containerization: Docker  
- Orchestration: Docker Compose  

---

## **Setup and Run (Using Docker Compose)**

1. **Clone the repository:**

```
git clone 
cd ToDo-app

```
Build and Run Containers:

```
docker-compose up --build
```

---

This will start three services:

- db → MySQL database (persistent volume db_data)

- backend → Node.js API connected to MySQL

- frontend → Nginx serving static files

- Access the application:

- Frontend: http://localhost:3000

- Backend API: http://localhost:5000/tasks

---

### Database Persistence

The MySQL data is stored in a Docker volume db_data, which ensures tasks are preserved even if containers are stopped or removed.

The database is initialized automatically using db/init.sql on the first run.

### Frontend-Backend Communication

The frontend fetches tasks from the backend via HTTP requests.

When running inside Docker, the frontend uses the container hostname backend to connect to the backend API.

---

