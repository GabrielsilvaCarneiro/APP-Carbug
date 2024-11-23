import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, StatusBar, Image, KeyboardAvoidingView, Platform, ScrollView, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const BemVindoScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [modalWidth, setModalWidth] = useState('85%'); // Largura padrão do modal


  // Estado do modal de erro
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState({ title: '', message: '' });

  // Estado do modal de sucesso
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState({ title: '', message: '' });

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const confirmPass = (password) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(password);
  };

  const handleRegister = () => {
    // Verifica se o email é válido
    if (!validateEmail(email)) {
      setErrorMessage({ title: 'Email inválido!', message: 'Por favor, insira um email válido.' });
      setErrorModalVisible(true);
      return;
    }

    // Verifica se as senhas coincidem
    if (!confirmPass(password)) {
      setModalWidth('95%');
      setErrorMessage({ title: 'Confirme as suas Senhas!', message: 'insira uma senha, elas não coincidem.' });
      setErrorModalVisible(true);
      return;
    }

    // Mostra mensagem de sucesso e navega após o fechamento do modal
    setSuccessMessage({ title: 'Cadastro bem-sucedido!', message: 'Seja Bem-vindo(a)!' });
    setSuccessModalVisible(true);
    setModalWidth('95%');
  };

  const goTogoogle = () => {
    // Mostra mensagem de sucesso e navega após o fechamento do modal
    setSuccessMessage({ title: 'Google Login', message: 'Você foi cadastrado com o Google.' });
    setSuccessModalVisible(true);
    setModalWidth('95%');
  };

  const closeErrorModal = () => {
    setErrorModalVisible(false);
  };

  const closeSuccessModal = () => {
    setSuccessModalVisible(false);
    navigation.navigate('index'); // Navega para a próxima tela após o sucesso
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="light-content" backgroundColor="#242b4b" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.circle}>
          <Image source={require('@/assets/images/user2.png')} style={styles.avatar} />
          <Text style={styles.nome}>Crie a sua conta</Text>
        </View>
        <View style={styles.loginContainer}>
          <Text style={styles.title}>Pronto para explorar?</Text>
          <Text style={styles.subtitle}>Crie uma conta para uma melhor experiência</Text>
          <TextInput
            style={styles.input}
            placeholder="Cadastre um email:"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail}
          />
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.inputPassword}
              placeholder="Cadastre a sua senha:"
              placeholderTextColor="#aaa"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Text style={styles.togglePassword}>{showPassword ? 'Ocultar' : 'Mostrar'}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.inputPassword}
              placeholder="Confirme a sua senha:"
              placeholderTextColor="#aaa"
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <Text style={styles.togglePassword}>{showConfirmPassword ? 'Ocultar' : 'Mostrar'}</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Registrar-se</Text>
          </TouchableOpacity>
          <Text style={styles.orText}>OU</Text>
          <TouchableOpacity style={styles.googleButton} onPress={goTogoogle}>
            <Image source={require('@/assets/images/google-icon.png')} style={styles.googleIcon} />
            <Text style={styles.googleButtonText}>Continue com o Google</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('LOGIN')}>
            <Text style={styles.registerText}>Já possui uma conta? <Text style={styles.registerLink}>Entrar</Text></Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modal de Erro */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={errorModalVisible}
        onRequestClose={closeErrorModal}
      >
        <View style={styles.centeredView}>
          <View style={[styles.modalView, { width: modalWidth }]}>
            <View style={styles.iconContainer}>
              <Icon name="error" size={28} color="#F00" />
            </View>
            <View>
              <Text style={styles.modalTextTitle}>{errorMessage.title}</Text>
              <Text style={styles.modalTextDesc}>{errorMessage.message}</Text>
            </View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={closeErrorModal}
            >
              <Icon name="close" size={22} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal de Sucesso */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={successModalVisible}
        onRequestClose={closeSuccessModal}
      >
        <View style={styles.centeredView}>
          <View style={[styles.modalView, { width: modalWidth }]}>
            <View style={styles.iconContainer}>
              <Icon name="check" size={28} color="#190" />
            </View>
            <View>
              <Text style={styles.modalTextTitle}>{successMessage.title}</Text>
              <Text style={styles.modalTextDesc}>{successMessage.message}</Text>
            </View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={closeSuccessModal}
            >
              <Icon name="close" size={22} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </KeyboardAvoidingView>
  );
};

export default BemVindoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    position: 'absolute',
    top: -265,
    width: 450,
    height: 450,
    borderRadius: 245,
    backgroundColor: '#242b4b',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
  },
  avatar: {
    width: 100,
    height: 100,
    marginBottom: 10,
    marginTop: 245,
  },
  nome: {
    fontSize: 18,
    color: '#fff',

  },
  loginContainer: {
    width: '80%',
    alignItems: 'center',
    marginTop: 100,
  },
  title: {
    fontSize: 24,
    marginVertical: 70,
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    marginBottom: 25,
    paddingHorizontal: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    marginBottom: 25,
  },
  inputPassword: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  togglePassword: {
    padding: 10,
    color: '#222A43',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#242b4b',
    paddingVertical: 8,
    paddingHorizontal: 25,
    borderRadius: 5,
    marginTop: 15,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  orText: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
    marginVertical: 15,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  googleIcon: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  googleButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
  },
  registerText: {
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
    marginTop: 15,
  },
  registerLink: {
    color: '#242b4b',
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: '#232531',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',   // Centraliza o modal horizontalmente
    maxWidth: '90%',       // Limita a largura máxima a 90% da tela
    minWidth: '80%',       // Define um limite mínimo de largura
    flexShrink: 1,         // Permite que o modal encolha se necessário
  },
  modalTextTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalTextDesc: {
    color: '#7e7e7e',
    fontSize: 14,
  },
  iconContainer: {
    padding: 3,
    borderRadius: 5,
  },
  closeButton: {
    padding: 5,
    borderRadius: 5,
  },
});


