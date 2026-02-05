import axiosInstance from './axiosInstance';

// Lấy tất cả yêu cầu đón/trả
export const getAllPickupRequests = async () => {
  const res = await axiosInstance.get('/pickup-dropoff');
  return res.data;
};

// Lấy yêu cầu theo user
export const getPickupRequestsByUser = async ({ userId }) => {
  const res = await axiosInstance.get(`/pickup-dropoff/user/${userId}`);
  return res.data;
};

// Lấy chi tiết yêu cầu
export const getPickupRequest = async ({ id }) => {
  const res = await axiosInstance.get(`/pickup-dropoff/${id}`);
  return res.data;
};

// Tạo yêu cầu đón học sinh
export const createPickupRequest = async ({ data }) => {
  const res = await axiosInstance.post('/pickup-dropoff', data);
  return res.data;
};

// Phê duyệt yêu cầu
export const approvePickupRequest = async ({ id, data }) => {
  const res = await axiosInstance.put(`/pickup-dropoff/approve/${id}`, data);
  return res.data;
};

// Từ chối yêu cầu
export const rejectPickupRequest = async ({ id, data }) => {
  const res = await axiosInstance.put(`/pickup-dropoff/reject/${id}`, data);
  return res.data;
};

// Cập nhật thời gian trả
export const updateDropoffTime = async ({ id, data }) => {
  const res = await axiosInstance.put(`/pickup-dropoff/dropoff/${id}`, data);
  return res.data;
};

// Cập nhật yêu cầu
export const updatePickupRequest = async ({ id, data }) => {
  const res = await axiosInstance.put(`/pickup-dropoff/${id}`, data);
  return res.data;
};

// Xóa yêu cầu
export const deletePickupRequest = async ({ id }) => {
  const res = await axiosInstance.delete(`/pickup-dropoff/${id}`);
  return res.data;
};
