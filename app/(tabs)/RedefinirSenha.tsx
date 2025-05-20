import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
  Text,
} from 'react-native';
import { TextInput, Snackbar } from 'react-native-paper';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const API_URL = 'http://10.0.2.2:3000';

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  RedefinirSenha: undefined;
};

export default function RedefinirSenhaScreen() {
  const [email, setEmail] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [visibleSnackbar, setVisibleSnackbar] = useState(false);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const router = useRouter();

  const handleChangePassword = async () => {
    if (!email || !novaSenha || !confirmarSenha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos!');
      return;
    }

    if (novaSenha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem!');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.put(`${API_URL}/usuarios/redefinir-senha`, {
        email,
        novaSenha,
        confirmarSenha,
      });

      if (response.status === 200) {
        setVisibleSnackbar(true);
        setTimeout(() => {
          navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
        }, 1000);
      } else {
        Alert.alert('Erro', response.data.error || 'Falha ao redefinir senha.');
      }
    } catch (error) {
      console.error('Erro ao redefinir a senha:', error);
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
        <View style={styles.header}>
          <View style={styles.imageWrapper}>
            <Image source={require('../../assets/images/Evolution.png')} style={styles.image} />
          </View>
          <Text style={styles.brand}>Evolution Assistência Técnica</Text>
        </View>

        <Text style={styles.title}>Redefinir Senha</Text>

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
          label="Nova Senha"
          mode="outlined"
          value={novaSenha}
          onChangeText={setNovaSenha}
          secureTextEntry
          style={styles.input}
          theme={{ colors: { primary: '#ccc', background: '#fff' } }}
        />

        <TextInput
          label="Confirmar Nova Senha"
          mode="outlined"
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
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
          <Pressable onPress={handleChangePassword} style={styles.buttonInner} disabled={loading}>
            <Text style={styles.buttonText}>{loading ? 'Aguarde...' : 'Redefinir Senha'}</Text>
          </Pressable>
        </LinearGradient>

        <Text
          style={styles.link}
          onPress={() => router.push('/(tabs)/Login')}
        >
          Voltar para login
        </Text>

        <Snackbar
          visible={visibleSnackbar}
          onDismiss={() => setVisibleSnackbar(false)}
          duration={Snackbar.DURATION_SHORT}
        >
          Senha redefinida com sucesso!
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  imageWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    marginRight: 15,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  brand: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
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
    height: 40,
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
