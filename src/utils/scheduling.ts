import { bookedSlotsByBranch, businessHoursByBranch, closedDatesByBranch, slotIntervalMinutes, BranchKey } from '../config/availability';

function toMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

function toHHMM(totalMinutes: number): string {
  const h = Math.floor(totalMinutes / 60)
    .toString()
    .padStart(2, '0');
  const m = (totalMinutes % 60).toString().padStart(2, '0');
  return `${h}:${m}`;
}

function getDayKey(dateStr: string): 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' {
  const date = new Date(dateStr + 'T00:00:00');
  const day = date.getDay(); // 0 (Sun) - 6 (Sat)
  return ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'][day] as any;
}

export interface SlotsResult {
  open: boolean;
  availableSlots: string[]; // HH:mm
  bookedSlots: string[]; // HH:mm
  closedReason?: 'closedDay' | 'closedDate';
}

export function getSlotsForDate(branch: BranchKey, dateStr: string): SlotsResult {
  const dayKey = getDayKey(dateStr);
  const hours = businessHoursByBranch[branch][dayKey];

  if (!hours) {
    return { open: false, availableSlots: [], bookedSlots: [], closedReason: 'closedDay' };
  }

  if (closedDatesByBranch[branch].includes(dateStr)) {
    return { open: false, availableSlots: [], bookedSlots: [], closedReason: 'closedDate' };
  }

  const startMin = toMinutes(hours.open);
  const endMin = toMinutes(hours.close);
  const allSlots: string[] = [];

  for (let t = startMin; t <= endMin - slotIntervalMinutes; t += slotIntervalMinutes) {
    allSlots.push(toHHMM(t));
  }

  const bookedSet = new Set((bookedSlotsByBranch[branch][dateStr] ?? []).map(String));
  const bookedSlots = allSlots.filter((s) => bookedSet.has(s));
  const availableSlots = allSlots.filter((s) => !bookedSet.has(s));

  return { open: true, availableSlots, bookedSlots };
}















