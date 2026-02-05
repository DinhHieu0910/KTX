import PickupDropoff from '../Models/PickupDropoff.js';
import User from '../Models/User.js';
import Room from '../Models/Room.js';

// Tạo yêu cầu đón học sinh
export const createPickupRequest = async (req, res, next) => {
  try {
    const { userId, pickupPerson, pickupTime, reason, createdBy } = req.body;

    // Lấy thông tin học sinh
    const student = await User.findById(userId);
    if (!student) {
      return res.status(404).json({ message: 'Không tìm thấy học sinh' });
    }

    // Lấy thông tin phòng
    let roomInfo = {
      roomTitle: student.room?.roomTitle || 'Chưa có phòng',
      roomId: student.room?.roomId || null
    };

    const newPickupRequest = new PickupDropoff({
      userId,
      studentInfo: {
        HoTen: student.HoTen,
        MHV: student.Mssv || student.MHV,
        CMND: student.CMND,
        roomTitle: roomInfo.roomTitle,
        roomId: roomInfo.roomId
      },
      pickupPerson,
      pickupTime,
      reason,
      createdBy
    });

    const savedRequest = await newPickupRequest.save();
    res.status(201).json(savedRequest);
  } catch (err) {
    next(err);
  }
};

// Lấy tất cả yêu cầu đón/trả
export const getAllPickupRequests = async (req, res, next) => {
  try {
    const requests = await PickupDropoff.find()
      .populate('userId', 'HoTen Mssv MHV CMND Phone Email')
      .sort({ createdAt: -1 });
    res.status(200).json(requests);
  } catch (err) {
    next(err);
  }
};

// Lấy chi tiết một yêu cầu
export const getPickupRequest = async (req, res, next) => {
  try {
    const request = await PickupDropoff.findById(req.params.id)
      .populate('userId', 'HoTen Mssv MHV CMND Phone Email Address');
    
    if (!request) {
      return res.status(404).json({ message: 'Không tìm thấy yêu cầu' });
    }
    
    res.status(200).json(request);
  } catch (err) {
    next(err);
  }
};

// Lấy yêu cầu theo userId
export const getPickupRequestByUser = async (req, res, next) => {
  try {
    const requests = await PickupDropoff.find({ userId: req.params.userId })
      .sort({ createdAt: -1 });
    res.status(200).json(requests);
  } catch (err) {
    next(err);
  }
};

// Phê duyệt yêu cầu đón
export const approvePickupRequest = async (req, res, next) => {
  try {
    const { approvedBy, pickupSignature } = req.body;

    const updatedRequest = await PickupDropoff.findByIdAndUpdate(
      req.params.id,
      {
        status: 1, // Đã phê duyệt - Đã đón
        approvedBy,
        approvedAt: new Date(),
        pickupSignature: pickupSignature || '',
        updatedBy: approvedBy
      },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: 'Không tìm thấy yêu cầu' });
    }

    res.status(200).json(updatedRequest);
  } catch (err) {
    next(err);
  }
};

// Từ chối yêu cầu
export const rejectPickupRequest = async (req, res, next) => {
  try {
    const { approvedBy, rejectedReason } = req.body;

    const updatedRequest = await PickupDropoff.findByIdAndUpdate(
      req.params.id,
      {
        status: 3, // Từ chối
        approvedBy,
        approvedAt: new Date(),
        rejectedReason,
        updatedBy: approvedBy
      },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: 'Không tìm thấy yêu cầu' });
    }

    res.status(200).json(updatedRequest);
  } catch (err) {
    next(err);
  }
};

// Cập nhật thời gian trả học sinh
export const updateDropoffTime = async (req, res, next) => {
  try {
    const { dropoffTime, dropoffSignature, updatedBy } = req.body;

    const updatedRequest = await PickupDropoff.findByIdAndUpdate(
      req.params.id,
      {
        status: 2, // Đã trả
        dropoffTime,
        dropoffSignature: dropoffSignature || '',
        updatedBy
      },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: 'Không tìm thấy yêu cầu' });
    }

    res.status(200).json(updatedRequest);
  } catch (err) {
    next(err);
  }
};

// Cập nhật yêu cầu
export const updatePickupRequest = async (req, res, next) => {
  try {
    const updatedRequest = await PickupDropoff.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: 'Không tìm thấy yêu cầu' });
    }

    res.status(200).json(updatedRequest);
  } catch (err) {
    next(err);
  }
};

// Xóa yêu cầu
export const deletePickupRequest = async (req, res, next) => {
  try {
    const deletedRequest = await PickupDropoff.findByIdAndDelete(req.params.id);

    if (!deletedRequest) {
      return res.status(404).json({ message: 'Không tìm thấy yêu cầu' });
    }

    res.status(200).json({ message: 'Đã xóa yêu cầu thành công' });
  } catch (err) {
    next(err);
  }
};
