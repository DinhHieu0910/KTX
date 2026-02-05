import express from 'express';
import {
  createPickupRequest,
  getAllPickupRequests,
  getPickupRequest,
  getPickupRequestByUser,
  approvePickupRequest,
  rejectPickupRequest,
  updateDropoffTime,
  updatePickupRequest,
  deletePickupRequest
} from '../Controllers/pickupDropoff.js';
import { VerifyAdmin } from '../Utils/Verifytoken.js';

const router = express.Router();

// Get all requests
router.get('/', getAllPickupRequests);

// Get by user
router.get('/user/:userId', getPickupRequestByUser);

// Get single request
router.get('/:id', getPickupRequest);

// Create new request
router.post('/', createPickupRequest);

// Approve request
router.put('/approve/:id', VerifyAdmin, approvePickupRequest);

// Reject request
router.put('/reject/:id', VerifyAdmin, rejectPickupRequest);

// Update dropoff time
router.put('/dropoff/:id', VerifyAdmin, updateDropoffTime);

// Update request
router.put('/:id', updatePickupRequest);

// Delete request
router.delete('/:id', VerifyAdmin, deletePickupRequest);

export default router;
