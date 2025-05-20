import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Pressable } from 'react-native';

import LoginScreen from './Login';
import AlterarSenhaScreen from './AlterarSenha';
import RedefinirSenhaScreen from './RedefinirSenha';
import RegistroUserScreen from './RegistroUser';
import CadastroAtendimento from './CadastroAtendimento';
import GerenciamentoUser from '../GerenciamentoUser';
import GerenciamentoAgendamento from '../GerenciamentoAgendamento';
import GerenciamentoServico from '../GerenciamentoServico';
import Relatorio from '../Relatorio';
import HomeScreen from './index';
import AboutScreen from './Index/AboutScreen';
import ServiceScreen from './Index/ServiceScreen';
import PortfolioScreen from './Index/PortfolioScreen';
import TestimonialScreen from './Index/TestimonialScreen';
import BlogScreen from './Index/BlogScreen';
import ContactScreen from './Index/ContactScreen';

const DrawerNavigator = createDrawerNavigator();
const TabNavigator = createBottomTabNavigator();

type IconName =
  | 'home'
  | 'information'
  | 'construct'
  | 'briefcase'
  | 'people'
  | 'logo-reddit'
  | 'call';

// Tabs
function Tabs() {
  return (
    <TabNavigator.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: IconName;
          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Sobre nós':
              iconName = 'information';
              break;
            case 'Nossos serviços':
              iconName = 'construct';
              break;
            case 'Portfolio':
              iconName = 'briefcase';
              break;
            case 'Depoimentos':
              iconName = 'people';
              break;
            case 'InfoBot':
              iconName = 'logo-reddit';
              break;
            case 'Contate -me':
              iconName = 'call';
              break;
            default:
              iconName = 'home';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#047fce',
        tabBarInactiveTintColor: '#001F3F',
      })}
    >
      <TabNavigator.Screen name="Home" component={HomeScreen} />
      <TabNavigator.Screen name="Sobre nós" component={AboutScreen} />
      <TabNavigator.Screen name="Nossos serviços" component={ServiceScreen} />
      <TabNavigator.Screen name="Portfolio" component={PortfolioScreen} />
      <TabNavigator.Screen name="Depoimentos" component={TestimonialScreen} />
      <TabNavigator.Screen name="InfoBot" component={BlogScreen} />
      <TabNavigator.Screen name="Contate -me" component={ContactScreen} />
    </TabNavigator.Navigator>
  );
}

// Drawer
export default function DrawerLayout() {
  return (
    <DrawerNavigator.Navigator
      screenOptions={({ navigation }) => ({
        drawerActiveTintColor: '#5B7FA3',
        drawerInactiveTintColor: '#001F3F',
        headerLeft: () => (
          <Pressable onPress={() => navigation.toggleDrawer()} style={{ marginLeft: 15 }}>
            <Ionicons name="menu" size={28} color="#001F3F" />
          </Pressable>
        ),
      })}
    >
      <DrawerNavigator.Screen
        name="Home"
        options={{
          title: 'Início',
          drawerIcon: ({ color }) => <Ionicons name="home-outline" size={28} color={color} />,
          headerStyle: { backgroundColor: 'rgb(0, 0, 0)' },
          headerTintColor: '#fff',
        }}
        component={Tabs}
      />
      {/* Telas livres, disponíveis sem controle de usuário */}
      <DrawerNavigator.Screen
        name="Login"
        component={LoginScreen}
        options={{
          drawerIcon: ({ color }) => <Ionicons name="log-in-outline" size={28} color={color} />,
          title: 'Login',
        }}
      />
      <DrawerNavigator.Screen
        name="RegistroUser"
        component={RegistroUserScreen}
        options={{
          drawerIcon: ({ color }) => <Ionicons name="person-add-outline" size={28} color={color} />,
          title: 'Cadastro de Usuário',
        }}
      />
      <DrawerNavigator.Screen
        name="CadastroAtendimento"
        component={CadastroAtendimento}
        options={{
          drawerIcon: ({ color }) => <Ionicons name="clipboard-outline" size={28} color={color} />,
          title: 'Cadastro de Atendimento',
        }}
      />
      <DrawerNavigator.Screen
        name="GerenciamentoUser"
        component={GerenciamentoUser}
        options={{
          drawerIcon: ({ color }) => <Ionicons name="people" size={28} color={color} />,
          title: 'Gerenciar Usuários',
        }}
      />
      <DrawerNavigator.Screen
        name="GerenciamentoAgendamento"
        component={GerenciamentoAgendamento}
        options={{
          drawerIcon: ({ color }) => <Ionicons name="calendar-outline" size={28} color={color} />,
          title: 'Gerenciar Agendamentos',
        }}
      />
      <DrawerNavigator.Screen
        name="GerenciamentoServico"
        component={GerenciamentoServico}
        options={{
          drawerIcon: ({ color }) => <Ionicons name="construct-outline" size={28} color={color} />,
          title: 'Gerenciar Serviços',
        }}
      />
      <DrawerNavigator.Screen
        name="Relatorio"
        component={Relatorio}
        options={{
          drawerIcon: ({ color }) => <Ionicons name="bar-chart-outline" size={28} color={color} />,
          title: 'Relatório',
        }}
      />
      <DrawerNavigator.Screen
        name="AlterarSenha"
        component={AlterarSenhaScreen}
        options={{
          drawerIcon: ({ color }) => <Ionicons name="key-outline" size={28} color={color} />,
          title: 'Alterar Senha',
        }}
      />
      <DrawerNavigator.Screen
        name="RedefinirSenha"
        component={RedefinirSenhaScreen}
        options={{
          drawerIcon: ({ color }) => <Ionicons name="lock-open-outline" size={28} color={color} />,
          title: 'Redefinir Senha',
        }}
      />
    </DrawerNavigator.Navigator>
  );
}
