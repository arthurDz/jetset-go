import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {COLORS, SIZES, horizontalScale, verticalScale} from '../../utils/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RadioButtonGroup from '../common/RadioButtonGroup';
import Button from '../common/Button';

const TravellerPicker = ({onPressHandler}) => {
  const [count, setCount] = useState({
    adults: 1,
    children: 0,
  });
  const travellerClass = ['Economy', 'Premium Economy', 'Business'];
  const [selectedTravellerClass, setSelectedTravellerClass] =
    useState('Economy');

  const countHandler = (travellerType, type) => {
    switch (type) {
      case 'inc':
        setCount({...count, [travellerType]: count[travellerType] + 1});
        break;
      case 'dec':
        setCount({...count, [travellerType]: count[travellerType] - 1});
        break;
      default:
        break;
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.mainCont}>
        <Text style={styles.headerTxt}>Travellers</Text>

        <View style={styles.travellerCont}>
          <View>
            <Text style={styles.mainTxt}>Adults</Text>
            <Text style={styles.subTxt}>12+ years</Text>
          </View>
          <View style={styles.incDecCont}>
            <TouchableOpacity
              onPress={() => countHandler('adults', 'dec')}
              disabled={count.adults === 1}>
              <AntDesign
                name="minuscircleo"
                size={SIZES.xLarge}
                color={count.adults === 1 ? COLORS.gray2 : COLORS.secondary}
              />
            </TouchableOpacity>
            <Text style={styles.count}>{count.adults}</Text>
            <TouchableOpacity
              onPress={() => countHandler('adults', 'inc')}
              disabled={count.adults === 9}>
              <AntDesign
                name="pluscircleo"
                size={SIZES.xLarge}
                color={count.adults === 9 ? COLORS.gray2 : COLORS.secondary}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.travellerCont}>
          <View>
            <Text style={styles.mainTxt}>Children</Text>
            <Text style={styles.subTxt}>2-12 years</Text>
          </View>
          <View style={styles.incDecCont}>
            <TouchableOpacity
              onPress={() => countHandler('children', 'dec')}
              disabled={count.children === 0}>
              <AntDesign
                name="minuscircleo"
                size={SIZES.xLarge}
                color={count.children === 0 ? COLORS.gray2 : COLORS.secondary}
              />
            </TouchableOpacity>
            <Text style={styles.count}>{count.children}</Text>
            <TouchableOpacity
              onPress={() => countHandler('children', 'inc')}
              disabled={count.children === 9}>
              <AntDesign
                name="pluscircleo"
                size={SIZES.xLarge}
                color={count.children === 9 ? COLORS.gray2 : COLORS.secondary}
              />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.headerTxt}>Class</Text>
        <RadioButtonGroup
          options={travellerClass}
          selectedOption={selectedTravellerClass}
          onSelect={option => setSelectedTravellerClass(option)}
        />
      </View>
      <Button
        onPress={() =>
          onPressHandler({
            adults: count.adults,
            children: count.children,
            class: selectedTravellerClass,
          })
        }>
        <Text style={styles.done}>Done</Text>
      </Button>
    </View>
  );
};

export default TravellerPicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(20),
  },
  mainCont: {
    flex: 1,
  },
  headerTxt: {
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
    marginBottom: verticalScale(16),
  },
  travellerCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: verticalScale(16),
  },
  incDecCont: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainTxt: {
    color: COLORS.secondary,
    fontSize: SIZES.medium,
  },
  subTxt: {
    color: COLORS.secondary,
    fontSize: SIZES.small,
  },
  count: {
    marginHorizontal: horizontalScale(10),
    color: COLORS.secondary,
    fontSize: SIZES.small,
  },
  done: {
    fontSize: SIZES.large,
    color: COLORS.white,
  },
});
