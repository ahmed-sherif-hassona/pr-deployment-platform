# REST API Specification

This document describes the basic REST API endpoints for the PR Deployment Platform MVP.

## General Information

- **Base URL**: `/api/v1` (except `/health` which is at the root)
- **Data Format**: JSON (`application/json`)
- **Authentication**: Endpoints that require authentication use a GitHub OAuth token passed in the HTTP `Authorization` header:
  `Authorization: Bearer <token>`

## Standard Error Response

When an error occurs, the API returns a standard JSON error response:

```json
{
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "The requested resource was not found"
  }
}
```

Common HTTP status codes used:
- `200 OK`: Request succeeded.
- `201 Created`: Resource successfully created.
- `202 Accepted`: Request accepted for background processing.
- `400 Bad Request`: Missing or invalid input.
- `401 Unauthorized`: Missing or invalid authentication token.
- `404 Not Found`: Resource was not found.
- `409 Conflict`: Resource already exists.
- `500 Internal Server Error`: An unexpected server error occurred.

---

## Endpoints

### 1. Health Check

- **Method**: `GET`
- **Endpoint**: `/health`
- **Description**: Checks whether the backend server is running and healthy.
- **Authentication**: None (Public)
- **Example Request**:
  No request body or parameters required.
- **Example Response** (`200 OK`):
  ```json
  {
    "status": "ok",
    "timestamp": "2026-11-22T10:00:00.000Z"
  }
  ```
- **Common Error Codes**:
  - `500 Internal Server Error`

---

### 2. Add Repository

- **Method**: `POST`
- **Endpoint**: `/api/v1/repositories`
- **Description**: Connects a GitHub repository to the platform.
- **Authentication**: Required (`Bearer <token>`)
- **Example Request**:
  ```json
  {
    "githubRepoId": 123456,
    "fullName": "user/project"
  }
  ```
- **Example Response** (`201 Created`):
  ```json
  {
    "id": "repo_123",
    "githubRepoId": 123456,
    "fullName": "user/project",
    "createdAt": "2026-11-22T10:15:30.000Z"
  }
  ```
- **Common Error Codes**:
  - `400 Bad Request` (missing or invalid fields)
  - `401 Unauthorized` (missing or invalid token)
  - `409 Conflict` (repository already connected)
  - `500 Internal Server Error`

---

### 3. Get Deployments

- **Method**: `GET`
- **Endpoint**: `/api/v1/deployments`
- **Description**: Retrieves a list of deployments with basic pagination.
- **Authentication**: Required (`Bearer <token>`)
- **Request Parameters**:
  - `page` (query, optional, default: `1`): The page number.
  - `limit` (query, optional, default: `20`): Number of items per page.
- **Example Request**:
  `GET /api/v1/deployments?page=1&limit=10`
- **Example Response** (`200 OK`):
  ```json
  {
    "data": [
      {
        "id": "dep_1",
        "repositoryId": "repo_123",
        "pullRequestNumber": 15,
        "commitSha": "abc1234",
        "status": "running",
        "previewUrl": "https://pr-15.preview.example.com",
        "createdAt": "2026-11-22T10:30:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 1
    }
  }
  ```
- **Common Error Codes**:
  - `400 Bad Request` (invalid page or limit value)
  - `401 Unauthorized`
  - `500 Internal Server Error`

---

### 4. Create Deployment

- **Method**: `POST`
- **Endpoint**: `/api/v1/deployments`
- **Description**: Requests a new deployment for a specific Pull Request. Returns `202 Accepted` because the deployment executes asynchronously in the background.
- **Authentication**: Required (`Bearer <token>`)
- **Example Request**:
  ```json
  {
    "repositoryId": "repo_123",
    "pullRequestNumber": 15,
    "commitSha": "abc123"
  }
  ```
- **Example Response** (`202 Accepted`):
  ```json
  {
    "id": "dep_2",
    "repositoryId": "repo_123",
    "pullRequestNumber": 15,
    "commitSha": "abc123",
    "status": "queued",
    "previewUrl": null,
    "createdAt": "2026-11-22T10:45:00.000Z"
  }
  ```
- **Common Error Codes**:
  - `400 Bad Request` (missing required fields)
  - `401 Unauthorized`
  - `404 Not Found` (repository not found)
  - `500 Internal Server Error`

