# Setup Guide - Staff Biometric Attendance System

## Quick Start

This guide will help you set up and run the Staff Biometric Attendance System with MongoDB.

## Step 1: Install MongoDB

### Ubuntu/Debian
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu $(lsb_release -cs)/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt update
sudo apt install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod
```

### macOS
```bash
brew tap mongodb/brew
brew install mongodb-community@6.0
brew services start mongodb-community@6.0
```

### Windows
Download and install from [MongoDB Download Center](https://www.mongodb.com/try/download/community)

### Verify MongoDB is Running
```bash
mongosh
```

You should see the MongoDB shell. Type `exit` to quit.

## Step 2: Install Java (if not installed)

Check if Java is installed:
```bash
java -version
```

If Java is not installed:

**On Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install openjdk-17-jdk
```

**On macOS:**
```bash
brew install openjdk@17
```

**On Windows:**
Download and install from [Oracle JDK](https://www.oracle.com/java/technologies/downloads/) or [OpenJDK](https://adoptium.net/)

## Step 3: Build the Project

Make the Maven wrapper executable:
```bash
chmod +x mvnw
```

Build the project:
```bash
./mvnw clean package
```

This will:
- Download all dependencies
- Compile the code
- Create an executable JAR file

## Step 4: Run the Application

Start the Spring Boot application:
```bash
./mvnw spring-boot:run
```

Or run the JAR directly:
```bash
java -jar target/attendance-0.0.1-SNAPSHOT.jar
```

You should see output like:
```
Started DemoApplication in 3.456 seconds
```

## Step 5: Access the Application

Open your web browser and go to:
```
http://localhost:8080
```

## First Use: Add Your First Staff Member

1. Click **"Add New Staff"**
2. Fill in the details:
   - Full Name: John Doe
   - Employee ID: EMP001
   - Designation: Manager
3. Click **"Upload Photo"** and select a clear front-facing photo
4. Click **"Add Staff"**
5. All data including the photo will be saved to MongoDB

## Test Face Recognition

1. Click **"Sign In"**
2. Allow camera access when prompted
3. Position your face in the camera view
4. Click **"Capture & Match"**
5. If the face matches, attendance will be recorded

## Database Configuration

The application connects to MongoDB at:
```
mongodb://localhost:27017/attendance_db
```

To change the connection, edit `src/main/resources/application.properties`:
```properties
spring.data.mongodb.uri=mongodb://localhost:27017/attendance_db
spring.data.mongodb.database=attendance_db
```

## Database Schema

The system automatically creates these collections in MongoDB:

### staff collection
```
- id (String, primary key)
- name (String)
- employeeId (String, unique index)
- designation (String)
- photoBase64 (String) - Stores face photo
- createdAt (DateTime)
- updatedAt (DateTime)
```

### attendance collection
```
- id (String, primary key)
- employeeId (String)
- date (Date)
- signInTime (DateTime)
- signOutTime (DateTime)
- createdAt (DateTime)
- updatedAt (DateTime)
- Composite unique index on (employeeId, date)
```

## Important Notes

### Camera Requirements
- Use HTTPS or localhost (http://localhost:8080)
- Modern browser (Chrome, Firefox, Edge, Safari)
- Grant camera permissions when requested
- Good lighting for better face recognition

### Photo Requirements
- Clear, front-facing photo
- Good lighting
- Face clearly visible
- No sunglasses or heavy makeup recommended
- Recommended size: 640x480 or higher

### Face Matching Tips
- Face the camera directly
- Ensure good lighting
- Keep face centered in the overlay
- Remove glasses if possible
- Maintain similar expression to registration photo

## Troubleshooting

### Issue: "Cannot connect to database"
**Solution:**
- Check that MongoDB is running: `sudo systemctl status mongod` (Linux) or `brew services list` (macOS)
- Start MongoDB if not running: `sudo systemctl start mongod` (Linux) or `brew services start mongodb-community` (macOS)

### Issue: "Camera not working"
**Solutions:**
- Use localhost or HTTPS
- Grant camera permissions in browser settings
- Try a different browser
- Check if camera is being used by another app

### Issue: "Face not matching"
**Solutions:**
- Improve lighting conditions
- Face camera directly
- Use a better quality photo during registration
- Adjust threshold value (edit line 358 in index.html)

### Issue: "Port 8080 already in use"
**Solution:** Change port in `application.properties`:
```properties
server.port=8081
```

### Issue: Java not found
**Solution:** Install Java 17 or higher (see Step 2)

## MongoDB Management

### View all staff in MongoDB
```bash
mongosh
use attendance_db
db.staff.find().pretty()
```

### View all attendance records
```bash
db.attendance.find().pretty()
```

### Count staff members
```bash
db.staff.countDocuments()
```

### Clear all data (caution!)
```bash
db.staff.deleteMany({})
db.attendance.deleteMany({})
```

## API Testing

You can test the API using curl or Postman:

### Add Staff
```bash
curl -X POST http://localhost:8080/api/staff \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "employeeId": "EMP001",
    "designation": "Manager",
    "photoBase64": "data:image/jpeg;base64,..."
  }'
```

### Sign In
```bash
curl -X POST http://localhost:8080/api/attendance/signin \
  -H "Content-Type: application/json" \
  -d '{"employeeId": "EMP001"}'
```

### Get All Staff
```bash
curl http://localhost:8080/api/staff
```

## Production Deployment

For production deployment:

1. Use a production MongoDB instance (MongoDB Atlas, etc.)
2. Update connection string in application.properties
3. Use HTTPS for camera access
4. Configure proper CORS settings
5. Add authentication and authorization
6. Use production database credentials
7. Consider using a reverse proxy (Nginx)
8. Set up proper logging and monitoring
9. Enable MongoDB authentication

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review application logs
3. Check MongoDB connection: `mongosh`
4. Verify camera permissions in browser settings

## Next Steps

- Add more staff members
- Test face recognition with different lighting
- Try QR code scanning
- View attendance records
- Explore MongoDB database
