import {StyleSheet} from 'react-native';
import {
  COLORS,
  SIZES,
  horizontalScale,
  moderateScale,
  verticalScale,
  SHADOWS,
} from '../../utils/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingHorizontal: horizontalScale(15),
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  travellerCont: {
    width: '100%',
    backgroundColor: COLORS.white,
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(10),
    borderRadius: moderateScale(8),
  },
  headerSubTxt: {
    fontSize: SIZES.small,
    color: COLORS.white,
    marginBottom: verticalScale(10),
    textAlign: 'center',
  },
  headerTxt: {
    fontSize: SIZES.large,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: verticalScale(20),
  },
  travellerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: verticalScale(10),
  },
  mainTxt: {
    fontSize: SIZES.medium,
    fontWeight: '600',
    color: COLORS.secondary,
  },
  subTxt: {
    fontSize: SIZES.small,
    color: COLORS.tertiary,
  },
  addPassengerBtn: {
    backgroundColor: COLORS.white,
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(10),
    borderRadius: moderateScale(5),
    ...SHADOWS.large,
    marginBottom: verticalScale(20),
  },
  addPassengerBtnTxt: {
    fontSize: SIZES.small,
    fontWeight: '600',
    color: COLORS.secondary,
  },
  bookTicket: {
    fontSize: SIZES.medium,
    fontWeight: '600',
    color: COLORS.white,
    textTransform: 'uppercase',
  },
  nameInput: {
    borderRadius: moderateScale(8),
    borderWidth: 1,
    borderColor: COLORS.gray,
    marginVertical: verticalScale(10),
  },
  confirmBtn: {
    marginBottom: verticalScale(10),
  },
  addedPassenger: {
    fontSize: SIZES.medium,
    color: COLORS.secondary,
    backgroundColor: COLORS.white,
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(10),
    borderRadius: moderateScale(5),
    ...SHADOWS.large,
    marginBottom: verticalScale(20),
  },
});
