import React, { useState } from 'react';
import { View, StyleSheet, Alert, Image, Pressable, Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useRouter } from 'expo-router';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';

const API_URL = 'http://10.0.2.2:3000'; // Use o IP da sua máquina

export default function RegisterScreen() {
  const [dataAtendimento, setDataAtendimento] = useState('');
  const [dthoraAgendamento, setDthoraAgendamento] = useState('');
  const [horario, setHorario] = useState('');
  const [fkUsuarioId, setFkUsuarioId] = useState('');
  const [fkServicoId, setFkServicoId] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    try {
      if (!dataAtendimento || !dthoraAgendamento || !horario || !fkUsuarioId || !fkServicoId) {
        Alert.alert('Erro', 'Todos os campos são obrigatórios.');
        return;
      }
      const formattedDataAtendimento = new Date(dataAtendimento).toISOString();
      const formattedDthoraAgendamento = new Date(dthoraAgendamento + 'T' + horario).toISOString();

      const newAgendamento = {
        dataatendimento: formattedDataAtendimento,
        dthoraagendamento: formattedDthoraAgendamento,
        horario,
        fk_usuario_id: parseInt(fkUsuarioId),
        fk_servico_id: parseInt(fkServicoId),
      };

      const response = await axios.post(`${API_URL}/agendamento/inserir`, newAgendamento, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 201) {
        Alert.alert('Sucesso', response.data.message);
        router.push('/Login');
      }

      setDataAtendimento('');
      setDthoraAgendamento('');
      setHorario('');
      setFkUsuarioId('');
      setFkServicoId('');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || `Erro: ${error.message}`;
        Alert.alert('Erro', errorMessage);
        console.error('Erro detalhado do Axios:', error.response?.data);
        console.error('Erro status:', error.response?.status);
      } else if (error instanceof Error) {
        console.error('Erro ao adicionar agendamento:', error.message);
      } else {
        console.error('Erro desconhecido:', error);
        Alert.alert('Erro', 'Ocorreu um erro inesperado.');
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#000' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Image source={require('../../assets/images/Evolution.png')} style={styles.image} />
        <Text style={styles.brand}>Evolution Assistência Técnica</Text>

        <Text style={styles.title}>Adicionar Agendamento</Text>

        <TextInput
          label="Data Atendimento"
          mode="outlined"
          value={dataAtendimento}
          onChangeText={setDataAtendimento}
          style={styles.input}
          placeholder="YYYY-MM-DD"
          theme={{ colors: { primary: '#ccc', background: '#fff' } }}
        />
        <TextInput
          label="Data Agendamento"
          mode="outlined"
          value={dthoraAgendamento}
          onChangeText={setDthoraAgendamento}
          style={styles.input}
          placeholder="YYYY-MM-DD"
          theme={{ colors: { primary: '#ccc', background: '#fff' } }}
        />
        <TextInput
          label="Horário"
          mode="outlined"
          value={horario}
          onChangeText={setHorario}
          style={styles.input}
          placeholder="HH:mm:ss"
          theme={{ colors: { primary: '#ccc', background: '#fff' } }}
        />
        <TextInput
          label="ID Usuário"
          mode="outlined"
          value={fkUsuarioId}
          onChangeText={setFkUsuarioId}
          keyboardType="numeric"
          style={styles.input}
          theme={{ colors: { primary: '#ccc', background: '#fff' } }}
        />
        <TextInput
          label="ID Serviço"
          mode="outlined"
          value={fkServicoId}
          onChangeText={setFkServicoId}
          keyboardType="numeric"
          style={styles.input}
          theme={{ colors: { primary: '#ccc', background: '#fff' } }}
        />

        <LinearGradient
          colors={['#b0b0b0', '#e0e0e0', '#9a9a9a', '#d6d6d6', '#8c8c8c']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.buttonGradient}
        >
          <Pressable onPress={handleRegister} style={styles.buttonInner}>
            <Text style={styles.buttonText}>Adicionar</Text>
          </Pressable>
        </LinearGradient>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  brand: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 25,
    textAlign: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 15,
  },
  input: {
    width: '90%',
    marginBottom: 12,
    height: 35,
  },
  buttonGradient: {
    width: '90%',
    borderRadius: 12,
    marginTop: 15,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonInner: {
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 17,
    textShadowColor: '#fff7',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
});
