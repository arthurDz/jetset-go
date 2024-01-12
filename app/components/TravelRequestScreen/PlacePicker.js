import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {COLORS, SIZES, horizontalScale, verticalScale} from '../../utils/theme';
import {filteredCities} from '../../utils/AppUtils';

const PlacePicker = ({data, type, onPressHandler}) => {
  const filteredData =
    type === 'from' ? filteredCities(data).from : filteredCities(data).to;
  return (
    <ScrollView style={styles.container}>
      {filteredData.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.mainCont}
          onPress={() => onPressHandler(item)}>
          <View>
            <Text style={styles.cityName}>{item?.cityName}</Text>
            <Text style={styles.airport}>{item?.airport}</Text>
          </View>
          <Text style={styles.cityCode}>{item?.cityCode}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default PlacePicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  mainCont: {
    flexDirection: 'row',
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(10),
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    borderBottomColor: COLORS.gray,
    borderBottomWidth: 1,
  },
  cityName: {
    fontSize: SIZES.large,
    fontWeight: '600',
    color: COLORS.primary,
  },
  cityCode: {
    fontSize: SIZES.large,
    color: COLORS.gray2,
  },
  airport: {
    fontSize: SIZES.medium,
    color: COLORS.gray2,
  },
});
