import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import { Alert } from 'react-native';
import { api } from "../../services/api";

export default function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  async function handleRegister() {
    if (!nome || !email || !senha) {
      return Alert.alert("Erro", "Preencha todos os campos");
    }
    if (senha !== confirmarSenha) {
      return Alert.alert("Erro", "As senhas não coincidem");
    }

    const resultado = await api.register(nome, email, senha);

    if (resultado.success) {
      Alert.alert("Sucesso", "Conta criada!", [
        { text: "OK", onPress: () => router.replace("/(tabs)") }
      ]);
    } else {
      Alert.alert("Erro no Cadastro", resultado.message);
    }
  }

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >

      <View style={styles.headerContainer}>
        <View style={styles.iconContainer}>
          <Ionicons name="person-add" size={48} color="#10B981" />
        </View>
        <Text style={styles.title}>Criar Conta</Text>
        <Text style={styles.subtitle}>Junte-se à comunidade de palpiteiros</Text>
      </View>


      <View style={styles.card}>

        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={20} color="#64748B" style={styles.inputIcon} />
          <TextInput
            placeholder="Nome completo"
            value={nome}
            onChangeText={setNome}
            autoCapitalize="words"
            style={styles.input}
            placeholderTextColor="#94A3B8"
          />
        </View>


        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="#64748B" style={styles.inputIcon} />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
            placeholderTextColor="#94A3B8"
          />
        </View>


        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#64748B" style={styles.inputIcon} />
          <TextInput
            placeholder="Senha"
            secureTextEntry={!showPassword}
            value={senha}
            onChangeText={setSenha}
            style={styles.input}
            placeholderTextColor="#94A3B8"
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={showPassword ? "eye-outline" : "eye-off-outline"}
              size={20}
              color="#64748B"
            />
          </TouchableOpacity>
        </View>


        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#64748B" style={styles.inputIcon} />
          <TextInput
            placeholder="Confirmar senha"
            secureTextEntry={!showConfirmPassword}
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
            style={styles.input}
            placeholderTextColor="#94A3B8"
          />
          <TouchableOpacity
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
              size={20}
              color="#64748B"
            />
          </TouchableOpacity>
        </View>


        <View style={styles.passwordHint}>
          <Ionicons name="information-circle-outline" size={16} color="#64748B" />
          <Text style={styles.passwordHintText}>
            Use pelo menos 8 caracteres com letras e números
          </Text>
        </View>


        <TouchableOpacity
          onPress={handleRegister}
          style={styles.registerButton}
          activeOpacity={0.8}
        >
          <Text style={styles.registerButtonText}>Criar minha conta</Text>
          <Ionicons name="checkmark-circle" size={22} color="#FFFFFF" />
        </TouchableOpacity>


        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>ou</Text>
          <View style={styles.dividerLine} />
        </View>


        <TouchableOpacity
          onPress={() => router.push("/(auth)/login")}
          style={styles.loginButton}
          activeOpacity={0.7}
        >
          <Ionicons name="log-in-outline" size={20} color="#10B981" />
          <Text style={styles.loginButtonText}>Já tenho uma conta</Text>
        </TouchableOpacity>
      </View>


      <Text style={styles.footer}>
        Ao criar uma conta, você concorda com nossos{"\n"}
        <Text style={styles.footerLink}>Termos de Uso</Text> e <Text style={styles.footerLink}>Política de Privacidade</Text>
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#F8FAFB",
  },

  container: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 40,
  },

  headerContainer: {
    alignItems: "center",
    marginBottom: 36,
  },

  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#D1FAE5",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    shadowColor: "#10B981",
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },

  title: {
    fontSize: 36,
    fontWeight: "900",
    color: "#0F172A",
    marginBottom: 8,
    letterSpacing: -0.5,
  },

  subtitle: {
    fontSize: 16,
    color: "#64748B",
    fontWeight: "500",
    textAlign: "center",
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 28,
    borderRadius: 24,
    shadowColor: "#0F172A",
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
    borderWidth: 1,
    borderColor: "rgba(15, 23, 42, 0.06)",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#E2E8F0",
    borderRadius: 16,
    marginBottom: 16,
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 16,
  },

  inputIcon: {
    marginRight: 12,
  },

  input: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    color: "#0F172A",
    fontWeight: "500",
  },

  eyeIcon: {
    padding: 4,
  },

  passwordHint: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#F0F9FF",
    padding: 12,
    borderRadius: 12,
    marginBottom: 24,
  },

  passwordHintText: {
    flex: 1,
    fontSize: 13,
    color: "#64748B",
    fontWeight: "500",
  },

  registerButton: {
    backgroundColor: "#10B981",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 18,
    borderRadius: 16,
    shadowColor: "#10B981",
    shadowOpacity: 0.3,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },

  registerButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "800",
    letterSpacing: 0.5,
  },

  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },

  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E2E8F0",
  },

  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    color: "#94A3B8",
    fontWeight: "600",
  },

  loginButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#D1FAE5",
    backgroundColor: "#ECFDF5",
  },

  loginButtonText: {
    color: "#10B981",
    fontSize: 16,
    fontWeight: "700",
  },

  footer: {
    marginTop: 32,
    textAlign: "center",
    fontSize: 13,
    color: "#64748B",
    lineHeight: 20,
  },

  footerLink: {
    color: "#10B981",
    fontWeight: "600",
  },
});