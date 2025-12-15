# Installation and Setup Guide

## System Overview

Your Staff Biometric Attendance System uses:
- MongoDB for storing staff data, photos, and attendance records
- Spring Boot backend with Java 17
- Pure HTML, CSS, JavaScript frontend
- Browser-based face recognition using canvas API

## Features

- Complete data storage in MongoDB (including photos as base64)
- Face recognition with pixel-based comparison
- Real-time attendance tracking
- Staff management with photos
- QR code alternative for attendance

## Prerequisites

### 1. Install Java 17 or higher
**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install openjdk-17-jdk
```

**macOS:**
```bash
brew install openjdk@17
```

**Windows:**
Download from https://adoptium.net/

### 2. Install MongoDB
**Ubuntu/Debian:**
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu $(lsb_release -cs)/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt update
sudo apt install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod
```

**macOS:**
```bash
brew tap mongodb/brew
brew install mongodb-community@6.0
brew services start mongodb-community@6.0
```

**Windows:**
Download from https://www.mongodb.com/try/download/community

### 3. Verify MongoDB is Running
```bash
mongosh
```

You should see the MongoDB shell. Type `exit` to quit.

## Running the Application

### 1. Build the Project
```bash
chmod +x mvnw
./mvnw clean package
```

### 2. Start the Application
```bash
./mvnw spring-boot:run
```

Or run the JAR directly:
```bash
java -jar target/attendance-0.0.1-SNAPSHOT.jar
```

### 3. Access the Application
Open your browser and go to:
```
http://localhost:8080
```

## How It Works

### Adding Staff
1. Click "Add New Staff"
2. Enter staff details (Name, Employee ID, Designation)
3. Upload a clear face photo
4. Click "Add Staff"
5. All data including the photo is saved to MongoDB

### Sign In/Out
1. Click "Sign In" or "Sign Out"
2. Allow camera access
3. Position your face in the camera view
4. Click "Capture & Match"
5. System retrieves all staff photos from MongoDB
6. Compares your face with stored photos
7. If match found (score < 90), attendance is recorded in MongoDB

### View Staff
1. Click "View All Staff"
2. See all registered staff from MongoDB
3. Photos and all details are loaded from the database
4. View complete information including creation date

## Data Storage

### MongoDB Collections

#### staff collection
Stores all staff information including photos:
- id (String, primary key)
- name (String)
- employeeId (String, unique)
- designation (String)
- photoBase64 (String) - Base64 encoded face photo
- createdAt (DateTime)
- updatedAt (DateTime)

#### attendance collection
Stores all attendance records:
- id (String, primary key)
- employeeId (String)
- date (Date)
- signInTime (DateTime)
- signOutTime (DateTime)
- createdAt (DateTime)
- updatedAt (DateTime)
- Unique index on (employeeId, date)

## MongoDB Connection

The application connects to MongoDB at:
```
mongodb://localhost:27017/attendance_db
```

To change the connection, edit `src/main/resources/application.properties`:
```properties
spring.data.mongodb.uri=mongodb://localhost:27017/attendance_db
spring.data.mongodb.database=attendance_db
```

## Troubleshooting

### MongoDB Connection Error
```
Error: Connection refused to localhost:27017
```
Solution: Start MongoDB service
```bash
sudo systemctl start mongod  # Linux
brew services start mongodb-community@6.0  # macOS
```

### Camera Not Working
- Use http://localhost:8080 (not file://)
- Grant camera permissions in browser settings
- Check if another app is using the camera

### Photos Not Showing in View Staff
- Check MongoDB connection
- Verify photos were saved: `db.staff.find({}, {photoBase64: 1})`
- Ensure browser can display base64 images

### Face Not Matching
- Ensure good lighting when adding staff
- Use front-facing, clear photos
- Keep similar conditions when scanning
- Adjust threshold in index.html line 358 (currently 90)

## Database Queries

### View all staff in MongoDB
```bash
mongosh
use attendance_db
db.staff.find().pretty()
```

### View staff without photos (for quick listing)
```bash
db.staff.find({}, {name: 1, employeeId: 1, designation: 1})
```

### View all attendance records
```bash
db.attendance.find().pretty()
```

### Get attendance for today
```bash
db.attendance.find({date: new Date().toISOString().split('T')[0]})
```

### Clear all data
```bash
db.staff.deleteMany({})
db.attendance.deleteMany({})
```

## Benefits of MongoDB Storage

1. All data in one place - no dependency on browser storage
2. Photos accessible from any browser/device
3. No storage size limitations like localStorage
4. Data persists across browser sessions
5. Easy backup and restore
6. Better for production environments
7. Scalable for multiple users

## Security Notes

- This is a development setup
- For production:
  - Add authentication
  - Use HTTPS
  - Secure MongoDB with authentication
  - Implement proper error handling
  - Add rate limiting
  - Validate all inputs
  - Consider encrypting sensitive data
  - Use environment variables for configuration

## Performance Considerations

- Photos are stored as base64 strings in MongoDB
- This is suitable for moderate numbers of staff
- For large deployments (100+ staff), consider:
  - Using GridFS for photo storage
  - Implementing pagination
  - Adding caching layer
  - Optimizing photo compression

## Support

If you encounter issues:
1. Check MongoDB is running: `mongosh`
2. Check Java version: `java -version`
3. Check application logs in the console
4. Verify MongoDB connection in application.properties
5. Check network connectivity to MongoDB

## Next Steps

- Add staff members and test face recognition
- Explore attendance tracking features
- Review MongoDB data using mongosh
- Consider adding reporting features
- Plan for production deployment
