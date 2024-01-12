import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {getFlightData} from '../../services/api';
import styles from './styles';
import TravelReqBg from '../../../assets/images/travelReqScrBg.png';
import Exchange from '../../../assets/images/exchange.png';
import TravelReqInput from '../../components/TravelRequestScreen/TravelReqInput';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  COLORS,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/theme';
import moment from 'moment';
import BottomSheet from '@gorhom/bottom-sheet';
import DatePicker from '../../components/TravelRequestScreen/DatePicker';
import Button from '../../components/common/Button';
import {isDateValid} from '../../utils/AppUtils';
import PlacePicker from '../../components/TravelRequestScreen/PlacePicker';
import TravellerPicker from '../../components/TravelRequestScreen/TravellerPicker';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import {useFilter} from '../../context/FilterContext';

const TravelRequestScreen = () => {
  const navigation = useNavigation();

  const [flightData, setFlightData] = useState([]);
  const {filterValue, setFilterValue} = useFilter();
  const [type, setType] = useState('to');

  const bottomSheetRef = useRef(null);
  const handleBSOpen = type => {
    setType(type);
    bottomSheetRef.current?.expand();
  };
  const handleBSClose = () => bottomSheetRef.current?.close();

  const snapPoints = useMemo(() => ['100%'], []);

  useEffect(() => {
    fetchFlightData();
  }, []);

  const fetchFlightData = async () => {
    try {
      const data = await getFlightData();
      setFlightData(data.data?.result);
    } catch (error) {
      console.log(error);
    }
  };

  const onInputPressHandler = value => {
    switch (type) {
      case 'from':
        if (filterValue.to.cityCode !== '') {
          if (filterValue.to.cityCode === value.cityCode) {
            Toast.show({
              type: 'error',
              text1: 'Source and Destination city cannot be same',
            });
            return;
          }
        }
        setFilterValue({
          ...filterValue,
          from: value,
        });
        break;

      case 'to':
        if (filterValue.from.cityCode === value.cityCode) {
          Toast.show({
            type: 'error',
            text1: 'Source and Destination city cannot be same',
          });
          return;
        }
        setFilterValue({
          ...filterValue,
          to: value,
        });
        break;

      case 'departDate':
        if (filterValue.returnDate !== '') {
          if (!isDateValid(value, filterValue.returnDate).isDepartureValid) {
            Toast.show({
              type: 'error',
              text1: 'Departure Date cannot be after Return Date',
            });
            return;
          }
        }
        setFilterValue({
          ...filterValue,
          departDate: value,
        });
        break;

      case 'returnDate':
        if (!isDateValid(filterValue.departDate, value).isReturnValid) {
          Toast.show({
            type: 'error',
            text1: 'Please select a date after Departure Date',
          });
          return;
        }
        setFilterValue({
          ...filterValue,
          returnDate: value,
        });
        break;

      case 'travellerDetails':
        setFilterValue({
          ...filterValue,
          travellerDetails: value,
        });
        break;

      default:
        break;
    }
    handleBSClose();
  };

  const searchFlightHandler = () => {
    if (filterValue.from.cityCode === '' || filterValue.to.cityCode === '') {
      Toast.show({
        type: 'error',
        text1: 'Please select source and destination places',
      });
      return;
    }
    const filteredFlights = flightData.filter(flight => {
      const flightDepartDate = moment(flight.displayData.source.depTime).format(
        'ddd, DD MMM YY',
      );
      const flightReturnDate = moment(
        flight.displayData.destination.arrTime,
      ).format('ddd, DD MMM YY');
      const isValidDeparture = moment(flightDepartDate).isSame(
        filterValue.departDate,
      );
      const isValidReturn =
        filterValue.returnDate === ''
          ? true
          : moment(flightReturnDate).isSame(filterValue.returnDate);
      const isSourceCityValid =
        flight.displayData.source.airport.cityCode ===
        filterValue.from.cityCode;
      const isDestinationCityValid =
        flight.displayData.destination.airport.cityCode ===
        filterValue.to.cityCode;

      return (
        isValidDeparture &&
        isValidReturn &&
        isSourceCityValid &&
        isDestinationCityValid
      );
    });
    navigation.navigate('ExploreOptionsScreen', {
      data: filteredFlights,
      source: filterValue.from.cityCode,
      destination: filterValue.to.cityCode,
    });
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={TravelReqBg} style={styles.bgImg}>
        <Text style={styles.headerTxt}>Book Your Flight</Text>
      </ImageBackground>

      <View style={styles.mainCont}>
        <View>
          <TravelReqInput
            label={'From'}
            value={{
              code: filterValue.from.cityCode,
              name: filterValue.from.cityName,
            }}
            placeholder={'City'}
            leftIcon={
              <MaterialCommunityIcons
                name="airplane-takeoff"
                size={25}
                color={COLORS.primary}
              />
            }
            onPress={() => handleBSOpen('from')}
          />
          <TravelReqInput
            label={'To'}
            value={{
              code: filterValue.to.cityCode,
              name: filterValue.to.cityName,
            }}
            placeholder={'City'}
            leftIcon={
              <MaterialCommunityIcons
                name="airplane-landing"
                size={25}
                color={COLORS.primary}
              />
            }
            onPress={() => handleBSOpen('to')}
            inputStyle={{marginTop: verticalScale(20)}}
          />
        </View>

        <View style={styles.subCont}>
          <TravelReqInput
            label={'Departure Date'}
            value={filterValue.departDate}
            onPress={() => handleBSOpen('departDate')}
            inputStyle={{flex: 0.45}}
          />
          <TravelReqInput
            label={'Return Date'}
            value={filterValue.returnDate}
            onPress={() => handleBSOpen('returnDate')}
            inputStyle={{flex: 0.45}}
          />
        </View>

        <View style={styles.subCont}>
          <TravelReqInput
            label={'Travellers'}
            value={`${filterValue.travellerDetails.adults} Adults${
              filterValue.travellerDetails.children > 0
                ? ', ' + filterValue.travellerDetails.children + ' Children'
                : ''
            }`}
            onPress={() => handleBSOpen('travellerDetails')}
            inputStyle={{flex: 0.6}}
          />
          <TravelReqInput
            label={'Cabin Class'}
            value={filterValue.travellerDetails.class}
            onPress={() => handleBSOpen('travellerDetails')}
            inputStyle={{flex: 0.35}}
          />
        </View>

        <Button onPress={searchFlightHandler}>
          <Text style={styles.btnText}>Search Flights</Text>
        </Button>
      </View>

      <BottomSheet
        snapPoints={snapPoints}
        index={-1}
        ref={bottomSheetRef}
        enablePanDownToClose>
        <View style={{flex: 1}}>
          {type === 'from' && (
            <PlacePicker
              data={flightData}
              type={'from'}
              onPressHandler={onInputPressHandler}
            />
          )}
          {type === 'to' && (
            <PlacePicker
              data={flightData}
              type={'to'}
              onPressHandler={onInputPressHandler}
            />
          )}
          {type === 'departDate' && (
            <DatePicker onPressHandler={onInputPressHandler} />
          )}
          {type === 'returnDate' && (
            <DatePicker onPressHandler={onInputPressHandler} />
          )}
          {type === 'travellerDetails' && (
            <TravellerPicker onPressHandler={onInputPressHandler} />
          )}
        </View>
      </BottomSheet>
    </View>
  );
};

export default TravelRequestScreen;
