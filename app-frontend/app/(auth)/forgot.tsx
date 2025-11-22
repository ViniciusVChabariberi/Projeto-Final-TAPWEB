import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);

  function handleReset() {
    setShowModal(true);
  }

  return (
    <View style={styles.container}>
      
      <View style={styles.headerContainer}>
        <View style={styles.iconContainer}>
          <Ionicons name="mail-open-outline" size={48} color="#0EA5E9" />
        </View>
        <Text style={styles.title}>Esqueceu a senha?</Text>
        <Text style={styles.subtitle}>Digite seu email para recuperar o acesso</Text>
      </View>

      <View style={styles.card}>
        
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="#64748B" style={styles.inputIcon} />
          <TextInput
            placeholder="Digite seu email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
            placeholderTextColor="#94A3B8"
          />
        </View>

        <TouchableOpacity
          onPress={handleReset}
          style={styles.resetButton}
          activeOpacity={0.8}
        >
          <Text style={styles.resetButtonText}>Enviar link de recuperação</Text>
          <Ionicons name="send-outline" size={20} color="#FFFFFF" />
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back-outline" size={20} color="#0EA5E9" />
          <Text style={styles.backButtonText}>Voltar ao Login</Text>
        </TouchableOpacity>

      </View>

      
  
      <Modal transparent visible={showModal} animationType="fade">
        <View style={modalStyles.overlay}>
          <View style={modalStyles.modalBox}>

            <Text style={modalStyles.modalTitle}>Link enviado!</Text>
            <Text style={modalStyles.modalSubtitle}>
              Enviamos um link de recuperação para o seu email.
            </Text>

            <TouchableOpacity
              style={modalStyles.modalButton}
              onPress={() => setShowModal(false)}
            >
              <Text style={modalStyles.modalButtonText}>Fechar</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

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
    fontSize: 30,
    fontWeight: "900",
    color: "#0F172A",
    marginBottom: 8,
    letterSpacing: -0.5,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 16,
    color: "#64748B",
    fontWeight: "500",
    textAlign: "center",
    lineHeight: 20,
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
    marginBottom: 24,
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

  resetButton: {
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
    marginBottom: 20,
  },

  resetButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "800",
    letterSpacing: 0.5,
  },

  backButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#E2E8F0",
    backgroundColor: "#F8FAFC",
  },

  backButtonText: {
    color: "#0EA5E9",
    fontSize: 15,
    fontWeight: "700",
  },
});




const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },

  modalBox: {
    width: "100%",
    borderRadius: 24,
    padding: 26,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
    alignItems: "center",
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: "900",
    marginBottom: 8,
    color: "#0F172A",
  },

  modalSubtitle: {
    fontSize: 16,
    color: "#475569",
    textAlign: "center",
    marginBottom: 20,
  },

  modalButton: {
    backgroundColor: "#0EA5E9",
    paddingVertical: 14,
    width: "100%",
    alignItems: "center",
    borderRadius: 14,
  },

  modalButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
});
