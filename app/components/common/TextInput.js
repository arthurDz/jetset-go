import {StyleSheet, Text, View, TextInput as RNTextInput} from 'react-native';
import React from 'react';
import {COLORS, horizontalScale, moderateScale} from '../../utils/theme';

const TextInput = ({
  inputStyle,
  leftIcon,
  value,
  onChangeText,
  placeholder,
}) => {
  return (
    <View style={[styles.textInput, inputStyle]}>
      {leftIcon && <View>{leftIcon}</View>}
      <RNTextInput
        style={{flex: 1}}
        placeholder={placeholder}
        placeholderTextColor={COLORS.gray}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  textInput: {
    paddingHorizontal: horizontalScale(10),
    alignItems: 'center',
    color: COLORS.gray,
    flexDirection: 'row',
    borderRadius: moderateScale(12),
  },
});
