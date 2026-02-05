# JOYLAND SPA - API Documentation

## Base URL
```
http://localhost:3000/api
```

---

## Authentication Endpoints

### Sign Up
Create a new user account.

**Endpoint:** `POST /auth/signup`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "(555) 123-4567",
  "password": "securepassword123"
}
```

**Validation:**
- `name`: Required, string
- `email`: Required, valid email format
- `phone`: Required, valid phone format
- `password`: Required, minimum 6 characters

**Success Response (201):**
```json
{
  "success": true,
  "user": {
    "id": "1707123456789",
    "email": "john@example.com",
    "name": "John Doe",
    "phone": "(555) 123-4567"
  }
}
```

**Error Responses:**
- `400` - Missing required fields or invalid format
- `409` - User already exists
- `500` - Server error

---

### Login
Authenticate user and create session.

**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "user": {
    "id": "1707123456789",
    "email": "john@example.com",
    "name": "John Doe",
    "phone": "(555) 123-4567"
  }
}
```

**Error Responses:**
- `400` - Email or password missing
- `401` - Invalid credentials
- `500` - Server error

---

## Service Endpoints

### List All Services
Get all available spa services.

**Endpoint:** `GET /services`

**Query Parameters:** None

**Success Response (200):**
```json
[
  {
    "id": "1",
    "name": "Swedish Massage",
    "description": "Relaxing full-body massage to relieve stress and tension",
    "duration": 60,
    "price": 89.99
  },
  {
    "id": "2",
    "name": "Deep Tissue Massage",
    "description": "Therapeutic massage targeting deep muscle knots",
    "duration": 60,
    "price": 99.99
  }
  // ... more services
]
```

**Error Response:**
- `500` - Server error

---

## Availability Endpoints

### Check Available Time Slots
Get available time slots for a service on a specific date.

**Endpoint:** `GET /availability`

**Query Parameters:**
- `serviceId` (required): String - Service ID
- `date` (required): String - Date in YYYY-MM-DD format

**Example:**
```
GET /api/availability?serviceId=1&date=2024-02-10
```

**Success Response (200):**
```json
{
  "serviceId": "1",
  "date": "2024-02-10",
  "service": {
    "id": "1",
    "name": "Swedish Massage",
    "description": "...",
    "duration": 60,
    "price": 89.99
  },
  "timeSlots": [
    {
      "time": "09:00",
      "available": true
    },
    {
      "time": "09:30",
      "available": true
    },
    {
      "time": "10:00",
      "available": false
    }
    // ... more slots
  ]
}
```

**Error Responses:**
- `400` - Missing serviceId or date
- `404` - Service not found
- `500` - Server error

---

## Appointment Endpoints

### Create Appointment
Book a new spa appointment.

**Endpoint:** `POST /appointments`

**Request Body:**
```json
{
  "userId": "1707123456789",
  "serviceId": "1",
  "date": "2024-02-10",
  "time": "14:30"
}
```

**Validation:**
- `userId`: Required, string
- `serviceId`: Required, string
- `date`: Required, YYYY-MM-DD format
- `time`: Required, HH:MM format

**Success Response (201):**
```json
{
  "success": true,
  "appointment": {
    "id": "1707234567890",
    "userId": "1707123456789",
    "serviceId": "1",
    "date": "2024-02-10",
    "time": "14:30",
    "status": "confirmed"
  }
}
```

**Error Responses:**
- `400` - Missing required fields
- `404` - Service not found
- `409` - Time slot not available (double-booking attempt)
- `500` - Server error

---

## Admin Endpoints

### List All Appointments
Get all appointments with optional filtering.

**Endpoint:** `GET /admin/appointments`

**Query Parameters:**
- `userId` (optional): Filter by user ID
- `date` (optional): Filter by date (YYYY-MM-DD)
- `service` (optional): Filter by service ID

**Examples:**
```
GET /api/admin/appointments
GET /api/admin/appointments?date=2024-02-10
GET /api/admin/appointments?service=1
GET /api/admin/appointments?userId=1707123456789
```

**Success Response (200):**
```json
[
  {
    "id": "1707234567890",
    "userName": "John Doe",
    "userEmail": "john@example.com",
    "serviceName": "Swedish Massage",
    "date": "2024-02-10",
    "time": "14:30",
    "status": "confirmed",
    "price": 89.99
  },
  {
    "id": "1707234567891",
    "userName": "Jane Smith",
    "userEmail": "jane@example.com",
    "serviceName": "Facial Treatment",
    "date": "2024-02-10",
    "time": "15:00",
    "status": "confirmed",
    "price": 79.99
  }
  // ... more appointments
]
```

**Error Response:**
- `500` - Server error

---

## Error Handling

All API responses follow this error format:

```json
{
  "error": "Error message describing what went wrong"
}
```

### HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success (GET, successful updates) |
| 201 | Created (POST successful) |
| 400 | Bad Request (invalid input) |
| 401 | Unauthorized (invalid credentials) |
| 404 | Not Found (resource doesn't exist) |
| 409 | Conflict (e.g., duplicate booking) |
| 500 | Server Error |

---

## Data Formats

### Date Format
- Format: `YYYY-MM-DD`
- Example: `2024-02-10`
- Range: Next 30 days from today

### Time Format
- Format: `HH:MM` (24-hour)
- Example: `14:30`
- Slots: 30-minute intervals, 9 AM to 6 PM

### Phone Format
- Accepted: Any format containing 10 digits
- Examples: `5551234567`, `(555) 123-4567`, `555-123-4567`

### Email Format
- Must be valid email (standard validation)
- Example: `user@example.com`

---

## Appointment Status

| Status | Meaning |
|--------|---------|
| `confirmed` | Appointment is booked and confirmed |
| `cancelled` | Appointment has been cancelled |
| `completed` | Service has been completed |

---

## Response Examples

### Success Flow
```
1. POST /auth/signup → User created
2. POST /auth/login → Session created
3. GET /services → List services
4. GET /availability?serviceId=1&date=2024-02-10 → Check slots
5. POST /appointments → Booking confirmed
```

### Error Handling Examples

**Invalid Email:**
```
Request: POST /auth/signup
Body: { "email": "invalid-email", ... }
Response: 400 - "Invalid email format"
```

**Slot Not Available:**
```
Request: POST /appointments
Body: { "time": "14:30", ... }
Response: 409 - "Time slot is not available"
```

**Missing Fields:**
```
Request: POST /auth/signup
Body: { "name": "John" }
Response: 400 - "Missing required fields"
```

---

## Rate Limiting

Currently not implemented. For production:
- Implement rate limiting on all endpoints
- Suggested: 100 requests per minute per IP

---

## Authentication

Currently uses session storage in browser. For production:

1. **Implement JWT:**
   - Issue token on login
   - Return in secure cookie
   - Validate on each request

2. **Add Refresh Tokens:**
   - Short-lived access tokens
   - Long-lived refresh tokens
   - Automatic token refresh

3. **Protect Admin Endpoints:**
   - Verify admin role
   - Log admin actions
   - Rate limit admin access

---

## Testing the API

### Using cURL

**Sign Up:**
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "5551234567",
    "password": "password123"
  }'
```

**Get Services:**
```bash
curl http://localhost:3000/api/services
```

**Check Availability:**
```bash
curl "http://localhost:3000/api/availability?serviceId=1&date=2024-02-10"
```

**Create Appointment:**
```bash
curl -X POST http://localhost:3000/api/appointments \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "1707123456789",
    "serviceId": "1",
    "date": "2024-02-10",
    "time": "14:30"
  }'
```

### Using Postman

1. Import endpoints as collection
2. Create environment with variables:
   - `baseUrl`: http://localhost:3000/api
   - `userId`: Your user ID
3. Test each endpoint with provided examples

---

## Future API Endpoints

Planning to add:

- `PUT /appointments/:id` - Update appointment
- `DELETE /appointments/:id` - Cancel appointment
- `GET /users/:id` - Get user profile
- `PUT /users/:id` - Update user profile
- `GET /admin/stats` - Get statistics
- `POST /admin/appointments/:id/reschedule` - Reschedule
- `POST /payments` - Process payment
- `GET /email-templates` - Email management

---

## Webhook Events (Future)

Planning to implement:

- `appointment.created`
- `appointment.confirmed`
- `appointment.cancelled`
- `appointment.completed`
- `user.registered`
- `payment.received`

---

## Changelog

### Version 1.0.0
- Initial API release
- Auth endpoints
- Service endpoints
- Appointment endpoints
- Admin endpoints

---

**API Version**: 1.0.0  
**Last Updated**: February 2024  
**Base URL**: http://localhost:3000/api
