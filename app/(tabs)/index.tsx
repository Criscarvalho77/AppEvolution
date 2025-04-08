import React, { useState, useEffect } from 'react';
import { Animated, StyleSheet, View, Text, Image, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const [typingText, setTypingText] = useState('');
  const [fadeAnim] = useState(new Animated.Value(0)); // Inicializa a animação de opacidade
  const [imageAnim] = useState(new Animated.Value(0)); // Inicializa a animação de escala da imagem

  useEffect(() => {
    // Função para limpar o AsyncStorage ao reiniciar a aplicação
    const clearStorage = async () => {
      try {
        await AsyncStorage.clear(); // Limpa todos os dados armazenados
        console.log('AsyncStorage limpo com sucesso!');
      } catch (error) {
        console.error('Erro ao limpar o AsyncStorage:', error);
      }
    };

    // Lógica para mostrar o texto dinâmico
    const typeStrings = [
      'Cuidado e excelência sempre!',
      'Qualidade e compromisso em cada serviço.',
    ];

    let index = 0;
    const typeInterval = setInterval(() => {
      setTypingText(typeStrings[index]);
      index = (index + 1) % typeStrings.length;
    }, 3000);

    return () => clearInterval(typeInterval); // Limpa o intervalo ao desmontar
  }, []);

  useEffect(() => {
    // Animação sincronizada de fade-in e zoom-in
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(imageAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <ImageBackground
      source={require('../../assets/images/Banner.png')} // Substitua pela sua imagem
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {/* Imagem com animação de fade e zoom */}
        <Animated.View
          style={[
            styles.imageWrapper,
            { opacity: imageAnim, transform: [{ scale: imageAnim }] },
          ]}
        >
          <Image
            source={require('../../assets/images/Evolution.png')}
            style={styles.image}
          />
        </Animated.View>


{/*
  1. A primeira é fixa: "Especialistas em manutenção e reparo!"
  2. A segunda é dinâmica, muda a cada 3 segundos com frases diferentes.
*/}
        {/* Texto abaixo com animação de fade */}
        <Animated.View style={{ opacity: fadeAnim }}>
          <Text style={styles.title}>Bem-vindo à Evolution Assistência Técnica!</Text>
          <Text style={styles.subtitle}>Especialistas em manutenção e reparo!</Text>
<Text style={[styles.subtitle, styles.typingText]}>{typingText}</Text>

        </Animated.View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageWrapper: { // Ajusta o tamanho da logo
    width: 150, // Diminuído de 200 para 150
    height: 150, // Diminuído de 200 para 150
    borderRadius: 75, // Ajustado para manter a borda arredondada proporcional
    overflow: 'hidden',
    transform: [{ scaleX: 1 }, { scaleY: 1 }], // Removido o efeito de deformação
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    color: '#fff',
  },
  typingText: {
    color: '#00FFFF',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
