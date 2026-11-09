import { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { listarArtigos, mensagemDeErro } from "@/services/api";
import { Article } from "@/types/article";
import { Status } from "@/types/status";

const RotulosStatus: Record<Status, string> = {
  incluido: "Incluído",
  excluido: "Excluído",
  pendente: "Pendente",
};

export default function Artigos() {
  const { projetoId } = useLocalSearchParams<{ projetoId?: string }>();

  const [artigos, setArtigos] = useState<Article[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [atualizando, setAtualizando] = useState(false);
  const [erro, setErro] = useState("");
  const [tentativa, setTentativa] = useState(0);

  const carregar = useCallback(async () => {
    try {
      setErro("");
      setArtigos(await listarArtigos(projetoId ? Number(projetoId) : undefined));
    } catch (e) {
      setErro(mensagemDeErro(e, "os artigos"));
    }
  }, [projetoId]);

  useEffect(() => {
    let cancelado = false;
    setCarregando(true);
    carregar().finally(() => {
      if (!cancelado) setCarregando(false);
    });
    return () => {
      cancelado = true;
    };
  }, [carregar, tentativa]);

  async function aoAtualizar() {
    setAtualizando(true);
    await carregar();
    setAtualizando(false);
  }

  const renderStatusBadge = (status: Status) => {
    switch (status) {
      case "incluido":
        return (
          <View style={[styles.badge, styles.badgeIncluido]}>
            <Text style={styles.textIncluido}>{RotulosStatus[status]}</Text>
          </View>
        );
      case "excluido":
        return (
          <View style={[styles.badge, styles.badgeExcluido]}>
            <Text style={styles.textExcluido}>{RotulosStatus[status]}</Text>
          </View>
        );
      case "pendente":
        return (
          <View style={[styles.badge, styles.badgePendente]}>
            <Text style={styles.textPendente}>{RotulosStatus[status]}</Text>
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
        {carregando ? (
          <ActivityIndicator size="large" color="#9B51F5" style={{ marginTop: 40 }} />
        ) : erro !== "" && artigos.length === 0 ? (
          <View style={styles.erroBox}>
            <Text style={styles.erro}>{erro}</Text>
            <TouchableOpacity style={styles.botao} onPress={() => setTentativa((t) => t + 1)}>
              <Text style={styles.botaoTexto}>Tentar novamente</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={artigos}
            keyExtractor={(item) => String(item.id)}
            contentContainerStyle={styles.listContent}
            refreshing={atualizando}
            onRefresh={aoAtualizar}
            ListHeaderComponent={
              <>
                {erro !== "" && <Text style={styles.erro}>{erro}</Text>}
                <Text style={styles.contadorTexto}>
                  {artigos.length} artigos encontrados
                </Text>
              </>
            }
            ListEmptyComponent={<Text style={styles.contadorTexto}>Nenhum artigo neste projeto.</Text>}
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
        )}
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
  erroBox: { padding: 24, alignItems: "center", gap: 16 },
  erro: { color: "#C62828", textAlign: "center" },
  botao: { backgroundColor: "#9B51F5", paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 },
  botaoTexto: { color: "#FFFFFF", fontWeight: "600" },
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
