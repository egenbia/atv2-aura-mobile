import { useState } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import ProjectCard from "@/components/ProjectCard";
// import { api } from "@/services/api";   // volta quando ligar no backend
import { Project } from "@/types/project";

export default function Home() {
  const [projetos, setProjetos] = useState<Project[]>([
    { id: 1, titulo: "Inteligência Artificial", criadoEm: "12/10/2026", atualizadoEm: "16/10/2026", totalArtigos: 12, incluidos: 5, excluidos: 3, pendentes: 4 },
    { id: 2, titulo: "Inteligência Artificial", criadoEm: "12/10/2026", atualizadoEm: "16/10/2026", totalArtigos: 12, incluidos: 5, excluidos: 3, pendentes: 4 },
    { id: 3, titulo: "Inteligência Artificial", criadoEm: "12/10/2026", atualizadoEm: "16/10/2026", totalArtigos: 12, incluidos: 5, excluidos: 3, pendentes: 4 },
    { id: 4, titulo: "Inteligência Artificial", criadoEm: "12/10/2026", atualizadoEm: "16/10/2026", totalArtigos: 12, incluidos: 5, excluidos: 3, pendentes: 4 },
  ]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  // Quando o backend estiver pronto, descomente isto (e o import do api lá em cima):
  // useEffect(() => {
  //   api.get<Project[]>("/projetos")
  //     .then((res) => setProjetos(res.data))
  //     .catch(() => setErro("Não foi possível carregar os projetos."))
  //     .finally(() => setCarregando(false));
  // }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitulo}>Seus Projetos</Text>
      </View>

      {carregando && <ActivityIndicator size="large" color="#9B59F6" style={{ marginTop: 40 }} />}
      {erro !== "" && <Text style={styles.erro}>{erro}</Text>}

      <FlatList
        data={projetos}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <ProjectCard projeto={item} />}
        contentContainerStyle={{ padding: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F0F0F0" },
  header: { backgroundColor: "#9B59F6", paddingTop: 60, paddingBottom: 30, paddingHorizontal: 30 },
  headerTitulo: { color: "#fff", fontSize: 28, fontWeight: "bold" },
  erro: { color: "#C62828", textAlign: "center", marginTop: 20 },
});