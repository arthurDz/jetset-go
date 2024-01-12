import moment from 'moment';

export const filteredCities = data => {
  const uniqueSources = data
    .map(flight => ({
      cityCode: flight?.displayData?.source?.airport?.cityCode,
      cityName: flight?.displayData?.source?.airport?.cityName,
      airport: flight?.displayData?.source?.airport?.airportName,
    }))
    .filter((value, index, self) => {
      return self.findIndex(v => v.cityCode === value.cityCode) === index;
    });

  const uniqueDestinations = data
    .map(flight => ({
      cityCode: flight?.displayData?.destination?.airport?.cityCode,
      cityName: flight?.displayData?.destination?.airport?.cityName,
      airport: flight?.displayData?.destination?.airport?.airportName,
    }))
    .filter((value, index, self) => {
      return self.findIndex(v => v.cityCode === value.cityCode) === index;
    });

  return {
    from: uniqueSources,
    to: uniqueDestinations,
  };
};

export const isDateValid = (departDate, returnDate) => {
  const departMoment = moment(departDate, 'ddd, DD MMM YY');
  const returnMoment = moment(returnDate, 'ddd, DD MMM YY');

  // Check if departure date is before return date
  const isDepartureValid = departMoment.isSameOrBefore(returnMoment, 'D');
  const isReturnValid = returnMoment.isSameOrAfter(departMoment, 'D');

  return {
    isDepartureValid,
    isReturnValid,
  };
};
