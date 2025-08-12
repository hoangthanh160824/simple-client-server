# Lab 01: Client-Server Fundamentals

## Project Overview

This project implements a simple HTTP client-server application using Node.js and Express.js as part of Lab 01 for Advanced Web Application Development.

## Features

- ✅ HTTP Server with Express.js on port 3000
- ✅ Static file serving (HTML, CSS, JavaScript)
- ✅ RESTful API endpoints
- ✅ Custom HTTP headers
- ✅ Error handling (404, 500)
- ✅ HTTP Client implementation from scratch
- ✅ AJAX requests with interactive UI
- ✅ Responsive web design

## Project Structure

```
lab01-simple-client-server/
├── README.md
├── package.json
├── server.js              # Express.js HTTP server
├── client.js              # Custom HTTP client implementation
├── public/                # Static files directory
│   ├── index.html        # Main webpage
│   ├── style.css         # Responsive CSS styling
│   └── script.js         # Client-side JavaScript with AJAX
├── screenshots/          # Network analysis screenshots
└── docs/                # Technical documentation
```

## Installation

1. Clone or download this repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

### Running the Server

```bash
npm start
# or
node server.js
```

The server will start on `http://localhost:3000`

### Testing the HTTP Client

```bash
npm run client
# or
node client.js
```

Note: Make sure the server is running before testing the client.

### Accessing the Web Application

Open your browser and navigate to:
```
http://localhost:3000
```

## API Endpoints

### GET /api/server-info

Returns server information including:
- Current timestamp
- Server uptime
- System information
- Memory usage
- Custom headers

**Example Response:**
```json
{
  "timestamp": "2025-08-12T10:30:00.000Z",
  "uptime": 120.5,
  "platform": "linux",
  "hostname": "localhost",
  "nodeVersion": "v18.17.0",
  "memory": {...},
  "cpus": 8
}
```

### POST /api/echo

Echoes back the sent data with additional metadata.

**Request Body:**
```json
{
  "message": "Hello World",
  "timestamp": "2025-08-12T10:30:00.000Z"
}
```

## HTTP Client Features

The custom HTTP client (`client.js`) includes:

- Support for both HTTP and HTTPS
- GET and POST methods
- Custom headers
- JSON request/response handling
- Error handling and timeouts
- Console logging for debugging

### Client Test Cases

1. **Local Server GET**: Fetches server information
2. **External API GET**: Calls GitHub API
3. **External POST**: Posts to JSONPlaceholder
4. **Local Echo POST**: Tests local server echo endpoint
5. **Error Handling**: Tests connection to non-existent server

## Browser Developer Tools Analysis

To analyze network traffic:

1. Open the web application in Chrome/Firefox
2. Open Developer Tools (F12)
3. Go to Network tab
4. Click "Get Server Info" or "Send Message" buttons
5. Observe HTTP requests, headers, and responses

## Technical Requirements Met

### Part A: Static Web Server (35 points)
- [x] Express.js HTTP server on port 3000
- [x] Static file serving from `public/` directory
- [x] API endpoint returning server information
- [x] Error handling for 404 and 500 errors
- [x] Custom HTTP headers in responses
- [x] Responsive HTML/CSS design
- [x] Client-side JavaScript with AJAX

### Part B: HTTP Client Implementation (35 points)
- [x] Built-in Node.js HTTP/HTTPS modules only
- [x] GET and POST method support
- [x] HTTP and HTTPS request handling
- [x] Comprehensive error handling
- [x] Multiple test scenarios
- [x] Console logging for debugging

### Part C: Network Traffic Analysis (20 points)
- [x] Browser Developer Tools usage
- [x] Network request monitoring
- [x] Static vs dynamic content analysis

## Dependencies

- **express**: ^5.1.0 - Web framework for Node.js
- **Node.js built-in modules**:
  - `http` - HTTP client/server
  - `https` - HTTPS client/server
  - `url` - URL parsing utilities
  - `path` - File path utilities
  - `os` - Operating system utilities

## Development Notes

- Server uses Express.js for routing and middleware
- Client implementation uses only Node.js built-in modules
- Responsive design works on desktop and mobile devices
- Error handling includes both server-side and client-side validation
- AJAX requests provide real-time interaction without page refresh

## Troubleshooting

### Common Issues

1. **Server won't start**: Check if port 3000 is already in use
2. **Client tests fail**: Ensure server is running before running client tests
3. **CORS errors**: Server includes appropriate headers for local development

### Error Messages

- **ECONNREFUSED**: Server is not running
- **404 Not Found**: Endpoint doesn't exist
- **500 Internal Server Error**: Server-side error occurred

## License

ISC License - Educational use for Advanced Web Application Development course.