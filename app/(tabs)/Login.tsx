import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  Image,
  Pressable,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }
    // Lógica de login aqui
    Alert.alert('Sucesso', 'Login realizado');
    // router.push('/(tabs)/Home'); // Exemplo de navegação
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#000' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Image source={require('../../assets/images/Evolution.png')} style={styles.image} />
        <Text style={styles.brand}>Evolution Assistência Técnica</Text>

        <Text style={styles.title}>Login</Text>

        <TextInput
          label="E-mail"
          mode="outlined"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          autoCapitalize="none"
          keyboardType="email-address"
          theme={{ colors: { primary: '#ccc', background: '#fff' } }}
        />

        <TextInput
          label="Senha"
          mode="outlined"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
          style={styles.input}
          theme={{ colors: { primary: '#ccc', background: '#fff' } }}
        />

        <LinearGradient
          colors={['#b0b0b0', '#e0e0e0', '#9a9a9a', '#d6d6d6', '#8c8c8c']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.buttonGradient}
        >
          <Pressable onPress={handleLogin} style={styles.buttonInner}>
            <Text style={styles.buttonText}>Entrar</Text>
          </Pressable>
        </LinearGradient>

        <Text
          style={styles.link}
          onPress={() => router.push('/(tabs)/CadastroAtendimento')}
        >
          Criar uma conta
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
    color: '#ccc',
    marginTop: 15,
    textDecorationLine: 'underline',
  },
});
