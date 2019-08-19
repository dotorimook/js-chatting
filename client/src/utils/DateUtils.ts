import {DateTime} from 'luxon';

export default class DateUtils {
  static FORMAT_DATETIME = 'yyyy.MM.dd HH:mm:ss';
  static FORMAT_DATE = 'yyyy.MM.dd';

  static nowToString = (format = 'DATETIME') => {
    switch(format) {
      case 'TIMESTAMP':
        return DateTime.local().toSeconds();
      case 'DATE':
        return DateTime.local().toFormat(DateUtils.FORMAT_DATE);
      case 'DATETIME':
      default:
        return DateTime.local().toFormat(DateUtils.FORMAT_DATETIME);
    }
  }
}