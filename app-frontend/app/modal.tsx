import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { router } from "expo-router";

export default function ModalScreen() {
  return (
    <View style={styles.overlay}>
     
      <View style={styles.card}>
        <Text style={styles.title}>Informação</Text>

        <TouchableOpacity 
          style={styles.button}
          onPress={() => router.dismiss()}
        >
          <Text style={styles.buttonText}>Fechar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  card: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    padding: 28,
    borderRadius: 24,

    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },

  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 8,
  },

  message: {
    fontSize: 16,
    color: "#475569",
    marginBottom: 24,
  },

  button: {
    backgroundColor: "#0EA5E9",
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",

    shadowColor: "#0EA5E9",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },

  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
