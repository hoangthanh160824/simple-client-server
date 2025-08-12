# Báo cáo Phân tích Request Patterns (Static vs Dynamic)

## 1. Giới thiệu

Báo cáo này phân tích sự khác biệt giữa hai loại request chính trong ứng dụng web: request tĩnh (static) và request động (dynamic), dựa trên cấu trúc và hoạt động của dự án `simple-client-server`.

## 2. Phân tích Request Tĩnh (Static Requests)

### a. Đặc điểm

- **Nội dung không đổi**: Request tĩnh yêu cầu các tài nguyên có nội dung không thay đổi, được lưu trữ sẵn trên server dưới dạng file (HTML, CSS, JavaScript, ảnh, ...).
- **Tốc độ nhanh**: Server chỉ cần đọc file và gửi đi, không cần xử lý logic phức tạp.
- **Dễ dàng cache**: Trình duyệt có thể lưu cache các file này để tăng tốc độ tải trang cho các lần truy cập sau.

### b. Ví dụ trong dự án

Khi người dùng truy cập `http://localhost:3000`, trình duyệt sẽ tự động gửi các request tĩnh để tải các file sau từ thư mục `public/`:
- `GET /index.html`
- `GET /style.css`
- `GET /script.js`

### c. Phân tích trên Network Tab

- **Type**: `document`, `stylesheet`, `script`.
- **Initiator**: Thường là `parser` (trình duyệt tự động yêu cầu khi phân tích HTML).
- **Content-Type Header**: `text/html`, `text/css`, `application/javascript`.

## 3. Phân tích Request Động (Dynamic Requests)

### a. Đặc điểm

- **Nội dung thay đổi**: Request động yêu cầu server xử lý logic, truy vấn cơ sở dữ liệu, hoặc tính toán để tạo ra response. Kết quả trả về có thể khác nhau ở mỗi lần gọi.
- **Tương tác người dùng**: Thường được kích hoạt bởi hành động của người dùng (ví dụ: bấm nút, gửi form) thông qua AJAX/Fetch.
- **Không dễ cache**: Vì nội dung thay đổi liên tục, việc cache các request này phức tạp hơn.

### b. Ví dụ trong dự án

- `GET /api/server-info`: Kích hoạt khi người dùng bấm nút "Get Server Info". Server thu thập thông tin hệ thống (uptime, memory, ...) và trả về JSON.
- `POST /api/echo`: Kích hoạt khi người dùng gửi message. Server nhận dữ liệu, xử lý và gửi lại phản hồi.
- Các request trong `client.js` tới API bên ngoài (GitHub, JSONPlaceholder) cũng là request động.

### c. Phân tích trên Network Tab

- **Type**: `xhr` hoặc `fetch`.
- **Initiator**: Thường là `script.js` (do code JavaScript chủ động gọi).
- **Content-Type Header**: Thường là `application/json`.

## 4. So sánh và Kết luận

| Tiêu chí | Request Tĩnh (Static) | Request Động (Dynamic) |
|---|---|---|
| **Mục đích** | Tải giao diện, tài nguyên cơ bản | Lấy/gửi dữ liệu, thực thi logic |
| **Nội dung** | Cố định, không đổi | Thay đổi, được tạo ra khi có yêu cầu |
| **Server Load** | Thấp | Cao hơn (cần CPU, memory để xử lý) |
| **Caching** | Dễ dàng (trình duyệt, CDN) | Khó hơn, cần chiến lược cache phức tạp |
| **Ví dụ** | `style.css`, `logo.png` | `/api/users`, `/api/products` |

**Kết luận**: Việc phân biệt rõ ràng giữa request tĩnh và động là rất quan trọng trong việc tối ưu hiệu suất ứng dụng web. Các tài nguyên tĩnh nên được cache triệt để, trong khi các request động cần được tối ưu về logic xử lý phía server để giảm thời gian phản hồi.

---

## Phụ lục: Giải thích chi tiết các thuật ngữ

### 1. Request Tĩnh (Static Request)

-   **Type**: Thường là `document`, `stylesheet`, `script`. Đây là các loại request tĩnh, tương ứng với các tài nguyên cơ bản để xây dựng trang (HTML, CSS, JS).
-   **Initiator (Người khởi tạo)**: Thường là `parser` (bộ phân tích của trình duyệt).Điều này có nghĩa là request được trình duyệt tự động tạo ra khi nó đọc file HTML và thấy các thẻ như `<link>`, `<script>`, chứ không phải do người dùng hay code JavaScript chủ động gọi. 
    -   **Ví dụ**: Khi bạn tải trang `index.html`, trình duyệt sẽ đọc (parse) file này. Khi nó thấy thẻ `<link rel="stylesheet" href="style.css">`, trình duyệt sẽ tự động gửi một request để tải file `style.css`. Trong trường hợp này, "Initiator" chính là `parser`.
-   **Content-Type Header (Header Loại Nội dung)**: Là "nhãn dán" mà server gửi kèm trong response để báo cho trình duyệt biết loại dữ liệu đang gửi. 
    -   **Ví dụ**: `text/html` (file HTML), `text/css` (file CSS), `application/javascript` (code JavaScript).

### 2. Request Động (Dynamic Request)

-   **Type**: Thường là `xhr` hoặc `fetch`. Đây là các loại request động, được JavaScript sử dụng để trao đổi dữ liệu với server mà không cần tải lại toàn bộ trang. `fetch` là công nghệ mới và hiện đại hơn `xhr`.
    -   **`xhr`** (viết tắt của `XMLHttpRequest`): Đây là công nghệ AJAX "cũ" để gửi request từ JavaScript.
    -   **`fetch`**: Đây là công nghệ AJAX "mới", hiện đại và mạnh mẽ hơn `xhr`. File `script.js` trong dự án của bạn đang dùng `fetch`.
-   **Initiator (Người khởi tạo)**: Thường là `script.js`. Điều này có nghĩa là request được tạo ra bởi một hành động có chủ đích trong code JavaScript (ví dụ: khi người dùng bấm nút, hàm `fetch` được gọi).
    -   **Ví dụ**: Khi bạn bấm nút "Get Server Info", sự kiện này được lắng nghe bởi file `script.js`. Đoạn code trong `script.js` sẽ chủ động gọi hàm `fetch('/api/server-info')` để gửi một request tới server. Vì vậy, "Initiator" chính là `script.js`.
-   **Content-Type Header (Header Loại Nội dung)**: Thường là `application/json`. Điều này cho biết dữ liệu được trao đổi là định dạng JSON, rất phù hợp để JavaScript xử lý.
    -   **Ví dụ**: Các API (như `/api/server-info`) thường không trả về trang web hay file CSS, mà trả về dữ liệu (data).
    JSON (JavaScript Object Notation) là định dạng dữ liệu phổ biến nhất để các ứng dụng web trao đổi thông tin.
    Khi server gửi `Content-Type: application/json`, nó báo cho trình duyệt biết rằng nội dung trả về là một chuỗi JSON, và trình duyệt có thể dễ dàng chuyển nó thành một đối tượng JavaScript để sử dụng.