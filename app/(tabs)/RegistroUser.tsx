import React, { useState } from 'react';
import { View, StyleSheet, Alert, Image, Pressable, Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Snackbar } from 'react-native-paper';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';

const API_URL = 'http://10.0.2.2:3000';

type RootStackParamList = {
  Login: undefined;
};

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [visibleSnackbar, setVisibleSnackbar] = useState(false);

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/usuario/inserir`, {
        nome: name,
        email,
        senha: password,
        tipoUsuario: 1,
      });

      if (response.status === 201) {
        setVisibleSnackbar(true);
        setTimeout(() => {
          navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
        }, 1000);
      } else {
        Alert.alert('Erro', response.data.error || 'Não foi possível criar a conta.');
      }
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      Alert.alert('Erro', 'Falha ao conectar ao servidor.');
    } finally {
      setLoading(false);
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

        <Text style={styles.title}>Criar Conta</Text>

        <TextInput
          label="Nome"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
          style={styles.input}
          mode="outlined"
          theme={{ colors: { primary: '#ccc', background: '#fff' } }}
        />
        <TextInput
          label="E-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
          mode="outlined"
          theme={{ colors: { primary: '#ccc', background: '#fff' } }}
        />
        <TextInput
          label="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          mode="outlined"
          theme={{ colors: { primary: '#ccc', background: '#fff' } }}
        />

        <LinearGradient
          colors={['#b0b0b0', '#e0e0e0', '#9a9a9a', '#d6d6d6', '#8c8c8c']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.buttonGradient}
        >
          <Pressable onPress={handleRegister} style={styles.buttonInner} disabled={loading}>
            <Text style={styles.buttonText}>{loading ? 'Cadastrando...' : 'Cadastrar'}</Text>
          </Pressable>
        </LinearGradient>

        <Snackbar
          visible={visibleSnackbar}
          onDismiss={() => setVisibleSnackbar(false)}
          duration={Snackbar.DURATION_SHORT}
          style={{ backgroundColor: '#333' }}
          action={{
            label: 'Fechar',
            onPress: () => setVisibleSnackbar(false),
          }}
        >
          Conta criada com sucesso!
        </Snackbar>

        <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
          Já tem uma conta? Faça login
        </Text>
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
  link: {
    marginTop: 15,
    color: '#fff',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
