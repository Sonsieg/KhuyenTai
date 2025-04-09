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

  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);
  const prevTranslationX = useSharedValue(0);
  const prevTranslationY = useSharedValue(0);
  const rotation = useSharedValue(0); // SharedValue cho góc xoay
  const prevRotation = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {translateX: translationX.value},
      {translateY: translationY.value},
      {rotate: `${rotation.value}rad`}, // Thêm thuộc tính rotate
    ],
  }));

  const pan = Gesture.Pan()
    .minDistance(1)
    .onStart(() => {
      prevTranslationX.value = translationX.value;
      prevTranslationY.value = translationY.value;
    })
    .onUpdate(event => {
      const maxTranslateX = width / 2 - 50;
      const maxTranslateY = height / 2 - 50;

      translationX.value = clamp(
        prevTranslationX.value + event.translationX,
        -maxTranslateX,
        maxTranslateX,
      );
      translationY.value = clamp(
        prevTranslationY.value + event.translationY,
        -maxTranslateY,
        maxTranslateY,
      );
    })
    .runOnJS(true);

  const rotate = Gesture.Rotation()
    .onStart(() => {
      prevRotation.value = rotation.value;
    })
    .onUpdate(event => {
      rotation.value = prevRotation.value + event.rotation;
    })
    .runOnJS(true);

  const combinedGesture = Gesture.Simultaneous(pan, rotate);

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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.mainContent}>
          <View style={styles.dishesContainer}>
            <View style={{width: '100%', alignItems: 'flex-end'}}>
              <TouchableOpacity
                style={{padding: 4, backgroundColor: Colors.GREEN}}
                onPress={() => {
                  setModalVisible(true);
                }}>
                <Text style={{color: 'black'}}>Chọn ảnh</Text>
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

              {/* 🔥 Hình có thể kéo và xoay */}
              <GestureDetector gesture={combinedGesture}>
                <Animated.View
                  style={[
                    animatedStyles,
                    styles.box,
                    {
                      position: 'absolute',
                      zIndex: 100,
                    },
                  ]}>
                  <Image source={Images.ITEM1} style={styles.thumbnail} />
                </Animated.View>
              </GestureDetector>
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
    height: 120,
    width: 120,
    backgroundColor: 'transparent',
    borderRadius: 20,
    marginBottom: 30,
  },
});

export default DashboardScreen;
