import React, {useRef, useEffect, useState} from 'react';
import {View, Image, StyleSheet, Dimensions} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Images from '../../assets/Images';

const {width} = Dimensions.get('window');
const images = [Images.CAROUSEL_1, Images.CAROUSEL_2];

const ImageCarousel = () => {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % images.length;
      setCurrentIndex(nextIndex);
      carouselRef.current?.snapToItem(nextIndex);
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const renderItem = ({item}) => (
    <Image
      source={item}
      style={styles.image}
      onError={e => console.log('Image Load Error:', e.nativeEvent.error)}
    />
  );

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        data={images}
        renderItem={renderItem}
        sliderWidth={width}
        itemWidth={width}
        loop
        autoplay
        autoplayInterval={3000}
        onSnapToItem={index => setCurrentIndex(index)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 300,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
});

export default ImageCarousel;
