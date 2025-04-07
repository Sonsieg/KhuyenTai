import React, {useRef, useEffect, useState} from 'react';
import {View, Image, StyleSheet, Dimensions} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Images from '../../assets/Images';

const {width} = Dimensions.get('window');
const images = [
  [Images.CAROUSEL_1, Images.CAROUSEL_2],
  [Images.CAROUSEL_3, Images.CAROUSEL_4],
  [Images.CAROUSEL_5, Images.CAROUSEL_6],
  [Images.CAROUSEL_7, Images.CAROUSEL_8],
];

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
    <View style={styles.imageContainer}>
      <View style={styles.imagesRow}>
        {item?.map((image, index) => (
          <Image
            key={index}
            source={image}
            style={styles.image}
            onError={e => console.log('Image Load Error:', e.nativeEvent.error)}
            resizeMode="contain"
          />
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        data={images}
        renderItem={renderItem}
        sliderWidth={width}
        itemWidth={width * 0.27} // Hiển thị khoảng 2 ảnh trên màn hình
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
        loop
        autoplay
        autoplayInterval={3000}
        onSnapToItem={index => setCurrentIndex(index)}
        containerCustomStyle={styles.carouselContainer}
        contentContainerCustomStyle={styles.carouselContent}
      />
      <View style={styles.pagination}>
        {images.map((_, i) => (
          <View
            key={i}
            style={[
              styles.paginationDot,
              currentIndex === i ? styles.paginationDotActive : null,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200, // Tăng chiều cao lên một chút
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselContainer: {},
  carouselContent: {
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },

  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    margin: 5,
  },
  paginationDotActive: {
    backgroundColor: '#e07a5f', // Sử dụng màu giống theme của bạn
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  imagesRow: {
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  image: {
    width: '60%', // Điều chỉnh tùy theo số lượng ảnh muốn hiển thị mỗi hàng
    height: '100%',
  },
});

export default ImageCarousel;
