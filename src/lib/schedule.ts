import { scheduleItems, type ScheduleItem, type ScheduleItemType } from '../data/schedule';

const dateValue = (item: ScheduleItem) => item.startsAt ?? item.dueAt ?? item.endsAt ?? '';

export const getScheduleItems = (): ScheduleItem[] =>
  [...scheduleItems].sort((a, b) => dateValue(a).localeCompare(dateValue(b)));

export const getItemsByWeek = (week: ScheduleItem['week']): ScheduleItem[] =>
  getScheduleItems().filter((item) => item.week === week);

export const getItemsByType = (type: ScheduleItemType): ScheduleItem[] =>
  getScheduleItems().filter((item) => item.type === type);

export const getUpcomingItems = (referenceDate = new Date(), limit = 5): ScheduleItem[] => {
  const referenceTime = referenceDate.getTime();

  return getScheduleItems()
    .filter((item) => {
      const value = item.startsAt ?? item.dueAt;
      return value ? new Date(value).getTime() >= referenceTime : false;
    })
    .slice(0, limit);
};

export const getActiveExamWindows = (referenceDate = new Date()): ScheduleItem[] => {
  const referenceTime = referenceDate.getTime();

  return getItemsByType('exam').filter((item) => {
    if (!item.startsAt || !item.endsAt) return false;
    return new Date(item.startsAt).getTime() <= referenceTime && referenceTime <= new Date(item.endsAt).getTime();
  });
};

export const getWeeks = (): Array<ScheduleItem['week']> => {
  const weeks = new Set<ScheduleItem['week']>();
  getScheduleItems().forEach((item) => weeks.add(item.week));
  return [...weeks];
};

export const formatDateTime = (value?: string): string => {
  if (!value) return 'No date listed';

  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value));
};

export const formatWeek = (week: ScheduleItem['week']): string => {
  if (week === 'pre') return 'Before first day';
  if (week === 'finals') return 'Finals';
  if (week === 'completion') return 'Completion';
  return `Week ${week}`;
};
