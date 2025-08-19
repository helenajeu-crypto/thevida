export type BranchKey = 'incheon' | 'anyang';

export type DayKey = 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat';

export interface DailyHours {
  open: string; // HH:mm (24h)
  close: string; // HH:mm (24h)
}

export type BusinessHours = Record<DayKey, DailyHours | null>;

// 업체에서 수정 가능한 지점별 영업시간 (예시 값)
export const businessHoursByBranch: Record<BranchKey, BusinessHours> = {
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
  },
};

// 슬롯 간격 (분) - 업체에서 조정 가능
export const slotIntervalMinutes = 30;

// 업체에서 차단할 수 있는 개별 휴무일/예약 불가일 (YYYY-MM-DD)
export const closedDatesByBranch: Record<BranchKey, string[]> = {
  incheon: [],
  anyang: [],
};

// 이미 예약된 슬롯 (YYYY-MM-DD -> ['HH:mm', ...]) - 서버 연동 전 임시 구성
export const bookedSlotsByBranch: Record<BranchKey, Record<string, string[]>> = {
  incheon: {
    // 예: '2025-08-10': ['10:00', '10:30']
  },
  anyang: {},
};









