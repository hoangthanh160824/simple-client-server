# BÀI THỰC HÀNH 01: KIẾN THỨC CƠ BẢN VỀ CLIENT-SERVER

## Slide 1: Giới thiệu nhóm (2 phút)
- **Tên nhóm:** [Tên nhóm của bạn]
- **Thành viên:** [Danh sách thành viên]
- **Mục tiêu:** Xây dựng HTTP server và client từ đầu
- **Công nghệ:** Node.js + Express.js, vanilla JavaScript

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
1. **Khởi động server:** `npm start`
2. **Truy cập:** http://localhost:3000
3. **Tương tác UI:** Get Server Info button
4. **AJAX Demo:** Send message to echo endpoint

### Tính năng chính:
- Static file serving (HTML, CSS, JS)
- Custom headers (`X-Server-Name`)
- Error handling (404, 500)

---

## Slide 4: Demo HTTP Client (3 phút)

### Live Demo:
```bash
node client.js
```

### 5 Test scenarios:
1. ✅ Local server info
2. ✅ GitHub API external call  
3. ✅ JSONPlaceholder POST
4. ✅ Local echo endpoint
5. ✅ Error handling test

### Key features:
- Built from scratch (no axios/fetch)
- HTTP & HTTPS support
- Promise-based implementation

---

## Slide 5: Network Analysis Demo (2 phút)

### Browser DevTools Demo:
1. **F12 → Network tab**
2. **Static requests:** HTML, CSS, JS files
3. **API calls:** Custom headers visible
4. **Performance:** Loading times analysis

### Insights:
- Static files cached effectively
- API responses ~10-50ms
- Custom headers working correctly

---

## Slide 6: Code Highlights (2 phút)

### Server Key Code:
```javascript
app.get('/api/server-info', (req, res) => {
  const serverInfo = {
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    platform: os.platform(),
    memory: process.memoryUsage()
  };
  res.set('X-Server-Name', 'Simple-Client-Server');
  res.json(serverInfo);
});
```

### Client Key Code:
```javascript
class HTTPClient {
    request(url, options) {
        const client = url.startsWith('https') ? https : http;
        // Promise-based implementation...
    }
}
```

---

## Slide 7: Kết luận & Bài học (2 phút)

### Thành quả đạt được:
✅ HTTP Server với Express.js  
✅ Custom HTTP Client từ đầu  
✅ Interactive Web Interface  
✅ Network Analysis Skills  
✅ Error Handling toàn diện  

### Bài học rút ra:
- **Kỹ thuật:** HTTP protocol, Node.js ecosystem
- **Thực hành:** Debugging, testing strategies  
- **Teamwork:** Phân chia công việc hiệu quả

**Cảm ơn! Sẵn sàng trả lời câu hỏi.**

---

## Chuẩn bị Q&A (Tham khảo)

**Câu hỏi thường gặp:**
1. **HTTP vs HTTPS khác gì?** → Port, SSL/TLS, certificate
2. **Tại sao dùng Express thay vì Node thuần?** → Middleware, routing dễ dàng
3. **Xử lý concurrent requests?** → Event loop của Node.js
4. **Security considerations?** → Input validation, CORS, headers
5. **Optimize performance?** → Caching, compression, connection pooling