import {StyleSheet} from 'react-native';
import {
  COLORS,
  SIZES,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  bgImg: {
    width: horizontalScale(),
    height: verticalScale(312),
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: horizontalScale(20),
  },
  headerTxt: {
    fontSize: moderateScale(38),
    color: COLORS.white,
    fontWeight: '700',
    width: horizontalScale(200),
    lineHeight: moderateScale(50),
    letterSpacing: moderateScale(2),
    marginTop: moderateScale(-40),
  },
  mainCont: {
    height: verticalScale(500),
    position: 'absolute',
    // paddingVertical: verticalScale(30),
    paddingHorizontal: horizontalScale(20),
    backgroundColor: COLORS.white,
    top: verticalScale(270),
    alignSelf: 'center',
    width: horizontalScale(340),
    borderRadius: moderateScale(20),
    justifyContent: 'space-evenly',
  },
  exchange: {
    alignSelf: 'center',
    backgroundColor: COLORS.white,
  },
  exchangeImg: {
    width: moderateScale(42),
    height: moderateScale(42),
  },
  subCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btnText: {
    fontSize: SIZES.small,
    color: COLORS.white,
    fontWeight: '700',
  },
});
