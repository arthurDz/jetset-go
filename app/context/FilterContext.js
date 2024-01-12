import moment from 'moment';
import React, {createContext, useContext, useState} from 'react';

const FilterContext = createContext();

export const FilterProvider = ({children}) => {
  const [filterValue, setFilterValue] = useState({
    to: {
      cityCode: '',
      cityName: '',
    },
    from: {
      cityCode: '',
      cityName: '',
    },
    departDate: moment().format('ddd, DD MMM YY'),
    returnDate: '',
    travellerDetails: {
      adults: 1,
      children: 0,
      class: 'Economy',
    },
  });

  const setFilter = value => {
    setFilterValue(value);
  };

  return (
    <FilterContext.Provider value={{filterValue, setFilterValue: setFilter}}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};
