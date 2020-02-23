import { StyleSheet } from "react-native";
import Platform from "../../native-base-theme/variables/platform-light";
import I18n from "../i18n";
import { Colors, Metrics } from "./variables";

const { rem } = Metrics;
const col = {
  flexGrow: 0,
  flexShrink: 0,
  paddingHorizontal: 0.5 * rem
};
const marginEnd = I18n.isRtl
  ? {
      me0: { marginLeft: 0 },
      me1: { marginLeft: 0.25 * rem },
      me2: { marginLeft: 0.5 * rem },
      me3: { marginLeft: rem },
      me4: { marginLeft: 1.5 * rem },
      me5: { marginLeft: 3 * rem },
      meAuto: { marginLeft: "auto" }
    }
  : {
      me0: { marginRight: 0 },
      me1: { marginRight: 0.25 * rem },
      me2: { marginRight: 0.5 * rem },
      me3: { marginRight: rem },
      me4: { marginRight: 1.5 * rem },
      me5: { marginRight: 3 * rem },
      meAuto: { marginRight: "auto" }
    };
const marginStart = I18n.isRtl
  ? {
      ms0: { marginRight: 0 },
      ms1: { marginRight: 0.25 * rem },
      ms2: { marginRight: 0.5 * rem },
      ms3: { marginRight: rem },
      ms4: { marginRight: 1.5 * rem },
      ms5: { marginRight: 3 * rem },
      msAuto: { marginRight: "auto" }
    }
  : {
      ms0: { marginLeft: 0 },
      ms1: { marginLeft: 0.25 * rem },
      ms2: { marginLeft: 0.5 * rem },
      ms3: { marginLeft: rem },
      ms4: { marginLeft: 1.5 * rem },
      ms5: { marginLeft: 3 * rem },
      msAuto: { marginLeft: "auto" }
    };
const paddingEnd = I18n.isRtl
  ? {
      pe0: { paddingLeft: 0 },
      pe1: { paddingLeft: 0.25 * rem },
      pe2: { paddingLeft: 0.5 * rem },
      pe3: { paddingLeft: rem },
      pe4: { paddingLeft: 1.5 * rem },
      pe5: { paddingLeft: 3 * rem },
      peAuto: { paddingLeft: "auto" }
    }
  : {
      pe0: { paddingRight: 0 },
      pe1: { paddingRight: 0.25 * rem },
      pe2: { paddingRight: 0.5 * rem },
      pe3: { paddingRight: rem },
      pe4: { paddingRight: 1.5 * rem },
      pe5: { paddingRight: 3 * rem },
      peAuto: { paddingRight: "auto" }
    };
const paddingStart = I18n.isRtl
  ? {
      ps0: { paddingRight: 0 },
      ps1: { paddingRight: 0.25 * rem },
      ps2: { paddingRight: 0.5 * rem },
      ps3: { paddingRight: rem },
      ps4: { paddingRight: 1.5 * rem },
      ps5: { paddingRight: 3 * rem },
      psAuto: { paddingRight: "auto" }
    }
  : {
      ps0: { paddingLeft: 0 },
      ps1: { paddingLeft: 0.25 * rem },
      ps2: { paddingLeft: 0.5 * rem },
      ps3: { paddingLeft: rem },
      ps4: { paddingLeft: 1.5 * rem },
      ps5: { paddingLeft: 3 * rem },
      psAuto: { paddingLeft: "auto" }
    };

const styles = StyleSheet.create({
  zIndexM: { zIndex: -1 },
  flexWrap: { flexWrap: "wrap" },
  overflowHidden: { overflow: "hidden" },
  alignSelfStretch: { alignSelf: "stretch" },
  alignSelfCenter: { alignSelf: "center" },
  alignSelfStart: { alignSelf: "flex-start" },
  badgeLabel: {
    borderRadius: 3,
    paddingVertical: 3,
    paddingHorizontal: 10
  },
  headerIcon: {
    marginHorizontal: 0.25 * rem,
    fontSize: 20
  },
  h100: { height: "100%" },
  w100: { width: "100%" },
  iphoneXBottom: Platform.isIphoneX ? { paddingBottom: 33 } : null,
  bg_none: { backgroundColor: "transparent" },
  bg_1: { backgroundColor: Colors.bg_1 },
  bg_2: { backgroundColor: Colors.bg_2 },
  bg_3: { backgroundColor: Colors.bg_3 },
  flex1: { flex: 1 },
  flexGrow1: { flexGrow: 1 },
  flexShrink1: { flexShrink: 1, minWidth: 0 },
  flexShrink0: { flexShrink: 0 },
  textEllipsis: {
    // whiteSpace: 'nowrap'
  },
  textLeft: {
    textAlign: "left"
  },
  waitingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  textWhite: { color: "#fff" },
  border0: {
    borderBottomWidth: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0
  },
  imageIcon: {
    width: 28,
    height: 28
  },
  iconRegular: { fontSize: 20 },
  textMute: { color: Colors.text_2 },
  alignItemsEnd: { alignItems: "flex-end" },
  alignItemsStart: { alignItems: "flex-start" },
  alignItemsStartDir: { alignItems: I18n.isRtl ? "flex-end" : "flex-start" },
  alignItemsCenter: { alignItems: "center" },
  alignItemsStretch: { alignItems: "stretch" },
  flexColumn: { flexDirection: "column" },
  flexRow: { flexDirection: "row" },
  flexRowDir: { flexDirection: I18n.isRtl ? "row-reverse" : "row" },
  justifyContentCenter: { justifyContent: "center" },
  justifyContentBetween: { justifyContent: "space-between" },
  justifyContentEnd: { justifyContent: "flex-end" },
  justifyContentStart: { justifyContent: "flex-start" },
  justifyContentStartDir: {
    justifyContent: I18n.isRtl ? "flex-end" : "flex-start"
  },
  textCenter: { textAlign: "center" },
  rowDir: {
    flexDirection: I18n.isRtl ? "row-reverse" : "row",
    flexWrap: "wrap",
    marginHorizontal: -0.5 * rem
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -0.5 * rem
  },
  col1: { ...col, flexBasis: "8.33333%" },
  col2: { ...col, flexBasis: "16.66666%" },
  col3: { ...col, flexBasis: "25%" },
  col4: { ...col, flexBasis: "33.33333%" },
  col5: { ...col, flexBasis: "41.66666%" },
  col6: { ...col, flexBasis: "50%" },
  col7: { ...col, flexBasis: "58.33333%" },
  col8: { ...col, flexBasis: "66.66666%" },
  col9: { ...col, flexBasis: "75%" },
  col10: { ...col, flexBasis: "83.33333%" },
  col11: { ...col, flexBasis: "91.66666%" },
  col12: { ...col, flexBasis: "100%" },
  offset1: { marginStart: "8.33333%" },
  offset2: { marginStart: "16.66666%" },
  offset3: { marginStart: "25%" },
  offset4: { marginStart: "33.33333%" },
  offset5: { marginStart: "41.66666%" },
  offset6: { marginStart: "50%" },
  offset7: { marginStart: "58.33333%" },
  offset8: { marginStart: "66.66666%" },
  offset9: { marginStart: "75%" },
  offset10: { marginStart: "83.33333%" },
  offset11: { marginStart: "91.66666%" },
  offset12: { marginStart: "100%" },
  my0: { marginVertical: 0 },
  my1: { marginVertical: 0.25 * rem },
  my2: { marginVertical: 0.5 * rem },
  my3: { marginVertical: rem },
  my4: { marginVertical: 1.5 * rem },
  my5: { marginVertical: 3 * rem },
  myAuto: { marginVertical: "auto" },
  mx0: { marginHorizontal: 0 },
  mx1: { marginHorizontal: 0.25 * rem },
  mx2: { marginHorizontal: 0.5 * rem },
  mx3: { marginHorizontal: rem },
  mx4: { marginHorizontal: 1.5 * rem },
  mx5: { marginHorizontal: 3 * rem },
  mxAuto: { marginHorizontal: "auto" },
  ...marginStart,
  ...marginEnd,
  ...paddingStart,
  ...paddingEnd,
  mt0: { marginTop: 0 },
  mt1: { marginTop: 0.25 * rem },
  mt2: { marginTop: 0.5 * rem },
  mt3: { marginTop: rem },
  mt4: { marginTop: 1.5 * rem },
  mt5: { marginTop: 3 * rem },
  mtAuto: { marginTop: "auto" },
  mb0: { marginBottom: 0 },
  mb1: { marginBottom: 0.25 * rem },
  mb2: { marginBottom: 0.5 * rem },
  mb3: { marginBottom: rem },
  mb4: { marginBottom: 1.5 * rem },
  mb5: { marginBottom: 3 * rem },
  mbAuto: { marginBottom: "auto" },
  py0: { paddingVertical: 0 },
  py1: { paddingVertical: 0.25 * rem },
  py2: { paddingVertical: 0.5 * rem },
  py3: { paddingVertical: rem },
  py4: { paddingVertical: 1.5 * rem },
  py5: { paddingVertical: 3 * rem },
  pyAuto: { paddingVertical: "auto" },
  px0: { paddingHorizontal: 0 },
  px1: { paddingHorizontal: 0.25 * rem },
  px2: { paddingHorizontal: 0.5 * rem },
  px3: { paddingHorizontal: rem },
  px4: { paddingHorizontal: 1.5 * rem },
  px5: { paddingHorizontal: 3 * rem },
  pxAuto: { paddingHorizontal: "auto" },
  pt0: { paddingTop: 0 },
  pt1: { paddingTop: 0.25 * rem },
  pt2: { paddingTop: 0.5 * rem },
  pt3: { paddingTop: rem },
  pt4: { paddingTop: 1.5 * rem },
  pt5: { paddingTop: 3 * rem },
  ptAuto: { paddingTop: "auto" },
  pb0: { paddingBottom: 0 },
  pb1: { paddingBottom: 0.25 * rem },
  pb2: { paddingBottom: 0.5 * rem },
  pb3: { paddingBottom: rem },
  pb4: { paddingBottom: 1.5 * rem },
  pb5: { paddingBottom: 3 * rem },
  pbAuto: { paddingBottom: "auto" }
});
export default styles;
