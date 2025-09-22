import React, { useState, useEffect } from "react";
import axios from "axios";
import { Coluna } from "./Coluna";
import { DndContext } from "@dnd-kit/core";

export function Quadro() {
  const [tarefas, setTarefas] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/tarefa/")
      .then((response) => setTarefas(response.data))
      .catch((error) => console.error("Erro ao carregar tarefas:", error));
  }, []);

  // Atualiza tarefa no estado local
  function atualizarStatusTarefa(id, novoStatus) {
    setTarefas((prev) =>
      prev.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, status: novoStatus } : tarefa
      )
    );
  }

  // Atualiza tarefa via drag and drop
  function handleDragEnd(event) {
    const { active, over } = event;
    if (over && active && active.id !== over.id) {
      const tarefaId = Number(active.id);
      const novaColuna = over.id;

      // Atualiza localmente
      atualizarStatusTarefa(tarefaId, novaColuna);

      // Atualiza backend
      axios
        .patch(`http://127.0.0.1:8000/api/tarefa/${tarefaId}/`, { status: novaColuna })
        .catch((err) => console.error("Erro ao atualizar status:", err));
    }
  }

  // Filtra as tarefas por status
  const tarefasAfazer = tarefas.filter((t) => t.status === "A");
  const tarefasFazendo = tarefas.filter((t) => t.status === "F");
  const tarefasPronto = tarefas.filter((t) => t.status === "P");

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <main className="main">
        <div className="titulopg">
          <h1>Meu quadro</h1>
        </div>
        <section className="conteiner">
          <Coluna
            id="A"
            titulo="A fazer"
            tarefas={tarefasAfazer}
            atualizarStatusTarefa={atualizarStatusTarefa}
          />
          <Coluna
            id="F"
            titulo="Fazendo"
            tarefas={tarefasFazendo}
            atualizarStatusTarefa={atualizarStatusTarefa}
          />
          <Coluna
            id="P"
            titulo="Pronto"
            tarefas={tarefasPronto}
            atualizarStatusTarefa={atualizarStatusTarefa}
          />
        </section>
      </main>
    </DndContext>
  );
}
