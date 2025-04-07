import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  Image,
  ScrollView,
} from 'react-native';
import Colors from '../../assets/Colors';
import HomeScreen from '../HomeScreen';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const DashboardScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [imageUri, setImageUri] = useState(null);

  // Mở camera để chụp ảnh
  const openCamera = () => {
    setModalVisible(false);
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
  const openGallery = () => {
    setModalVisible(false);

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
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.mainContent}>
          <View style={styles.dishesContainer}>
            <View
              style={{
                width: '100%',
                alignItems: 'flex-end',
              }}>
              <TouchableOpacity
                style={{padding: 4, backgroundColor: Colors.GREEN}}
                onPress={() => {
                  setModalVisible(true);
                }}>
                <Text style={{color: 'black'}}>Save Changes</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.addDishBox}>
              {imageUri ? (
                <Image
                  source={{uri: imageUri}}
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                />
              ) : (
                <Text style={styles.addDishText}>Add new dish</Text>
              )}
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Sidebar - Right Side */}
        <View style={styles.sidebar}>
          <ScrollView style={styles.sidebarScroll}>
            <HomeScreen />
          </ScrollView>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            width: '100%',
            height: '100%',
          }}>
          <View
            style={{
              width: 200,
              padding: 20,
              backgroundColor: Colors.WHITE,
              borderRadius: 10,
            }}>
            <TouchableOpacity onPress={openCamera}>
              <Text style={{padding: 10, color: Colors.BLACK}}>Chụp ảnh</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity onPress={openGallery}>
              <Text style={{padding: 10, color: Colors.BLACK}}>
                Chọn ảnh từ thư viện
              </Text>
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
    height: '100%',
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
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  saveButton: {
    backgroundColor: '#e07a5f',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    width: '23%', // ~25% minus margins
  },
  saveButtonText: {
    color: '#ffffff',
    fontWeight: '500',
  },
  sidebar: {
    flex: 0.3,
    backgroundColor: Colors.WHITE,
    height: '80%',
  },
  sidebarScroll: {
    flex: 1,
  },
  sidebarItem: {
    backgroundColor: '#fbd0c8', // Light salmon color
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#e07a5f',
  },
  sidebarItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  sidebarItemTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
    color: '#e07a5f',
  },
  sidebarItemSubtitle: {
    fontSize: 12,
    color: '#666',
    marginLeft: 26,
  },
});

export default DashboardScreen;
