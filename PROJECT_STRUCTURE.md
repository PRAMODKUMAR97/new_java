# Project Structure Overview

## Complete File Organization

### Backend Java Files
```
backend/src/main/java/com/traffic/
├── TrafficFineApplication.java          # Main Spring Boot application
├── controller/
│   ├── AuthController.java              # Admin authentication endpoints
│   └── FineController.java              # Fine management REST APIs
├── model/
│   └── VehicleFine.java                 # Data model for traffic fines
└── service/
    └── FineService.java                 # Business logic and in-memory storage
```

### Frontend Files (Static Resources)
```
backend/src/main/resources/static/
├── index.html                           # Landing page
├── admin-login.html                     # Admin login page
├── admin-dashboard.html                 # Admin dashboard with statistics
├── add-fine.html                        # Form to add new fines
├── view-fines.html                      # View and manage all fines
├── user-search.html                     # User search page
├── css/
│   └── styles.css                       # Complete application styles (9.5KB)
└── js/
    ├── api.js                           # Backend API integration
    ├── admin.js                         # Admin portal functionality
    └── user.js                          # User portal functionality
```

### Configuration Files
```
backend/
├── pom.xml                              # Maven build configuration
└── src/main/resources/
    └── application.properties           # Spring Boot configuration
```

## Key Components

### Backend REST APIs
- **Authentication**: `/api/admin/login`
- **Fine Management**:
  - GET `/api/fines` - List all fines
  - GET `/api/fines/vehicle/{vehicleNumber}` - Search by vehicle
  - POST `/api/fines/add` - Add new fine
  - PUT `/api/fines/pay/{id}` - Mark as paid
  - DELETE `/api/fines/{id}` - Remove fine

### Frontend Pages
1. **Home Page** - Choose between Admin and User portals
2. **Admin Portal**:
   - Login with authentication
   - Dashboard with real-time statistics
   - Add fine form with validation
   - View/Edit/Delete fines table
3. **User Portal**:
   - Search fines by vehicle number
   - View fine details
   - Make payments (simulated)

### Data Flow
```
Frontend (HTML/CSS/JS)
    ↓ (Fetch API calls)
api.js (API integration layer)
    ↓ (HTTP requests to localhost:8080)
Spring Boot Controllers
    ↓ (Business logic)
Service Layer
    ↓ (CRUD operations)
In-Memory Storage (ArrayList)
```

## Technologies Used

| Layer | Technology |
|-------|-----------|
| Backend Framework | Spring Boot 3.2.0 |
| Language | Java 17 |
| Build Tool | Maven |
| Web Server | Embedded Tomcat |
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| API Communication | Fetch API |
| Data Storage | In-Memory (ArrayList) |
| Architecture | MVC Pattern |

## Design Features

- Responsive design with mobile support
- Clean, modern UI with card-based layout
- Real-time statistics on admin dashboard
- Form validation on both client and server
- Status badges for payment status
- Modal dialogs for confirmations
- Filter and search functionality
- Auto-uppercase vehicle numbers
- Loading states and error handling

## Security Features

- Admin authentication required
- Session-based admin access control
- CORS enabled for API access
- Input validation and sanitization
- Secure REST API endpoints

## Development Highlights

- Single Responsibility Principle in code organization
- RESTful API design
- Separation of concerns (MVC)
- Reusable components
- Consistent coding standards
- Comprehensive error handling
