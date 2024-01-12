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
  backBtn: {
    position: 'absolute',
    left: horizontalScale(10),
    top: verticalScale(10),
  },
  emptyContainer: {
    height: verticalScale(350),
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  emptyContainerTxt: {
    fontSize: SIZES.xxLarge,
    color: COLORS.primary,
  },
  emptyAnimtion: {
    width: horizontalScale(300),
    height: verticalScale(100),
  },
  bgImg: {
    width: horizontalScale(),
    height: verticalScale(300),
    justifyContent: 'center',
    paddingHorizontal: horizontalScale(20),
  },
  bgImgTxtCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: verticalScale(-50),
    paddingHorizontal: horizontalScale(40),
  },
  bgText: {
    fontSize: SIZES.xLarge,
    color: COLORS.white,
  },
  mainCont: {
    flex: 1,
    marginTop: verticalScale(-40),
  },
  filterCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: horizontalScale(20),
    marginBottom: verticalScale(10),
  },
  fliterBtn: {
    backgroundColor: COLORS.white,
    alignItems: 'center',
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(15),
    borderRadius: moderateScale(12),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
});
