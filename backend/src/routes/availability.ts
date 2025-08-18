import express from 'express';
import Appointment from '../models/Appointment';

const router = express.Router();

// Get business hours configuration
router.get('/business-hours', (req, res) => {
  const businessHours = {
    incheon: {
      sun: null,
      mon: { open: '10:00', close: '17:00' },
      tue: { open: '10:00', close: '17:00' },
      wed: { open: '10:00', close: '17:00' },
      thu: { open: '10:00', close: '17:00' },
      fri: { open: '10:00', close: '17:00' },
      sat: { open: '10:00', close: '14:00' },
    },
    anyang: {
      sun: null,
      mon: { open: '10:00', close: '17:00' },
      tue: { open: '10:00', close: '17:00' },
      wed: { open: '10:00', close: '17:00' },
      thu: { open: '10:00', close: '17:00' },
      fri: { open: '10:00', close: '17:00' },
      sat: { open: '10:00', close: '14:00' },
    }
  };

  res.json({
    success: true,
    data: businessHours
  });
});

// Get closed dates
router.get('/closed-dates', (req, res) => {
  const closedDates = {
    incheon: [],
    anyang: []
  };

  res.json({
    success: true,
    data: closedDates
  });
});

// Get slot interval
router.get('/slot-interval', (req, res) => {
  res.json({
    success: true,
    data: {
      slotIntervalMinutes: 30
    }
  });
});

export default router;
