import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import FlightCardBg from '../../../assets/images/flightCardBg.png';
import {
  COLORS,
  SIZES,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/theme';
import moment from 'moment';

const FlightCard = ({flight, onPress}) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <ImageBackground
        source={FlightCardBg}
        style={styles.card}
        imageStyle={{borderRadius: moderateScale(10)}}>
        <View style={styles.cardRow}>
          <Text style={styles.airlineName}>
            {flight.displayData.airlines[0].airlineName}
          </Text>
          <Text style={styles.fare}>
            ₹{flight.fare.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </Text>
        </View>

        <View style={styles.cardRow}>
          <View>
            <Text style={styles.label}>Depart</Text>
            <Text style={styles.time}>
              {moment(flight.displayData.source.depTime).format('hh:mm')}
            </Text>
          </View>
          <View style={styles.totalDurationCont}>
            <View style={styles.horizontalLine} />
            <View>
              <Text>{flight.displayData.totalDuration}</Text>
            </View>
            <View style={styles.horizontalLine} />
          </View>
          <View>
            <Text style={styles.label}>Arrive</Text>
            <Text style={styles.time}>
              {moment(flight.displayData.destination.arrTime).format('hh:mm')}
            </Text>
          </View>
        </View>

        <Text style={styles.stopInfo}>{flight.displayData.stopInfo}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default FlightCard;

const styles = StyleSheet.create({
  card: {
    width: horizontalScale(330),
    height: verticalScale(150),
    alignSelf: 'center',
    resizeMode: 'contain',
    marginBottom: verticalScale(20),
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(20),
    justifyContent: 'space-between',
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  airlineName: {
    color: COLORS.primary,
    fontSize: SIZES.medium,
    fontWeight: '700',
  },
  fare: {
    color: COLORS.tertiary,
    fontSize: SIZES.medium,
    fontWeight: '600',
  },
  label: {
    color: COLORS.gray2,
    fontSize: SIZES.small,
  },
  time: {
    color: COLORS.primary,
    fontSize: SIZES.large,
    fontWeight: '600',
  },
  totalDurationCont: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  horizontalLine: {
    height: 1,
    backgroundColor: COLORS.gray2,
    width: horizontalScale(35),
  },
  stopInfo: {
    textAlign: 'center',
    color: COLORS.primary,
    fontSize: SIZES.medium,
    fontWeight: '600',
  },
});
