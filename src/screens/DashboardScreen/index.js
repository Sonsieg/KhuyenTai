import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  Image,
  Dimensions,
} from 'react-native';
import Colors from '../../assets/Colors';
import HomeScreen from '../HomeScreen';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  Gesture,
  GestureDetector,
  PanGesture,
  RotationGesture, // Import RotationGesture
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Images from '../../assets/Images';

const IMAGE_SIZE = 70;
function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}

const {width, height} = Dimensions.get('screen');

const DashboardScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const numberOfItems = 4;
  const initialLeftOffset = 20;
  const verticalSpacing = 20;
  const itemSize = 80;

  const itemStates = Array.from({length: numberOfItems}, (_, index) => ({
    translationX: useSharedValue(initialLeftOffset),
    translationY: useSharedValue(
      verticalSpacing + index * (itemSize + verticalSpacing),
    ),
    prevTranslationX: useSharedValue(initialLeftOffset),
    prevTranslationY: useSharedValue(
      verticalSpacing + index * (itemSize + verticalSpacing),
    ),
    rotation: useSharedValue(0),
    prevRotation: useSharedValue(0),
    scale: useSharedValue(1), // Thêm giá trị scale
    prevScale: useSharedValue(1), // Thêm giá trị prevScale
  }));

  // Cập nhật animated style để áp dụng scale
  const getItemAnimatedStyle = index => {
    return useAnimatedStyle(() => ({
      transform: [
        {translateX: itemStates[index].translationX.value},
        {translateY: itemStates[index].translationY.value},
        {scale: itemStates[index].scale.value}, // Thêm scale transformation
        {rotate: `${itemStates[index].rotation.value}rad`},
      ],
    }));
  };

  // Cập nhật createGestureHandler để thêm gesture pinch
  const createGestureHandler = index => {
    const pan = Gesture.Pan()
      .minDistance(1)
      .onStart(() => {
        itemStates[index].prevTranslationX.value =
          itemStates[index].translationX.value;
        itemStates[index].prevTranslationY.value =
          itemStates[index].translationY.value;
      })
      .onUpdate(event => {
        // Điều chỉnh giới hạn kéo theo chiều ngang
        const maxTranslateX = width - itemSize; // Cho phép kéo đến tận cùng màn hình
        const minTranslateX = -initialLeftOffset; // Cho phép kéo về bên trái đến giới hạn

        itemStates[index].translationX.value = clamp(
          itemStates[index].prevTranslationX.value + event.translationX,
          minTranslateX,
          maxTranslateX,
        );

        // Điều chỉnh giới hạn kéo theo chiều dọc
        const maxTranslateY = height - itemSize - verticalSpacing;
        const minTranslateY = -verticalSpacing;

        itemStates[index].translationY.value = clamp(
          itemStates[index].prevTranslationY.value + event.translationY,
          minTranslateY,
          maxTranslateY,
        );
      })
      .runOnJS(true);

    const rotate = Gesture.Rotation()
      .onStart(() => {
        itemStates[index].prevRotation.value = itemStates[index].rotation.value;
      })
      .onUpdate(event => {
        itemStates[index].rotation.value =
          itemStates[index].prevRotation.value + event.rotation;
      })
      .runOnJS(true);

    // Thêm gesture pinch để zoom
    const pinch = Gesture.Pinch()
      .onStart(() => {
        itemStates[index].prevScale.value = itemStates[index].scale.value;
      })
      .onUpdate(event => {
        // Giới hạn scale từ 0.5 đến 3
        itemStates[index].scale.value = clamp(
          itemStates[index].prevScale.value * event.scale,
          0.5,
          3,
        );
      })
      .runOnJS(true);

    return Gesture.Simultaneous(pan, rotate, pinch);
  };

  const openCamera = () => {
    setModalVisible(false);
    launchCamera(
      {mediaType: 'photo', quality: 1, saveToPhotos: true},
      response => {
        if (response?.assets?.length > 0) {
          setImageUri({uri: response.assets[0].uri});
        }
      },
    );
  };

  const openGallery = () => {
    setModalVisible(false);
    launchImageLibrary({mediaType: 'photo', quality: 1}, response => {
      if (response?.assets?.length > 0) {
        setImageUri({uri: response.assets[0].uri});
      }
    });
  };

  const itemImages = [Images.ITEM1, Images.ITEM2, Images.ITEM3, Images.ITEM4];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.mainContent}>
          <View style={styles.dishesContainer}>
            <View style={{width: '100%', alignItems: 'flex-end'}}>
              <TouchableOpacity
                style={{
                  padding: 6,
                  backgroundColor: Colors.GREEN,
                  borderRadius: 4,
                }}
                onPress={() => {
                  setModalVisible(true);
                }}>
                <Text style={{color: 'white'}}>Chọn ảnh</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.addDishBox}>
              {imageUri ? (
                <Image
                  source={imageUri}
                  style={{width: '100%', height: '100%'}}
                />
              ) : (
                <Text style={styles.addDishText}></Text>
              )}

              {/* 🔥 Các hình có thể kéo và xoay */}
              {itemImages.map((image, index) => (
                <GestureDetector
                  key={index}
                  gesture={createGestureHandler(index)}>
                  <Animated.View
                    style={[
                      getItemAnimatedStyle(index),
                      styles.box,
                      {
                        position: 'absolute',
                        zIndex: 100 + index,
                        width: itemSize,
                        height: itemSize,
                        top: 0,
                        left: 0,
                      },
                    ]}>
                    <Image
                      source={image}
                      style={styles.thumbnail}
                      resizeMode="contain"
                    />
                  </Animated.View>
                </GestureDetector>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.sidebar}>
          <HomeScreen />
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalBackground}>
          <View style={styles.modalBox}>
            <TouchableOpacity onPress={openCamera}>
              <Text style={styles.modalText}>Chụp ảnh</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity onPress={openGallery}>
              <Text style={styles.modalText}>Chọn ảnh từ thư viện</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    padding: 16,
    height: '98%',
  },
  content: {
    flexDirection: 'row',
    borderRadius: 8,
    height: '85%',
  },
  mainContent: {
    flex: 0.7,
    padding: 16,
    backgroundColor: '#ffffff',
    height: '80%',
  },
  dishesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addDishBox: {
    width: '99%',
    borderWidth: 1,
    borderColor: '#e07a5f',
    borderStyle: 'dashed',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    margin: '2.5%',
    height: '90%',
    overflow: 'hidden',
  },
  addDishText: {
    marginTop: 8,
    color: '#e07a5f',
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 16,
  },
  sidebar: {
    flex: 0.3,
    backgroundColor: Colors.WHITE,
    height: '80%',
  },
  draggableImage: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  modalBackground: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    height: '100%',
  },
  modalBox: {
    width: 200,
    padding: 20,
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
  },
  modalText: {
    padding: 10,
    color: Colors.BLACK,
  },
  box: {
    backgroundColor: 'transparent',
    borderRadius: 20,
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DashboardScreen;
