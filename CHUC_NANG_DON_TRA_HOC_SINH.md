# CHỨC NĂNG THEO DÕI ĐÓN, TRẢ HỌC SINH (ĐỘT XUẤT)

## I. TỔNG QUAN

Chức năng này cho phép quản lý việc đón và trả học sinh trong trường hợp đột xuất (ví dụ: học sinh về nhà vì ốm, có việc gia đình, v.v...)

## II. CẤU TRÚC DATABASE

### Model: PickupDropoff

```javascript
{
  userId: ObjectId,              // ID học sinh
  studentInfo: {
    HoTen: String,
    MHV: String,
    CMND: String,
    roomTitle: String,
    roomId: ObjectId
  },
  pickupPerson: {
    fullName: String,            // Họ tên người đón
    relationship: String,        // Quan hệ với HS
    idCard: String,             // Số căn cước CD
    phone: String               // SĐT người đón
  },
  pickupTime: Date,             // Thời gian đón
  reason: String,               // Lý do HS nghỉ
  pickupSignature: String,      // Ký nhận
  dropoffTime: Date,            // Thời gian trả
  dropoffSignature: String,     // Ký trả
  status: Number,               // Trạng thái
  approvedBy: String,
  approvedAt: Date,
  rejectedReason: String,
  createdBy: String,
  updatedBy: String
}
```

### Trạng thái (status):
- **0**: Chờ phê duyệt
- **1**: Đã phê duyệt - Đã đón
- **2**: Đã trả
- **3**: Từ chối

## III. API ENDPOINTS

### Backend Routes: `/api/pickup-dropoff`

| Method | Endpoint | Mô tả | Auth |
|--------|----------|-------|------|
| GET | `/` | Lấy tất cả yêu cầu | - |
| GET | `/:id` | Lấy chi tiết yêu cầu | - |
| GET | `/user/:userId` | Lấy yêu cầu theo user | - |
| POST | `/` | Tạo yêu cầu đón HS | - |
| PUT | `/approve/:id` | Phê duyệt yêu cầu | VerifyAdmin |
| PUT | `/reject/:id` | Từ chối yêu cầu | VerifyAdmin |
| PUT | `/dropoff/:id` | Cập nhật thời gian trả | VerifyAdmin |
| PUT | `/:id` | Cập nhật yêu cầu | - |
| DELETE | `/:id` | Xóa yêu cầu | VerifyAdmin |

## IV. GIAO DIỆN NGƯỜI DÙNG

### 1. Trang Quản lý (Admin)
**Route**: `/admin/pickup-dropoff`

#### Các cột hiển thị:
1. **STT** - Số thứ tự
2. **Họ tên HS** - Tên học sinh
3. **Phòng (Lớp)** - Phòng đang ở
4. **Quan hệ với HS** - Quan hệ của người đón
5. **Số căn cước CD** - CCCD người đón
6. **Thời gian đón** - Giờ:phút - ngày/tháng/năm
7. **Lý do HS nghỉ** - Lý do đón học sinh
8. **Ký nhận** - Chữ ký người nhận
9. **Thời gian trả** - Giờ:phút - ngày/tháng/năm
10. **Ký trả** - Chữ ký người trả
11. **Trạng thái** - Trạng thái hiện tại
12. **Thao tác** - Các nút phê duyệt, từ chối, đã trả, xóa

#### Chức năng:
- ✅ Tìm kiếm theo tên HS, mã HS, người đón
- ✅ Tạo yêu cầu đón học sinh mới
- ✅ Phê duyệt yêu cầu
- ✅ Từ chối yêu cầu
- ✅ Cập nhật thời gian trả HS
- ✅ Xóa yêu cầu

### 2. Form Tạo Yêu cầu
**Component**: `CreatePickupRequest`

#### Các trường:
- **Chọn học sinh** (dropdown) *
- **Họ tên người đón** *
- **Quan hệ với học sinh** *
- **Số căn cước công dân** *
- **Số điện thoại** *
- **Thời gian đón** (datetime-local) *
- **Lý do học sinh nghỉ** (textarea) *

## V. NAVIGATION

### Menu chính (NavBar)
Đã thêm menu: **"Theo dõi đón, trả HS (Đột xuất)"**
- Link: `/admin/pickup-dropoff`

### Admin Sidebar
Đã thêm mục: **"Đón, trả HS (Đột xuất)"**
- Submenu: "Danh sách đón/trả"
- Link: `/admin/pickup-dropoff`

## VI. LUỒNG HOẠT ĐỘNG

### 1. Tạo yêu cầu đón học sinh
```
1. Admin/Staff vào trang quản lý
2. Click "Tạo yêu cầu đón học sinh"
3. Chọn học sinh từ dropdown
4. Nhập thông tin người đón:
   - Họ tên
   - Quan hệ (Cha, Mẹ, Anh, Chị...)
   - Số căn cước
   - SĐT
5. Chọn thời gian đón
6. Nhập lý do học sinh nghỉ
7. Click "Tạo yêu cầu"
→ Trạng thái: "Chờ phê duyệt"
```

### 2. Phê duyệt yêu cầu
```
1. Admin xem danh sách yêu cầu
2. Tìm yêu cầu có trạng thái "Chờ phê duyệt"
3. Click nút "Phê duyệt"
4. Xác nhận
→ Trạng thái: "Đã đón"
→ Lưu chữ ký, thời gian phê duyệt
```

### 3. Từ chối yêu cầu
```
1. Admin xem yêu cầu
2. Click nút "Từ chối"
3. Nhập lý do từ chối
4. Xác nhận
→ Trạng thái: "Từ chối"
```

### 4. Cập nhật thời gian trả
```
1. Tìm yêu cầu có trạng thái "Đã đón"
2. Click nút "Đã trả"
3. Xác nhận
→ Trạng thái: "Đã trả"
→ Lưu thời gian trả, chữ ký
```

## VII. FILES ĐÃ TẠO/SỬA

### Backend
✅ Created:
- `Backend/API/Models/PickupDropoff.js`
- `Backend/API/Controllers/pickupDropoff.js`
- `Backend/API/Routes/pickupDropoff.js`

✅ Modified:
- `Backend/API/Index.js` - Thêm route

### Frontend
✅ Created:
- `Frontend/src/API/pickupDropoff.js`
- `Frontend/src/pages/Admin/PickupDropoffManagement.jsx`
- `Frontend/src/components/PickupDropoff/CreatePickupRequest.jsx`

✅ Modified:
- `Frontend/src/routes/routes.js` - Thêm route
- `Frontend/src/components/Header/NavBar.jsx` - Thêm menu
- `Frontend/src/components/AdminSidebar/index.jsx` - Thêm sidebar
- `Frontend/src/API/user.js` - Thêm getallUser function

## VIII. CÁCH SỬ DỤNG

### Khởi động Backend
```bash
cd Backend/API
npm run dev
```

### Khởi động Frontend
```bash
cd Frontend
npm start
```

### Truy cập
- Trang quản lý: `http://localhost:3000/admin/pickup-dropoff`
- API: `http://localhost:8800/api/pickup-dropoff`

## IX. TEST CASES

### Test 1: Tạo yêu cầu
- [ ] Tạo yêu cầu với đầy đủ thông tin
- [ ] Kiểm tra validation khi thiếu thông tin
- [ ] Kiểm tra dropdown học sinh hiển thị đúng

### Test 2: Phê duyệt
- [ ] Phê duyệt yêu cầu thành công
- [ ] Kiểm tra trạng thái chuyển từ "Chờ phê duyệt" → "Đã đón"
- [ ] Kiểm tra lưu chữ ký và thời gian

### Test 3: Từ chối
- [ ] Từ chối yêu cầu
- [ ] Nhập lý do từ chối
- [ ] Kiểm tra trạng thái chuyển sang "Từ chối"

### Test 4: Cập nhật trả HS
- [ ] Cập nhật thời gian trả
- [ ] Kiểm tra trạng thái chuyển từ "Đã đón" → "Đã trả"
- [ ] Kiểm tra lưu thời gian trả

### Test 5: Tìm kiếm
- [ ] Tìm theo tên học sinh
- [ ] Tìm theo mã học sinh
- [ ] Tìm theo tên người đón

## X. LƯU Ý

1. **Quyền truy cập**: Chỉ Admin mới được phê duyệt, từ chối, cập nhật trả
2. **Validation**: Tất cả trường có dấu (*) là bắt buộc
3. **Thời gian**: Định dạng hiển thị: `HH:mm - dd/MM/yyyy`
4. **Trạng thái**: Không thể phê duyệt lại yêu cầu đã phê duyệt/từ chối
5. **Xóa**: Nên cẩn thận khi xóa yêu cầu
