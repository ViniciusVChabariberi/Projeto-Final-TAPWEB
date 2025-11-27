import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Modal, Pressable } from 'react-native';
import { api } from "../../services/api";

interface Partida {
  id: string;
  timeA: string;
  timeB: string;
  data: string;
  status?: string;
  placarA?: string | number;
  placarB?: string | number;
  resultadoRealA?: number;
  resultadoRealB?: number;
  placarRealA?: number;
  placarRealB?: number;
}

export default function DashboardScreen() {
  const [partidas, setPartidas] = useState<Partida[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchPartidas = async () => {
    try {
      setLoading(true);
      const dadosDoBack = await api.getPartidas();
      setPartidas(dadosDoBack);
    } catch (error) {
      console.log("Erro ao carregar dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartidas();
  }, []);

  const atualizarPalpite = (id: string, time: 'A' | 'B', valor: string) => {
    setPartidas(prev =>
      prev.map(p =>
        p.id === id
          ? { ...p, [time === "A" ? "placarA" : "placarB"]: valor }
          : p
      )
    );
  };

  const enviarPalpiteEspecifico = async (item: Partida) => {
    if (!item.placarA || !item.placarB) {
      alert("Preencha o placar!");
      return;
    }

    const resultado = await api.enviarPalpite(item.id, item.placarA, item.placarB);

    if (resultado.success) {
      setModalVisible(true);
    } else {
      alert("Erro: " + resultado.message);
    }
  };

  const renderCard = ({ item }: { item: any }) => {
    const statusNormalizado = item.status ? item.status.toLowerCase() : 'aberta';
    const isEncerrada = statusNormalizado === 'encerrada' || statusNormalizado === 'apurada';
    const realA = item.placarRealA ?? item.resultadoRealA;
    const realB = item.placarRealB ?? item.resultadoRealB;
    const acertou = isEncerrada && item.placarA == realA && item.placarB == realB;

    return (
      <View style={[
        styles.card,
        isEncerrada && (acertou ? styles.cardAcerto : styles.cardErro)
      ]}>

        <View style={styles.cardHeader}>
          <Text style={styles.date}>{item.data}</Text>
          {isEncerrada && (
            <View style={[styles.statusBadge, acertou ? styles.badgeAcerto : styles.badgeErro]}>
              <Text style={[styles.status, acertou ? styles.acerto : styles.erro]}>
                {acertou ? "✔ Acertou!" : "✘ Errou"}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.match}>
          <View style={styles.team}>
            <Text style={styles.teamName}>{item.timeA}</Text>

            {isEncerrada ? (
              <Text style={styles.scoreFinal}>
                {item.placarRealA} <Text style={styles.palpite}>({item.placarA})</Text>
              </Text>
            ) : (
              <TextInput
                style={styles.input}
                value={item.placarA}
                maxLength={2}
                keyboardType="numeric"
                onChangeText={t => atualizarPalpite(item.id, "A", t)}
                placeholder="0"
                placeholderTextColor="#CBD5E1"
              />
            )}
          </View>

          <Text style={styles.x}>×</Text>

          <View style={styles.team}>
            <Text style={styles.teamName}>{item.timeB}</Text>

            {isEncerrada ? (
              <Text style={styles.scoreFinal}>
                {item.placarRealB} <Text style={styles.palpite}>({item.placarB})</Text>
              </Text>
            ) : (
              <TextInput
                style={styles.input}
                value={item.placarB}
                maxLength={2}
                keyboardType="numeric"
                onChangeText={t => atualizarPalpite(item.id, "B", t)}
                placeholder="0"
                placeholderTextColor="#CBD5E1"
              />
            )}
          </View>
        </View>

        {!isEncerrada && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => enviarPalpiteEspecifico(item)}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Enviar Palpite</Text>
          </TouchableOpacity>
        )}

      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Meus Palpites</Text>
        <Text style={styles.subtitle}>Faça suas previsões e acompanhe os resultados</Text>
        <TouchableOpacity onPress={fetchPartidas}>
          <Text style={{ color: '#0EA5E9', marginTop: 5 }}>↻ Atualizar Lista</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={partidas}
        renderItem={renderCard}
        keyExtractor={i => i.id || Math.random().toString()}
        refreshing={loading}
        onRefresh={fetchPartidas}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      />



      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Palpite enviado!</Text>
            <Text style={styles.modalText}>Seu palpite foi registrado com sucesso.</Text>

            <Pressable
              onPress={() => setModalVisible(false)}
              style={styles.modalButton}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFB",
    paddingTop: 60,
    paddingHorizontal: 20,
  },

  header: {
    marginBottom: 28,
  },

  title: {
    fontSize: 34,
    fontWeight: "900",
    color: "#0F172A",
    marginBottom: 6,
    letterSpacing: -0.5,
  },

  subtitle: {
    fontSize: 15,
    color: "#64748B",
    fontWeight: "500",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,

    elevation: 4,
    shadowColor: "#0F172A",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },

    borderWidth: 1,
    borderColor: "rgba(15, 23, 42, 0.06)",
  },

  cardAcerto: {
    backgroundColor: "#ECFDF5",
    borderColor: "#10B981",
    borderWidth: 2,
  },

  cardErro: {
    backgroundColor: "#FEF2F2",
    borderColor: "#EF4444",
    borderWidth: 2,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  date: {
    fontSize: 13,
    color: "#64748B",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },

  badgeAcerto: {
    backgroundColor: "#D1FAE5",
  },

  badgeErro: {
    backgroundColor: "#FEE2E2",
  },

  status: {
    fontSize: 13,
    fontWeight: "800",
  },

  acerto: {
    color: "#059669",
  },

  erro: {
    color: "#DC2626",
  },

  match: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 16,
    paddingVertical: 8,
  },

  team: {
    flex: 1,
    alignItems: "center",
  },

  teamName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 10,
    textAlign: "center",
  },

  x: {
    fontSize: 24,
    fontWeight: "700",
    color: "#94A3B8",
    paddingHorizontal: 16,
  },

  input: {
    width: 64,
    height: 64,
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#CBD5E1",
    textAlign: "center",
    fontSize: 28,
    fontWeight: "800",
    color: "#0F172A",
  },

  scoreFinal: {
    fontSize: 32,
    fontWeight: "900",
    color: "#0F172A",
  },

  palpite: {
    fontSize: 18,
    color: "#64748B",
    fontWeight: "600",
  },

  button: {
    backgroundColor: "#0EA5E9",
    paddingVertical: 16,
    borderRadius: 14,
    marginTop: 12,
    alignItems: "center",

    shadowColor: "#0EA5E9",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },


  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  modalContent: {
    width: "85%",
    backgroundColor: "#FFF",
    padding: 24,
    borderRadius: 20,

    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 10,
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: "#0F172A",
    textAlign: "center",
    marginBottom: 6,
  },

  modalText: {
    textAlign: "center",
    fontSize: 15,
    color: "#475569",
    marginBottom: 20,
  },

  modalButton: {
    backgroundColor: "#0EA5E9",
    paddingVertical: 14,
    borderRadius: 14,
  },

  modalButtonText: {
    textAlign: "center",
    color: "#FFF",
    fontSize: 16,
    fontWeight: "800",
  },
});
