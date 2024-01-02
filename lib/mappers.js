import moment from 'moment-timezone';

const currencyFormater = Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

export function currencyMapper(value) {
  return currencyFormater.format(value);
}

export function dateTimeMapper(value, { utc = false } = {}) {
  const date = utc ? moment(value) : moment(value).local();
  return date.format('L LT');
}
