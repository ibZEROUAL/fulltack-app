# Product-Management-System-with-authentication

This project is a Full stack app for managing products with spring boot and react js. The application is containerized using Docker Compose, and it depends on an Mysql database.

# Prerequisites

Ensure you have the following installed on your system:

<h6>Java SE 17</h6>
<h6>Maven</h6>
<h6>Node js 22</h6>
<h6>Docker Engine</h6>

# Running the backend Application

Follow these steps to run the REST API (after cloning this repo ):

<h6>Step 1: cd backend</h6>

<h6>Step 2: Generate App.jar using  "./mvnw clean install -DskipTests"</h6>

<h6>Step 3: Build and Run with Docker Compose with  "docker compose up" 
this will create containers for mysql database and spring app.</h6>

# Running the frontend Application

Follow these steps to run the React web app (after cloning this repo):

<h6>Step 1: cd frontend</h6>

<h6>Step 2: npm install</h6>

<h6>Step 3: npm run dev</h6>

# Access the Application

Once the containers are running, you can access the REST API at: http://localhost:8080

and the frontend at : http://localhost:3000

The Mysql database will be accessible with no root password at:

<h6>Host: localhost</h6>

<h6>Port: 3306</h6>

<h6>Database: product-db</h6>

<h6>Username: root</h6>


# Test the API

Base URL for swagger ui : http://localhost:8080/swagger-ui/index.html#/