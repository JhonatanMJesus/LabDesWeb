import React, { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import styles from "./VasoCreate.module.css";

// Definindo o tipo de mensagem para estilização opcional
type MessageType = 'success' | 'error' | null;

const VasoCreate: React.FC = () => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [foto, setFoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
    // 1. NOVO ESTADO PARA A MENSAGEM
    const [message, setMessage] = useState<string | null>(null);
    const [messageType, setMessageType] = useState<MessageType>(null); // Para estilização

  const navigate = useNavigate();
    // Função para definir a mensagem e limpá-la após 7 segundos (opcional)
    const displayMessage = (text: string, type: MessageType = 'error') => {
        setMessage(text);
        setMessageType(type);
        setTimeout(() => {
            setMessage(null);
            setMessageType(null);
        }, 7000); // Mensagem some após 7 segundos
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null); // Limpa a mensagem anterior
   
    if (!nome.trim()) return displayMessage("O nome do vaso é obrigatório.", 'error');

    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("descricao", descricao);
    if (foto) formData.append("foto", foto);

    try {
      await api.post("/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      displayMessage("Vaso cadastrado com sucesso!", 'success'); 
      setTimeout(() => navigate("/"), 2000); // Redireciona 2 segundos após o sucesso.

    } catch (error) {
      console.error("Erro ao cadastrar vaso:", error);
      displayMessage("Erro ao cadastrar vaso. Tente novamente.", 'error');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFoto(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.card}>
        <h2 className={styles.title}>Cadastrar Novo Vaso</h2>
       
       
        {message && (
            <div className={`${styles.message} ${styles[messageType!]}`}>
                {message}
            </div>
        )}
        
       
        <div className={styles.formGroup}>
            <label className={styles.label}>Nome</label>
            <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className={styles.input}
                required
            />
        </div>

  
        <div className={styles.formGroup}>
            <label className={styles.label}>Descrição</label>
            <textarea
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                className={styles.input}
                rows={3}
            />
        </div>

     
        <div className={styles.formGroup}>
            <label className={styles.label}>Imagem do Vaso</label>
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className={styles.input}
            />
        </div>

       
        {preview && (
          <div className="mt-3 flex justify-center">
            <img
              src={preview}
              alt="Pré-visualização do vaso"
              className="max-w-[200px] rounded-lg shadow-md border border-gray-200"
            />
          </div>
        )}

        <button type="submit" className="bg-green-600 text-white font-semibold py-2 px-4 rounded-lg">
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default VasoCreate;