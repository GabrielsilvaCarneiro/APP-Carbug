import React, { useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { Linking } from 'react-native';

const comments = [
  {
    id: '1',
    name: 'Bruno',
    comment: 'Depois desse video, eu mesmo farei as trocas em casa.',
    time: 'há 2h',
  },
  {
    id: '2',
    name: 'Augusto',
    comment: 'Troquei as velas do meu Cronos sem problemas.',
    time: 'há 5 Dias',
  },
  {
    id: '3',
    name: 'Julia',
    comment: 'Depois que troquei as velas a luz da injeção apagou!!',
    time: 'há 11h',
    videoUri: 'https://www.w3schools.com/html/mov_bbb.mp4',
  },
];

const videoHelp = {
  id: 'helpVideo',
  videoUri: 'https://www.w3schools.com/html/mov_bbb.mp4',
};

const App = () => {
  const navigation = useNavigation();
  const [isVideoPlaying, setIsVideoPlaying] = useState({});

  const handleVideoPress = (id) => {
    setIsVideoPlaying((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const renderItem = ({ item }) => {
    if (item.type === 'header') {
      return (
        <View>
          <View style={styles.header}></View>
          <View style={styles.separator} />
        </View>
      );
    }

    if (item.type === 'title') {
      return (
        <>
          <View style={styles.carImageWrapper}>
            <View style={styles.carImageContainer}>
              <Image style={styles.carImage} source={require('@/assets/images/VelasFR.png')} />
            </View>
          </View>
          <View style={styles.separator} />
        </>
      );
    }

    if (item.type === 'image') {
      return (
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Trocar as Velas do Carro</Text>
        </View>
      );
    }

    if (item.type === 'helpSection') {
      return (
        <>
          <View style={styles.helpSection}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.helpTitle}>Problema para identificar ou trocar as velas do carro?</Text>
              <Icon name="car" size={20} color="#000" style={styles.icontext} />
            </View>
            <Text style={styles.helpText}>
              Localize as velas: Abra o capô e identifique os cabos de vela que levam às velas de ignição, geralmente conectados na parte superior do motor.
            </Text>
            <Text style={styles.helpText}>
              Remova os cabos com cuidado: Puxe os cabos segurando pela base para evitar danos.
            </Text>
            <Text style={styles.helpText}>
              Desenrosque as velas antigas: Use uma chave especial para velas e gire no sentido anti-horário.
            </Text>
            <Text style={styles.helpText}>
              Insira as novas velas: Rosqueie as novas velas manualmente e aperte com a chave sem exagerar na força.
            </Text>
            <Text style={styles.helpText}>
              Reconecte os cabos: Coloque os cabos de volta, certificando-se de que estão bem encaixados.
            </Text>

          </View>
          <View style={styles.separator} />
        </>
      );
    }

    if (item.type === 'video') {
      return (
        <View style={styles.videoSection}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.acessVideo}>Vídeo de ajuda:</Text>
            <Icon name="video-camera" size={20} color="#000" style={styles.iconCam} />
          </View>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/watch?v=uKGM4wcMat8')} style={styles.videoPlaceholder}>
            {isVideoPlaying[videoHelp.id] ? (
              <Text style={styles.videoText}>Reproduzindo vídeo...</Text>
            ) : (
              <Icon name="play-circle" size={50} color="#fff" />
            )}
          </TouchableOpacity>
          <View style={styles.separator} />
        </View>
      );
    }

    if (item.type === 'commentsTitle') {
      return (
        <>
          <Text style={styles.commentSectionTitle}>Comentários</Text>
        </>
      );
    }

    if (item.type === 'comment') {
      return (
        <View style={styles.commentContainer}>
          <View style={styles.commentHeader}>
            <View style={styles.profileAndActions}>
              <View style={styles.profileIcon}>
                <Icon name="user" size={30} color="#000" />
              </View>
              <View style={styles.commentActions}>
                <Icon name="thumbs-up" size={16} color="#ff8800" style={styles.icon} />
                <Icon name="thumbs-down" size={16} color="#ff8800" style={styles.icon} />
              </View>
            </View>
            <View style={styles.commentBody}>
              <Text style={styles.commentName}>{item.name}</Text>
              <Text style={styles.commentText}>{item.comment}</Text>
            </View>
          </View>
          <View style={styles.commentTime}>
            <Text style={styles.timeText}>{item.time}</Text>
          </View>
          {item.videoUri && (
            <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/watch?v=uKGM4wcMat8')} style={styles.videoPlaceholderComment}>
              {isVideoPlaying[item.id] ? (
                <Text style={styles.videoText}>Reproduzindo vídeo...</Text>
              ) : (
                <Icon name="play-circle" size={30} color="#fff" />
              )}
            </TouchableOpacity>
          )}
        </View>
      );
    }
    return null;
  };

  const data = [
    { type: 'header' },
    { type: 'title' },
    { type: 'image' },
    { type: 'helpSection' },
    { type: 'video', videoUri: videoHelp.videoUri }, // Adicione a seção de vídeo de ajuda
    { type: 'commentsTitle' },
    ...comments.map(comment => ({ ...comment, type: 'comment' })),
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#242b4b" />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.contentContainer} // Define o fundo e preenche a FlatList
        ListFooterComponent={() => (
          <View style={styles.footer}>
            <TouchableOpacity style={styles.moreCommentsButton}>
              <Text style={{ color: '#fff' }} >Ver mais comentários</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF4E5',
  },
  contentContainer: {
    backgroundColor: '#FFF4E5',
  },
  menuIcon: {
    paddingRight: 15,
    marginTop: 20,
  },
  logoIcon: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
    paddingLeft: 15,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    color: '#242b4b',
    fontWeight: 'bold',
    padding: 5,
    textAlign: 'center',
    top: -10,
  },
  carImageWrapper: {
    top: 25,
  },
  carImageContainer: {
    backgroundColor: '#242b4b', // Fundo laranja
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    top: -60,
    height: 150,
  },
  carImage: {
    width: '100%', // Ajuste o tamanho conforme necessário
    height: '120%',
    resizeMode: "contain",
    top: '15%',
  },
  icontext: {
    left: 85,
  },
  iconCam: {
    left: 195,
  },
  iconMensage: {
    left: 200,
  },
  helpSection: {
    padding: 15,
  },
  helpTitle: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
    marginHorizontal: 20,
  },
  helpText: {
    marginTop: 15,
    fontSize: 16,
    color: '#000',
    marginHorizontal: 30,
  },
  videoSection: {
    padding: 15,
  },
  acessVideo: {
    marginBottom: 15,
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
    left: 30,
  },
  videoPlaceholder: {
    width: '85%',
    height: 180,
    backgroundColor: '#000',
    left: "7%",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  videoPlaceholderComment: {
    width: 320, // Reduz o tamanho da largura
    height: 130, // Reduz o tamanho da altura
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    alignSelf: 'flex-end', // Alinha à direita
    marginTop: 10, // Adiciona um espaço superior, se necessário
  },
  videoText: {
    color: '#fff',
    fontSize: 18,
  },
  commentSectionTitle: {
    left: '12%',
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
    top: 45,
  },
  commentContainer: {
    padding: 15,
    top: 55,

    borderBottomColor: '#000',
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  profileAndActions: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  profileIcon: {
    marginRight: 15,

  },
  commentActions: {
    flexDirection: 'column',
    alignItems: 'center',

  },
  icon: {
    marginVertical: 10,
  },
  commentBody: {
    flex: 1,
    marginLeft: 15,
  },
  commentName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  commentText: {
    marginTop: 5,
    fontSize: 14,
    color: '#555',
  },
  commentTime: {
    marginTop: 10,
    alignItems: 'flex-end',
    right: '9%',
  },
  timeText: {
    color: '#888',
    fontSize: 12,
  },
  moreCommentsButton: {
    marginTop: 60,
    marginBottom: 10,
    marginHorizontal: 100,
    padding: 10,
    borderWidth: 1,
    color: '#fff',
    backgroundColor: '#242b4b',
    borderColor: '#000',
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default App;