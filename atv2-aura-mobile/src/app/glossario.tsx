import { useEffect, useState } from "react";
import { Stack } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { listarGlossario, mensagemDeErro } from "@/services/api";
import { GlossaryTerm } from "@/types/glossary";

export default function Glossario() {
  const [termos, setTermos] = useState<GlossaryTerm[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [tentativa, setTentativa] = useState(0);

  useEffect(() => {
    let cancelado = false;
    setCarregando(true);
    setErro("");
    listarGlossario()
      .then((dados) => {
        if (!cancelado) setTermos(dados);
      })
      .catch((e) => {
        if (!cancelado) setErro(mensagemDeErro(e, "o glossário"));
      })
      .finally(() => {
        if (!cancelado) setCarregando(false);
      });
    return () => {
      cancelado = true;
    };
  }, [tentativa]);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView edges={["top", "left", "right"]} style={styles.header}>
        <View style={styles.headerContent}>
          <Text role="heading" style={styles.headerTitulo}>
            Glossário
          </Text>
        </View>
      </SafeAreaView>

      <SafeAreaView edges={["bottom", "left", "right"]} style={styles.body}>
        {carregando ? (
          <ActivityIndicator size="large" color="#9B51F5" style={{ marginTop: 40 }} />
        ) : erro !== "" ? (
          <View style={styles.erroBox}>
            <Text style={styles.erro}>{erro}</Text>
            <TouchableOpacity style={styles.botao} onPress={() => setTentativa((t) => t + 1)}>
              <Text style={styles.botaoTexto}>Tentar novamente</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={termos}
            keyExtractor={(item) => String(item.id)}
            contentContainerStyle={styles.content}
            ItemSeparatorComponent={() => <View style={{ height: 18 }} />}
            ListEmptyComponent={<Text style={styles.erro}>Nenhum termo cadastrado.</Text>}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text role="heading" style={styles.termo}>
                  {item.termo}
                </Text>
                <View style={styles.descricaoBox}>
                  <Text style={styles.descricao}>{item.descricao}</Text>
                </View>
              </View>
            )}
          />
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F2F2F2" },
  header: { backgroundColor: "#9B51F5" },
  headerContent: {
    width: "100%",
    maxWidth: 600,
    alignSelf: "center",
    paddingHorizontal: 50,
    paddingTop: 38,
    paddingBottom: 36,
  },
  headerTitulo: {
    color: "#FFFFFF",
    fontSize: 34,
    lineHeight: 41,
    fontWeight: "700",
  },
  body: { flex: 1 },
  content: { paddingHorizontal: 48, paddingTop: 40, paddingBottom: 56, width: "100%", maxWidth: 596, alignSelf: "center" },
  erroBox: { padding: 24, alignItems: "center", gap: 16 },
  erro: { color: "#C62828", textAlign: "center" },
  botao: { backgroundColor: "#9B51F5", paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 },
  botaoTexto: { color: "#FFFFFF", fontWeight: "600" },
  card: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CDCDCD",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 20,
    gap: 8,
  },
  termo: { color: "#000000", fontSize: 16, lineHeight: 20, fontWeight: "700" },
  descricaoBox: {
    backgroundColor: "#F0E6FC",
    borderColor: "#CFC1DC",
    borderWidth: 1,
    borderRadius: 3,
    paddingHorizontal: 9,
    paddingVertical: 8,
  },
  descricao: { color: "#242424", fontSize: 12, lineHeight: 15 },
});
