import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, ImageBackground, Image } from 'react-native';
import { RNCamera } from 'react-native-camera';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useFocusEffect(
    useCallback(() => {
      navigation.getParent()?.setOptions({
        tabBarStyle: { display: 'none' }
      });
      return () => {
        navigation.getParent()?.setOptions({
          tabBarStyle: { display: 'flex' }
        });
      };
    }, [navigation])
  );

  useFocusEffect(
    useCallback(() => {
      return () => {
        setIsCameraOpen(false);
        setSelectedImage(null);
        StatusBar.setBarStyle('dark-content');
        StatusBar.setBackgroundColor('#fff');
      };
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor('#FFF4E5');
    }, [])
  );

  const openImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri); // Define a imagem selecionada
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#FFF4E5" />
      <ImageBackground source={require('@/assets/images/background-image.png')} style={styles.background}>

        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              setIsCameraOpen(false);
              setSelectedImage(null);
              navigation.navigate('index');
            }}
            style={styles.closeButton}
          >
            <Text style={styles.closeText}>X</Text>
          </TouchableOpacity>

          <Image source={require('@/assets/images/logoScan.png')} style={styles.logo} />


        </View>

        {isCameraOpen && (
          <RNCamera
            style={styles.camera}
            type={RNCamera.Constants.Type.back}
            ref={ref => setCameraRef(ref)}
          />
        )}

        {!isCameraOpen && !selectedImage && (
          <View style={styles.content}>
            <Text style={styles.instructions}>
              O Scanner só acessa as imagens e a câmera do dispositivo para encontrar resultados quando o App estiver aberto.
              A <Text style={styles.linkText}>Política de Privacidade</Text> e os <Text style={styles.linkText}>Termos de Serviço</Text> se aplicam.
            </Text>

            <TouchableOpacity
              style={styles.cameraButton}
              onPress={() => {
                setIsCameraOpen(true);
              }}
            >
              <Ionicons name="camera-outline" size={24} color="#fff" />
              <Text style={styles.cameraButtonText}>ABRIR A CÂMERA</Text>
            </TouchableOpacity>
          </View>
        )}

        {selectedImage && (
          <Image
            source={{ uri: selectedImage }}
            style={styles.selectedImage}
          />
        )}

        <View style={styles.bottomButtons}>
          <TouchableOpacity onPress={openImagePicker}>
            <Ionicons name="image-outline" size={46} color="#fff" />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF4E5',
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 45,
    backgroundColor: '#FFF4E5',
  },
  closeText: {
    fontSize: 30,
    color: '#333',
    right: 70,
  },
  logo: {
    width: 150,
    height: 70,
    resizeMode: 'contain',
  },
  menuButton: {
    left: 70,
    top: 3,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  instructions: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    paddingHorizontal: 30,
    marginBottom: 20,
    top: 30,
  },
  cameraButton: {
    backgroundColor: '#ff6600',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 50,
    width: 275,
    top: 75,
  },
  cameraButtonText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
  },
  camera: {
    width: '100%',
    height: '60%',
  },
  selectedImage: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  bottomButtons: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 50,
    top: -40,
  },
  searchIcon: {
    width: 79,
    height: 70,
    tintColor: '#fff',
    alignItems: 'center',

  },
  footerLinks: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingBottom: 20,
  },
  linkText: {
    color: '#ff6600',
    fontSize: 14,
  },
});
