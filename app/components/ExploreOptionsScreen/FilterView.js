import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {COLORS, SIZES, horizontalScale, verticalScale} from '../../utils/theme';
import Button from '../common/Button';

const FilterView = ({data, filters, setFilters, onApplyFilter}) => {
  const stopInfoFilterData = ['Non-Stop', '1 Stop', '2+ Stops'];

  const airlinesData = data.map(d => d.displayData.airlines);
  const flattenedArray = [].concat(...airlinesData);
  const uniqueAirlines = Array.from(
    new Set(flattenedArray.map(JSON.stringify)),
    JSON.parse,
  );

  const handleStopInfoOperation = (value, operation) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      stopInfo:
        operation === 'push'
          ? [...prevFilters.stopInfo, value]
          : prevFilters.stopInfo.filter(item => item !== value),
    }));
  };

  const handleAirlinesOperation = (value, operation) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      airlines:
        operation === 'push'
          ? [...prevFilters.airlines, value]
          : prevFilters.airlines.filter(
              item => item.airlineName !== value.airlineName,
            ),
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTxt}>Stops</Text>
      <View>
        {stopInfoFilterData.map((si, index) => (
          <View style={styles.filterRow}>
            <BouncyCheckbox
              key={index}
              size={25}
              fillColor={COLORS.secondary}
              unfillColor="#FFFFFF"
              iconStyle={{borderColor: COLORS}}
              innerIconStyle={{borderWidth: 2}}
              onPress={isChecked => {
                if (isChecked) {
                  handleStopInfoOperation(si, 'push');
                } else {
                  if (filters.stopInfo.find(val => val === si)) {
                    handleStopInfoOperation(si, 'remove');
                  }
                }
              }}
            />
            <Text>{si}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.headerTxt}>Airlines</Text>
      <View>
        {uniqueAirlines.map((airline, index) => (
          <View style={styles.filterRow}>
            <BouncyCheckbox
              key={index}
              size={25}
              fillColor={COLORS.secondary}
              unfillColor="#FFFFFF"
              iconStyle={{borderColor: COLORS}}
              innerIconStyle={{borderWidth: 2}}
              onPress={isChecked => {
                if (isChecked) {
                  handleAirlinesOperation(airline, 'push');
                } else {
                  if (
                    filters.airlines.find(
                      val => val.airlineName === airline.airlineName,
                    )
                  ) {
                    handleAirlinesOperation(airline, 'remove');
                  }
                }
              }}
            />
            <Text>{airline.airlineName}</Text>
          </View>
        ))}
      </View>

      <Button onPress={onApplyFilter}>
        <Text style={styles.applyFilter}>Apply Filter</Text>
      </Button>
    </View>
  );
};

export default FilterView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: horizontalScale(10),
    justifyContent: 'space-between',
    paddingBottom: verticalScale(10),
  },
  headerTxt: {
    fontSize: SIZES.large,
    color: COLORS.primary,
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(10),
  },
  applyFilter: {
    fontSize: SIZES.large,
    color: COLORS.white,
  },
});
