# Traffic Fine Management System

A full-stack web application for managing traffic fines with separate portals for administrators and users.

## Project Structure

```
backend/
├── src/
│   └── main/
│       ├── java/com/traffic/
│       │   ├── TrafficFineApplication.java (Main application)
│       │   ├── controller/
│       │   │   ├── AuthController.java (Admin authentication)
│       │   │   └── FineController.java (Fine management APIs)
│       │   ├── model/
│       │   │   └── VehicleFine.java (Fine entity)
│       │   └── service/
│       │       └── FineService.java (Business logic)
│       └── resources/
│           ├── application.properties (Configuration)
│           └── static/ (Frontend files)
│               ├── index.html
│               ├── admin-login.html
│               ├── admin-dashboard.html
│               ├── add-fine.html
│               ├── view-fines.html
│               ├── user-search.html
│               ├── css/
│               │   └── styles.css
│               └── js/
│                   ├── api.js (Backend API integration)
│                   ├── admin.js (Admin functionality)
│                   └── user.js (User functionality)
└── pom.xml (Maven configuration)
```

## Features

### Admin Portal
- Secure login (Username: admin, Password: admin123)
- Dashboard with statistics (total fines, paid/unpaid counts)
- Add new traffic fines
- View and manage all fines
- Update payment status
- Delete fines
- Filter and search functionality

### User Portal
- Search fines by vehicle number
- View fine details
- Make online payments (simulated)
- Payment confirmation

## Technology Stack

**Backend:**
- Java 17
- Spring Boot 3.2.0
- Spring Web (REST APIs)
- In-memory data storage

**Frontend:**
- HTML5
- CSS3 (Modern responsive design)
- Vanilla JavaScript
- Fetch API for backend communication

## Prerequisites

- Java 17 or higher
- Maven 3.6 or higher

## How to Run

1. Navigate to the backend directory:
```bash
cd backend
```

2. Build the project:
```bash
mvn clean package
```

3. Run the application:
```bash
mvn spring-boot:run
```

Or run the JAR file:
```bash
java -jar target/traffic-fine-management-1.0.0.jar
```

4. Open your browser and navigate to:
```
http://localhost:8080
```

## API Endpoints

### Authentication
- `POST /api/admin/login` - Admin login

### Fines Management
- `GET /api/fines` - Get all fines
- `GET /api/fines/vehicle/{vehicleNumber}` - Get fines by vehicle number
- `POST /api/fines/add` - Add new fine
- `PUT /api/fines/pay/{id}` - Mark fine as paid
- `DELETE /api/fines/{id}` - Delete fine

## Sample Data

The application comes with pre-loaded sample fines:
- KA01AB1234 - Speeding (₹500, Unpaid)
- KA02CD5678 - Signal Jump (₹1000, Paid)
- KA01AB1234 - No Helmet (₹300, Unpaid)
- MH12XY9999 - Wrong Parking (₹200, Unpaid)
- DL05EF4321 - Drunk Driving (₹10000, Unpaid)

## Default Admin Credentials

- Username: `admin`
- Password: `admin123`

## Port Configuration

The application runs on port 8080 by default. You can change this in `src/main/resources/application.properties`:
```properties
server.port=8080
```

## CORS Configuration

CORS is enabled for all origins to allow frontend-backend communication. This is configured in the controller classes using `@CrossOrigin(origins = "*")`.

## Development Notes

- The application uses in-memory storage, so data will be lost when the application stops
- Payment processing is simulated for demonstration purposes
- All vehicle numbers are automatically converted to uppercase
- The frontend is served as static content by Spring Boot
