import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const horizontalScale = size =>
  size ? (width / guidelineBaseWidth) * size : width;
const verticalScale = size => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (horizontalScale(size) - size) * factor;

const COLORS = {
  primary: '#140037',
  secondary: '#444262',
  tertiary: '#FF7A00',

  gray: '#83829A',
  gray2: '#B5B2B2',

  white: '#FFFFFF',
  lightWhite: '#F4F4F4',
  black: '#000000',
};

const FONT = {
  regular: 'DMRegular',
  medium: 'DMMedium',
  bold: 'DMBold',
};

const SIZES = {
  xSmall: moderateScale(10),
  small: moderateScale(12),
  medium: moderateScale(16),
  large: moderateScale(20),
  xLarge: moderateScale(24),
  xxLarge: moderateScale(34),
};

const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
};

export {
  COLORS,
  FONT,
  SIZES,
  SHADOWS,
  horizontalScale,
  verticalScale,
  moderateScale,
};
