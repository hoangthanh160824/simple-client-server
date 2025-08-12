# BÀI THỰC HÀNH 01: KIẾN THỨC CƠ BẢN VỀ CLIENT-SERVER

## Slide 1: Giới thiệu nhóm (2 phút)
- **Tên nhóm:** [Tên nhóm của bạn]
- **Thành viên:** [Danh sách thành viên]
- **Phân chia công việc:**
  - Thành viên A: Server implementation (server.js) & API endpoints
  - Thành viên B: HTTP Client development (client.js) & testing scenarios  
  - Thành viên C: Frontend UI (public/) & network analysis
- **Mục tiêu:** Xây dựng HTTP server và client từ đầu
- **Công nghệ:** Node.js v18+, Express.js v5.1.0, vanilla JavaScript
- **Thời gian thực hiện:** 2 ngày (12-13/08/2025)

---

## Slide 2: Kiến trúc tổng quan (1 phút)

```
Browser ←── HTTP ──→ Express Server (port 3000)
   ↓                        ↓
AJAX Calls            Static Files + API
   ↓                        ↓
Custom HTTP Client    /api/server-info + /api/echo
```

---

## Slide 3: Demo Static Web Server (3 phút)

### Live Demo:
1. **Khởi động server:** `npm start` (chạy trên port 3000)
2. **Truy cập:** http://localhost:3000
3. **Tương tác UI:** 
   - Get Server Info button → Hiển thị timestamp, uptime, memory usage
   - Send Message → Echo service với client info
4. **Kiểm tra Network tab:** Custom headers xuất hiện

### Tính năng chi tiết:
- **Static file serving** từ thư mục `public/` (HTML, CSS, JS)
- **2 API endpoints:**
  - `GET /api/server-info` → Server system information
  - `POST /api/echo` → Echo back request data
- **Custom HTTP headers:**
  - `X-Server-Name: Simple-Client-Server`
  - `X-Custom-Header: Lab01-Implementation`
- **Error handling:** 404 cho routes không tồn tại, 500 cho server errors
- **Middleware:** Express.json() cho parsing JSON requests

---

## Slide 4: Demo HTTP Client (3 phút)

### Live Demo:
```bash
node client.js
```

### 5 Test scenarios chi tiết:
1. **Test 1:** GET request to local server (`http://localhost:3000/api/server-info`)
2. **Test 2:** GET request to GitHub API (`https://api.github.com/users/octocat`)  
3. **Test 3:** POST request to JSONPlaceholder (`https://jsonplaceholder.typicode.com/posts`)
4. **Test 4:** POST request to local echo (`http://localhost:3000/api/echo`)
5. **Test 5:** Error handling - Non-existent server (`http://localhost:9999`)

### Đặc điểm kỹ thuật:
- **Built from scratch** - Chỉ sử dụng Node.js built-in modules (`http`, `https`, `url`)
- **HTTPClient class** với methods: `get()`, `post()`, `request()`
- **Promise-based** với async/await support
- **Comprehensive logging** - Request/response headers, data
- **Error handling** - Timeout (10s), connection errors, JSON parsing
- **Support cả HTTP & HTTPS** - Tự động detect protocol

---

## Slide 5: Network Analysis Demo (3 phút)

### Browser DevTools Demo (Chrome/Firefox):
1. **F12 → Network tab** → Clear existing requests
2. **Static file requests:** 
   - `index.html` (document) → 200 OK
   - `style.css` (stylesheet) → 200 OK, cached
   - `script.js` (script) → 200 OK, cached
3. **API calls analysis:**
   - `GET /api/server-info` → Custom headers visible
   - `POST /api/echo` → Request/Response body inspection
4. **Performance metrics:** Loading times, file sizes
5. **Error scenarios:** Test 404 endpoints

### Network Traffic Insights:
- **Static files:** Cached hiệu quả sau lần đầu (304 Not Modified)
- **API response time:** ~10-50ms average cho local server
- **Custom headers:** `X-Server-Name`, `X-Custom-Header` xuất hiện đúng
- **Content-Type:** `application/json` cho API responses
- **Request size:** JSON payload size tracking
- **Static vs Dynamic:** Phân biệt rõ cached files vs API calls

---

## Slide 6: Code Highlights từ Codebase (3 phút)

### Server Implementation (server.js:11-28):
```javascript
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

### HTTP Client Class (client.js:5-31):
```javascript
class HTTPClient {
    constructor() {
        this.defaultHeaders = {
            'User-Agent': 'Lab01-HTTP-Client/1.0',
            'Accept': 'application/json, text/plain, */*'
        };
    }

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
            // Promise implementation with error handling...
        });
    }
}
```

### Frontend AJAX (script.js:18-24):
```javascript
function makeAjaxRequest(url, options = {}) {
    return fetch(url, finalOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            return response.json();
        });
}
```

---

## Slide 7: Technical Challenges & Solutions (2 phút)

### Thách thức gặp phải và cách giải quyết:
1. **Port conflict (5000 → 3000):**
   - Issue: Port 5000 đã được sử dụng
   - Solution: Thay đổi PORT = 3000 trong server.js
   
2. **CORS và static file serving:**
   - Issue: Browser blocking cross-origin requests
   - Solution: `app.use(express.static('public'))` middleware
   
3. **HTTP vs HTTPS trong client:**
   - Issue: Support cả 2 protocols
   - Solution: `const isHTTPS = parsedUrl.protocol === 'https:'`
   
4. **Error handling consistency:**
   - Issue: Different error formats
   - Solution: Unified error response structure

### Performance Insights:
- **Server startup:** < 1 giây
- **Memory usage:** ~20MB baseline
- **API response:** 10-50ms average
- **Static files:** Effective browser caching

---

## Slide 8: Kết luận & Bài học (2 phút)

### Thành quả đạt được (100% requirements):
✅ **Express.js HTTP Server** port 3000 với static file serving  
✅ **2 API endpoints** với custom headers  
✅ **Custom HTTP Client** built from scratch (không dùng axios)  
✅ **Interactive Web Interface** với AJAX calls  
✅ **Network Analysis** với Browser DevTools  
✅ **Error Handling** toàn diện (404, 500, timeout)  
✅ **5 test scenarios** cho HTTP client  

### Kiến thức thu được:
- **HTTP Protocol:** Request/response lifecycle, headers, status codes
- **Node.js Ecosystem:** Express.js middleware, built-in modules
- **Client-Server Architecture:** Static vs dynamic content
- **Network Debugging:** Browser DevTools, performance analysis
- **Error Handling:** Defensive programming, timeout management

### Kỹ năng phát triển:
- **Code Organization:** Modular design pattern
- **Testing Strategies:** Multiple test scenarios
- **Documentation:** Clear README và inline comments
- **Teamwork:** Git collaboration, task distribution

**Cảm ơn thầy cô và các bạn! Sẵn sàng trả lời câu hỏi.**

---

## Chuẩn bị Q&A (Tham khảo)

**Câu hỏi thường gặp và cách trả lời:**

1. **HTTP vs HTTPS khác nhau gì?**
   → HTTPS có SSL/TLS encryption, port 443 thay vì 80, cần certificate. Trong code: `const isHTTPS = parsedUrl.protocol === 'https:'`

2. **Tại sao dùng Express.js thay vì Node.js thuần?**
   → Express cung cấp middleware system, routing dễ dàng, static file serving built-in. VD: `app.use(express.static('public'))`

3. **Node.js xử lý concurrent requests như thế nào?**
   → Event loop single-threaded, non-blocking I/O. Tất cả requests được handle concurrently thông qua callbacks/promises

4. **Security considerations trong HTTP communication?**
   → Input validation, CORS headers, custom headers để identify server, timeout handling cho DoS protection

5. **Làm thế nào để optimize performance?**
   → Static file caching (browser cache), compression middleware, connection pooling, efficient error handling

6. **Promise vs Callback trong HTTP client?**
   → Promises dễ handle async operations, avoid callback hell. Code dùng `new Promise((resolve, reject))`

7. **Xử lý errors trong HTTP requests?**
   → Try-catch blocks, specific error messages, status code checking, timeout handling (10s trong code)