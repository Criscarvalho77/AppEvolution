import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { Button as PaperButton, Menu, Provider, TextInput } from 'react-native-paper';

const Relatorio = () => {
  const [campo1, setCampo1] = useState('');
  const [campo2, setCampo2] = useState('');
  const [campo3, setCampo3] = useState('');
  const [valor1, setValor1] = useState('');
  const [valor2, setValor2] = useState('');
  const [valor3, setValor3] = useState('');
  const [agendamentos, setAgendamentos] = useState([]);
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);

  const options = [
    'Data do Agendamento',
    'Horário do Atendimento',
    'Tipo do Serviço',
    'Valor do Serviço',
    'Nome do Cliente',
    'Email do Cliente',
    'Telefone do Cliente',
  ];

  const handleFiltrar = async () => {
    console.log(campo1, campo2, campo3, valor1, valor2, valor3);

    try {
      const response = await fetch('/Relatorio/GetAgendamentos', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          campo1,
          campo2,
          campo3,
          valor1,
          valor2,
          valor3,
        }),
      });
      const data = await response.json();
      setAgendamentos(data);
    } catch (error) {
      console.error('Erro ao buscar agendamentos:', error);
    }
  };

  return (
    <Provider>
      <View style={styles.container}>

        {/* Logo centralizada */}
        <View style={styles.logoContainer}>
          <Image 
            source={require('../assets/images/Evolution.png')} 
            style={styles.image} 
          />
          <Text style={styles.name}>Evolution Assistência Técnica</Text>
        </View>

        <Text style={styles.title}>Relatório</Text>

        {/* Filtro para Coluna 1 */}
        <View style={styles.filterGroup}>
          <Text style={styles.filterText}>Escolha a coluna 1:</Text>
          <Menu
            visible={visible1}
            onDismiss={() => setVisible1(false)}
            anchor={
              <PaperButton 
                mode="contained" 
                onPress={() => setVisible1(true)} 
                style={styles.menuButton}
                labelStyle={styles.menuLabel}
              >
                {campo1 || 'Escolha uma coluna'}
              </PaperButton>
            }
          >
            {options.map((option, index) => (
              <Menu.Item
                key={index}
                onPress={() => {
                  setCampo1(option);
                  setVisible1(false);
                }}
                title={option}
              />
            ))}
          </Menu>
          <Text style={styles.filterText}>Filtro 1:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o filtro"
            value={valor1}
            onChangeText={setValor1}
            placeholderTextColor="#999"
          />
        </View>

        {/* Filtro para Coluna 2 */}
        <View style={styles.filterGroup}>
          <Text style={styles.filterText}>Escolha a coluna 2:</Text>
          <Menu
            visible={visible2}
            onDismiss={() => setVisible2(false)}
            anchor={
              <PaperButton 
                mode="contained" 
                onPress={() => setVisible2(true)} 
                style={styles.menuButton}
                labelStyle={styles.menuLabel}
              >
                {campo2 || 'Escolha uma coluna'}
              </PaperButton>
            }
          >
            {options.map((option, index) => (
              <Menu.Item
                key={index}
                onPress={() => {
                  setCampo2(option);
                  setVisible2(false);
                }}
                title={option}
              />
            ))}
          </Menu>
          <Text style={styles.filterText}>Filtro 2:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o filtro"
            value={valor2}
            onChangeText={setValor2}
            placeholderTextColor="#999"
          />
        </View>

        {/* Filtro para Coluna 3 */}
        <View style={styles.filterGroup}>
          <Text style={styles.filterText}>Escolha a coluna 3:</Text>
          <Menu
            visible={visible3}
            onDismiss={() => setVisible3(false)}
            anchor={
              <PaperButton 
                mode="contained" 
                onPress={() => setVisible3(true)} 
                style={styles.menuButton}
                labelStyle={styles.menuLabel}
              >
                {campo3 || 'Escolha uma coluna'}
              </PaperButton>
            }
          >
            {options.map((option, index) => (
              <Menu.Item
                key={index}
                onPress={() => {
                  setCampo3(option);
                  setVisible3(false);
                }}
                title={option}
              />
            ))}
          </Menu>
          <Text style={styles.filterText}>Filtro 3:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o filtro"
            value={valor3}
            onChangeText={setValor3}
            placeholderTextColor="#999"
          />
        </View>

        <PaperButton mode="contained" onPress={handleFiltrar} style={styles.searchButton}>
          Pesquisar
        </PaperButton>

        <FlatList
          data={agendamentos}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.agendamentoItem}>
              {/* Exiba os dados do agendamento aqui */}
            </View>
          )}
          ListEmptyComponent={<Text style={styles.filterText}>Nenhum agendamento encontrado.</Text>}
        />
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000', // fundo preto
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 5,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  filterGroup: {
    marginBottom: 20,
  },
  filterText: {
    fontSize: 16,
    color: '#fff',
  },
  input: {
    height: 40,
    borderColor: '#555',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    borderRadius: 5,
    color: '#fff',
  },
  menuButton: {
    backgroundColor: '#222',
    marginBottom: 10,
  },
  menuLabel: {
    color: '#fff',
  },
  searchButton: {
    backgroundColor: '#555',
    marginVertical: 10,
  },
  agendamentoItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
    marginBottom: 10,
  },
});

export default Relatorio;
