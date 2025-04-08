import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Modal } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; {/* Isso importa os ícones da biblioteca react-native-vector-icons/Ionicons, que permite usar ícones como se fossem componentes React.

  */}

const AboutScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <Image 
          source={require('../../../assets/images/Evolution.png')} 
          style={styles.image} 
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Evolution Assistência Técnica</Text>

        <View style={styles.infoContainer}>
          <Text style={styles.info}>Fundação: <Text style={styles.highlight}>2010</Text></Text>
          <Text style={styles.info}>Especialidade: <Text style={styles.highlight}>Manutenção em máquinas industriais</Text></Text>
          <Text style={styles.info}>Idiomas: <Text style={styles.highlight}>Português, Inglês</Text></Text>
          <Text style={styles.info}>Localização: <Text style={styles.highlight}>Samambaia, Brasília</Text></Text>
          <Text style={styles.info}>Disponibilidade: <Text style={styles.highlight}>De Segunda à Sábado</Text></Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>Conheça Mais</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Ionicons name="construct-outline" size={28} color="#031339" style={styles.icon} /> {/* Adcionei os icones */}

          <Text style={styles.statNumber}>14 anos+</Text>
          <Text style={styles.statText}>Solucionando falhas em máquinas industriais de grande porte.</Text>
        </View>

        <View style={styles.statBox}>
          <Ionicons name="people-outline" size={28} color="#031339" style={styles.icon} />
          <Text style={styles.statNumber}>100+</Text>
          <Text style={styles.statText}>Clientes atendidos com excelência em todo o DF e Entorno.
          </Text>
        </View>

        <View style={styles.statBox}>
          <Ionicons name="build-outline" size={28} color="#031339" style={styles.icon} />
          <Text style={styles.statNumber}>1000+</Text>
          <Text style={styles.statText}>Manutenções preventivas e corretivas concluídas com sucesso.</Text>
        </View>

        <View style={styles.statBox}>
          <Ionicons name="ribbon-outline" size={28} color="#031339" style={styles.icon} />
          <Text style={styles.statNumber}>95+</Text>
          <Text style={styles.statText}>Índice de satisfação acima de 95% nas avaliações dos clientes.</Text>
        </View>
      </View>

      {/* Modal de Saiba Mais */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Sobre a Evolution Assistência Técnica</Text>
            <Text style={styles.modalDescription}>
              Somos especialistas em oferecer soluções completas em ​assistência técnica e locação de equipamentos para ​condomínios, escritórios e indústrias na região do Centro ​Oeste. Com 16 anos de experiência no mercado, nos ​destacamos pela qualidade dos nossos serviços e pelo ​compromisso em garantir a máxima eficiência e satisfação ​aos nossos clientes.
            </Text>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#000', /* Cor de fundo da pagina*/
    alignItems: 'center',
    minHeight: '100%',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    borderRadius: 0,
  },
  content: {
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  infoContainer: {
    marginBottom: 20,
  },
  info: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 5,
  },
  highlight: {  /* Subtitulos*/
    fontWeight: 'bold',
    color: '#D3D3D3',
  },
  button: {
    backgroundColor: '#191970',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
  },
  statBox: {
    backgroundColor: '#fff',
    padding: 15,
    margin: 5,
    borderRadius: 10,
    alignItems: 'center',
    width: '45%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 2, height: 2 },
    elevation: 2,
  },
  icon: {
    marginBottom: 5,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#031339',
  },
  statText: { /* Descrição*/
    fontSize: 14,
    textAlign: 'center',
    color: '#031339',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    maxHeight: '80%',
    overflow: 'scroll',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#031339',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    textAlign: 'justify',
    color: '#031339',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#031339',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AboutScreen;
