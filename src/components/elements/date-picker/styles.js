import { StyleSheet } from "react-native";
import I18n from "../../../i18n";
const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 45,
    borderBottomWidth: 2
  },
  body: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  pickDayContainer: {},
  weekDayContainer: {
    flexDirection: "row"
  },
  dayBtnWrapper: {
    flexBasis: "14.28571%",
    alignItems: "center",
    justifyContent: "center",
    height: 45
  },
  monthBtnWrapper: {
    flexBasis: "33.33333%",
    justifyContent: "center",
    height: 78.75
  },
  YearBtnWrapper: {
    flexBasis: "33.33333%",
    justifyContent: "center",
    height: 63
  },
  weekDay: {},

  pickMonthContainer: {},

  pickYearContainer: {}
});

export default styles;
