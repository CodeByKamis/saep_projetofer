import { Tarefa } from "./Tarefa";
import { useDroppable } from "@dnd-kit/core";

export function Coluna({ id, titulo, tarefas = [], atualizarStatusTarefa }) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <section
      className="coluna"
      ref={setNodeRef}
      style={{
        minHeight: "300px",
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "4px",
      }}
    >
      <h2>{titulo}</h2>
      {tarefas.map((tarefa) => (
        <Tarefa
          key={tarefa.id}
          tarefa={tarefa}
          atualizarStatusTarefa={atualizarStatusTarefa}
        />
      ))}
    </section>
  );
}
