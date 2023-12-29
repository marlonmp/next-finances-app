import moment from 'moment';

const currencyFormater = Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'});

export function currencyMapper(value) {
  return currencyFormater.format(value);
}

export function dateTimeMapper(value) {
  return moment(value).format('L LT');
}
