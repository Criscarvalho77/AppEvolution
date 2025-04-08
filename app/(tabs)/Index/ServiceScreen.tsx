import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface ServiceItemProps {
  icon: React.ComponentProps<typeof FontAwesome>['name'];
  title: string;
  description: string;
}

const ServicesScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.heading}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Agendar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.serviceContainer}>
        <ServiceItem
          icon="cogs"
          title="Lavadoras de Piso"
          description="Especializados em reparar lavadoras de piso e enceradeiras, garantindo que seus equipamentos de limpeza operem com máxima eficiência."
        />
        <ServiceItem
          icon="wrench"
          title="Ferramentas Elétricas"
          description="Oferecemos serviços de manutenção para diversas ferramentas elétricas, assegurando desempenho e prolongando sua vida útil."
        />
        <ServiceItem
          icon="plug"
          title="Eletroportáteis"
          description="Realizamos consertos em eletrodomésticos portáteis, restabelecendo sua funcionalidade com rapidez e qualidade."
        />
        <ServiceItem
          icon="refresh"
          title="Lavadoras e Secadoras"
          description="Nossa equipe técnica é capacitada para reparar lavadoras e secadoras de roupas, proporcionando soluções eficazes para o seu lar."
        />
        <ServiceItem
          icon="truck"
          title="Locação de Máquinas"
          description="Disponibilizamos lavadoras de piso e enceradeiras para locação, oferecendo soluções econômicas e práticas para necessidades temporárias."
        />
      </View>
    </ScrollView>
  );
};

const ServiceItem = ({ icon, title, description }: ServiceItemProps) => {
  return (
    <View style={styles.serviceItem}>
      <FontAwesome name={icon} size={40} color="#031339" style={styles.icon} />
      <Text style={styles.serviceTitle}>{title}</Text>
      <Text style={styles.serviceDescription}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // fundo preto
    padding: 20,
  },
  heading: {
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#191970',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  serviceContainer: {
    marginTop: 20,
  },
  serviceItem: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 2, height: 2 },
    elevation: 2,
    alignItems: 'center', // 👈 isso aqui centraliza o ícone
  },
  
  icon: {
    marginBottom: 10,
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#031339',
    textAlign: 'center',
    marginBottom: 5,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#031339',
    textAlign: 'center',
  },
});

export default ServicesScreen;
