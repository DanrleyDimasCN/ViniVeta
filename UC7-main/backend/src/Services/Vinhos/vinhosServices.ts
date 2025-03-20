import prismaClient from "../../prisma";
import axios from "axios";

interface RegVinhos {
  nome: string;
  tipo: string;
  uva: string;
  pais: string;
  regiao: string;
  descricao: string;
  nota_media: number;
  historia: string;
  produtor: string;
  teor_alcoolico: string;
  amadurecimento: string;
  harmonizacao: string;
  olfativo: string;
  gustativo: string;
  temperatura_servico: string;
}

class VinhosServices {
  async registrar_vinhos({ nome, tipo, uva, pais, regiao, descricao, nota_media, historia, produtor, teor_alcoolico, amadurecimento, harmonizacao, olfativo, gustativo, temperatura_servico
  }: RegVinhos) {
    await prismaClient.vinhos.create({
      data: {
        nome,
        tipo,
        uva,
        pais,
        regiao,
        descricao,
        nota_media,
        historia,
        produtor,
        teor_alcoolico,
        amadurecimento,
        harmonizacao,
        olfativo,
        gustativo,
        temperatura_servico,
      },
    });

    return { mensagem: "Vinho Registrado com Sucesso" };
  }

  async consultarVinhos() {
    try {
      const vinhos = await prismaClient.vinhos.findMany({
        select: {
          id: true,
          nome: true,
          tipo: true,
          uva: true,
          pais: true,
          regiao: true,
          descricao: true,
          nota_media: true,
          historia: true,
          produtor: true,
          teor_alcoolico: true,
          amadurecimento: true,
          harmonizacao: true,
          olfativo: true,
          gustativo: true,
          temperatura_servico: true
        },
      });
  
      return vinhos;
    } catch (error) {
      console.error("Erro ao consultar vinhos:", error);
      throw new Error("Erro ao consultar vinhos");
    }
  }

  async importarVinhos() {
    try {
    
      const response = await axios.get("http://localhost:3333/data/vinhos.json");
      const vinhos = response.data;

    
      for (const vinho of vinhos) {
        const existeVinho = await prismaClient.vinhos.findFirst({
          where: { nome: vinho.nome },
        });

        if (!existeVinho) {
          await prismaClient.vinhos.create({
            data: {
              nome: vinho.nome,
              tipo: vinho.tipo,
              uva: vinho.uva,
              pais: vinho.pais,
              regiao: vinho.regiao,
              descricao: vinho.descricao,
              nota_media: vinho.nota_media,
              historia: vinho.historia,
              produtor: vinho.produtor,
              teor_alcoolico: vinho.teor_alcoolico,
              amadurecimento: vinho.amadurecimento,
              harmonizacao: vinho.harmonizacao,
              olfativo: vinho.olfativo,
              gustativo: vinho.gustativo,
              temperatura_servico: vinho.temperatura_servico
            },
          });
        }
      }

      return { mensagem: "Vinhos importados com sucesso!" };
    } catch (error) {
      console.error("Erro ao importar vinhos:", error);
      throw new Error("Erro ao importar vinhos");
    }
  }

  async consultarVinhoPorId(id: string) {
    try {
    const vinho = await prismaClient.vinhos.findUnique({
    where: { id },
    });
    
    if (!vinho) {
    throw new Error("Vinho não encontrado");
    }
    
    return vinho;
    } catch (error) {
    console.error("Erro ao consultar vinho por ID:", error);
    throw new Error("Erro ao consultar vinho por ID");
    }
    }
}

export { VinhosServices };
