# Architecture Overview

This document describes the high-level architecture of the PR Deployment Platform. The platform automatically creates isolated preview environments for GitHub Pull Requests using Docker containers.

## System Overview

The system consists of the following components:

- **Frontend**: A React web application where developers can log in, view their repositories, and monitor deployments and preview URLs.
- **Backend API**: A Node.js and Express modular monolith that handles HTTP requests, authentication, and incoming GitHub webhooks.
- **Database**: PostgreSQL for persistent storage of users, repositories, deployments, and logs.
- **Job Queue**: Redis for queuing deployment jobs.
- **Deployment Workers**: Background worker processes that pull jobs from Redis, build Docker images, and run containers.
- **Reverse Proxy**: Nginx to route incoming web requests to the appropriate Docker preview container based on the Pull Request URL.

---

## Architecture Decisions

### 1. Modular Monolith for the Backend
A modular monolith keeps our entire backend code in a single codebase while organizing distinct features into separate modules. It avoids the network complexity and deployment overhead of microservices, which is ideal for a fast-moving MVP. This makes developing, debugging, and maintaining the project much simpler.

### 2. PostgreSQL for the Database
PostgreSQL is a reliable and well-supported relational database with great support for structured data. Our platform has clear relationships between users, repositories, pull requests, and deployments. It provides strong data consistency and ACID guarantees out of the box.

### 3. Redis for the Job Queue
Redis is an extremely fast in-memory data store that excels at managing task queues. It allows the API to offload long-running deployment jobs instantly without blocking incoming HTTP requests. It is lightweight, easy to run, and connects seamlessly with Node.js.

### 4. Docker for Isolated Preview Environments
Docker packages each preview application along with all its dependencies inside an isolated container. This ensures that different preview environments never conflict with each other or with the host machine. It also allows us to set memory and CPU limits on each running container easily.

### 5. Background Workers for Deployment Execution
Cloning repositories, building Docker images, and starting containers takes time and should not run in the web request cycle. Separate background workers allow the API to stay fast and responsive while the worker executes the deployment in the background. If a container build fails or crashes, the main web server continues running without interruption.

### 6. Nginx as a Reverse Proxy
Nginx is a fast and proven web server that efficiently handles routing and SSL termination. It allows us to dynamically direct incoming traffic from unique preview URLs to internal Docker container ports. It also keeps our internal container network secure from direct public exposure.

