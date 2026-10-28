import { View, Text, StyleSheet } from "react-native";

export type Status = "incluido" | "excluido" | "pendente";

const cores = {
  incluido: { bg: "#E6F7E6", borda: "#2E9E2E", texto: "#2E9E2E", label: "Incluído" },
  excluido: { bg: "#FBE6E6", borda: "#C62828", texto: "#C62828", label: "Excluído" },
  pendente: { bg: "#FFF8E1", borda: "#B8860B", texto: "#B8860B", label: "Pendente" },
};

type Props = { status: Status; quantidade?: number };

export default function StatusBadge({ status, quantidade }: Props) {
  const c = cores[status];
  return (
    <View style={[styles.badge, { backgroundColor: c.bg, borderColor: c.borda }]}>
      <Text style={[styles.texto, { color: c.texto }]}>
        {c.label}{quantidade !== undefined ? ` (${quantidade})` : ""}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { borderWidth: 1, paddingHorizontal: 10, paddingVertical: 2, flex: 1, alignItems: "center" },
  texto: { fontSize: 12 },
});