import React, { useState } from 'react';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { createPickupRequest } from 'API/pickupDropoff';
import { getallUser } from 'API/user';
// import { showToast } from 'utils/toast';
import { PrimaryButton } from 'components/Button/PrimaryButton';

const CreatePickupRequest = ({ onClose }) => {
  const queryClient = useQueryClient();
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const [formData, setFormData] = useState({
    userId: '',
    pickupPerson: {
      fullName: '',
      relationship: '',
      idCard: '',
      phone: ''
    },
    pickupTime: '',
    reason: ''
  });

  // Get all students
  const { data: students = [] } = useQuery({
    queryKey: ['students'],
    queryFn: getallUser
  });

  const createMutation = useMutation({
    mutationFn: createPickupRequest,
    onSuccess: () => {
      queryClient.invalidateQueries(['pickupDropoffRequests']);
      // showToast('Tạo yêu cầu đón học sinh thành công', 'success');
      onClose && onClose();
    },
    onError: (error) => {
      // showToast(error.response?.data?.message || 'Có lỗi xảy ra', 'error');
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createMutation.mutate({
      data: {
        ...formData,
        createdBy: currentUser?.details?.CMND || 'Admin'
      }
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">Tạo yêu cầu đón học sinh</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Chọn học sinh */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Chọn học sinh *</label>
            <select
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Chọn học sinh --</option>
              {students.map((student) => (
                <option key={student._id} value={student._id}>
                  {student.HoTen} - {student.Mssv || student.MHV} - {student.room?.roomTitle || 'Chưa có phòng'}
                </option>
              ))}
            </select>
          </div>

          {/* Thông tin người đón */}
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-3">Thông tin người đón</h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Họ tên người đón *</label>
                <input
                  type="text"
                  name="pickupPerson.fullName"
                  value={formData.pickupPerson.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quan hệ với học sinh *</label>
                <input
                  type="text"
                  name="pickupPerson.relationship"
                  value={formData.pickupPerson.relationship}
                  onChange={handleChange}
                  required
                  placeholder="Ví dụ: Cha, Mẹ, Anh, Chị..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Số căn cước công dân *</label>
                <input
                  type="text"
                  name="pickupPerson.idCard"
                  value={formData.pickupPerson.idCard}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại *</label>
                <input
                  type="tel"
                  name="pickupPerson.phone"
                  value={formData.pickupPerson.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Thời gian và lý do */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Thời gian đón *</label>
            <input
              type="datetime-local"
              name="pickupTime"
              value={formData.pickupTime}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Lý do học sinh nghỉ *</label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập lý do học sinh cần nghỉ..."
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <PrimaryButton
                type="submit"
                disabled={createMutation.isLoading}
                text={createMutation.isLoading ? 'Đang tạo...' : 'Tạo yêu cầu'}
                className="text-xs px-2 py-1"
            />
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePickupRequest;
