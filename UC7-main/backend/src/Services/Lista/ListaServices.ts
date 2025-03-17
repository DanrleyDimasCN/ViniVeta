import prismaClient from "../../prisma";

interface ListaVinhos {
    IdUsuario: string;
    nome: string;
    tipo: string;
    uva: string;
    pais: string;
    regiao: string;
    descricao: string;
    nota: number;
    favorito: boolean;
}

class ListaServices {
    async cadastro_vinhos({ IdUsuario, nome, tipo, uva, pais, regiao, descricao, nota, favorito }: ListaVinhos) {
       
        const vinhoExistente = await prismaClient.minha_Lista.findFirst({
            where: {
                IdUsuario,
                nome, 
            }
        });

        if (vinhoExistente) {
            throw new Error("Este vinho já está na sua lista!"); 
        }

      
        await prismaClient.minha_Lista.create({
            data: {
                IdUsuario,
                nome,
                tipo,
                uva,
                pais,
                regiao,
                descricao,
                nota,
                favorito
            }
        });

        return { mensagem: "Vinho adicionado com sucesso" };
    }

    async consultarVinhos() {
        const resposta = await prismaClient.minha_Lista.findMany({
            select: {
                id: true,
                nome: true,
                tipo: true,
                uva: true,
                pais: true,
                regiao: true,
                descricao: true,
                nota: true,
                favorito: true
            }
        });

        return resposta;
    }
}

export { ListaServices };
