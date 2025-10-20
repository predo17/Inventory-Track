"use client";

import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

type DeleteButtonProps = {
  id: string;
  action: (formData: FormData) => Promise<void>;
};

export default function DeleteButton({ id, action }: DeleteButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // impede envio automático

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Mostra alerta de confirmação
    const result = await Swal.fire({
      title: "Tem certeza?",
      text: "Deseja realmente excluir este produto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sim, deletar!",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        setLoading(true);
        // Envia para o servidor (mantendo use server!)
        await action(formData);

        Swal.fire({
          title: "Excluído!",
          text: "O produto foi removido com sucesso.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (error) {
        Swal.fire({
          title: "Erro!",
          text: "Não foi possível excluir o produto.",
          icon: "error",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} action={action}>
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        disabled={loading}
        className={`relative text-red-500 cursor-pointer transition hover:text-red-600 `}
      >
        {loading ? (
          <span className="text-red-500 flex items-center justify-center w-5.5 h-5.5">
            <span className="w-4.5 h-4.5 border-2 border-r-red-600 bottom-t-transparent rounded-full animate-spin"></span>
          </span>
        ) : (
          <FaTrashAlt />
        )}
      </button>
    </form>
  );
}
