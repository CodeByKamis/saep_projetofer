import axios from "axios"; 
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDraggable } from "@dnd-kit/core";

export function Tarefa({ tarefa, atualizarStatusTarefa }) {
  const navigate = useNavigate();
  const [novoStatus, setNovoStatus] = useState(tarefa.status);

  // Drag apenas no header (handle)
  const { attributes, listeners, setNodeRef: setHandleRef, transform } = useDraggable({
    id: tarefa.id.toString(),
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 999,
        position: "relative",
      }
    : undefined;

  async function excluirTarefa(id) {
    if (window.confirm("Tem certeza que deseja excluir esta tarefa?")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/tarefa/${id}/`);
        alert("Tarefa excluída com sucesso!");
        window.location.reload();
      } catch (error) {
        console.error("Erro ao excluir tarefa:", error);
        alert("Erro ao excluir tarefa.");
      }
    }
  }

  function handleEditar() {
    navigate(`/editarTarefa/${tarefa.id}`);
  }

  async function alterarStatus(e) {
    e.preventDefault();
    try {
      await axios.patch(`http://127.0.0.1:8000/api/tarefa/${tarefa.id}/`, {
        status: novoStatus,
      });
      alert("Status alterado com sucesso!");
      atualizarStatusTarefa(tarefa.id, novoStatus);
    } catch (error) {
      console.error("Erro ao alterar status:", error.response?.data || error);
      alert("Erro ao alterar status.");
    }
  }

  return (
    <article className="card-tarefa" style={style}>
      {/* Apenas este header é a "handle" do drag */}
      <header ref={setHandleRef} {...listeners} {...attributes} style={{ cursor: "grab" }}>
        <h3 id={`tarefa-${tarefa.id}`}>{tarefa.descricao}</h3>
      </header>

      <dl className="centralizar">
        <dt>Setor:</dt>
        <dd>{tarefa.nomeSetor}</dd>
        <dt>Prioridade:</dt>
        <dd>{tarefa.prioridade}</dd>
      </dl>

      <div>
        <button onClick={handleEditar}>Editar</button>
        <button onClick={() => excluirTarefa(tarefa.id)}>Excluir</button>
      </div>

      <form className="tarefa__status" onSubmit={alterarStatus}>
        <label>Status:</label>
        <select
          id={`status-${tarefa.id}`}
          name="status"
          value={novoStatus}
          onChange={(e) => setNovoStatus(e.target.value)}
        >
          <option value="">Selecione</option>
          <option value="A">A fazer</option>
          <option value="F">Fazendo</option>
          <option value="P">Pronto</option>
        </select>
        <button type="submit">Alterar Status</button>
      </form>
    </article>
  );
}
