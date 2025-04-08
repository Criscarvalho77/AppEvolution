import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Modal, TextInput, Button, TouchableOpacity } from 'react-native';

// Definição da interface para os depoimentos
interface Testimonial {
  image: any;
  comment: string;
  name: string;
  role: string;
}

// Dados dos depoimentos da Evolution
const testimonials: Testimonial[] = [
  {
    image: require('../../../assets/images/Perfil1.png'),
    comment:
      'Serviço rápido e eficiente! Minha lavadora voltou a funcionar perfeitamente. Recomendo a Evolution sem dúvidas.',
    name: 'Joana Mendes',
    role: 'Cliente Satisfeito',
  },
  {
    image: require('../../../assets/images/Perfil2.png'),
    comment:
      'Atendimento excelente! Resolveram o problema no mesmo dia. Equipe super profissional.',
    name: 'Fernando Rocha',
    role: 'Cliente Fiel',
  },
  {
    image: require('../../../assets/images/Perfil3.png'),
    comment:
      'A Evolution é minha escolha número um para assistência técnica. Sempre resolvem com agilidade.',
    name: 'Carlos Lima',
    role: 'Cliente Antigo',
  },
  {
    image: require('../../../assets/images/Perfil4.png'),
    comment:
      'Tive uma ótima experiência! Foram pontuais e muito educados. Minha lavadora ficou como nova.',
    name: 'Marcos Souza',
    role: 'Cliente Recorrente',
  },
  {
    image: require('../../../assets/images/Perfil5.png'),
    comment:
      'Gostei muito do atendimento. Desde o primeiro contato até a finalização do serviço, tudo foi impecável!',
    name: 'Eduarda Alves',
    role: 'Cliente Satisfeito',
  },
];

const TestimonialScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState('');
  const [newComment, setNewComment] = useState('');
  const [testimonialsData, setTestimonialsData] = useState(testimonials);

  // Função para adicionar um novo comentário
  const addTestimonial = () => {
    if (newName && newComment) {
      const newTestimonial: Testimonial = {
        image: require('../../../assets/images/Perfil1.png'),
        comment: newComment,
        name: newName,
        role: 'Novo Cliente',
      };
      setTestimonialsData([...testimonialsData, newTestimonial]);
      setModalVisible(false);
      setNewName('');
      setNewComment('');
    } else {
      alert("Por favor, preencha todos os campos.");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.testimonialList}>
        {testimonialsData.map((item, index) => (
          <View key={index} style={styles.testimonialItem}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.quoteIcon}>“</Text>
            <Text style={styles.comment}>{item.comment}</Text>
            <View style={styles.intro}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.role}>{item.role}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Botão para abrir o modal de adicionar comentário */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>Adicionar Depoimento</Text>
      </TouchableOpacity>

      {/* Modal para adicionar um comentário */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Adicionar Depoimento</Text>

            <TextInput
              style={styles.input}
              placeholder="Seu nome"
              value={newName}
              onChangeText={setNewName}
            />

            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Seu depoimento"
              value={newComment}
              onChangeText={setNewComment}
              multiline
            />

            <Button title="Adicionar" onPress={addTestimonial} />
            <Button title="Cancelar" onPress={() => setModalVisible(false)} color="red" />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  testimonialList: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  testimonialItem: {
    backgroundColor: '#f7f7f7',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    width: '100%',
    maxWidth: 350,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  quoteIcon: {
    fontSize: 40,
    color: '#888',
    position: 'absolute',
    top: 10,
    left: 10,
  },
  comment: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#555',
    marginBottom: 15,
  },
  intro: {
    marginTop: 10,
    alignItems: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  role: {
    fontSize: 14,
    color: '#777',
  },
  addButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  textArea: {
    height: 100,
  },
});

export default TestimonialScreen;
