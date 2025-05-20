import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
} from 'react-native';
import { TextInput, Snackbar } from 'react-native-paper';
import axios from 'axios';
import { useRouter } from 'expo-router';

const API_URL = 'http://10.0.2.2:3000';

export default function AlterarSenhaScreen() {
  const [email, setEmail] = useState('');
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [visibleSnackbar, setVisibleSnackbar] = useState(false);
  const router = useRouter();

  const handleChangePassword = async () => {
    if (!email || !senhaAtual || !novaSenha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos!');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.put(`${API_URL}/usuarios/alterar-senha`, {
        email,
        senhaAtual,
        novaSenha,
      });

      if (response.status === 200) {
        setVisibleSnackbar(true);
        setTimeout(() => {
          router.push('/(tabs)/Home'); // Ajustei para usar router.push
        }, 1000);
      } else {
        Alert.alert('Erro', response.data.error || 'Falha ao alterar senha.');
      }
    } catch (error) {
      console.error('Erro ao alterar a senha:', error);
      Alert.alert('Erro', 'Falha ao conectar ao servidor. Verifique sua conexão.');
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

        <Text style={styles.title}>Alterar Senha</Text>

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
          label="Senha Atual"
          mode="outlined"
          value={senhaAtual}
          onChangeText={setSenhaAtual}
          secureTextEntry
          style={styles.input}
          theme={{ colors: { primary: '#ccc', background: '#fff' } }}
        />

        <TextInput
          label="Nova Senha"
          mode="outlined"
          value={novaSenha}
          onChangeText={setNovaSenha}
          secureTextEntry
          style={styles.input}
          theme={{ colors: { primary: '#ccc', background: '#fff' } }}
        />

        <Pressable
          onPress={handleChangePassword}
          style={({ pressed }) => [
            styles.buttonGradient,
            pressed && { opacity: 0.7 },
          ]}
          disabled={loading}
        >
          <View style={styles.buttonInner}>
            <Text style={styles.buttonText}>
              {loading ? 'Alterando...' : 'Alterar Senha'}
            </Text>
          </View>
        </Pressable>

        <Snackbar
          visible={visibleSnackbar}
          onDismiss={() => setVisibleSnackbar(false)}
          duration={Snackbar.DURATION_SHORT}
          style={{ backgroundColor: '#333' }}
          theme={{ colors: { surface: '#333', onSurface: '#fff' } }}
        >
          Senha alterada com sucesso!
        </Snackbar>
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
    backgroundColor: '#b0b0b0', // cor base, já que não tem LinearGradient aqui
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
