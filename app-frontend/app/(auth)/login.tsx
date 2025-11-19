import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleLogin() {
    router.replace("/(tabs)");
  }

  return (
    <View style={styles.container}>
      
      <View style={styles.headerContainer}>
        <View style={styles.iconContainer}>
          <Ionicons name="football" size={48} color="#0EA5E9" />
        </View>
        <Text style={styles.title}>Bem-vindo!</Text>
        <Text style={styles.subtitle}>Faça login para continuar</Text>
      </View>

  
      <View style={styles.card}>
      
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

        <TouchableOpacity 
          style={styles.forgotPassword}
          onPress={() => router.push("/(auth)/forgot")} 
        >
          <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
        </TouchableOpacity>
    
      
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.loginButton}
          activeOpacity={0.8}
        >
          <Text style={styles.loginButtonText}>Entrar</Text>
          <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
        </TouchableOpacity>

        
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>ou</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity 
          onPress={() => router.push("/(auth)/register")}
          style={styles.registerButton}
          activeOpacity={0.7}
        >
          <Ionicons name="person-add-outline" size={20} color="#0EA5E9" />
          <Text style={styles.registerButtonText}>Criar nova conta</Text>
        </TouchableOpacity>
      </View>

    
      <Text style={styles.footer}>
        Ao continuar, você concorda com nossos{"\n"}
        <Text style={styles.footerLink}>Termos de Uso</Text> e <Text style={styles.footerLink}>Política de Privacidade</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    backgroundColor: "#F8FAFB",
  },

  headerContainer: {
    alignItems: "center",
    marginBottom: 40,
  },

  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#E0F2FE",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    shadowColor: "#0EA5E9",
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

  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 24,
  },

  forgotPasswordText: {
    color: "#0EA5E9",
    fontSize: 14,
    fontWeight: "600",
  },

  loginButton: {
    backgroundColor: "#0EA5E9",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 18,
    borderRadius: 16,
    shadowColor: "#0EA5E9",
    shadowOpacity: 0.3,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },

  loginButtonText: {
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

  registerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#E0F2FE",
    backgroundColor: "#F0F9FF",
  },

  registerButtonText: {
    color: "#0EA5E9",
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
    color: "#0EA5E9",
    fontWeight: "600",
  },
});