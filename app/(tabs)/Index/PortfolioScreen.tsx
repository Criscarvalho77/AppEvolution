import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, Modal, StyleSheet } from 'react-native';

const Portfolio = () => {
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const portfolioItems = [
    { id: '1', imgSrc: require('../../../assets/images/p1.png'), title: 'Revitalização de Plásticos', description: 'Renovação de peças plásticas desgastadas, trazendo brilho e aparência de novo ao equipamento.' },
    { id: '2', imgSrc: require('../../../assets/images/p2.png'), title: 'Pintura', description: 'Aplicação de nova pintura para proteger e restaurar a estética dos equipamentos.' },
    { id: '3', imgSrc: require('../../../assets/images/p3.png'), title: 'Revisão Elétrica', description: 'Verificação e ajuste da parte elétrica para garantir funcionamento seguro e eficiente.' },
    { id: '4', imgSrc: require('../../../assets/images/p4.png'), title: 'Locação de Equipamentos', description: 'Oferecemos locação de equipamentos para limpeza profissional, ideais para uso em empresas, condomínios, escolas e ambientes industriais. Nossos equipamentos passam por manutenção rigorosa, garantindo alta performance e segurança.' },
  ];

  const openImageModal = (imageSrc: any) => {
    setSelectedImage(imageSrc);
    setIsModalVisible(true);
  };

  const closeImageModal = () => {
    setIsModalVisible(false);
    setSelectedImage(null);
  };

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={<View style={styles.heading}></View>}
        data={portfolioItems}
        renderItem={({ item }) => (
          <View style={styles.portfolioItem}>
            <Image source={item.imgSrc} style={styles.image} />
            <View style={styles.content}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <TouchableOpacity style={styles.viewButton} onPress={() => openImageModal(item.imgSrc)}>
                <Text style={styles.viewButtonText}>Ampliar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
        numColumns={1}
      />

      <Modal visible={isModalVisible} transparent={true} animationType="fade" onRequestClose={closeImageModal}>
        <View style={styles.modalOverlay}>
          <TouchableOpacity style={styles.modalCloseButton} onPress={closeImageModal}>
            <Text style={styles.modalCloseText}>Fechar</Text>
          </TouchableOpacity>
          {selectedImage && (
            <Image source={selectedImage} style={styles.modalImage} />
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000',
  },
  heading: {
    alignItems: 'center',
    marginBottom: 30,
  },
  portfolioItem: {
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#FFF',
    padding: 10,
    width: '100%',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  content: {
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#031339',
  },
  description: {
    fontSize: 14,
    color: '#031339',
    marginTop: 5,
  },
  viewButton: {
    marginTop: 10,
    paddingVertical: 8,
    backgroundColor: '#191970',
    borderRadius: 5,
  },
  viewButtonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 30,
    right: 20,
    padding: 10,
    backgroundColor: '#191970',
    borderRadius: 50,
  },
  modalCloseText: {
    color: '#fff',
    fontSize: 16,
  },
  modalImage: {
    width: '90%',
    height: '80%',
    resizeMode: 'contain',
  },
});

export default Portfolio;
