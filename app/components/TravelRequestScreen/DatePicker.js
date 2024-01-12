import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {CalendarList} from 'react-native-calendars';
import moment from 'moment';
import {FlatList} from 'react-native-gesture-handler';

const DatePicker = ({onPressHandler}) => {
  return (
    <CalendarList
      onVisibleMonthsChange={months => {
        console.log('now these months are visible', months);
      }}
      scrollEnabled={true}
      showScrollIndicator={true}
      customComponent={FlatList}
      onDayPress={day =>
        onPressHandler(moment(day?.dateString).format('ddd, DD MMM YY'))
      }
      // minDate={moment().format('YYYY-MM-DD')}
    />
  );
};

export default DatePicker;

const styles = StyleSheet.create({});
