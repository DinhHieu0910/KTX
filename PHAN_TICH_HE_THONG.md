# PHÂN TÍCH HỆ THỐNG QUẢN LÝ KÝ TÚC XÁ

## I. TỔNG QUAN HỆ THỐNG

**Dự án**: Hệ thống Quản lý Ký túc xá cho Trường Nội trú học sinh  
**Stack Công nghệ**:
- **Backend**: Node.js + Express.js + MongoDB + JWT Authentication
- **Frontend**: React.js + React Router + Axios + TailwindCSS + React Query
- **Port Backend**: 8800
- **Port Frontend**: 3000

---

## II. KIẾN TRÚC HỆ THỐNG

### Backend Structure
```
Backend/API/
├── Controllers/    (Xử lý logic nghiệp vụ)
├── Models/         (Định nghĩa Schema MongoDB)
├── Routes/         (Định tuyến API)
├── Middlewares/    (Xử lý lỗi, validation)
├── Utils/          (JWT verify, Error handling)
└── Index.js        (Entry point)
```

### Frontend Structure
```
Frontend/src/
├── pages/          (Các trang chính)
├── components/     (Các component tái sử dụng)
├── API/            (Gọi API Backend)
├── routes/         (Routing)
├── context/        (Global Context)
├── utils/          (Helper functions)
└── Validate/       (Authentication)
```

---

## III. CÁC MÀNG HÌNH (SCREENS)

### A. MÀNG HÌNH CÔNG KHAI (Public Routes)
Được truy cập mà không cần đăng nhập

#### 1. **Trang Chủ (Home Page)** `/` hoặc `/home`
- Hiển thị thông tin tổng quát về ký túc xá
- Navigation bar, footer
- Giới thiệu dịch vụ

#### 2. **Danh sách Phòng (Room Menu Page)** `/room`
- Hiển thị tất cả các phòng có sẵn
- Xem chi tiết phòng
- Lọc phòng theo các tiêu chí

#### 3. **Chi tiết Phòng (Room Menu Detail)** `/room/:id`
- Thông tin chi tiết phòng
- Giá tiền, số lượng chỗ
- Danh sách sinh viên trong phòng

#### 4. **Trang Chính sách (Policy Page)** `/policy/register`
- Chính sách đăng ký ký túc xá
- Thông tin chung về quy định

### B. MÀNG HÌNH XÁC THỰC (Authentication Routes)

#### 1. **Trang Đăng nhập (Login)** `/login`
- Nhập CMND (Chứng minh nhân dân)
- Nhập Mật khẩu
- Đăng nhập theo vai trò (Sinh viên, Admin)

#### 2. **Trang Đăng xuất (Logout)** `/logout`
- Xóa token, session
- Quay về trang chủ

### D. MÀNG HÌNH HỌC SINH (Student Routes)

#### 1. **Trang Thông tin Cá nhân (Student Profile)** `/student/profile/:id`
- **Hiển thị thông tin học sinh**:
  - Họ tên (HoTen)
  - Mã học sinh (MHV)
  - CMND
  - Giới tính
  - Trường (Truong)
  - Ngân hàng, số tài khoản
  - Phòng hiện tại
  - Ngày nhập/xuất phòng
- **Chức năng**:
  - Chỉnh sửa thông tin cá nhân
  - Đổi mật khẩu

#### 2. **Trang Lịch sử Phòng (Room History)** `/student/room/history`
- Hiển thị lịch sử các phòng đã ở
- Trạng thái phòng (đang ở, đã xuất)
- Ngày check-in/check-out

### D. MÀNG HÌNH QUẢN TRỊ VIÊN (Admin Routes)

#### 1. **Bảng Điều khiển (Dashboard)** `/admin`
- Tổng quan thống kê
- Số lượng sinh viên, phòng
- Doanh thu, tình trạng thanh toán

#### 2. **Quản lý Học sinh (Student Management)**

##### 2.1 Trang Đăng ký Học sinh (Student Signup)** `/admin/student/signup`
- Form đăng ký tài khoản học sinh mới
- Nhập thông tin CMND
- Phân quyền (Role)
- Tạo mật khẩu

##### 2.2 **Danh sách Học sinh (Student List)** `/admin/student/list`
- Danh sách tất cả học sinh
- Tìm kiếm, lọc học sinh
- Chỉnh sửa thông tin học sinh
- Xóa học sinh
- Xem chi tiết học sinh

#### 3. **Quản lý Phòng (Room Management)**

##### 3.1 **Danh sách Phòng (Room List)** `/admin/room/list`
- Danh sách tất cả phòng ký túc xá
- Thông tin: Tên phòng, Giá, Số chỗ, Số chỗ trống
- Tìm kiếm, lọc phòng
- Xóa phòng
- Chuyển hướng sang chi tiết phòng

##### 3.2 **Chi tiết Phòng (Room Detail)** `/admin/room/:id`
- Thông tin chi tiết phòng
- Danh sách học sinh trong phòng
- Chỉnh sửa thông tin phòng
- Xóa học sinh khỏi phòng
- Cập nhật tình trạng phòng

##### 3.3 **Thêm Phòng Mới (Add Room)** `/admin/room/add`
- Form thêm phòng mới
- Nhập: Tên phòng, Giá, Số chỗ
- Chọn tầng/ký túc xá
- Tạo mới phòng

#### 4. **Quản lý Hóa đơn (Bill Management)**

##### 4.1 **Danh sách Hóa đơn (Bill List)** `/admin/bill/list`
- Liệt kê tất cả hóa đơn
- Tìm kiếm hóa đơn
- Xem chi tiết hóa đơn
- Cập nhật trạng thái thanh toán
- Thao tác xóa hóa đơn

##### 4.2 **Chi tiết Hóa đơn (Bill Detail)** `/admin/bill/:id`
- Thông tin hóa đơn chi tiết
- Sinh viên liên quan
- Phòng, giá, ngày tháng
- Cập nhật trạng thái (Chưa thanh toán/Đã thanh toán)

#### 5. **Quản lý Yêu cầu (Request Management)** `/admin/requests`
- **Các loại yêu cầu**:
  - **Yêu cầu Checkout (Check out)**
    - Sinh viên muốn rời phòng
    - Xem, duyệt, từ chối
  - **Yêu cầu Đổi phòng (Change Room)**
    - Sinh viên yêu cầu đổi phòng
    - Xem lý do, chọn phòng mới
  - **Yêu cầu Gia hạn (Extend)**
    - Sinh viên yêu cầu gia hạn thời gian ở
    - Chọn thời gian mới
  - **Yêu cầu Sửa phòng (Fix Room)**
    - Phòng có hư hỏng cần sửa
    - Ghi nhận lỗi, lên lịch sửa

---

## IV. CÁC API QUAN TRỌNG

### A. API XÁC THỰC (Authentication)

| Method | Endpoint | Mô tả | Auth | Dữ liệu |
|--------|----------|-------|------|---------|
| POST | `/api/auth/register` | Đăng ký tài khoản | - | CMND, MatKhau, RoleId |
| POST | `/api/auth/login` | Đăng nhập | - | CMND, MatKhau |
| GET | `/api/auth/checkauth` | Kiểm tra đăng nhập | JWT | - |
| GET | `/api/auth/checkuser/:id` | Kiểm tra User | JWT | - |
| GET | `/api/auth/checkadmin` | Kiểm tra Admin | JWT | - |
| PUT | `/api/auth/account/:id` | Cập nhật tài khoản | - | MatKhau mới |
| DELETE | `/api/auth/account/:id` | Xóa tài khoản | VerifyAdmin | - |

**Dữ liệu trả về**:
```json
{
  "details": {
    "CMND": "string",
    "MatKhau": "hash",
    "_id": "ObjectId",
    "RoleId": "ObjectId"
  },
  "role": {
    "roleName": "string"
  }
}
```

### B. API PHÒNG (Rooms)

| Method | Endpoint | Mô tả | Auth |
|--------|----------|-------|------|
| GET | `/api/rooms` | Lấy tất cả phòng | - |
| GET | `/api/rooms/:id` | Lấy chi tiết phòng | - |
| POST | `/api/rooms` | Tạo phòng mới | VerifyAdmin |
| PUT | `/api/rooms/:id` | Cập nhật phòng | - |
| PUT | `/api/rooms/availability/:id` | Cập nhật tình trạng sẵn có | VerifyAdmin |
| DELETE | `/api/rooms/:id/:dormitoryId` | Xóa phòng | - |

**Dữ liệu Phòng**:
```json
{
  "dormId": "ObjectId",
  "Title": "string",           // Tên phòng
  "status": 0|1,               // Trạng thái
  "Price": "number",           // Giá tiền/tháng
  "Slot": "number",            // Tổng số chỗ
  "availableSlot": "number",   // Số chỗ trống
  "roomMembers": [
    {
      "userId": "ObjectId",
      "HoTen": "string",
      "Mssv": "string",
      "CMND": "string"
    }
  ]
}
```

### C. API YÊU CẦU PHÒNG (Room Requests)

#### C.1 YÊU CẦU CHECKOUT
| Method | Endpoint | Mô tả | Auth |
|--------|----------|-------|------|
| GET | `/api/rooms/checkout` | Lấy tất cả yêu cầu checkout | VerifyAdmin |
| GET | `/api/rooms/checkout/:userId` | Lấy yêu cầu checkout của user | - |
| POST | `/api/rooms/checkout` | Tạo yêu cầu checkout | - |
| PUT | `/api/rooms/checkout/:id` | Cập nhật yêu cầu checkout | - |

#### C.2 YÊU CẦU ĐỔI PHÒNG
| Method | Endpoint | Mô tả | Auth |
|--------|----------|-------|------|
| GET | `/api/rooms/change-room` | Lấy tất cả yêu cầu đổi phòng | VerifyAdmin |
| GET | `/api/rooms/change-room/:userId` | Lấy yêu cầu đổi phòng của user | - |
| POST | `/api/rooms/change-room` | Tạo yêu cầu đổi phòng | - |
| PUT | `/api/rooms/change-room/:id` | Cập nhật yêu cầu đổi phòng | - |

#### C.3 YÊU CẦU GIA HẠN
| Method | Endpoint | Mô tả | Auth |
|--------|----------|-------|------|
| GET | `/api/rooms/extend` | Lấy tất cả yêu cầu gia hạn | - |
| GET | `/api/rooms/extend/:userId` | Lấy yêu cầu gia hạn của user | - |
| POST | `/api/rooms/extend` | Tạo yêu cầu gia hạn | - |
| PUT | `/api/rooms/extend/:id` | Cập nhật yêu cầu gia hạn | - |

#### C.4 YÊU CẦU SỬA PHÒNG
| Method | Endpoint | Mô tả | Auth |
|--------|----------|-------|------|
| GET | `/api/rooms/fix` | Lấy tất cả yêu cầu sửa phòng | - |
| GET | `/api/rooms/fix/:userId` | Lấy yêu cầu sửa phòng của user | - |
| POST | `/api/rooms/fix` | Tạo yêu cầu sửa phòng | - |
| PUT | `/api/rooms/fix/:id` | Cập nhật yêu cầu sửa phòng | - |

### D. API SINH VIÊN (Users)

| Method | Endpoint | Mô tả | Auth |
|--------|----------|-------|------|
| GET | `/api/user` | Lấy tất cả sinh viên | - |
| GET | `/api/user/:id` | Lấy chi tiết sinh viên | - |
| POST | `/api/user` | Tạo sinh viên mới | - |
| PUT | `/api/user/:id` | Cập nhật sinh viên | - |
| DELETE | `/api/user/:id` | Xóa sinh viên | VerifyAdmin |

**Dữ liệu Học sinh**:
```json
{
  "HoTen": "string",           // Họ tên
  "MHV": "string",             // Mã học sinh
  "CMND": "string",            // CMND
  "Matk": "ObjectId",          // ID tài khoản
  "GioiTinh": "string",        // Giới tính
  "Truong": "string",          // Trường
  "NganHang": "string",        // Ngân hàng
  "room": {
    "roomId": "ObjectId",
    "roomTitle": "string",
    "dateIn": "Date",
    "dateOut": "Date",
    "status": 0|1              // 0: Đã checkout, 1: Đang ở
  }
}
```

### E. API QUẢN LÝ PHỤ PHÒNG (Room Details)

| Method | Endpoint | Mô tả | Auth |
|--------|----------|-------|------|
| GET | `/api/roomdetails` | Lấy tất cả chi tiết phòng | VerifyAdmin |
| GET | `/api/roomdetails/:id` | Lấy chi tiết phòng | VerifyAdmin |
| POST | `/api/roomdetails` | Thêm sinh viên vào phòng | - |
| PUT | `/api/roomdetails/:id` | Cập nhật chi tiết phòng | VerifyAdmin |
| DELETE | `/api/roomdetails/:id` | Xóa chi tiết phòng | VerifyAdmin |

### F. API HÓA ĐƠN (Bills/HoaDon)

| Method | Endpoint | Mô tả | Auth |
|--------|----------|-------|------|
| GET | `/api/hd` | Lấy tất cả hóa đơn | - |
| GET | `/api/hd/:id` | Lấy chi tiết hóa đơn | - |
| GET | `/api/hd/student/:cmnd` | Lấy hóa đơn của sinh viên | - |
| POST | `/api/hd` | Tạo hóa đơn mới | - |
| PUT | `/api/hd/:id` | Cập nhật hóa đơn | - |

**Dữ liệu Hóa đơn**:
```json
{
  "title": "string",
  "roomId": "ObjectId",
  "price": "number",
  "status": "number",          // 0: Chưa thanh toán, 1: Đã thanh toán
  "billDetails": {
    "HoTen": "string",
    "CMND": "string",
    "userId": "ObjectId",
    "MHV": "string",
    "roomName": "string",
    "dateIn": "Date",
    "dateOut": "Date"
  }
}
```

### G. API QUẢN TRỊVIÊN (Admin)

| Method | Endpoint | Mô tả | Auth |
|--------|----------|-------|------|
| GET | `/api/admin` | Lấy tất cả admin | VerifyAdmin |
| GET | `/api/admin/:id` | Lấy chi tiết admin | VerifyAdmin |
| POST | `/api/admin` | Tạo admin mới | VerifyAdmin |
| PUT | `/api/admin/:id` | Cập nhật admin | VerifyAdmin |
| DELETE | `/api/admin/:id` | Xóa admin | VerifyAdmin |

### H. API VAI TRÒ (Roles)

| Method | Endpoint | Mô tả | Auth |
|--------|----------|-------|------|
| GET | `/api/role` | Lấy tất cả vai trò | - |
| GET | `/api/role/:id` | Lấy chi tiết vai trò | - |
| POST | `/api/role` | Tạo vai trò | VerifyAdmin |
| PUT | `/api/role/:id` | Cập nhật vai trò | VerifyAdmin |
| DELETE | `/api/role/:id` | Xóa vai trò | VerifyAdmin |

### I. API KÝ TÚC XÁ (Dormitories)

| Method | Endpoint | Mô tả | Auth |
|--------|----------|-------|------|
| GET | `/api/dormitorys` | Lấy tất cả ký túc xá | - |
| GET | `/api/dormitorys/:id` | Lấy chi tiết ký túc xá | - |
| GET | `/api/dormitorys/room/:id` | Lấy phòng theo ký túc xá | - |
| POST | `/api/dormitorys` | Tạo ký túc xá | VerifyAdmin |
| PUT | `/api/dormitorys/:id` | Cập nhật ký túc xá | VerifyAdmin |
| DELETE | `/api/dormitorys/:id` | Xóa ký túc xá | VerifyAdmin |

---

## V. DATABASE MODELS

### 1. **Account (Tài khoản)**
```javascript
{
  CMND: String (Unique, Required),
  MatKhau: String (Hash),
  RoleId: ObjectId (Ref: Role)
}
```

### 2. **User (Sinh viên)**
```javascript
{
  HoTen: String,
  Mssv: String,
  CMND: String,
  Matk: ObjectId (Ref: Account),
  GioiTinh: String,
  Truong: String,
  NganHang: String,
  room: {
    roomId: ObjectId,
    roomTitle: String,
    dateIn: Date,
    dateOut: Date,
    status: Number (0|1)
  }
}
```

### 3. **Room (Phòng)**
```javascript
{
  dormId: ObjectId,
  Title: String,
  status: Number (0|1),
  Price: Number,
  Slot: Number,
  availableSlot: Number,
  roomMembers: [{
    userId: ObjectId,
    HoTen: String,
    Mssv: String,
    CMND: String,
    Truong: String,
    Phone: String,
    Email: String
  }]
}
```

### 4. **HoaDon (Hóa đơn)**
```javascript
{
  title: String,
  roomId: ObjectId (Ref: Room),
  price: Number,
  status: Number,
  billDetails: {
    HoTen: String,
    CMND: String (Ref: User),
    userId: ObjectId (Ref: User),
    Mssv: String,
    roomName: String,
    dateIn: Date,
    dateOut: Date,
    ...thêm chi tiết
  }
}
```

### 5. **Dormitory (Ký túc xá)**
```javascript
{
  dormName: String,
  address: String,
  ...thêm thông tin
}
```

### 6. **Role (Vai trò)**
```javascript
{
  roleName: String (Student, Admin, ...)
}
```

### 7. **Request Models**
- **checkOutRequest**: Yêu cầu checkout
- **changeRoomRequest**: Yêu cầu đổi phòng
- **extendRequest**: Yêu cầu gia hạn
- **fixRequest**: Yêu cầu sửa phòng

---

## VI. MIDDLEWARE VÀ XÁC THỰC

### 1. **JWT Token Authentication**
- Sử dụng JWT (JSON Web Tokens)
- Token có hiệu lực: 24 giờ
- Được lưu trong Cookie (httpOnly)

### 2. **Middleware**
- `Verifytoken`: Kiểm tra JWT token có hợp lệ không
- `VerifyUser`: Kiểm tra có phải User không
- `VerifyAdmin`: Kiểm tra có phải Admin không
- `errorHandler`: Xử lý lỗi toàn bộ ứng dụng

---

## VII. CÔNG NGHỆ VÀ THƯ VIỆN

### Backend
- **express**: Web framework
- **mongoose**: MongoDB ODM
- **bcryptjs**: Mã hóa mật khẩu
- **jsonwebtoken**: JWT authentication
- **celebrate**: Validation
- **cors**: Cross-origin resource sharing

### Frontend
- **react**: UI library
- **react-router-dom**: Routing
- **axios**: HTTP client
- **react-query** (@tanstack/react-query): Data fetching
- **tailwindcss**: CSS framework
- **react-hook-form**: Form handling

---

## VIII. LUỒNG NGHIỆP VỤ CHÍNH

### 1. **Luồng Đăng ký Học sinh**
1. Admin vào `/admin/student/signup`
2. Nhập thông tin CMND, mật khẩu, vai trò
3. Gọi `/api/auth/register`
4. Hệ thống tạo tài khoản và lưu vào DB

### 2. **Luồng Đăng nhập**
1. User vào `/login`
2. Nhập CMND và mật khẩu
3. Gọi `/api/auth/login`
4. Kiểm tra mật khẩu
5. Tạo JWT token
6. Lưu token vào Cookie
7. Chuyển hướng theo vai trò

### 3. **Luồng Xếp Phòng Học sinh**
1. Admin chọn học sinh
2. Chọn phòng trống
3. Gọi `/api/roomdetails` (POST) - Thêm học sinh vào phòng
4. Cập nhật tình trạng phòng

### 4. **Luồng Yêu cầu Checkout**
1. Học sinh vào `/student/profile`
2. Gửi yêu cầu checkout
3. Gọi `/api/rooms/checkout` (POST)
4. Admin xem yêu cầu ở `/admin/requests`
5. Admin duyệt `/api/rooms/checkout/:id` (PUT)
6. Cập nhật trạng thái phòng

### 5. **Luồng Quản lý Hóa đơn**
1. Tạo hóa đơn: `/api/hd` (POST)
2. Học sinh xem hóa đơn: `/api/hd/student/:cmnd`
3. Admin xem danh sách: `/api/hd`
4. Admin cập nhật trạng thái: `/api/hd/:id` (PUT)

---

## IX. VALIDATION & ERROR HANDLING

### Validation (Auth Route)
- **CMND**: Bắt buộc
- **MatKhau**: Bắt buộc, regex pattern
  - Độ dài tối thiểu 6 ký tự
  - Phải có số, chữ, ký tự đặc biệt (@#$%^&*!)

### Error Handling
- Sử dụng Middleware `errorHandler`
- Trả về HTTP Status Code phù hợp
- JSON error response format

---

## X. CORS & SECURITY

### CORS Configuration
- Whitelist: `http://localhost:8000`, `http://localhost:3000`
- Methods: GET, PUT, POST, DELETE, OPTIONS
- Credentials: true

### Security
- JWT tokens trong HttpOnly Cookie
- Password hashing với bcryptjs
- CMND unique constraint

---

## XI. CẢI TIẾN & GHI CHÚ

### Các điểm cần chú ý:
1. **Frontend Dashboard**: Trang Admin Dashboard còn đơn giản, cần phát triển thêm
2. **Validation**: Cần tăng cường validation ở frontend
3. **Error UI**: Cần hiển thị lỗi rõ ràng cho user
4. **Loading states**: Sử dụng React Query tốt
5. **Pagination**: Nên thêm pagination cho danh sách

### Có thể thêm:
- Tìm kiếm advanced (filter, sort)
- Export dữ liệu (Excel, PDF)
- Thống kê, biểu đồ
- Thông báo real-time (Socket.io)
- Backup dữ liệu
- Audit log
- Two-factor authentication

---

**Ngày phân tích**: 5 Tháng 2 Năm 2026
