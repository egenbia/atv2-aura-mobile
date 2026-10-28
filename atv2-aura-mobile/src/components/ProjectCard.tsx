import { View, Text, StyleSheet } from "react-native";
import StatusBadge from "./StatusBadge";
import { Project } from "../types/project";

type Props = { projeto: Project };

export default function ProjectCard({ projeto }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.titulo}>{projeto.titulo}</Text>
      <View style={styles.datas}>
        <Text style={styles.data}>Criado em {projeto.criadoEm}</Text>
        <Text style={styles.data}>Atualizado em {projeto.atualizadoEm}</Text>
      </View>
      <Text style={styles.artigos}>{projeto.totalArtigos} Artigos</Text>
      <View style={styles.badges}>
        <StatusBadge status="incluido" />
        <StatusBadge status="excluido" />
        <StatusBadge status="pendente" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: "#fff", borderRadius: 16, padding: 14, marginBottom: 16, borderWidth: 1, borderColor: "#ddd" },
  titulo: { fontSize: 16, fontWeight: "bold" },
  datas: { flexDirection: "row", justifyContent: "space-between", marginTop: 4 },
  data: { fontSize: 11, color: "#444" },
  artigos: { fontSize: 12, fontWeight: "bold", marginVertical: 6 },
  badges: { flexDirection: "row", gap: 8 },
});