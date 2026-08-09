export const CAREER_START_DATE = "2016-10-26";

export function getYearsOfExperience(now = new Date()) {
  const [startYear, startMonth, startDay] = CAREER_START_DATE.split("-").map(
    Number,
  );
  const currentYear = now.getUTCFullYear();
  const anniversary = new Date(
    Date.UTC(currentYear, startMonth - 1, startDay),
  );

  return currentYear - startYear - (now < anniversary ? 1 : 0);
}

export function formatYearsOfExperience(now = new Date()) {
  return `${getYearsOfExperience(now)}+ years`;
}
