# Introduction 
# ToDo App

A simple ToDo application with a **frontend**, **backend**, and **MySQL database**, fully containerized using **Docker**. This project demonstrates how to structure a full-stack app with persistent storage and container orchestration
---

## **Project Structure**
-----

```
ToDo-app/
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── Dockerfile
│
├── backend/
│   ├──.dockerignore
│   ├── server.js
│   ├── package.json
│   ├── wait-for-it.sh
│   └── Dockerfile
│
├── db/
│   └── init.sql
│
├── helm
│   ├──templates 
│   │    ├── backend-deployment.yaml
│   │    ├── backend-service.yaml
│   │    ├── frontend-deployment.yaml
│   │    ├── frontend-service.yaml
│   │    ├── frontend-config.yaml
│   │    ├── mysql-deployment.yaml
│   │    ├── mysql-secret.yaml
│   │    └── mysql-init-configmap
│   │        
│   ├──Chart.yaml
│   └──values.yaml
│
├── terraform/
│   ├── main.tf
│   ├── outputs.tf
│   └── variables.tf
│
├── key.json (service accont details)
├── .env
├── azure-pipelines-ci.yml
└── azure-pipelines-cd.yml

```


# Introduction 
# ToDo App

A simple ToDo application with a **frontend**, **backend**, and **MySQL database**, fully containerized using **Docker**. This project demonstrates how to structure a full-stack app with persistent storage and container orchestration
---

## **Project Structure**
-----

```
ToDo-app/
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── Dockerfile
│
├── backend/
│   ├──.dockerignore
│   ├── server.js
│   ├── package.json
│   ├── wait-for-it.sh
│   └── Dockerfile
│
├── db/
│   └── init.sql
│
├── k8s/
│   ├── frontend-deployment.yaml
│   ├── backend-deployment.yaml
│   ├── mysql-deployment.yaml
│   ├── frontend-service.yaml
│   ├── backend-service.yaml
│   └── mysql-service.yaml
│
├── docker-compose.yml
├── key.json (service accont details)
├── .env
├── azure-pipelines-ci.yml
└── azure-pipelines-cd.yml

```

## **1st Version**
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
```
2. **Move to project directory:**
```
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

## About docker-compose.yml

### The docker-compose.yml file is the backbone of this project. It defines and manages all the services (frontend, backend, and database) in a single configuration. Instead of running multiple docker run commands manually, Docker Compose makes it easy to start the entire stack with just one command.

db service: Runs MySQL with a persistent volume (db_data) to ensure data is not lost when containers stop. It also runs initialization scripts from db/init.sql during the first startup.

backend service: A Node.js Express API that connects to the MySQL database using environment variables (DB_HOST, DB_USER, etc.). It depends on the database container to ensure proper startup order.

frontend service: A static site served using Nginx. It communicates with the backend API via the internal Docker network using the container name (backend) instead of localhost.

By default, Docker Compose creates an isolated network so that containers can resolve each other by their service names, simplifying service-to-service communication. This removes the need to configure IP addresses or links manually.


## **2nd Version**
## **1st Version**
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
```
2. **Move to project directory:**
```
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

## About docker-compose.yml

### The docker-compose.yml file is the backbone of this project. It defines and manages all the services (frontend, backend, and database) in a single configuration. Instead of running multiple docker run commands manually, Docker Compose makes it easy to start the entire stack with just one command.

db service: Runs MySQL with a persistent volume (db_data) to ensure data is not lost when containers stop. It also runs initialization scripts from db/init.sql during the first startup.

backend service: A Node.js Express API that connects to the MySQL database using environment variables (DB_HOST, DB_USER, etc.). It depends on the database container to ensure proper startup order.

frontend service: A static site served using Nginx. It communicates with the backend API via the internal Docker network using the container name (backend) instead of localhost.

By default, Docker Compose creates an isolated network so that containers can resolve each other by their service names, simplifying service-to-service communication. This removes the need to configure IP addresses or links manually.


## **2nd Version**