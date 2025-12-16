# Quick Start Guide

## Running the Application

### Option 1: Using Maven (Recommended)

1. Navigate to backend directory:
```bash
cd backend
```

2. Run the application:
```bash
mvn spring-boot:run
```

### Option 2: Using JAR file

1. Build the project:
```bash
cd backend
mvn clean package
```

2. Run the JAR:
```bash
java -jar target/traffic-fine-management-1.0.0.jar
```

## Accessing the Application

Once the server starts, you'll see:
```
========================================
Traffic Fine Management System Started!
Server running at: http://localhost:8080
========================================
```

Open your browser and go to: **http://localhost:8080**

## User Flows

### For Traffic Police (Admin):
1. Click "Admin Login" on homepage
2. Login with credentials:
   - Username: `admin`
   - Password: `admin123`
3. Access dashboard to:
   - View statistics
   - Add new fines
   - Manage existing fines

### For Vehicle Owners (User):
1. Click "Search Fines" on homepage
2. Enter vehicle number (e.g., KA01AB1234)
3. View fines and make payments

## Testing with Sample Data

Try these vehicle numbers:
- **KA01AB1234** - Has 2 unpaid fines
- **KA02CD5678** - Has 1 paid fine
- **MH12XY9999** - Has 1 unpaid fine
- **DL05EF4321** - Has 1 unpaid fine

## Troubleshooting

**Port already in use?**
- Change port in `backend/src/main/resources/application.properties`
- Update `API_BASE_URL` in `backend/src/main/resources/static/js/api.js`

**Build fails?**
- Ensure Java 17+ is installed: `java -version`
- Ensure Maven is installed: `mvn -version`

**Frontend not loading?**
- Clear browser cache
- Check browser console for errors
- Verify static files are in `backend/src/main/resources/static/`
