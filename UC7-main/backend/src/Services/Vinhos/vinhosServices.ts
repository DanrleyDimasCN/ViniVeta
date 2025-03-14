import prismaClient from "../../prisma";
import axios from "axios";
interface RegVinhos {
  nome: string;
  tipo: string;
  uva: string;
  pais: string;
  regiao: string;
  descricao: string;
  IdLista: string;
}

class VinhosServices {
  async registrar_vinhos({ nome, tipo, uva, pais, regiao, descricao, IdLista }: RegVinhos) {
    const resposta = await prismaClient.vinhos.create({
      data: {
        nome,
        tipo,
        uva,
        pais,
        regiao,
        descricao,
        IdLista
        },
    })

      
    return { dados: "Vinho Registrado com Sucesso" };
  }

    async consultarVinhos() {
      try {
        const response = await axios.get('http://localhost:3333/vinhos');
        return response.data
      } catch (error) {
        console.error("Erro ao consultar vinhos:", error);
        throw new Error("Erro ao consultar vinhos");   
      }
    }
}

export { VinhosServices };
