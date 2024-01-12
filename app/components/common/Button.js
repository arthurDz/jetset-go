import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, moderateScale, verticalScale} from '../../utils/theme';

const Button = ({
  btnClassName,
  children,
  onPress,
  activeOpacity = 0.7,
  btnStyle,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, btnStyle]}
      activeOpacity={activeOpacity}
      onPress={onPress}
      className={`w-full items-center justify-center bg-blue-500 rounded-lg shadow-md shadow-blue-300 py-4 mt-5 ${btnClassName}`}>
      {children}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.tertiary,
    borderRadius: moderateScale(15),
    paddingVertical: verticalScale(18),
  },
});
