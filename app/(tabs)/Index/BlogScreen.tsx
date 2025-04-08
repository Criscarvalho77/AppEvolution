import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity, 
  ScrollView,
  StyleSheet,
  Linking,
  Image,
} from 'react-native';

// 🧠 Função para comparar palavras-chave
const compararTextoSemelhante = (texto: string, palavrasChave: string[]): boolean => {
  const normalizar = (str: string) =>
    str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const textoNormalizado = normalizar(texto);
  return palavrasChave.some(palavra => textoNormalizado.includes(normalizar(palavra)));
};

const AssistenteVirtual = () => {
  const [pergunta, setPergunta] = useState('');
  const [mensagens, setMensagens] = useState<{ autor: string, texto: string }[]>([]);
  const [mostrarBotaoWhatsapp, setMostrarBotaoWhatsapp] = useState(false);
  const [etapaAtual, setEtapaAtual] = useState<'inicio' | 'aguardando_nome' | 'aguardando_acao' | 'aguardando_endereco' | 'final'>('inicio');
  const [nomeCliente, setNomeCliente] = useState<string | null>(null);

  // ✅ Ref tipada corretamente
  const scrollViewRef = useRef<ScrollView>(null);

  // 1️⃣ Auto scroll quando as mensagens mudam
  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [mensagens]);

  // 2️⃣ Inicia a conversa uma única vez quando o componente carrega
  useEffect(() => {
    iniciarConversa();
  }, []);

  const iniciarConversa = () => {
    setMensagens([
      { autor: 'assistente', texto: 'Olá! Seja bem-vindo à Evolution Assistência Técnica.' },
    ]);
    setEtapaAtual('aguardando_acao');
  };

  const enviarPergunta = () => {
    if (!pergunta.trim()) return;
    setMensagens(prev => [...prev, { autor: 'usuario', texto: pergunta }]);
    setTimeout(() => processarResposta(pergunta.toLowerCase()), 500);
    setPergunta('');
  };

  const processarResposta = (texto: string) => {
    const addMensagem = (texto: string) => {
      setMensagens(prev => [...prev, { autor: 'assistente', texto }]);
    };

    const visitaKeywords = ['visita', 'tecnico', 'técnico', 'agendar', 'agenda', 'chamar tecnico'];
    const orcamentoKeywords = ['orcamento', 'orçamento', 'preço', 'valor', 'quanto', 'cust'];
    const chamadoKeywords = ['chamado', 'abrir chamado', 'registro', 'problema', 'suporte'];
    const manutencaoKeywords = ['manutencao', 'manutenção', 'conserto', 'consertar', 'arrumar', 'reparo'];
    const servicosKeywords = ['serviço', 'serviços', 'assistência', 'atendimento', 'equipamentos'];
    const equipamentosKeywords = ['lavadora', 'secadora', 'ferramenta', 'eletrodoméstico', 'enceradeira'];
    const assistenciaKeywords = ['assistencia', 'assistência', 'ajuda', 'arrumar', 'conserta', 'quebrou', 'problema na máquina', 'arruma lavadora', 'vocês consertam'];

    const palavrasChaveExtras = [
      { palavras: ['vocês consertam enceradeiras', 'vcs consertam enceradeiras','conserta enceradeira', 'arrumar enceradeira', 'enceradeira estragou'], resposta: 'Sim! Trabalhamos com conserto de enceradeiras. Pode me informar o modelo e o problema que ela está apresentando?' },
      { palavras: ['quebrou', 'quebrada', 'estragou', 'defeito'], resposta: 'Seu equipamento está com defeito? Me diga o modelo e o problema.' },
      { palavras: ['arruma lavadora', 'conserta lavadora'], resposta: 'Sim! Trabalhamos com conserto de lavadoras. Pode me informar o modelo?' },
      { palavras: ['vocês consertam', 'vocês arrumam'], resposta: 'Sim, prestamos assistência! Qual é o equipamento com problema?' },
      { palavras: ['microondas', 'micro-ondas', 'micro ondas'], resposta: 'Sim! Trabalhamos com conserto de micro-ondas. Pode me informar o modelo e o defeito?' },
      { palavras: ['lava e seca', 'lava e seca samsung', 'lava e seca electrolux'], resposta: 'Sim! Realizamos assistência técnica em máquinas lava e seca. Pode informar o modelo e o defeito?' },
      { palavras: ['meu equipamento não liga', 'não liga', 'parou de funcionar'], resposta: 'Entendi. Vamos verificar isso! Qual é o equipamento e o modelo?' },
      { palavras: ['barulho estranho', 'faz barulho', 'barulhenta'], resposta: 'Barulhos incomuns podem indicar problema mecânico. Qual o modelo do equipamento?' },
      { palavras: ['não está esquentando', 'não esquenta'], resposta: 'Pode ser problema na resistência ou placa. Qual o modelo do seu equipamento?' },
      { palavras: ['servem minha região', 'atendem minha cidade', 'vocês vêm até aqui'], resposta: 'Atendemos diversas regiões! Qual o seu bairro ou cidade para eu verificar?' },
      { palavras: ['tempo de conserto', 'demora', 'quanto tempo leva'], resposta: 'Depende do equipamento e do defeito. Podemos te dar uma estimativa após análise.' },
      { palavras: ['funciona aos sábados', 'atende no sábado', 'tem técnico sábado'], resposta: 'Sim, temos atendimentos aos sábados! Qual horário seria melhor para você?' },
      { palavras: ['forma de pagamento', 'aceita cartão', 'parcelamento'], resposta: 'Aceitamos cartão, pix e transferência. Parcelamos em até 3x dependendo do valor.' },
      { palavras: ['vocês vendem peças', 'tem peças de reposição'], resposta: 'Trabalhamos com reposição de peças durante o conserto, mas não vendemos separadamente.' },
      { palavras: ['vocês consertam o que?', 'vcs consertam o que?'], resposta: 'Realizamos assistência técnica em Lavadoras de piso, Enceradeiras, Eletrodomésticos portáteis, Ferramentas elétricas, Microondas, Lavadoras e Secadoras de roupas.' },
      {
        palavras: [
          "quero agendar", "agendar atendimento", "pode marcar visita", "como agendo", "preciso de um técnico",
          "pode vir aqui", "chamar técnico", "agendamento", "agendar técnico", "pode vir amanhã", "pode vir hoje", "agendar visita"
        ],
        resposta: "Vamos agendar sua visita. Por favor, me informe o equipamento, o defeito e o endereço completo com bairro e ponto de referência. 😊"
      }
    ];

    // Primeira verificação: palavras específicas
    for (let item of palavrasChaveExtras) {
      if (compararTextoSemelhante(texto, item.palavras)) {
        addMensagem(item.resposta);
        return;
      }
    }

    // Verificações genéricas (caso nenhuma específica tenha sido encontrada)
    if (compararTextoSemelhante(texto, visitaKeywords)) {
      addMensagem("Você quer agendar uma visita técnica? Informe o equipamento e o defeito.");
    } else if (compararTextoSemelhante(texto, orcamentoKeywords)) {
      addMensagem("Podemos te passar uma estimativa. Qual o equipamento e defeito?");
    } else if (compararTextoSemelhante(texto, chamadoKeywords)) {
      addMensagem("Vamos abrir um chamado. Qual é o equipamento e qual o defeito?");
    } else if (compararTextoSemelhante(texto, manutencaoKeywords)) {
      addMensagem("Trabalhamos com manutenção de vários equipamentos. Qual é o seu?");
    } else if (compararTextoSemelhante(texto, servicosKeywords)) {
      addMensagem("Oferecemos serviços de assistência técnica em diversos equipamentos.");
    } else if (compararTextoSemelhante(texto, equipamentosKeywords)) {
      addMensagem("Sim, trabalhamos com esses tipos de equipamento! Qual o defeito?");
    } else if (compararTextoSemelhante(texto, assistenciaKeywords)) {
      addMensagem("Claro, prestaremos assistência! Qual é o equipamento e o defeito?");
    } else {
      addMensagem("Desculpe, não entendi bem. Pode reformular ou me dar mais detalhes?");
    }
  };


  const abrirWhatsapp = () => {
    const mensagem = `Olá, sou ${nomeCliente ?? ''} e preciso de assistência técnica.`;
    const url = `https://wa.me/5561982105023?text=${encodeURIComponent(mensagem)}`;
    Linking.openURL(url);
  };

    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.chatBox}
          ref={scrollViewRef}
        >
          {mensagens.map((msg, index) => (
            <View
              key={index}
              style={[
                styles.messageContainer,
                msg.autor === 'usuario' ? styles.userMessage : styles.assistantMessage
              ]}
            >
              {msg.autor === 'assistente' && (
                <Image
                  source={require('../../../assets/images/botavatar.png')}
                  style={styles.avatar}
                />
              )}
              <Text style={styles.messageText}>{msg.texto}</Text>
            </View>
          ))}
        </ScrollView>
    
        {mostrarBotaoWhatsapp && (
          <TouchableOpacity style={styles.whatsappButton} onPress={abrirWhatsapp}>
            <Text style={styles.whatsappText}>Falar com atendente no WhatsApp</Text>
          </TouchableOpacity>
        )}
    
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Digite sua pergunta..."
            value={pergunta}
            onChangeText={setPergunta}
          />
          <TouchableOpacity style={styles.sendButton} onPress={enviarPergunta}>
            <Text style={styles.sendButtonText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  chatBox: { padding: 16 },
  messageContainer: { marginVertical: 8, flexDirection: 'row', alignItems: 'flex-start' },
  userMessage: { alignSelf: 'flex-end', backgroundColor: '#DCF8C6', borderRadius: 8, padding: 8 },
  assistantMessage: { alignSelf: 'flex-start', backgroundColor: '#F1F0F0', borderRadius: 8, padding: 8, flexDirection: 'row' },
  messageText: { fontSize: 16 },
  avatar: { width: 24, height: 24, marginRight: 8, borderRadius: 12 },
  inputContainer: { flexDirection: 'row', padding: 8, borderTopWidth: 1, borderColor: '#ccc' },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 20, paddingHorizontal: 12 },
  sendButton: { marginLeft: 8, justifyContent: 'center', backgroundColor: '#4CAF50', paddingHorizontal: 16, borderRadius: 20 },
  sendButtonText: { color: '#fff', fontWeight: 'bold' },
  whatsappButton: { backgroundColor: '#25D366', padding: 12, margin: 10, borderRadius: 8, alignItems: 'center' },
  whatsappText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});

export default AssistenteVirtual;
