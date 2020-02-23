import I18n from "../i18n";
import PersianDate from "persian-date";
import HijriDate, { toHijri } from "hijri-date/lib/safe";

export default class CulturedDate {
  static parse(input: Date) {
    const result = {
      year: undefined,
      month: undefined,
      day: undefined,
      hour: undefined,
      minute: undefined,
      second: undefined,
      weekday: undefined,
      monthName: undefined,
      datetime: undefined
    };
    if (!input) return result;
    if (typeof input === "string") input = new Date(input);
    if (typeof input === "number") input = new Date(input);
    switch (I18n.locale) {
      case "ar":
        const hijriDate = toHijri(date);
        result.datetime = input;
        result.year = hijriDate.year;
        result.month = hijriDate.month;
        result.day = hijriDate.date;
        result.hour = hijriDate.hour;
        result.minute = hijriDate.minutes;
        result.second = hijriDate.seconds;
        result.weekday = hijriDate.format("dddd");
        result.monthName = hijriDate.format("MMMM");
        break;
      case "fa":
        const persianDate = new PersianDate(input);
        result.datetime = input;
        result.year = persianDate.year();
        result.month = persianDate.month();
        result.day = persianDate.date();
        result.hour = persianDate.hour();
        result.minute = persianDate.minute();
        result.second = persianDate.second();
        result.weekday = persianDate.format("dddd");
        result.monthName = persianDate.format("MMMM");
        break;
      default:
        const gregorianDate = new PersianDate(input).toCalendar("gregorian");
        result.datetime = input;
        result.year = gregorianDate.year();
        result.month = gregorianDate.month();
        result.day = gregorianDate.date();
        result.hour = gregorianDate.hour();
        result.minute = gregorianDate.minute();
        result.second = gregorianDate.second();
        result.weekday = gregorianDate.format("dddd");
        result.monthName = gregorianDate.format("MMMM");
        break;
    }
    return result;
  }
  static populate(year, month, day, hour = 0, minute = 0, second = 0) {
    const result = {
      year: undefined,
      month: undefined,
      day: undefined,
      hour: undefined,
      minute: undefined,
      second: undefined,
      weekday: undefined,
      monthName: undefined,
      datetime: undefined
    };
    switch (I18n.locale) {
      case "fa":
        const persianDate = new PersianDate([
          year,
          month,
          day,
          hour,
          minute,
          second
        ]);
        result.datetime = persianDate.toDate();
        result.year = persianDate.year();
        result.month = persianDate.month();
        result.day = persianDate.date();
        result.hour = persianDate.hour();
        result.minute = persianDate.minute();
        result.second = persianDate.second();
        result.weekday = persianDate.format("dddd");
        result.monthName = persianDate.format("MMMM");
        break;
      case "ar":
        const hijriDate = new HijriDate(year, month, day, hour, minute, second);
        result.datetime = new Date(hijriDate.toGregorian());
        result.year = hijriDate.year;
        result.month = hijriDate.month;
        result.day = hijriDate.date;
        result.hour = hijriDate.hour;
        result.minute = hijriDate.minutes;
        result.second = hijriDate.seconds;
        result.weekday = hijriDate.format("dddd");
        result.monthName = hijriDate.format("MMMM");
      default:
        const gregorianDate = new PersianDate([
          year,
          month,
          day,
          hour,
          minute,
          second
        ]).toCalendar("gregorian");
        result.datetime = gregorianDate.toDate();
        result.year = gregorianDate.year();
        result.month = gregorianDate.month();
        result.day = gregorianDate.date();
        result.hour = gregorianDate.hour();
        result.minute = gregorianDate.minute();
        result.second = gregorianDate.second();
        result.weekday = gregorianDate.format("dddd");
        result.monthName = gregorianDate.format("MMMM");
        break;
    }
    return result;
  }
  static toDateTime(year, month, day, hour = 0, minute = 0, second = 0) {
    switch (I18n.locale) {
      case "fa":
        return new PersianDate([
          year,
          month,
          day,
          hour,
          minute,
          second
        ]).toDate();
      case "ar":
        return new Date(
          new HijriDate(year, month, day, hour, minute, second).toGregorian()
        );
      default:
        return new Date(year, month, day, hour, minute, second, 0);
    }
  }
}
