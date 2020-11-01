export const getReadableTime = ({
  hour24 = 0,
  minutes = 0,
  date,
  lang = 'ar',
}: {
  hour24?: number;
  minutes?: number;
  date?: Date;
  lang?: 'ar' | 'en';
}): string => {
  if(date){
    hour24 = date.getHours();
    minutes = date.getMinutes();
  }
  let ampm = hour24 >= 12 ? 'pm' : 'am';
  const hour12 = hour24 > 12 ? hour24 - 12 : hour24 === 0 ? 12 : hour24;

  if (lang === 'ar') ampm = ampm === 'am' ? 'صباحاً' : 'مساءً';
  return `${hour12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
};

export const getReadableDay = ({
  day,
  date,
  lang = 'ar',
}: {
  day?: number;
  date?: Date;
  lang?: 'ar' | 'en';
}): string => {
  const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const DAYS_AR = ['الأحد', 'الأثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعه', 'السبت'];

  if (lang === 'ar') return DAYS_AR[date?.getDay() ?? day!];
  return DAYS[date?.getDay() ?? day!];
};

export function getReadableMonth({ month, date, lang = 'ar' }: { month?: number; date?: Date; lang?: 'ar' | 'en' }) {
  const MONTHS = {
    ar: ['يناير', 'فبراير', 'مارس', 'ابريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
    en: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
  };
  return MONTHS[lang][date?.getMonth() ?? month!];
}

export function dateWithTimeZone(date: Date, ianatz: string) {
  // suppose the date is 12:00 UTC
  var invdate = new Date(
    date.toLocaleString('en-US', {
      timeZone: ianatz,
    }),
  );

  // then invdate will be 07:00 in Toronto
  // and the diff is 5 hours
  var diff = date.getTime() - invdate.getTime();

  // so 12:00 in Toronto is 17:00 UTC
  return new Date(date.getTime() + diff);
}

export const getDiff = function ({
  start,
  end,
  diff,
}: {
  start: Date;
  end: Date;
  diff: 'minutes' | 'hours' | 'seconds';
}): number {
  var diffMs = end.getTime() - start.getTime();

  var _diffSecs = Math.round(diffMs / 1000);

  if (diff === 'seconds') return _diffSecs;

  var _diffMins = Math.round(_diffSecs / 60);

  if (diff === 'minutes') return _diffMins;

  var _diffHrs = Math.round(_diffMins / 60);

  return _diffHrs;
};
