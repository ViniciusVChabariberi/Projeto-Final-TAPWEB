import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// MOCK API
const RANKING_DATA = [
  { id: '1', nome: 'Carlos Silva', pontos: 150, posicao: 1 },
  { id: '2', nome: 'Ana Paula', pontos: 140, posicao: 2 },
  { id: '3', nome: 'Marcos Dev', pontos: 120, posicao: 3 },
  { id: '4', nome: 'Julia Frontend', pontos: 90, posicao: 4 },
  { id: '5', nome: 'Pedro Santos', pontos: 85, posicao: 5 },
  { id: '6', nome: 'Beatriz Lima', pontos: 78, posicao: 6 },
];

export default function RankingScreen() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const renderItem = ({ item }: { item: any }) => {
    const isTop3 = item.posicao <= 3;
    const isSelected = selectedId === item.id;

    return (
      <TouchableOpacity 
        activeOpacity={0.7}
        onPress={() => setSelectedId(isSelected ? null : item.id)}
      >
        <View style={[
          styles.row, 
          isTop3 && styles.rowTop3,
          isSelected && styles.rowSelected
        ]}>
          <View style={styles.posContainer}>
            <Text style={[styles.position, isTop3 && styles.positionTop3]}>
              {item.posicao}º
            </Text>
            {isTop3 && (
              <Ionicons 
                name={item.posicao === 1 ? "trophy" : "medal"} 
                size={16} 
                color={item.posicao === 1 ? "#FFD700" : item.posicao === 2 ? "#C0C0C0" : "#CD7F32"}
                style={styles.medal}
              />
            )}
          </View>

          <View style={styles.infoContainer}>
            <Text style={[styles.name, isTop3 && styles.nameTop3]}>
              {item.nome}
            </Text>
          </View>

          <View style={styles.pointsContainer}>
            <Text style={[styles.points, isTop3 && styles.pointsTop3]}>
              {item.pontos}
            </Text>
            <Text style={styles.ptsLabel}>pts</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <View style={styles.trophyContainer}>
          <Ionicons name="trophy" size={48} color="#FFD700" />
        </View>
        <Text style={styles.title}>Ranking Geral</Text>
        <Text style={styles.subtitle}>Melhores jogadores da temporada</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableTitle}>Pos</Text>
          <Text style={[styles.tableTitle, { flex: 1 }]}>Jogador</Text>
          <Text style={styles.tableTitle}>Pontos</Text>
        </View>

        <FlatList
          data={RANKING_DATA}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
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
    alignItems: "center",
    marginBottom: 28,
  },

  trophyContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#FEF3C7",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    
    shadowColor: "#F59E0B",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },

  title: {
    fontSize: 32,
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
    overflow: "hidden",
    
    shadowColor: "#0F172A",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    
    borderWidth: 1,
    borderColor: "rgba(15, 23, 42, 0.06)",
  },

  tableHeader: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#F8FAFC",
    borderBottomWidth: 2,
    borderColor: "#E2E8F0",
  },

  tableTitle: {
    fontWeight: "800",
    fontSize: 13,
    color: "#64748B",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
  },

  rowTop3: {
    backgroundColor: "#FFFBEB",
    borderLeftWidth: 4,
    borderLeftColor: "#F59E0B",
  },

  rowSelected: {
    backgroundColor: "#ECFDF5",
    borderLeftWidth: 4,
    borderLeftColor: "#10B981",
  },

  separator: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginHorizontal: 20,
  },

  posContainer: {
    width: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },

  medal: {
    marginTop: 2,
  },

  infoContainer: {
    flex: 1,
    paddingHorizontal: 12,
  },

  pointsContainer: {
    alignItems: "flex-end",
    marginRight: 8,
  },

  position: {
    fontSize: 18,
    fontWeight: "700",
    color: "#64748B",
  },

  positionTop3: {
    fontSize: 24,
    fontWeight: "900",
    color: "#D97706",
  },

  name: {
    fontSize: 16,
    color: "#1E293B",
    fontWeight: "700",
  },

  nameTop3: {
    fontSize: 17,
    color: "#92400E",
  },

  points: {
    fontSize: 22,
    fontWeight: "900",
    color: "#0EA5E9",
  },

  pointsTop3: {
    fontSize: 24,
    color: "#D97706",
  },

  ptsLabel: {
    fontSize: 12,
    color: "#94A3B8",
    fontWeight: "600",
    marginTop: 2,
  },
});