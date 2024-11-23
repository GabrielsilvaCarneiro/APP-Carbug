import React, { useState } from 'react';
import { View, Text, Image, user, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert, Dimensions, StatusBar, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Picker } from '@react-native-picker/picker';
import { TouchableWithoutFeedback } from 'react-native';


const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showContainer, setShowContainer] = useState(false);
  const navigation = useNavigation();

  const [selectedCar, setSelectedCar] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [problemDescription, setProblemDescription] = useState('');


  const UserScreen = () => {
    navigation.navigate('user');
  };

  const TutorialCard = ({ image, title, page }) => {
    const navigation = useNavigation();

    return (
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate(page)}>
        <Image source={image} style={styles.cardImage} />
        <View style={styles.textContainer}>
          <Text style={styles.cardTitle}>{title}</Text>
          <View style={styles.bottomRow}>
            <View style={styles.line} />
            <TouchableOpacity style={styles.viewButton} onPress={() => navigation.navigate(page)}>
              <Text style={styles.viewButtonText}>VER</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const handleSearch = () => {
    if (searchQuery) {
      navigation.navigate('SearchResults', { query: searchQuery });
    } else {
      Alert.alert('Por favor, insira um termo para pesquisa');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#242b4b" />

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.menuAndTitle}>
            <Text style={styles.headerTitle}>CARBUG</Text>
          </View>
          <TextInput
            style={styles.searchInput}
            placeholder="Procure o seu problema"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity onPress={UserScreen}>
            <View style={styles.profileContainer}>
              <Text style={styles.greeting}>Olá, {user ? user.fullName : 'Visitante'}</Text>
              <Icon name="account-circle" size={width * 0.08} color="#fff" />
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Seção de Tutoriais */}
      <View style={styles.sectionOne}>
        <Text style={styles.sectionTitle}>Tutoriais de problemas "Diários"</Text>
        <Text style={styles.sectionSubtitle}>Problemas que você possa ter no dia a dia</Text>
        <View style={styles.cardContainer}>
          <TutorialCard
            image={require('@/assets/images/Pneu.png')}
            title="Trocar o Pneu"
            page="PNEU"
          />
          <TutorialCard
            image={require('@/assets/images/Parabrisa.png')}
            title="Parabrisa Embaçado"
            page="PARABRISA"
          />
        </View>
      </View>

      <View style={styles.sectionTwo}>
        <Text style={styles.sectionTitle}>Tutoriais de problemas mecânicos</Text>
        <Text style={styles.sectionSubtitle}>Problemas em peças específicas</Text>
        <View style={styles.cardContainer}>
          <TutorialCard
            image={require('@/assets/images/Velas.png')}
            title="Como Trocar Velas"
            page="TROCA DE VELAS"
          />
          <TutorialCard
            image={require('@/assets/images/Filtros.png')}
            title="Trocar Filtro de Ar"
            page="TROCA DE FILTRO"
          />
        </View>
      </View>


      {/* Banner no Footer */}
      <View style={styles.footerBanner}>
        <TouchableOpacity onPress={() => setShowContainer(true)}>
          <Image source={require('@/assets/images/banner.png')} style={styles.bannerImage} />
        </TouchableOpacity>
      </View>
      {/* Container ao clicar no Banner */}
      {showContainer && (
        <TouchableWithoutFeedback onPress={() => setShowContainer(true)}>


          {/* Todo o conteúdo da tela */}
          {showContainer && (
            <View style={styles.popupContainer}>
              <TouchableOpacity style={styles.closeButton} onPress={() => setShowContainer(false)}>
                <Icon name="close" size={24} color="#000" />
              </TouchableOpacity>

              <Text style={styles.popupTitle}>Selecione o carro</Text>
              <Picker
                selectedValue={selectedCar}
                style={styles.picker}
                onValueChange={(itemValue) => setSelectedCar(itemValue)}
              >
                <Picker.Item label="Escolha o carro" value="" />
                <Picker.Item label="Chevrolet Onix-Rs" value="carro_a" />
                <Picker.Item label="Volkswagen T-Cross" value="carro_b" />
                <Picker.Item label="Fiat Pulse" value="carro_c" />
                <Picker.Item label="Chevrolet Prisma" value="carro_d" />
                <Picker.Item label="Volkswagen Nivus" value="carro_e" />
                <Picker.Item label="Hyundai HB20" value="carro_f" />
                <Picker.Item label="Kia Sportage" value="carro_g" />
                <Picker.Item label="Honda Civic" value="carro_h" />
                <Picker.Item label="Toyota Corrola" value="carro_i" />
                <Picker.Item label="Hyundai Tucson" value="carro_j" />
                <Picker.Item label="Fiat Mobi" value="carro_k" />
                <Picker.Item label="Nissan Kicks" value="carro_l" />
              </Picker>

              <Text style={styles.popupTitle}>Modelo/ano</Text>
              <Picker
                selectedValue={selectedModel}
                style={styles.picker}
                onValueChange={(itemValue) => setSelectedModel(itemValue)}
              >
                <Picker.Item label="Escolha o modelo/ano" value="" />
                <Picker.Item label="Modelo 2018/2019" value="2018" />
                <Picker.Item label="Modelo 2019/2020" value="2019" />
                <Picker.Item label="Modelo 2020/2021" value="2020" />
                <Picker.Item label="Modelo 2022/2023" value="2022" />
                <Picker.Item label="Modelo 2023/2024" value="2023" />
              </Picker>

              <Text style={styles.popupTitle}>Qual o seu problema?</Text>
              <TextInput
                style={styles.popupInput}
                placeholder="Informe o que está acontecendo!"
                value={problemDescription}
                onChangeText={setProblemDescription}
              />

              <TouchableOpacity
                style={styles.searchButton}
                onPress={() => {
                  if (!selectedCar || !selectedModel) {
                    Alert.alert('Preencha todas as informações antes de continuar.');
                    return;
                  }

                  // Define a página de destino com base no carro selecionado
                  let destinationPage;
                  switch (selectedCar) {
                    case 'carro_a':
                      destinationPage = 'Onix';
                      break;
                    case 'carro_b':
                      destinationPage = 'Tcross';
                      break;
                    case 'carro_c':
                      destinationPage = 'Pulse';
                      break;
                    case 'carro_d':
                      destinationPage = 'Prisma';
                      break;
                    case 'carro_e':
                      destinationPage = 'Nivus';
                      break;
                    case 'carro_f':
                      destinationPage = 'HB20';
                      break;
                    case 'carro_g':
                      destinationPage = 'Sportage';
                      break;
                    case 'carro_h':
                      destinationPage = 'Civic';
                      break;
                    case 'carro_i':
                      destinationPage = 'Corolla';
                      break;
                    case 'carro_j':
                      destinationPage = 'Tucson';
                      break;
                    case 'carro_k':
                      destinationPage = 'Mobi';
                      break;
                    case 'carro_l':
                      destinationPage = 'Kicks';
                      break;
                    default:
                      Alert.alert('Carro não reconhecido.');
                      return;
                  }

                  // Redireciona para a página correspondente
                  navigation.navigate(destinationPage, { selectedCar, selectedModel, problemDescription });
                }}
              >
                <Text style={styles.searchButtonText}>PESQUISAR</Text>
              </TouchableOpacity>

            </View>

          )}
        </TouchableWithoutFeedback>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF4E5',
  },
  header: {
    backgroundColor: '#242b4b',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 135,
    paddingTop: StatusBar.currentHeight || 0,
  },
  menuAndTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: width * 0.05,
    fontWeight: 'bold',
    marginLeft: width * 0.040,
    top: -21,
  },
  searchInput: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    width: '90%',
    height: 40,
    position: 'absolute',
    top: '75%',
    left: '8%',
    textAlign: 'center',
    top: 80,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    top: -21,
    marginRight: 3,
  },
  greeting: {
    color: '#fff',
    marginRight: width * 0.02,
  },
  sectionOne: {
    padding: 20,

  },
  sectionTwo: {
    padding: 20,
    marginTop: 25,

  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#f48020',
  },
  sectionSubtitle: {
    fontSize: 14,
    marginBottom: 12,
    color: '#666',
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    height: 155,
  },
  cardImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  textContainer: {
    paddingHorizontal: 10,
    width: '100%',
  },
  cardTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 4,
    top: 2,
    right: 4,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewButton: {
    backgroundColor: '#222A43',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
    left: 10,
    top: -22,
  },
  viewButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#222A43',
  },
  bannerImage: {
    width: '100%',
    resizeMode: 'stretch',
    top: 15,
    height: 115,
  },

  popupContainer: {
    position: 'absolute',
    top: '35%',
    left: '-1%',
    right: '-1%',
    backgroundColor: '#FFF4E5',
    borderRadius: 25,
    padding: 35,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    height: 550,
    borderColor: '#000',
    borderWidth: 3,

  },
  closeButton: {
    position: 'absolute',
    top: 25,
    right: 20,
  },
  popupTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 30,
  },
  popupInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginVertical: 10,
    paddingVertical: 5,
    fontSize: 16,
  },
  searchButton: {
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 50,
    height: 45,
    color: '#fff',
    backgroundColor: '#242b4b',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 10,

  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
