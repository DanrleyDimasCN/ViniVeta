import prismaClient from "../../prisma";

interface ListaVinhos {
    IdUsuario: string;
    nome: string;
    tipo: string;
    nota: number;
    favorito: boolean;
}

class ListaServices {
    async cadastro_vinhos({ IdUsuario, nome, tipo, nota, favorito }: ListaVinhos) {
        const resposta = await prismaClient.minha_Lista.create({
            data: {
                IdUsuario,
                nome,
                tipo,
                nota,
                favorito
            }
        });

        return { mensagem: "Vinho adicionado com sucesso" };
    }

    async consultarVinhos() {
        const resposta = await prismaClient.minha_Lista.findMany({
            select: {
                nome: true,
                tipo: true,
                nota: true,
                favorito: true
            }
        });

        return resposta;
    }
}

export { ListaServices }