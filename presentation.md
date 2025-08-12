# BÀI THỰC HÀNH 01: KIẾN THỨC CƠ BẢN VỀ CLIENT-SERVER

## Slide 1: Giới thiệu nhóm
- **Tên nhóm:** [Tên nhóm của bạn]
- **Thành viên:** [Danh sách thành viên]
- **Phân chia công việc:**
  - Member 1: Server implementation & API development
  - Member 2: HTTP Client & testing scenarios
  - Member 3: Frontend UI & network analysis

---

## Slide 2: Tổng quan dự án

### Mục tiêu
- Hiểu sâu về kiến trúc Client-Server
- Thực hành HTTP protocol và request/response lifecycle
- Xây dựng HTTP server và client từ đầu

### Công nghệ sử dụng
- **Backend:** Node.js + Express.js
- **Frontend:** HTML, CSS, JavaScript (vanilla)
- **HTTP Client:** Node.js built-in modules (http/https)
- **Port:** 3000

---

## Slide 3: Kiến trúc hệ thống

```
┌─────────────┐    HTTP Request     ┌─────────────┐
│   Browser   │ ←──────────────────→ │   Server    │
│  (Client)   │                     │ (Express.js)│
└─────────────┘                     └─────────────┘
       ↓                                    ↓
┌─────────────┐                     ┌─────────────┐
│   AJAX      │                     │  Static     │
│ Requests    │                     │  Files      │
└─────────────┘                     └─────────────┘
       ↓                                    ↓
┌─────────────┐                     ┌─────────────┐
│ Custom HTTP │                     │ API         │
│   Client    │                     │ Endpoints   │
└─────────────┘                     └─────────────┘
```

---

## Slide 4: PHẦN A - Static Web Server Demo

### Tính năng chính
1. **Express.js Server** chạy trên port 3000
2. **Static file serving** từ thư mục `public/`
3. **API Endpoints:**
   - `GET /api/server-info` - Thông tin server
   - `POST /api/echo` - Echo service
4. **Custom Headers:**
   - `X-Server-Name: Simple-Client-Server`
   - `X-Custom-Header: Lab01-Implementation`

### Demo trực tiếp
- Khởi động server: `npm start`
- Truy cập: `http://localhost:3000`
- Tương tác với UI để lấy server info
- Test echo endpoint với message

---

## Slide 5: Code chính - Server Implementation

```javascript
// server.js - Key functions
app.get('/api/server-info', (req, res) => {
  const serverInfo = {
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    platform: os.platform(),
    hostname: os.hostname(),
    nodeVersion: process.version,
    memory: process.memoryUsage(),
    cpus: os.cpus().length
  };
  
  res.set({
    'X-Server-Name': 'Simple-Client-Server',
    'X-Custom-Header': 'Lab01-Implementation'
  });
  
  res.json(serverInfo);
});
```

---

## Slide 6: PHẦN B - HTTP Client Implementation

### Đặc điểm kỹ thuật
- **Built from scratch** - Chỉ sử dụng Node.js built-in modules
- **Support cả HTTP & HTTPS**
- **Methods:** GET, POST với JSON payload
- **Error handling:** Timeout, connection errors
- **Logging:** Chi tiết request/response

### Test scenarios
1. **Local server** - GET server info
2. **External API** - GitHub user info
3. **POST test** - JSONPlaceholder
4. **Local echo** - POST to our server
5. **Error handling** - Non-existent server

---

## Slide 7: Code chính - HTTP Client

```javascript
// client.js - HTTPClient class
class HTTPClient {
    request(requestUrl, options = {}) {
        return new Promise((resolve, reject) => {
            const parsedUrl = url.parse(requestUrl);
            const isHTTPS = parsedUrl.protocol === 'https:';
            const client = isHTTPS ? https : http;
            
            const requestOptions = {
                hostname: parsedUrl.hostname,
                port: parsedUrl.port || (isHTTPS ? 443 : 80),
                path: parsedUrl.path,
                method: options.method || 'GET',
                headers: { ...this.defaultHeaders, ...options.headers }
            };
            
            // Request implementation...
        });
    }
}
```

---

## Slide 8: PHẦN C - Network Analysis Demo

### Browser Developer Tools
- **Network tab analysis** - Request/response inspection
- **Headers examination** - Custom headers verification
- **Timeline analysis** - Loading performance
- **Static vs Dynamic content** - Different request patterns

### Key insights
- Static files được cache hiệu quả
- API responses có custom headers
- AJAX requests không reload trang
- Error handling hoạt động đúng

---

## Slide 9: Screenshots Demo

### Network Analysis trong Chrome DevTools
1. **Static file requests** - HTML, CSS, JS
2. **API calls** - /api/server-info response
3. **POST requests** - /api/echo with payload
4. **Error scenarios** - 404 handling
5. **Response headers** - Custom headers hiển thị

### Performance metrics
- Initial page load: ~200ms
- API response time: ~10-50ms
- Static assets: Cached sau lần đầu

---

## Slide 10: Technical Challenges & Solutions

### Thách thức gặp phải
1. **CORS issues** - Giải quyết bằng Express middleware
2. **Port conflicts** - Thay đổi từ 5000 sang 3000
3. **Error handling** - Comprehensive error management
4. **Async operations** - Promise-based implementation

### Giải pháp áp dụng
- Consistent error response format
- Proper HTTP status codes
- Timeout handling cho requests
- User-friendly error messages

---

## Slide 11: Hiệu suất & Tối ưu hóa

### Metrics quan sát được
- **Server startup time:** < 1 giây
- **API response time:** 10-50ms average
- **Memory usage:** ~20MB cho server
- **Concurrent requests:** Handled efficiently

### Best practices áp dụng
- Static file caching
- JSON response compression
- Proper HTTP headers
- Error boundary implementation

---

## Slide 12: Bài học rút ra

### Kiến thức kỹ thuật
- **HTTP protocol** hiểu sâu về headers, status codes
- **Node.js ecosystem** - Express.js vs vanilla Node.js
- **Client-Server communication** - Request/response lifecycle
- **Network debugging** - Browser DevTools proficiency

### Kỹ năng phát triển
- **Code organization** - Modular design
- **Error handling** - Defensive programming
- **Testing strategies** - Multiple test scenarios
- **Documentation** - Clear, comprehensive README

### Soft skills
- **Teamwork** - Effective collaboration
- **Problem solving** - Debug complex issues
- **Time management** - Meet deadlines
- **Communication** - Technical presentation skills

---

## Slide 13: Demo Q&A Preparation

### Câu hỏi thường gặp
1. **HTTP vs HTTPS differences?**
   - Security, port numbers, certificate requirements

2. **Why Express.js vs vanilla Node.js?**
   - Middleware support, routing simplicity, static file serving

3. **Concurrent request handling?**
   - Node.js event loop, non-blocking I/O

4. **Security considerations?**
   - Input validation, CORS, custom headers

5. **Performance optimization strategies?**
   - Caching, compression, connection pooling

---

## Slide 14: Future Enhancements

### Potential improvements
- **HTTPS implementation** với self-signed certificates
- **WebSocket support** cho real-time communication
- **Performance benchmarking** cho different file sizes
- **Custom TCP server/client** implementation
- **Database integration** cho persistent data
- **Authentication & Authorization**
- **Rate limiting** và security middleware

---

## Slide 15: Kết luận

### Thành quả đạt được
✅ **HTTP Server** - Express.js với static files  
✅ **API Endpoints** - Server info & echo service  
✅ **Custom HTTP Client** - Built from scratch  
✅ **Web Interface** - Interactive AJAX demo  
✅ **Network Analysis** - DevTools proficiency  
✅ **Error Handling** - Comprehensive coverage  
✅ **Documentation** - Clear setup instructions  

### Next steps
- Triển khai production environment
- Implement advanced features
- Security hardening
- Performance monitoring

**Cảm ơn các thầy cô và các bạn đã lắng nghe!**

---

## Phần hỏi đáp (10 phút)
*Sẵn sàng trả lời các câu hỏi kỹ thuật*