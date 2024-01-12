import React from 'react';
import LottieView from 'lottie-react-native';

const EmptyViewAnimation = ({style}) => {
  return (
    <LottieView
      source={require(`../../../assets/animations/noDataAnimation.json`)}
      autoPlay
      loop
      style={style}
      resizeMode="cover"
    />
  );
};

export default EmptyViewAnimation;
