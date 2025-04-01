import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const CameraScreen = () => {
  const [imageUri, setImageUri] = useState(null);

  // Mở camera để chụp ảnh
  const openCamera = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      saveToPhotos: true,
    };

    launchCamera(options, response => {
      console.log('Camera response:', response); // In ra chi tiết response để kiểm tra

      // Kiểm tra response trước khi lấy uri
      if (
        response &&
        !response.didCancel &&
        !response.errorCode &&
        response.assets &&
        response.assets.length > 0
      ) {
        setImageUri(response.assets[0].uri);
      } else {
        console.error('Camera error or no assets:', response.errorCode);
      }
    });
  };

  // Mở thư viện ảnh
  const openGallery = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };
    launchImageLibrary(options, response => {
      if (!response.didCancel && !response.error) {
        setImageUri(response?.assets[0].uri);
      }
    });
  };

  return (
    <View style={styles.container}>
      {imageUri ? (
        <Image source={{uri: imageUri}} style={styles.image} />
      ) : (
        <Text>Chưa có ảnh</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={openCamera}>
        <Text style={styles.buttonText}>Chụp ảnh</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={openGallery}>
        <Text style={styles.buttonText}>Chọn ảnh từ thư viện</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {justifyContent: 'center', alignItems: 'center'},
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
  },
  buttonText: {color: '#fff', fontSize: 16},
  image: {width: 200, height: 200, borderRadius: 10, marginTop: 20},
});

export default CameraScreen;
