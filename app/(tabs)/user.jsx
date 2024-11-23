import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, StatusBar, SafeAreaView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native'; // Importando useNavigation

// Obter as dimensões da tela
const { width, height } = Dimensions.get('window');

const MenuScreen = () => {
  const navigation = useNavigation(); // Hook para navegação

  const handleLogout = () => {
    Alert.alert(
      "Confirmação",
      "Você realmente deseja sair da conta?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Sim", onPress: () => navigation.navigate('LOGIN') } // Redireciona para login.jsx
      ]
    );
  };

  const ScanScreen = () => {
    navigation.navigate('scanner');
  };


  return (
    <SafeAreaView style={styles.container}>
      {/* StatusBar */}
      <StatusBar barStyle="light-content" backgroundColor="#242b4b" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.menuAndTitle}>
          <Text style={styles.headerTitle}>CARBUG</Text>
        </View>
        <View style={styles.profileContainer}>
          <Text style={styles.greeting}>Olá, Visitante</Text>
          <Icon name="account-circle" size={width * 0.08} color="#fff" />
        </View>
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.logoutContainer}>
          <View style={styles.profileDetails}>
            <Icon name="account-circle" size={height * 0.09} color="#3e3e3e" />
            <Text style={styles.profileName}>Visitante</Text>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Icon name="logout" size={width * 0.06} color="#3e3e3e" />
            <Text style={styles.logoutText}>Entrar na conta</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Menu Options */}
      <View style={styles.menuOptions}>
        <TouchableOpacity style={styles.menuItem}>
          <Icon name="shopping-cart" size={width * 0.07} color="#000" />
          <View style={styles.menuText}>
            <Text style={styles.menuTitle}>Histórico de Manutenção</Text>
            <Text style={styles.menuSubtitle}>Aqui você pode ver seu histórico</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={ScanScreen} >
          <Icon name="qr-code-scanner" size={width * 0.07} color="#000" />
          <View style={styles.menuText}>
            <Text style={styles.menuTitle}>Scaner</Text>
            <Text style={styles.menuSubtitle}>Aqui você pode acessar o scaner</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Icon name="payment" size={width * 0.07} color="#000" />
          <View style={styles.menuText}>
            <Text style={styles.menuTitle}>Formas de pagamento</Text>
            <Text style={styles.menuSubtitle}>Aqui você pode alterar as formas de pagamento</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Icon name="book" size={width * 0.07} color="#000" />
          <View style={styles.menuText}>
            <Text style={styles.menuTitle}>Termos e condições</Text>
            <Text style={styles.menuSubtitle}>Aqui você pode visualizar os termos e condições</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF4E5',
  },
  header: {
    backgroundColor: '#242b4b',
    paddingVertical: height * 0.04,
    paddingHorizontal: width * 0.05,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    top: 10,
    marginLeft: width * 0.03, // Espaço entre o menu e o título
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    top: 10,
  },
  greeting: {
    color: '#fff',
    marginRight: width * 0.02,
  },
  profileSection: {
    backgroundColor: '#F8F2ED',
    padding: height * 0.03,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  profileDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.01, // Espaço à esquerda e direita do container
  },
  profileName: {
    fontSize: width * 0.045,
    marginLeft: width * 0.02, // Ajustado o espaçamento entre o ícone e o nome
  },
  logoutButton: {
    flexDirection: 'column', // Alinhando ícone e texto em coluna
    alignItems: 'center',
  },
  logoutText: {
    marginTop: height * 0.005, // Espaço entre o ícone e o texto
    color: '#3e3e3e',
  },
  menuOptions: {
    flex: 1,
    marginTop: height * 0.02,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.04,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    alignItems: 'center',
  },
  menuText: {
    marginLeft: width * 0.04,
  },
  menuTitle: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },
  menuSubtitle: {
    color: '#7e7e7e',
    fontSize: width * 0.035,
  },
});

export default MenuScreen;
