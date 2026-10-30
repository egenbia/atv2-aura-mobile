import { Stack } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const termos = ["PICO", "RSL", "Critérios de inclusão", "PLN"];

const descricao =
  "Estratégia para montar a pergunta de pesquisa: População, Intervenção, Comparação e Outcome (desfecho).";

export default function Glossario() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView edges={["top", "left", "right"]} style={styles.header}>
        <View style={styles.headerContent}>
          <Text role="heading" style={styles.headerTitulo}>Glossário</Text>
        </View>
      </SafeAreaView>

      <SafeAreaView edges={["bottom", "left", "right"]} style={styles.body}>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.lista}>
            {termos.map((termo) => (
              <View key={termo} style={styles.card}>
                <Text role="heading" style={styles.termo}>{termo}</Text>
                <View style={styles.descricaoBox}>
                  <Text style={styles.descricao}>{descricao}</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
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
  headerTitulo: { color: "#FFFFFF", fontSize: 34, lineHeight: 41, fontWeight: "700" },
  body: { flex: 1 },
  content: { paddingHorizontal: 48, paddingTop: 40, paddingBottom: 56 },
  lista: { width: "100%", maxWidth: 500, alignSelf: "center", gap: 18 },
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
