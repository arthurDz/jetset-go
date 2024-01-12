import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TravelRequestScreen from '../screens/TravelRequestScreen';
import ExploreOptionsScreen from '../screens/ExploreOptionsScreen';
import {FilterProvider} from '../context/FilterContext';
import BookingScreen from '../screens/BookingScreen';

const AppRoutes = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <FilterProvider>
        <Stack.Navigator
          initialRouteName={'TravelRequestScreen'}
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen
            name="TravelRequestScreen"
            component={TravelRequestScreen}
          />
          <Stack.Screen
            name="ExploreOptionsScreen"
            component={ExploreOptionsScreen}
          />
          <Stack.Screen name="BookingScreen" component={BookingScreen} />
        </Stack.Navigator>
      </FilterProvider>
    </NavigationContainer>
  );
};

export default AppRoutes;
