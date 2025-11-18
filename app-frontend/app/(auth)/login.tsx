import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { router } from "expo-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function handleLogin() {
    router.replace("/(tabs)");
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 30,
        backgroundColor: "#f4f4f4",
      }}
    >
      <Text
        style={{
          fontSize: 32,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 40,
          color: "#111",
        }}
      >
        Bem-vindo
      </Text>

      <View
        style={{
          backgroundColor: "#fff",
          padding: 20,
          borderRadius: 16,
          elevation: 4,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 10,
        }}
      >
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={{
            borderWidth: 1,
            borderColor: "#ddd",
            padding: 14,
            borderRadius: 12,
            marginBottom: 15,
            backgroundColor: "#fafafa",
          }}
        />

        <TextInput
          placeholder="Senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
          style={{
            borderWidth: 1,
            borderColor: "#ddd",
            padding: 14,
            borderRadius: 12,
            marginBottom: 20,
            backgroundColor: "#fafafa",
          }}
        />

        <TouchableOpacity
          onPress={handleLogin}
          style={{
            backgroundColor: "#111",
            padding: 16,
            borderRadius: 12,
            marginTop: 10,
          }}
        >
          <Text
            style={{
              color: "#fff",
              textAlign: "center",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Entrar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
          <Text
            style={{
              marginTop: 18,
              textAlign: "center",
              fontSize: 15,
              color: "#333",
            }}
          >
            Criar conta
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
