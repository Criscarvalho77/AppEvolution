import React from "react";
import { View, Text, TextInput, TouchableOpacity, Linking, ScrollView } from "react-native";

const ContactScreen = () => {
    return (
        <ScrollView style={{ padding: 20, backgroundColor: "#000" }}>
            <Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20, color: "#fff" }}>
                Evolution Assistência Técnica
            </Text>

            <View style={{ marginBottom: 20 }}>
                <Text style={{ fontSize: 18, fontWeight: "bold", color: "#ccc" }}>Fale conosco</Text>
                <Text style={{ fontSize: 16, color: "#ccc", marginTop: 5 }}>
                    Entre em contato para mais informações sobre nossos serviços.
                </Text>
            </View>

            <View style={{ marginBottom: 20 }}>
                <Text style={{ fontSize: 16, fontWeight: "bold", color: "#ccc" }}>Telefone:</Text>
                <Text style={{ fontSize: 16, color: "#fff" }}>(61) 98210-5023</Text>
            </View>

            <View style={{ marginBottom: 20 }}>
                <Text style={{ fontSize: 16, fontWeight: "bold", color: "#ccc" }}>Email:</Text>
                <Text style={{ fontSize: 16, color: "#fff" }}>contato@evolutionassist.com.br</Text>
            </View>

            <View style={{ marginBottom: 20 }}>
                <Text style={{ fontSize: 16, fontWeight: "bold", color: "#ccc" }}>Instagram:</Text>
                <Text style={{ fontSize: 16, color: "#fff" }} onPress={() => Linking.openURL("https://www.instagram.com/evolutionassist")}>
                    https://www.instagram.com/evolutionassist
                </Text>
            </View>

            <View style={{ marginBottom: 20 }}>
                <Text style={{ fontSize: 16, fontWeight: "bold", color: "#ccc" }}>Site:</Text>
                <Text style={{ fontSize: 16, color: "#fff" }} onPress={() => Linking.openURL("https://www.evolutionassist.com.br")}>
                    https://www.evolutionassist.com.br
                </Text>
            </View>

            <TextInput 
                style={{ borderWidth: 1, borderColor: "#191970", padding: 10, marginBottom: 10, borderRadius: 5, color: "#fff" }} 
                placeholder="Nome" 
                placeholderTextColor="#ccc"
            />
            <TextInput 
                style={{ borderWidth: 1, borderColor: "#191970", padding: 10, marginBottom: 10, borderRadius: 5, color: "#fff" }} 
                placeholder="Email" 
                keyboardType="email-address" 
                placeholderTextColor="#ccc"
            />
            <TextInput 
                style={{ borderWidth: 1, borderColor: "#191970", padding: 10, marginBottom: 10, borderRadius: 5, color: "#fff" }} 
                placeholder="Assunto" 
                placeholderTextColor="#ccc"
            />
            <TextInput 
                style={{ 
                    borderWidth: 1, 
                    borderColor: "#191970", 
                    padding: 10, 
                    marginBottom: 10, 
                    borderRadius: 5, 
                    height: 100, 
                    textAlignVertical: "top", 
                    color: "#fff" 
                }} 
                placeholder="Mensagem" 
                multiline 
                placeholderTextColor="#ccc"
            />

            <TouchableOpacity style={{ backgroundColor: "#191970", padding: 15, borderRadius: 5, alignItems: "center" }}>
                <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>Enviar mensagem</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default ContactScreen;
