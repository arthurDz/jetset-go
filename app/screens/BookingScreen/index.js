import {View, Text} from 'react-native';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import styles from './styles';
import {useFilter} from '../../context/FilterContext';
import {COLORS, SIZES, horizontalScale} from '../../utils/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../../components/common/Button';
import RadioButtonGroup from '../../components/common/RadioButtonGroup';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const BookingScreen = () => {
  const navigation = useNavigation();

  const {filterValue} = useFilter();
  const snapPoints = useMemo(() => ['50%'], []);
  const bottomSheetRef = useRef(null);

  const handleBSOpen = type => {
    setPassengerType(type);
    bottomSheetRef.current?.expand();
  };
  const handleBSClose = () => bottomSheetRef.current?.close();

  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    [],
  );

  const [passengerDetails, setPassengerDetails] = useState({
    adults: [],
    children: [],
  });
  const [passengerType, setPassengerType] = useState('adult');

  const [passenger, setPassenger] = useState({
    gender: 'Male',
    firstName: '',
    lastName: '',
  });

  const addPassengerHandler = () => {
    if (passengerType === 'adult') {
      setPassengerDetails(prevPassengerDetails => {
        return {
          ...prevPassengerDetails,
          adults: [...prevPassengerDetails.adults, passenger],
        };
      });
    } else {
      setPassengerDetails(prevPassengerDetails => {
        return {
          ...prevPassengerDetails,
          children: [...prevPassengerDetails.children, passenger],
        };
      });
    }
    handleBSClose();
    setPassenger({gender: 'Male', firstName: '', lastName: ''});
  };

  const handleBookTicket = () => {
    if (
      passengerDetails.adults.length !== filterValue.travellerDetails.adults ||
      passengerDetails.children.length !== filterValue.travellerDetails.children
    ) {
      Toast.show({
        type: 'error',
        text1: 'Please add all passengers',
      });
      return;
    }
    Toast.show({
      type: 'success',
      text1: 'Ticket booked successfully!',
    });
    navigation.reset({index: 0, routes: [{name: 'TravelRequestScreen'}]});
  };

  return (
    <View style={styles.container}>
      <View style={{alignSelf: 'center'}}>
        <Text style={styles.headerSubTxt}>Trip to</Text>
        <Text
          style={[
            styles.headerTxt,
            {color: COLORS.white, fontSize: SIZES.xLarge},
          ]}>
          {filterValue.to.cityName}
        </Text>
      </View>
      <View style={styles.travellerCont}>
        <Text style={styles.headerTxt}>Traveller Details</Text>

        <View>
          <View style={styles.travellerRow}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Ionicons
                name="person-circle"
                color={COLORS.secondary}
                size={SIZES.large}
              />
              <Text style={styles.mainTxt}>ADULT(12 yrs+)</Text>
            </View>
            <Text style={styles.subTxt}>
              {`${passengerDetails.adults.length}/${filterValue.travellerDetails.adults}`}
            </Text>
          </View>
          {passengerDetails.adults.length > 0 &&
            passengerDetails.adults.map((p, i) => (
              <Text
                key={i}
                style={
                  styles.addedPassenger
                }>{`${p.firstName} ${p.lastName}`}</Text>
            ))}
          {passengerDetails.adults.length !==
            filterValue.travellerDetails.adults && (
            <Button
              btnStyle={styles.addPassengerBtn}
              onPress={() => handleBSOpen('adult')}>
              <Text style={styles.addPassengerBtnTxt}>+ ADD NEW ADULT</Text>
            </Button>
          )}
        </View>
        {filterValue.travellerDetails.adults > 0 ? (
          <View>
            <View style={styles.travellerRow}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <MaterialCommunityIcons
                  name="account-child-circle"
                  color={COLORS.secondary}
                  size={SIZES.large}
                />
                <Text style={styles.mainTxt}>CHILDREN(2-12 yrs)</Text>
              </View>
              <Text style={styles.subTxt}>
                {`${passengerDetails.children.length}/${filterValue.travellerDetails.children}`}
              </Text>
            </View>
            {passengerDetails.children.length > 0 &&
              passengerDetails.children.map((p, i) => (
                <Text
                  key={i}
                  style={
                    styles.addedPassenger
                  }>{`${p.firstName} ${p.lastName}`}</Text>
              ))}
            {passengerDetails.children.length !==
              filterValue.travellerDetails.children && (
              <Button
                btnStyle={styles.addPassengerBtn}
                onPress={() => handleBSOpen('children')}>
                <Text style={styles.addPassengerBtnTxt}>+ ADD NEW CHILD</Text>
              </Button>
            )}
          </View>
        ) : null}
      </View>
      <View style={styles.travellerCont}>
        <Text style={styles.headerTxt}>Fare Breakup</Text>

        <View>
          <View style={styles.travellerRow}>
            <Text style={styles.mainTxt}>
              {`Adult(s) (${filterValue.travellerDetails.adults}X ₹ 3,180)`}
            </Text>
            <Text style={styles.subTxt}>
              {`₹ ${filterValue.travellerDetails.adults * 3180}`}
            </Text>
          </View>
        </View>
        {filterValue.travellerDetails.adults > 0 ? (
          <View>
            <View style={styles.travellerRow}>
              <Text style={styles.mainTxt}>
                {`Children (${filterValue.travellerDetails.children}X ₹ 1,180)`}
              </Text>
              <Text style={styles.subTxt}>
                {`₹ ${filterValue.travellerDetails.children * 1180}`}
              </Text>
            </View>
          </View>
        ) : null}
      </View>

      <Button onPress={handleBookTicket}>
        <Text style={styles.bookTicket}>Book Tickets</Text>
      </Button>

      <BottomSheet
        snapPoints={snapPoints}
        index={-1}
        ref={bottomSheetRef}
        backdropComponent={renderBackdrop}
        style={{paddingHorizontal: horizontalScale(10)}}
        enablePanDownToClose>
        <View style={{flex: 1}}>
          <Text style={styles.mainTxt}>Gender</Text>
          <RadioButtonGroup
            options={['Male', 'Female']}
            selectedOption={passenger.gender}
            onSelect={option => setPassenger({...passenger, gender: option})}
          />

          <BottomSheetTextInput
            value={passenger?.firstName}
            placeholder="FIRST & MIDDLE NAME"
            style={styles.nameInput}
            onChangeText={text => setPassenger({...passenger, firstName: text})}
          />
          <BottomSheetTextInput
            value={passenger?.lastName}
            placeholder="LAST NAME"
            style={styles.nameInput}
            onChangeText={text => setPassenger({...passenger, lastName: text})}
          />
          <Button btnStyle={styles.confirmBtn} onPress={addPassengerHandler}>
            <Text style={styles.bookTicket}>confirm</Text>
          </Button>
        </View>
      </BottomSheet>
    </View>
  );
};

export default BookingScreen;
