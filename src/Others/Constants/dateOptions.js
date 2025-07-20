export const DATE_OPTIONS = {
  THREE_MONTHS: "3_months",
  SIX_MONTHS: "6_months", 
  NINE_MONTHS: "9_months",
  ONE_YEAR: "1_year",
  TWO_YEARS: "2_years",
  THREE_YEARS: "3_years",
  ALL_TIME: "all_time"
};

// Map UI time period values to API date options
export const mapTimePeriodToDateOption = (timePeriod) => {
  const mapping = {
    '3M': DATE_OPTIONS.THREE_MONTHS,
    '6M': DATE_OPTIONS.SIX_MONTHS,
    '9M': DATE_OPTIONS.NINE_MONTHS,
    '12M': DATE_OPTIONS.ONE_YEAR,
    '1Y': DATE_OPTIONS.ONE_YEAR,
    '2Y': DATE_OPTIONS.TWO_YEARS,
    '3Y': DATE_OPTIONS.THREE_YEARS,
    'ALL': DATE_OPTIONS.ALL_TIME
  };
  
  return mapping[timePeriod] || DATE_OPTIONS.SIX_MONTHS;
};