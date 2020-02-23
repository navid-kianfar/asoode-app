import React, { Component } from "react";
import { Animated, TouchableOpacity } from "react-native";
import { View, Text, Button, Icon, connectStyle } from "native-base";
import PropTypes from "prop-types";
import I18n from "../../../i18n";
import CulturedDate from "../../../library/cultured-date";
import Styles from "./styles";

const PersianCulture = {
  direction: "rtl",
  rtl: true,
  lang: "fa",
  culture: "fa-IR",
  dayNames: [
    "شنبه",
    "یک شنبه",
    "دوشنبه",
    "سه شنبه",
    "چهار شنبه",
    "پنج شنبه",
    "جمعه"
  ],
  dayNamesShort: ["ش", "۱ش", "۲ش", "۳ش", "۴ش", "۵ش", "ج"],
  monthNames: [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند"
  ],
  daysInMonths: [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29],
  weekMap: { 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: 0 }
};
const ArabicCulture = {
  direction: "rtl",
  rtl: true,
  lang: "ar",
  culture: "ar-SA",
  dayNames: [
    "الأحد",
    "الإثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
    "الجمعة",
    "السبت"
  ],
  dayNamesShort: ["أح", "إث", "ثل", "أر", "خم", "جم", "سب"],
  monthNames: [
    "مُحَرَّم",
    "صَفَر",
    "رَبيع الأوّل",
    "رَبيع الثاني",
    "جُمادى الأولى",
    "جُمادى الآخرة",
    "رَجَب",
    "شَعْبان",
    "رَمَضان",
    "شَوّال",
    "ذو القعدة",
    "ذو الحجة"
  ],
  daysInMonths: [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
  weekMap: { 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: 7 }
};
const GeregorianCulture = {
  direction: "ltr",
  rtl: false,
  lang: "en",
  culture: "en-US",
  dayNames: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ],
  dayNamesShort: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  monthNames: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ],
  daysInMonths: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  weekMap: { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6 }
};
const Cultures = {
  fa: PersianCulture,
  ar: ArabicCulture,
  en: GeregorianCulture
};

class DatePicker extends Component {
  static propTypes = {
    update: PropTypes.func,
    model: PropTypes.any,
    min: PropTypes.any,
    max: PropTypes.any,
    from: PropTypes.any,
    to: PropTypes.any
  };
  state = {
    page: "day",
    days: [],
    months: [],
    years: [],
    temp: CulturedDate.parse(this.props.model || new Date()),
    current: CulturedDate.parse(this.props.model),
    culture: Cultures[this.props.culture || I18n.locale]
  };
  componentDidMount() {
    this.showDay();
  }

  showMonth = () => {
    this.setState({ page: "month" });
  };
  showYear = () => {
    const years = [];
    const start = this.state.temp.year - 7;
    const end = this.state.temp.year + 7;
    for (let i = start; i <= end; i++) {
      years.push(i);
    }
    this.setState({ page: "year", years });
  };
  showDay = () => {
    const days = this.renderDays(this.state.temp.year, this.state.temp.month);
    this.setState({ page: "day", days });
  };
  renderDays = (year, month) => {
    const days = [];
    const nextMonth = month > 11 ? 1 : month + 1;
    const prevMonth = month > 1 ? month - 1 : 12;
    const prevMonthMaxDays = this.state.culture.daysInMonths[prevMonth - 1];
    const maxDays = this.state.culture.daysInMonths[month - 1];
    const monthBegin = CulturedDate.populate(year, month, 1);
    const weekDay = this.state.culture.weekMap[monthBegin.datetime.getDay()];
    for (let i = 1; i <= maxDays; i++) {
      days.push(CulturedDate.populate(year, month, i));
    }
    for (let i = 0; i < weekDay; i++) {
      const prev = CulturedDate.populate(year, prevMonth, prevMonthMaxDays - i);
      prev.disabled = true;
      days.unshift(prev);
    }
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      const next = CulturedDate.populate(year, nextMonth, i);
      next.disabled = true;
      days.push(next);
    }
    return days;
  };
  setDate = (year, month, day, days) => {
    if (day) {
      const patched = { ...day };
      this.setState({
        current: patched,
        temp: { ...day },
        days: days || this.state.days || []
      });
      if (this.props.update) this.props.update(patched);
      return;
    }
    const current = CulturedDate.populate(
      year || this.state.current.year,
      month || this.state.current.month,
      this.state.current.day
    );
    this.setState({
      current,
      temp: { ...current },
      days: days || this.state.days || []
    });
    if (this.props.update) this.props.update(current);
  };
  nextYear = input => {
    if (input === 1) {
      return this.setDate(this.state.temp.year + input, undefined, undefined);
    }
    const years = [];
    const start = this.state.years[14] + 1;
    for (let i = start; i < start + 15; i++) {
      years.push(i);
    }
    this.setState({ years });
  };
  prevYear = input => {
    if (input === 1) {
      return this.setDate(this.state.temp.year - input, undefined, undefined);
    }
    const years = [];
    const start = this.state.years[0] - 15;
    for (let i = start; i < start + 15; i++) {
      years.push(i);
    }
    this.setState({ years });
  };
  nextMonth = () => {
    let year = this.state.temp.year;
    let month = this.state.temp.month + 1;
    if (month === 13) {
      month = 1;
      year++;
    }
    const days = this.renderDays(year, month);
    this.setState({ temp: { year, month, day: 1 }, days });
  };
  prevMonth = () => {
    let year = this.state.temp.year;
    let month = this.state.temp.month - 1;
    if (month === 0) {
      month = 12;
      year--;
    }
    const days = this.renderDays(year, month);
    this.setState({ temp: { year, month, day: 1 }, days });
  };
  render() {
    const flexDirection = {
      flexDirection: this.state.culture.rtl ? "row-reverse" : "row"
    };
    return (
      <View style={[Styles.container, this.props.style]}>
        {this.state.page === "month" ? (
          <View style={Styles.pickMonthContainer}>
            <View style={[Styles.header, this.props.style.backBg_3]}>
              <TouchableOpacity onPress={() => this.nextYear(1)}>
                <Icon name="chevron-left" type="EvilIcons" />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.showYear}>
                <Text>{this.state.temp.year}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.prevYear(1)}>
                <Icon name="chevron-right" type="EvilIcons" />
              </TouchableOpacity>
            </View>
            <View style={[Styles.body, flexDirection]}>
              {this.state.culture.monthNames.map((month, i) => {
                return (
                  <View key={month} style={Styles.monthBtnWrapper}>
                    <Button
                      onPress={() => this.setDate(undefined, i + 1, undefined)}
                      block
                      transparent={i + 1 !== this.state.temp.month}
                    >
                      <Text
                        style={
                          i + 1 !== this.state.temp.month
                            ? this.props.style.colorText_1
                            : null
                        }
                      >
                        {month}
                      </Text>
                    </Button>
                  </View>
                );
              })}
            </View>
          </View>
        ) : this.state.page === "year" ? (
          <View style={Styles.pickYearContainer}>
            <View style={Styles.header}>
              <TouchableOpacity onPress={() => this.nextYear(15)}>
                <Icon name="chevron-left" type="EvilIcons" />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.showDay}>
                <Text>
                  {this.state.years[0]}-{this.state.years[14]}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.prevYear(15)}>
                <Icon name="chevron-right" type="EvilIcons" />
              </TouchableOpacity>
            </View>
            <View style={[Styles.body, flexDirection]}>
              {this.state.years.map((year, i) => {
                return (
                  <View key={i} style={Styles.YearBtnWrapper}>
                    <Button
                      onPress={() => this.setDate(year, undefined, undefined)}
                      block
                      transparent={year !== this.state.temp.year}
                    >
                      <Text
                        style={
                          year !== this.state.temp.year
                            ? this.props.style.colorText_1
                            : null
                        }
                      >
                        {year}
                      </Text>
                    </Button>
                  </View>
                );
              })}
            </View>
          </View>
        ) : (
          <View style={Styles.pickDayContainer}>
            <View style={Styles.header}>
              <TouchableOpacity onPress={this.nextMonth}>
                <Icon name="chevron-left" type="EvilIcons" />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.showMonth}>
                <Text>
                  {this.state.culture.monthNames[this.state.temp.month - 1] +
                    " "}
                  {" " + this.state.temp.year}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.prevMonth}>
                <Icon name="chevron-right" type="EvilIcons" />
              </TouchableOpacity>
            </View>
            <View style={[Styles.weekDayContainer, flexDirection]}>
              {this.state.culture.dayNamesShort.map(d => (
                <View key={d} style={Styles.dayBtnWrapper}>
                  <Text style={Styles.weekDay}>{d}</Text>
                </View>
              ))}
            </View>
            <View style={[Styles.body, flexDirection]}>
              {this.state.days.map((day, i) => {
                const isToday =
                  day.year === this.state.current.year &&
                  day.month === this.state.current.month &&
                  day.day === this.state.current.day;
                return (
                  <View
                    key={day.datetime.getTime().toString() + i}
                    style={Styles.dayBtnWrapper}
                  >
                    <Button
                      onPress={() => this.setDate(undefined, undefined, day)}
                      style={day.disabled ? { opacity: 0.4 } : null}
                      transparent={!isToday}
                      circle
                      small
                    >
                      <Text
                        style={!isToday ? this.props.style.colorText_1 : null}
                      >
                        {day.day}
                      </Text>
                    </Button>
                  </View>
                );
              })}
            </View>
          </View>
        )}
      </View>
    );
  }
}

export default connectStyle("Custom.GeneralColors")(DatePicker);
