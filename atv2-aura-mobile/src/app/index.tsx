import { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Link } from "expo-router";
import ProjectCard from "@/components/ProjectCard";
import { listarProjetos, mensagemDeErro } from "@/services/api";
import { Project } from "@/types/project";

export default function Home() {
  const [projetos, setProjetos] = useState<Project[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [atualizando, setAtualizando] = useState(false);
  const [erro, setErro] = useState("");
  const [tentativa, setTentativa] = useState(0);

  const carregar = useCallback(async () => {
    try {
      setErro("");
      setProjetos(await listarProjetos());
    } catch (e) {
      setErro(mensagemDeErro(e, "os projetos"));
    }
  }, []);

  // Busca inicial (e nova tentativa quando o usuário toca em "Tentar novamente")
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

  // Pull-to-refresh
  async function aoAtualizar() {
    setAtualizando(true);
    await carregar();
    setAtualizando(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitulo}>Seus Projetos</Text>
      </View>

      {carregando ? (
        <ActivityIndicator
          size="large"
          color="#9B59F6"
          style={{ marginTop: 40 }}
        />
      ) : erro !== "" && projetos.length === 0 ? (
        <View style={styles.erroBox}>
          <Text style={styles.erro}>{erro}</Text>
          <TouchableOpacity
            style={styles.botao}
            onPress={() => setTentativa((t) => t + 1)}
          >
            <Text style={styles.botaoTexto}>Tentar novamente</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={projetos}
          keyExtractor={(item) => String(item.id)}
          refreshing={atualizando}
          onRefresh={aoAtualizar}
          ListHeaderComponent={
            erro !== "" ? <Text style={styles.erro}>{erro}</Text> : undefined
          }
          ListEmptyComponent={
            <Text style={styles.vazio}>Nenhum projeto encontrado.</Text>
          }
          renderItem={({ item }) => (
            <Link
              href={{
                pathname: "/artigos",
                params: { projetoId: String(item.id) },
              }}
              asChild
            >
              <TouchableOpacity activeOpacity={0.8}>
                <ProjectCard projeto={item} />
              </TouchableOpacity>
            </Link>
          )}
          contentContainerStyle={{ padding: 20 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F0F0F0" },
  header: {
    backgroundColor: "#9B59F6",
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 30,
  },
  headerTitulo: { color: "#fff", fontSize: 28, fontWeight: "bold" },
  erroBox: { padding: 24, alignItems: "center", gap: 16 },
  erro: { color: "#C62828", textAlign: "center", marginVertical: 12 },
  vazio: { textAlign: "center", color: "#555", marginTop: 40 },
  botao: {
    backgroundColor: "#9B59F6",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  botaoTexto: { color: "#fff", fontWeight: "600" },
});
