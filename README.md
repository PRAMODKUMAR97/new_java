# Staff Biometric Attendance System

A modern staff attendance system with face recognition capabilities using Spring Boot and MongoDB.

## Features

- Face Recognition for staff sign-in/sign-out
- QR Code scanning as alternative authentication
- Photo storage in MongoDB database
- Real-time face matching using advanced algorithms
- Staff management (add, view, edit)
- Attendance tracking
- Clean and modern UI
- Responsive design for mobile and desktop

## Tech Stack

**Backend:**
- Spring Boot 3.1.4
- Spring Data MongoDB
- MongoDB Database
- Java 17

**Frontend:**
- Pure HTML, CSS, JavaScript
- WebRTC for camera access
- Canvas API for image processing

## Database Setup

The database uses MongoDB. The collections include:
- `staff` collection: Stores staff information with photos (base64)
- `attendance` collection: Tracks sign-in and sign-out times

## Prerequisites

1. Java 17 or higher
2. Maven (included via mvnw wrapper)
3. MongoDB installed and running
4. Modern web browser with camera support

## Installation & Running

1. Install and start MongoDB:
   ```bash
   # Ubuntu/Debian
   sudo systemctl start mongod

   # macOS
   brew services start mongodb-community
   ```

2. Build the project:
   ```bash
   ./mvnw clean package
   ```

3. Run the application:
   ```bash
   ./mvnw spring-boot:run
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:8080
   ```

## How to Use

### Adding Staff

1. Click "Add New Staff"
2. Enter staff details (Name, Employee ID, Designation)
3. Upload a clear photo of the staff member's face
4. Click "Add Staff"
5. All data including photo is stored in MongoDB

### Sign In / Sign Out

**Using Face Recognition:**
1. Click "Sign In" or "Sign Out"
2. Allow camera access when prompted
3. Position your face in the circular overlay
4. Click "Capture & Match"
5. The system will match your face against photos in the database and record attendance

**Using QR Code:**
1. Click "Sign In" or "Sign Out"
2. Click "Scan QR Code"
3. Enter the Employee ID from the QR code
4. Attendance will be recorded

### View Staff

Click "View All Staff" to see all registered staff members with their photos and complete details from the database.

## API Endpoints

### Staff Management
- `POST /api/staff` - Add new staff (including photo)
- `GET /api/staff` - Get all staff with all details
- `GET /api/staff/{employeeId}` - Get staff by employee ID

### Attendance
- `POST /api/attendance/signin` - Sign in staff
- `POST /api/attendance/signout` - Sign out staff
- `GET /api/attendance?date=YYYY-MM-DD` - Get attendance by date

## Face Recognition Algorithm

The system uses a pixel-based comparison algorithm:
1. Captures image from camera
2. Converts to grayscale luminance values
3. Compares with all stored staff photos from MongoDB
4. Calculates RMSE (Root Mean Square Error)
5. Matches if score is below threshold (90)

## Database Collections

### staff
```
{
  id: String,
  name: String,
  employeeId: String (unique),
  designation: String,
  photoBase64: String,
  createdAt: DateTime,
  updatedAt: DateTime
}
```

### attendance
```
{
  id: String,
  employeeId: String,
  date: Date,
  signInTime: DateTime,
  signOutTime: DateTime,
  createdAt: DateTime,
  updatedAt: DateTime
}
```

## Troubleshooting

**MongoDB connection error:**
- Ensure MongoDB is running: `mongosh`
- Check connection string in application.properties

**Camera not working:**
- Ensure you're using HTTPS or localhost
- Grant camera permissions in browser
- Try a different browser

**Face not matching:**
- Ensure good lighting
- Face the camera directly
- Use a clear, front-facing photo when registering
- Adjust the threshold in code if needed (line 358 in index.html)

## Future Enhancements

- Live video face detection (continuous scanning)
- ML-based face recognition (Face-API.js or TensorFlow.js)
- Attendance reports and analytics
- Email notifications
- Mobile app version
- Fingerprint integration

## License

MIT License
