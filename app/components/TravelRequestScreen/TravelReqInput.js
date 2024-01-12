import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  COLORS,
  SIZES,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/theme';

const TravelReqInput = ({
  label,
  value,
  placeholder,
  leftIcon,
  inputStyle,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.textInput, inputStyle]}
      activeOpacity={1}
      onPress={onPress}>
      <View style={styles.labelCont}>
        <Text style={styles.label}>{label}</Text>
      </View>
      <View style={styles.mainCont}>
        {leftIcon && <View style={styles.icon}>{leftIcon}</View>}
        {value ? (
          typeof value === 'object' ? (
            value.name === '' ? (
              <Text style={styles.placeholder}>{placeholder}</Text>
            ) : (
              <View style={styles.value}>
                <Text style={styles.placeName}>{value.name}</Text>
                <Text style={styles.placeCode}>{`(${value.code})`}</Text>
              </View>
            )
          ) : (
            <Text style={styles.placeName}>{value}</Text>
          )
        ) : (
          <Text style={styles.placeholder}>{placeholder}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default TravelReqInput;

const styles = StyleSheet.create({
  textInput: {
    width: '100%',
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(8),
    borderRadius: moderateScale(10),
    borderColor: COLORS.gray2,
    borderWidth: 1,
  },
  mainCont: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelCont: {
    position: 'absolute',
    backgroundColor: COLORS.white,
    top: verticalScale(-10),
    left: horizontalScale(20),
    paddingHorizontal: horizontalScale(5),
  },
  label: {
    color: COLORS.gray2,
    fontSize: SIZES.small,
    fontWeight: '500',
    letterSpacing: moderateScale(0.24),
  },
  icon: {
    marginRight: horizontalScale(7),
  },
  value: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  placeName: {
    fontSize: SIZES.medium,
    color: COLORS.primary,
    letterSpacing: moderateScale(0.32),
    marginRight: horizontalScale(5),
    textTransform: 'capitalize',
  },
  placeCode: {
    color: COLORS.gray,
    fontSize: SIZES.small,
    fontWeight: '500',
    letterSpacing: moderateScale(0.24),
    textTransform: 'uppercase',
  },
  placeholder: {
    color: COLORS.gray2,
    fontSize: SIZES.medium,
    fontWeight: '500',
    letterSpacing: moderateScale(0.32),
  },
});
