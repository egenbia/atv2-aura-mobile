import { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export type StatusArtigo = "Incluído" | "Excluído" | "Pendente";

export interface Article {
  id: number;
  titulo: string;
  autores: string;
  ano: number;
  status: StatusArtigo;
}

export default function Artigos() {
  const [artigos] = useState<Article[]>([
    {
      id: 1,
      titulo: "Aplicações de Aprendizado de Máquina no Apoio a Decisão Clínica",
      autores: "Neves, F.; Costa, M.",
      ano: 2020,
      status: "Incluído",
    },
    {
      id: 2,
      titulo: "Aplicações de Aprendizado de Máquina no Apoio a Decisão Clínica",
      autores: "Neves, F.; Costa, M.",
      ano: 2020,
      status: "Excluído",
    },
    {
      id: 3,
      titulo: "Aplicações de Aprendizado de Máquina no Apoio a Decisão Clínica",
      autores: "Neves, F.; Costa, M.",
      ano: 2020,
      status: "Pendente",
    },
    {
      id: 4,
      titulo: "Aplicações de Aprendizado de Máquina no Apoio a Decisão Clínica",
      autores: "Neves, F.; Costa, M.",
      ano: 2020,
      status: "Incluído",
    },
  ]);

  const renderStatusBadge = (status: StatusArtigo) => {
    switch (status) {
      case "Incluído":
        return (
          <View style={[styles.badge, styles.badgeIncluido]}>
            <Text style={styles.textIncluido}>Incluído</Text>
          </View>
        );
      case "Excluído":
        return (
          <View style={[styles.badge, styles.badgeExcluido]}>
            <Text style={styles.textExcluido}>Excluído</Text>
          </View>
        );
      case "Pendente":
        return (
          <View style={[styles.badge, styles.badgePendente]}>
            <Text style={styles.textPendente}>Pendente</Text>
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <SafeAreaView edges={["top", "left", "right"]} style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitulo}>Artigos</Text>
        </View>
      </SafeAreaView>

      <SafeAreaView edges={["bottom", "left", "right"]} style={styles.body}>
        <FlatList
          data={artigos}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={
            <Text style={styles.contadorTexto}>
              {artigos.length} artigos encontrados
            </Text>
          }
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardTitulo}>{item.titulo}</Text>
              <Text style={styles.cardAutores}>
                {item.autores} &nbsp; {item.ano}
              </Text>
              {renderStatusBadge(item.status)}
            </View>
          )}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
  },
  header: {
    backgroundColor: "#9B51F5",
  },
  headerContent: {
    width: "100%",
    maxWidth: 600,
    alignSelf: "center",
    paddingHorizontal: 28,
    paddingTop: 24,
    paddingBottom: 24,
  },
  headerTitulo: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "700",
  },
  body: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
    maxWidth: 500,
    width: "100%",
    alignSelf: "center",
  },
  contadorTexto: {
    fontSize: 15,
    color: "#4A4A4A",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginBottom: 16,
    alignItems: "flex-start",
  },
  cardTitulo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 8,
    lineHeight: 22,
  },
  cardAutores: {
    fontSize: 13,
    color: "#555555",
    marginBottom: 12,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
  },
  badgeIncluido: {
    backgroundColor: "#E8F8EE",
    borderColor: "#2E7D32",
  },
  textIncluido: {
    color: "#2E7D32",
    fontSize: 12,
    fontWeight: "500",
  },
  badgeExcluido: {
    backgroundColor: "#FDF0F0",
    borderColor: "#C62828",
  },
  textExcluido: {
    color: "#C62828",
    fontSize: 12,
    fontWeight: "500",
  },
  badgePendente: {
    backgroundColor: "#FEF9E7",
    borderColor: "#B78103",
  },
  textPendente: {
    color: "#B78103",
    fontSize: 12,
    fontWeight: "500",
  },
});
