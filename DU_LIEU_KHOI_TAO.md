# HƯỚNG DẪN DỮ LIỆU KHỞI TẠO (SEED DATA)

## I. CÁC BƯỚC KHỞI TẠO DỮ LIỆU

Thứ tự khởi tạo dữ liệu **RẤT QUAN TRỌNG** vì có Foreign Keys:

```
1. Role (Vai trò)
   ↓
2. Dormitory (Ký túc xá)
   ↓
3. Account (Tài khoản) → phụ thuộc Role
   ↓
4. User (Học sinh) → phụ thuộc Account
   ↓
5. Admin (Quản trị viên) → phụ thuộc Account
   ↓
6. Room (Phòng) → phụ thuộc Dormitory
   ↓
7. RoomDetails (Chi tiết phòng) → phụ thuộc Room, User
↓
8. HoaDon (Hóa đơn) → phụ thuộc Room, User
   ↓
9. Requests (Các yêu cầu)
```

---

## II. ROLES (VAI TRÒ) - CẦN KHỞI TẠO

### Role Schema
```javascript
{
  role: String ["admin", "student"]
}
```

### Seed Data cho Roles

```javascript
// Role 1: Admin
{
  "_id": "6676f1a1b3c4d5e6f7g8h9i0",  // Lưu ID này để dùng sau
  "role": "admin",
  "createdAt": "2025-02-05T00:00:00.000Z"
}

// Role 2: Học sinh
{
  "_id": "6676f1a1b3c4d5e6f7g8h9i1",
  "role": "student",
  "createdAt": "2025-02-05T00:00:00.000Z"
}
```

---

## III. DORMITORY (KÝ TÚC XÁ)

### Dormitory Schema
```javascript
{
  Name: String,
  Desc: String,
  Room: [String]  // Array của Room IDs
}
```

### Seed Data cho Dormitories

```javascript
// KTX 1: Ký túc xá A
{
  "_id": "5556f1a1b3c4d5e6f7g8h9a0",
  "Name": "Ký túc xá A",
  "Desc": "Tầng 1-3, Dung tích 200 sinh viên",
  "Room": []  // Sẽ cập nhật sau khi tạo rooms
}

// KTX 2: Ký túc xá B
{
  "_id": "5556f1a1b3c4d5e6f7g8h9b0",
  "Name": "Ký túc xá B",
  "Desc": "Tầng 4-6, Dung tích 150 sinh viên",
  "Room": []
}

// KTX 3: Ký túc xá C (nữ)
{
  "_id": "5556f1a1b3c4d5e6f7g8h9c0",
  "Name": "Ký túc xá C (Nữ)",
  "Desc": "Tầng 7-9, Dành cho nữ, Dung tích 180 sinh viên",
  "Room": []
}
```

---

## IV. ACCOUNTS (TÀI KHOẢN)

### Account Schema
```javascript
{
  CMND: String (unique),
  MatKhau: String (hash bcryptjs),
  RoleId: ObjectId (ref: Role)
}
```

### 🔐 Mật khẩu Hashed (bcryptjs, salt=12)
- Mật khẩu gốc: `Admin@123` → Hash: `$2a$12$...` (tùy thuộc bcryptjs)
- Mật khẩu gốc: `Student@123` → Hash: `$2a$12$...`

### Seed Data cho Accounts

#### Tài khoản Admin

```javascript
// Admin 1: Nguyễn Văn A (Admin chính)
{
  "_id": "7776f1a1b3c4d5e6f7g8h9a1",
  "CMND": "012345678901",
  "MatKhau": "$2a$12$9xQlWu6GZq8Yx8d3V0.zuut8E3fNJfXCDjCJM5J5GNw8K8L1K9k8C",  // Admin@123
  "RoleId": "6676f1a1b3c4d5e6f7g8h9i0",  // Role: Admin
  "createdAt": "2025-01-01T00:00:00.000Z"
}

// Admin 2: Trần Thị B
{
  "_id": "7776f1a1b3c4d5e6f7g8h9a2",
  "CMND": "098765432101",
  "MatKhau": "$2a$12$9xQlWu6GZq8Yx8d3V0.zuut8E3fNJfXCDjCJM5J5GNw8K8L1K9k8C",  // Admin@123
  "RoleId": "6676f1a1b3c4d5e6f7g8h9i0",  // Role: Admin
  "createdAt": "2025-01-02T00:00:00.000Z"
}
```

#### Tài khoản Student

```javascript
// Student 1: Lê Văn C
{
  "_id": "7776f1a1b3c4d5e6f7g8h9s1",
  "CMND": "123456789012",
  "MatKhau": "$2a$12$9xQlWu6GZq8Yx8d3V0.zuut8E3fNJfXCDjCJM5J5GNw8K8L1K9k8C",  // Student@123
  "RoleId": "6676f1a1b3c4d5e6f7g8h9i1",  // Role: Student
  "createdAt": "2025-01-05T00:00:00.000Z"
}

// Student 2: Phạm Thị D
{
  "_id": "7776f1a1b3c4d5e6f7g8h9s2",
  "CMND": "234567890123",
  "MatKhau": "$2a$12$9xQlWu6GZq8Yx8d3V0.zuut8E3fNJfXCDjCJM5J5GNw8K8L1K9k8C",  // Student@123
  "RoleId": "6676f1a1b3c4d5e6f7g8h9i1",
  "createdAt": "2025-01-06T00:00:00.000Z"
}

// Student 3: Bùi Văn E
{
  "_id": "7776f1a1b3c4d5e6f7g8h9s3",
  "CMND": "345678901234",
  "MatKhau": "$2a$12$9xQlWu6GZq8Yx8d3V0.zuut8E3fNJfXCDjCJM5J5GNw8K8L1K9k8C",  // Student@123
  "RoleId": "6676f1a1b3c4d5e6f7g8h9i1",
  "createdAt": "2025-01-07T00:00:00.000Z"
}

// Student 4: Đặng Thị F
{
  "_id": "7776f1a1b3c4d5e6f7g8h9s4",
  "CMND": "456789012345",
  "MatKhau": "$2a$12$9xQlWu6GZq8Yx8d3V0.zuut8E3fNJfXCDjCJM5J5GNw8K8L1K9k8C",  // Student@123
  "RoleId": "6676f1a1b3c4d5e6f7g8h9i1",
  "createdAt": "2025-01-08T00:00:00.000Z"
}

// Student 5: Hoàng Văn G
{
  "_id": "7776f1a1b3c4d5e6f7g8h9s5",
  "CMND": "567890123456",
  "MatKhau": "$2a$12$9xQlWu6GZq8Yx8d3V0.zuut8E3fNJfXCDjCJM5J5GNw8K8L1K9k8C",  // Student@123
  "RoleId": "6676f1a1b3c4d5e6f7g8h9i1",
  "createdAt": "2025-01-09T00:00:00.000Z"
}

// Student 6: Vũ Thị H
{
  "_id": "7776f1a1b3c4d5e6f7g8h9s6",
  "CMND": "678901234567",
  "MatKhau": "$2a$12$9xQlWu6GZq8Yx8d3V0.zuut8E3fNJfXCDjCJM5J5GNw8K8L1K9k8C",  // Student@123
  "RoleId": "6676f1a1b3c4d5e6f7g8h9i1",
  "createdAt": "2025-01-10T00:00:00.000Z"
}
```

---

## V. USERS (HỌC SINH)

### User Schema
```javascript
{
  HoTen: String,
  MHV: String,
  CMND: String,
  Matk: ObjectId (ref: Account),
  GioiTinh: String,
  Truong: String,
  NganHang: String,
  Phone: String,
  Email: String,
  Photos: [String],
  Address: String,
  DateOfBirth: Date,
  NienKhoa: String,
  room: {
    roomId: ObjectId,
    roomTitle: String,
    dateIn: Date,
    dateOut: Date,
    status: Number
  }
}
```

### Seed Data cho Users

```javascript
// Student 1: Lê Văn C
{
  "_id": "8886f1a1b3c4d5e6f7g8h9u1",
  "HoTen": "Lê Văn C",
  "MHV": "19001234",
  "CMND": "123456789012",
  "Matk": "7776f1a1b3c4d5e6f7g8h9s1",  // AccountId
  "GioiTinh": "Nam",
  "Truong": "Trường Đại học ABC",
  "NganHang": "Vietcombank",
  "Phone": "0123456789",
  "Email": "levan.c@email.com",
  "Photos": [],
  "Address": "123 Đường ABC, Quận 1, TP.HCM",
  "DateOfBirth": "2002-05-15T00:00:00.000Z",
  "NienKhoa": "2020-2024",
  "room": {
    "roomId": null,
    "roomTitle": null,
    "dateIn": null,
    "dateOut": null,
    "status": null
  },
  "createdAt": "2025-01-05T00:00:00.000Z"
}

// Student 2: Phạm Thị D
{
  "_id": "8886f1a1b3c4d5e6f7g8h9u2",
  "HoTen": "Phạm Thị D",
  "MHV": "19001235",
  "CMND": "234567890123",
  "Matk": "7776f1a1b3c4d5e6f7g8h9s2",
  "GioiTinh": "Nữ",
  "Truong": "Trường Đại học ABC",
  "NganHang": "Techcombank",
  "Phone": "0234567890",
  "Email": "pham.thi.d@email.com",
  "Photos": [],
  "Address": "456 Đường XYZ, Quận 2, TP.HCM",
  "DateOfBirth": "2003-08-20T00:00:00.000Z",
  "NienKhoa": "2021-2025",
  "room": null,
  "createdAt": "2025-01-06T00:00:00.000Z"
}

// Student 3: Bùi Văn E
{
  "_id": "8886f1a1b3c4d5e6f7g8h9u3",
  "HoTen": "Bùi Văn E",
  "MHV": "19001236",
  "CMND": "345678901234",
  "Matk": "7776f1a1b3c4d5e6f7g8h9s3",
  "GioiTinh": "Nam",
  "Truong": "Trường Đại học XYZ",
  "NganHang": "AgriBank",
  "Phone": "0345678901",
  "Email": "bui.van.e@email.com",
  "Photos": [],
  "Address": "789 Đường DEF, Quận 3, TP.HCM",
  "DateOfBirth": "2002-12-10T00:00:00.000Z",
  "NienKhoa": "2020-2024",
  "room": null,
  "createdAt": "2025-01-07T00:00:00.000Z"
}

// Student 4: Đặng Thị F
{
  "_id": "8886f1a1b3c4d5e6f7g8h9u4",
  "HoTen": "Đặng Thị F",
  "MHV": "19001237",
  "CMND": "456789012345",
  "Matk": "7776f1a1b3c4d5e6f7g8h9s4",
  "GioiTinh": "Nữ",
  "Truong": "Trường Đại học ABC",
  "NganHang": "ACB",
  "Phone": "0456789012",
  "Email": "dang.thi.f@email.com",
  "Photos": [],
  "Address": "101 Đường GHI, Quận 4, TP.HCM",
  "DateOfBirth": "2003-03-25T00:00:00.000Z",
  "NienKhoa": "2021-2025",
  "room": null,
  "createdAt": "2025-01-08T00:00:00.000Z"
}

// Student 5: Hoàng Văn G
{
  "_id": "8886f1a1b3c4d5e6f7g8h9u5",
  "HoTen": "Hoàng Văn G",
  "MHV": "19001238",
  "CMND": "567890123456",
  "Matk": "7776f1a1b3c4d5e6f7g8h9s5",
  "GioiTinh": "Nam",
  "Truong": "Trường Đại học XYZ",
  "NganHang": "Vietinbank",
  "Phone": "0567890123",
  "Email": "hoang.van.g@email.com",
  "Photos": [],
  "Address": "202 Đường JKL, Quận 5, TP.HCM",
  "DateOfBirth": "2002-07-30T00:00:00.000Z",
  "NienKhoa": "2020-2024",
  "room": null,
  "createdAt": "2025-01-09T00:00:00.000Z"
}

// Student 6: Vũ Thị H
{
  "_id": "8886f1a1b3c4d5e6f7g8h9u6",
  "HoTen": "Vũ Thị H",
  "MHV": "19001239",
  "CMND": "678901234567",
  "Matk": "7776f1a1b3c4d5e6f7g8h9s6",
  "GioiTinh": "Nữ",
  "Truong": "Trường Đại học ABC",
  "NganHang": "SHB",
  "Phone": "0678901234",
  "Email": "vu.thi.h@email.com",
  "Photos": [],
  "Address": "303 Đường MNO, Quận 6, TP.HCM",
  "DateOfBirth": "2003-11-05T00:00:00.000Z",
  "NienKhoa": "2021-2025",
  "room": null,
  "createdAt": "2025-01-10T00:00:00.000Z"
}
```

---

## VI. ADMINS (QUẢN TRỊVIÊN)

### Admin Schema
```javascript
{
  HoTen: String,
  CMND: String,
  GioiTinh: String,
  Truong: String,
  NganHang: String,
  Room: [String],
  Phone: Number,
  Email: String,
  Photos: [String],
  Address: String,
  DateOfBirth: Date
}
```

### Seed Data cho Admins

```javascript
// Admin 1: Nguyễn Văn A
{
  "_id": "9996f1a1b3c4d5e6f7g8h9a1",
  "HoTen": "Nguyễn Văn A",
  "CMND": "012345678901",
  "GioiTinh": "Nam",
  "Truong": "Trường Đại học ABC",
  "NganHang": "Vietcombank",
  "Room": [],
  "Phone": 912345678,
  "Email": "nguyen.van.a@admin.com",
  "Photos": [],
  "Address": "456 Đường Admin, Quận 7, TP.HCM",
  "DateOfBirth": "1990-05-15T00:00:00.000Z",
  "createdAt": "2025-01-01T00:00:00.000Z"
}

// Admin 2: Trần Thị B
{
  "_id": "9996f1a1b3c4d5e6f7g8h9a2",
  "HoTen": "Trần Thị B",
  "CMND": "098765432101",
  "GioiTinh": "Nữ",
  "Truong": "Trường Đại học ABC",
  "NganHang": "Techcombank",
  "Room": [],
  "Phone": 923456789,
  "Email": "tran.thi.b@admin.com",
  "Photos": [],
  "Address": "789 Đường Admin, Quận 8, TP.HCM",
  "DateOfBirth": "1992-08-20T00:00:00.000Z",
  "createdAt": "2025-01-02T00:00:00.000Z"
}
```

---

## VII. ROOMS (PHÒNG)

### Room Schema
```javascript
{
  dormId: ObjectId,
  Title: String,
  status: Number (0|1),  // 0: Bảo trì, 1: Hoạt động
  Price: Number,
  Slot: Number,
  availableSlot: Number,
  roomMembers: [{...}]
}
```

### Seed Data cho Rooms

```javascript
// Phòng 101 - KTX A
{
  "_id": "1116f1a1b3c4d5e6f7g8h9r1",
  "dormId": "5556f1a1b3c4d5e6f7g8h9a0",  // KTX A
  "Title": "Phòng 101",
  "status": 1,
  "Price": 500000,  // 500k/tháng
  "Slot": 4,  // 4 chỗ
  "availableSlot": 4,  // Trống 4 chỗ
  "roomMembers": [],
  "createdAt": "2025-01-15T00:00:00.000Z"
}

// Phòng 102 - KTX A
{
  "_id": "1116f1a1b3c4d5e6f7g8h9r2",
  "dormId": "5556f1a1b3c4d5e6f7g8h9a0",
  "Title": "Phòng 102",
  "status": 1,
  "Price": 500000,
  "Slot": 4,
  "availableSlot": 2,  // Có 2 sinh viên
  "roomMembers": [
    {
      "userId": "8886f1a1b3c4d5e6f7g8h9u1",  // Lê Văn C
      "HoTen": "Lê Văn C",
      "MHV": "19001234",
      "CMND": "123456789012",
      "Truong": "Trường Đại học ABC",
      "Phone": "0123456789",
      "Email": "levan.c@email.com",
      "dateIn": "2025-01-20T00:00:00.000Z",
      "dateOut": "2026-01-20T00:00:00.000Z"
    },
    {
      "userId": "8886f1a1b3c4d5e6f7g8h9u3",  // Bùi Văn E
      "HoTen": "Bùi Văn E",
      "MHV": "19001236",
      "CMND": "345678901234",
      "Truong": "Trường Đại học XYZ",
      "Phone": "0345678901",
      "Email": "bui.van.e@email.com",
      "dateIn": "2025-01-22T00:00:00.000Z",
      "dateOut": "2026-01-22T00:00:00.000Z"
    }
  ],
  "createdAt": "2025-01-15T00:00:00.000Z"
}

// Phòng 201 - KTX B
{
  "_id": "1116f1a1b3c4d5e6f7g8h9r3",
  "dormId": "5556f1a1b3c4d5e6f7g8h9b0",  // KTX B
  "Title": "Phòng 201",
  "status": 1,
  "Price": 550000,
  "Slot": 4,
  "availableSlot": 1,
  "roomMembers": [
    {
      "userId": "8886f1a1b3c4d5e6f7g8h9u5",  // Hoàng Văn G
      "HoTen": "Hoàng Văn G",
      "MHV": "19001238",
      "CMND": "567890123456",
      "Truong": "Trường Đại học XYZ",
      "Phone": "0567890123",
      "Email": "hoang.van.g@email.com",
      "dateIn": "2025-01-20T00:00:00.000Z",
      "dateOut": "2026-01-20T00:00:00.000Z"
    }
  ],
  "createdAt": "2025-01-16T00:00:00.000Z"
}

// Phòng 301 - KTX C (Nữ)
{
  "_id": "1116f1a1b3c4d5e6f7g8h9r4",
  "dormId": "5556f1a1b3c4d5e6f7g8h9c0",  // KTX C (Nữ)
  "Title": "Phòng 301",
  "status": 1,
  "Price": 480000,
  "Slot": 4,
  "availableSlot": 2,
  "roomMembers": [
    {
      "userId": "8886f1a1b3c4d5e6f7g8h9u2",  // Phạm Thị D
      "HoTen": "Phạm Thị D",
      "MHV": "19001235",
      "CMND": "234567890123",
      "Truong": "Trường Đại học ABC",
      "Phone": "0234567890",
      "Email": "pham.thi.d@email.com",
      "dateIn": "2025-01-21T00:00:00.000Z",
      "dateOut": "2026-01-21T00:00:00.000Z"
    },
    {
      "userId": "8886f1a1b3c4d5e6f7g8h9u6",  // Vũ Thị H
      "HoTen": "Vũ Thị H",
      "MHV": "19001239",
      "CMND": "678901234567",
      "Truong": "Trường Đại học ABC",
      "Phone": "0678901234",
      "Email": "vu.thi.h@email.com",
      "dateIn": "2025-01-25T00:00:00.000Z",
      "dateOut": "2026-01-25T00:00:00.000Z"
    }
  ],
  "createdAt": "2025-01-17T00:00:00.000Z"
}

// Phòng 302 - KTX C (Nữ) - Trống
{
  "_id": "1116f1a1b3c4d5e6f7g8h9r5",
  "dormId": "5556f1a1b3c4d5e6f7g8h9c0",
  "Title": "Phòng 302",
  "status": 1,
  "Price": 480000,
  "Slot": 4,
  "availableSlot": 4,
  "roomMembers": [],
  "createdAt": "2025-01-17T00:00:00.000Z"
}
```

---

## VIII. HOAĐON (HÓA ĐƠN)

### HoaDon Schema
```javascript
{
  title: String,
  roomId: ObjectId,
  price: Number,
  status: Number (0: Chưa thanh toán, 1: Đã thanh toán),
  billDetails: {...}
}
```

### Seed Data cho HoaDon

```javascript
// Hóa đơn tháng 1/2025 - Lê Văn C (Phòng 102)
{
  "_id": "2226f1a1b3c4d5e6f7g8h9b1",
  "title": "Hóa đơn tháng 1/2025",
  "roomId": "1116f1a1b3c4d5e6f7g8h9r2",  // Phòng 102
  "price": 500000,
  "status": 1,  // Đã thanh toán
  "billDetails": {
    "HoTen": "Lê Văn C",
    "CMND": "123456789012",
    "userId": "8886f1a1b3c4d5e6f7g8h9u1",
    "MHV": "19001234",
    "roomName": "Phòng 102",
    "dateIn": "2025-01-20T00:00:00.000Z",
    "dateOut": "2025-02-20T00:00:00.000Z"
  },
  "createdBy": "Nguyễn Văn A",
  "updatedBy": "Nguyễn Văn A",
  "createdAt": "2025-02-01T00:00:00.000Z"
}

// Hóa đơn tháng 1/2025 - Bùi Văn E (Phòng 102)
{
  "_id": "2226f1a1b3c4d5e6f7g8h9b2",
  "title": "Hóa đơn tháng 1/2025",
  "roomId": "1116f1a1b3c4d5e6f7g8h9r2",
  "price": 500000,
  "status": 0,  // Chưa thanh toán
  "billDetails": {
    "HoTen": "Bùi Văn E",
    "CMND": "345678901234",
    "userId": "8886f1a1b3c4d5e6f7g8h9u3",
    "MHV": "19001236",
    "roomName": "Phòng 102",
    "dateIn": "2025-01-22T00:00:00.000Z",
    "dateOut": "2025-02-22T00:00:00.000Z"
  },
  "createdBy": "Trần Thị B",
  "createdAt": "2025-02-01T00:00:00.000Z"
}

// Hóa đơn tháng 1/2025 - Phạm Thị D (Phòng 301)
{
  "_id": "2226f1a1b3c4d5e6f7g8h9b3",
  "title": "Hóa đơn tháng 1/2025",
  "roomId": "1116f1a1b3c4d5e6f7g8h9r4",
  "price": 480000,
  "status": 1,
  "billDetails": {
    "HoTen": "Phạm Thị D",
    "CMND": "234567890123",
    "userId": "8886f1a1b3c4d5e6f7g8h9u2",
    "MHV": "19001235",
    "roomName": "Phòng 301",
    "dateIn": "2025-01-21T00:00:00.000Z",
    "dateOut": "2025-02-21T00:00:00.000Z"
  },
  "createdBy": "Trần Thị B",
  "updatedBy": "Trần Thị B",
  "createdAt": "2025-02-01T00:00:00.000Z"
}

// Hóa đơn tháng 1/2025 - Hoàng Văn G (Phòng 201)
{
  "_id": "2226f1a1b3c4d5e6f7g8h9b4",
  "title": "Hóa đơn tháng 1/2025",
  "roomId": "1116f1a1b3c4d5e6f7g8h9r3",
  "price": 550000,
  "status": 0,
  "billDetails": {
    "HoTen": "Hoàng Văn G",
    "CMND": "567890123456",
    "userId": "8886f1a1b3c4d5e6f7g8h9u5",
    "MHV": "19001238",
    "roomName": "Phòng 201",
    "dateIn": "2025-01-20T00:00:00.000Z",
    "dateOut": "2025-02-20T00:00:00.000Z"
  },
  "createdBy": "Nguyễn Văn A",
  "createdAt": "2025-02-01T00:00:00.000Z"
}
```

---

## IX. ROOM DETAILS (CHI TIẾT PHÒNG)

### RoomDetails Schema
```javascript
{
  RoomId: ObjectId,
  UserId: [ObjectId]
}
```

### Seed Data

```javascript
// Phòng 102 - Có 2 sinh viên
{
  "_id": "3336f1a1b3c4d5e6f7g8h9rd1",
  "RoomId": "1116f1a1b3c4d5e6f7g8h9r2",  // Phòng 102
  "UserId": [
    "8886f1a1b3c4d5e6f7g8h9u1",  // Lê Văn C
    "8886f1a1b3c4d5e6f7g8h9u3"   // Bùi Văn E
  ],
  "createdAt": "2025-01-20T00:00:00.000Z"
}

// Phòng 201
{
  "_id": "3336f1a1b3c4d5e6f7g8h9rd2",
  "RoomId": "1116f1a1b3c4d5e6f7g8h9r3",  // Phòng 201
  "UserId": [
    "8886f1a1b3c4d5e6f7g8h9u5"   // Hoàng Văn G
  ],
  "createdAt": "2025-01-20T00:00:00.000Z"
}

// Phòng 301
{
  "_id": "3336f1a1b3c4d5e6f7g8h9rd3",
  "RoomId": "1116f1a1b3c4d5e6f7g8h9r4",  // Phòng 301
  "UserId": [
    "8886f1a1b3c4d5e6f7g8h9u2",  // Phạm Thị D
    "8886f1a1b3c4d5e6f7g8h9u6"   // Vũ Thị H
  ],
  "createdAt": "2025-01-21T00:00:00.000Z"
}
```

---

## X. REQUESTS (CÁC YÊU CẦU) - Optional

### CheckOut Request
```javascript
{
  "_id": "4446f1a1b3c4d5e6f7g8h9co1",
  "title": "Trả phòng",
  "userId": "8886f1a1b3c4d5e6f7g8h9u1",  // Lê Văn C
  "userDetail": {
    "CMND": 123456789012,
    "HoTen": "Lê Văn C"
  },
  "room": {
    "roomId": "1116f1a1b3c4d5e6f7g8h9r2",
    "roomTitle": "Phòng 102",
    "dateIn": "2025-01-20T00:00:00.000Z",
    "dateOut": "2026-01-20T00:00:00.000Z",
    "status": 1
  },
  "requestStatus": 0,  // 0: Chờ duyệt, 1: Duyệt, 2: Từ chối
  "createdAt": "2025-02-03T00:00:00.000Z"
}
```

### Change Room Request
```javascript
{
  "_id": "4446f1a1b3c4d5e6f7g8h9cr1",
  "title": "Yêu cầu chuyển phòng",
  "userId": "8886f1a1b3c4d5e6f7g8h9u2",  // Phạm Thị D
  "userDetail": {
    "CMND": 234567890123,
    "HoTen": "Phạm Thị D"
  },
  "originRoom": {
    "roomId": "1116f1a1b3c4d5e6f7g8h9r4",
    "roomTitle": "Phòng 301",
    "dateIn": "2025-01-21T00:00:00.000Z",
    "dateOut": "2026-01-21T00:00:00.000Z",
    "status": 1
  },
  "toRoom": {
    "roomId": "1116f1a1b3c4d5e6f7g8h9r5",
    "roomTitle": "Phòng 302",
    "dateIn": "2025-02-05T00:00:00.000Z",
    "dateOut": "2026-02-05T00:00:00.000Z",
    "status": 1
  },
  "requestStatus": 0,
  "rejectReason": null,
  "createdAt": "2025-02-04T00:00:00.000Z"
}
```

---

## XI. TÓM TẮT DỮ LIỆU CẦN KHỞI TẠO

### **Tài khoản test**

| Vai trò | CMND | Mật khẩu | Email |
|---------|------|----------|-------|
| **Admin** | 012345678901 | Admin@123 | nguyen.van.a@admin.com |
| **Admin** | 098765432101 | Admin@123 | tran.thi.b@admin.com |
| **Student** | 123456789012 | Student@123 | levan.c@email.com |
| **Student** | 234567890123 | Student@123 | pham.thi.d@email.com |
| **Student** | 345678901234 | Student@123 | bui.van.e@email.com |
| **Student** | 456789012345 | Student@123 | dang.thi.f@email.com |
| **Student** | 567890123456 | Student@123 | hoang.van.g@email.com |
| **Student** | 678901234567 | Student@123 | vu.thi.h@email.com |

### **Tổng cộng dữ liệu cần tạo**
- **2 Roles**
- **3 Dormitories**
- **2 Accounts (Admin)**
- **6 Accounts (Student)**
- **2 Admins**
- **6 Users (Students)**
- **5 Rooms** (3 phòng có sinh viên, 2 phòng trống)
- **4 HoaDons**
- **3 RoomDetails**
- **1-2 Requests (Optional)**

---

## XII. GIAO DIỆN DỮ LIỆU TRỰC QUAN

```
┌─────────────────────────────────────┐
│      Hệ thống Quản lý KTX            │
└─────────────────────────────────────┘

📊 THỐNG KÊ
├─ Tổng học sinh: 6
├─ Phòng hoạt động: 5
├─ Phòng trống: 2
├─ Doanh thu tháng: 2,510,000 VNĐ
└─ Đơn chờ xử lý: 1

🏢 KỲ TÚC XÁ (3)
├─ KTX A
│  ├─ Phòng 101 (4/4 trống) - 500k
│  └─ Phòng 102 (2/4 occupied) - 500k
│     ├─ Lê Văn C (19001234)
│     └─ Bùi Văn E (19001236)
├─ KTX B
│  └─ Phòng 201 (1/4 occupied) - 550k
│     └─ Hoàng Văn G (19001238)
└─ KTX C (Nữ)
   ├─ Phòng 301 (2/4 occupied) - 480k
   │  ├─ Phạm Thị D (19001235)
   │  └─ Vũ Thị H (19001239)
   └─ Phòng 302 (4/4 trống) - 480k

💰 HÓADƠN
├─ Thanh toán: 3/4
└─ Nợ: 550,000 VNĐ

⚙️ YÊU CẦU
├─ Chờ duyệt: 1
├─ Đã duyệt: 0
└─ Từ chối: 0
```

---

**Ngày cập nhật**: 5 Tháng 2 Năm 2026
