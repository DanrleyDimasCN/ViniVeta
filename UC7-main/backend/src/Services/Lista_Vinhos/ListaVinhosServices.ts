import prismaClient from "../../prisma";

interface ListaVinhosRequest {
    listaId: string;
    vinhoId: string;
}

class ListaVinhosServices {
    async adicionarVinhoLista({ listaId, vinhoId }: ListaVinhosRequest) {
        try {
            const listaVinho = await prismaClient.lista_Vinhos.create({
                data: {
                    listaId,
                    vinhoId,
                },
            });

            return listaVinho;
        } catch (error) {
            console.error("Erro ao adicionar vinho à lista:", error);
            throw new Error("Erro ao adicionar vinho à lista");
        }
    }

    async removerVinhoLista({ listaId, vinhoId }: ListaVinhosRequest) {
        try {
            const listaVinho = await prismaClient.lista_Vinhos.delete({
                where: {
                    listaId_vinhoId: {
                        listaId,
                        vinhoId,
                    },
                },
            });

            return listaVinho;
        } catch (error) {
            console.error("Erro ao remover vinho da lista:", error);
            throw new Error("Erro ao remover vinho da lista");
        }
    }

    async listarVinhosLista(listaId: string) {
        try {
            const vinhosLista = await prismaClient.lista_Vinhos.findMany({
                where: {
                    listaId,
                },
                include: {
                    vinho: true,
                },
            });

            return vinhosLista;
        } catch (error) {
            console.error("Erro ao listar vinhos da lista:", error);
            throw new Error("Erro ao listar vinhos da lista");
        }
    }

    async buscarVinhoListaPorIdComDadosCompletos(listaId: string, vinhoId: string) {
        try {
            const vinhoLista = await prismaClient.lista_Vinhos.findFirst({
                where: {
                    listaId: listaId,
                    vinhoId: vinhoId,
                },
                include: {
                    vinho: true, // Inclui os dados completos do vinho
                },
            });
            return vinhoLista;
        } catch (error) {
            console.error("Erro ao buscar vinho da lista por ID com dados completos:", error);
            throw error;
        }
    }
}

export { ListaVinhosServices };