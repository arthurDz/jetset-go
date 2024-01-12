import {View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import styles from './styles';
import ExploreBg from '../../../assets/images/exploreScrBg.png';
import {FlashList} from '@shopify/flash-list';
import FlightCard from '../../components/common/FlightCard';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import FilterView from '../../components/ExploreOptionsScreen/FilterView';
import EmptyViewAnimation from '../../components/common/EmptyViewAnimation';
import {COLORS, moderateScale} from '../../utils/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

const ExploreOptionsScreen = props => {
  const navigation = useNavigation();

  const [flightData, setFlightData] = useState(props.route.params.data);

  const [filters, setFilters] = useState({
    stopInfo: [],
    airlines: [],
  });

  const {source, destination} = props.route.params;

  const snapPoints = useMemo(() => ['50%'], []);
  const bottomSheetRef = useRef(null);

  const handleBSOpen = () => {
    bottomSheetRef.current?.expand();
  };
  const handleBSClose = () => bottomSheetRef.current?.close();

  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        onPress={onApplyFilter}
      />
    ),
    [],
  );

  const onApplyFilter = () => {
    if (filters.airlines.length === 0 && filters.stopInfo.length === 0) {
      setFlightData(props.route.params.data);
      handleBSClose();
      return;
    }
    const filteredData = props.route.params.data.filter(flight => {
      const isStopInfoIncl =
        filters.stopInfo.length === 0
          ? true
          : filters.stopInfo.includes(flight.displayData.stopInfo);
      const isAirlineIncluded =
        filters.airlines.length === 0
          ? true
          : filters.airlines.find(
              val =>
                val.airlineName === flight.displayData.airlines[0].airlineName,
            );

      return isStopInfoIncl && isAirlineIncluded;
    });
    setFlightData(filteredData);
    handleBSClose();
  };

  const sortHandler = () => {
    if (flightData.length === 0) return;
    const sortedData = flightData.sort((a, b) => a.fare - b.fare);
    setFlightData(sortedData);
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={ExploreBg} style={styles.bgImg}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}>
          <AntDesign
            name="arrowleft"
            size={moderateScale(25)}
            color={COLORS.white}
          />
        </TouchableOpacity>
        <View style={styles.bgImgTxtCont}>
          <Text style={styles.bgText}>{destination}</Text>
          <Text style={styles.bgText}>{source}</Text>
        </View>
      </ImageBackground>

      <View style={styles.mainCont}>
        {props.route.params.data.length > 0 && (
          <View style={styles.filterCont}>
            <TouchableOpacity style={styles.fliterBtn} onPress={handleBSOpen}>
              <Text>Filter</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.fliterBtn} onPress={sortHandler}>
              <Text>Sort By: Cheapest</Text>
            </TouchableOpacity>
          </View>
        )}
        <FlashList
          scrollEnabled
          data={flightData}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <FlightCard
              flight={item}
              onPress={() => navigation.navigate('BookingScreen')}
            />
          )}
          estimatedItemSize={200}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <EmptyViewAnimation style={styles.emptyAnimtion} />
              <Text style={styles.emptyContainerTxt}>No Flights Found</Text>
            </View>
          }
        />
      </View>

      <BottomSheet
        snapPoints={snapPoints}
        index={-1}
        ref={bottomSheetRef}
        backdropComponent={renderBackdrop}
        enablePanDownToClose>
        <View style={{flex: 1}}>
          <FilterView
            data={props.route.params.data}
            filters={filters}
            setFilters={setFilters}
            onApplyFilter={onApplyFilter}
          />
        </View>
      </BottomSheet>
    </View>
  );
};

export default ExploreOptionsScreen;
