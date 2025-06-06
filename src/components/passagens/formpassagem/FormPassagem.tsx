import { useState, useContext, useEffect, type ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type Carona from "../../../models/Carona";
import type Passagem from "../../../models/Passagem";
import { buscar, atualizar, cadastrar } from "../../../services/Service";

function FormPassagem() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [caronas, setCarona] = useState<Carona[]>([]);
  const [passagem, setPassagem] = useState<Passagem>({} as Passagem);
  const { id } = useParams<{ id: string }>();
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarPassagemPorId(id: string) {
    try {
      await buscar(`/passagens/${id}`, setPassagem, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (
        error.toString().includes("403") ||
        error.toString().includes("401")
      ) {
        handleLogout();
      }
    }
  }

  async function buscarcaronaPorId(id: string) {
    try {
      await buscar(`/caronas/${id}`, setCarona, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (
        error.toString().includes("403") ||
        error.toString().includes("401")
      ) {
        handleLogout();
      }
    }
  }

  async function buscarCaronas() {
    try {
      await buscar("/caronas", setCarona, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (
        error.toString().includes("403") ||
        error.toString().includes("401")
      ) {
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === "") {
      alert("Você precisa estar logado");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    buscarCaronas();

    if (id !== undefined) {
      buscarPassagemPorId(id);
    }
  }, [id]);

  //   useEffect(() => {
  //     setPassagem({
  //       ...passagem,
  //       carona: caronas,
  //     });
  //   }, [caronas]);

  // function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
  //   setPassagem({
  //     ...passagem,
  //     [e.target.name]: e.target.value,
  //     carona: carona,
  //     passageiro: usuario,
  //   });
  // }

  function retornar() {
    navigate("/passagens");
  }

  async function gerarNovaPassagem(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (id !== undefined) {
      try {
        await atualizar(`/passagens`, passagem, setPassagem, {
          headers: {
            Authorization: token,
          },
        });

        alert("Passagem atualizada com sucesso");
      } catch (error: any) {
        if (error.toString().includes("403")) {
          handleLogout();
        } else {
          alert("Erro ao atualizar a Passagem");
        }
      }
    } else {
      try {
        await cadastrar(`/passagens`, passagem, setPassagem, {
          headers: {
            Authorization: token,
          },
        });

        alert("Passagem cadastrada com sucesso");
      } catch (error: any) {
        if (error.toString().includes("403")) {
          handleLogout();
        } else {
          alert("Erro ao cadastrar a Passagem");
        }
      }
    }

    setIsLoading(false);
    retornar();
  }

  return (
    <div>
      <h1>Formulário de Passagem</h1>
      {/* Aqui você pode adicionar os campos do formulário */}
      <form>
        <label>
          Nome:
          <input type="text" name="nome" />
        </label>
        <br />
        <label>
          Destino:
          <input type="text" name="destino" />
        </label>
        <br />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
