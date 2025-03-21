import prismaClient from "../../prisma";

interface ListaVinhosRequest {
    listaId: string;
    vinhoId: string;
}

class ListaVinhosServices {
    async createListaVinhos({ listaId, vinhoId }: ListaVinhosRequest) {
        try {
            const listaVinho = await prismaClient.listaVinhos.create({
                data: {
                    listaId: listaId,
                    vinhoId: vinhoId,
                },
            });

            return listaVinho;
        } catch (error) {
            console.error("Erro ao criar relacionamento ListaVinho:", error);
            throw error;
        }
    }

    async getListaVinhosByLista(listaId: string) {
        try {
            const listaVinhos = await prismaClient.listaVinhos.findMany({
                where: {
                    listaId: listaId,
                },
                include: {
                    vinho: true, // Inclui os detalhes do vinho relacionado
                },
            });

            return listaVinhos;
        } catch (error) {
            console.error("Erro ao buscar relacionamentos ListaVinho por lista:", error);
            throw error;
        }
    }

    async getListaVinhosByVinho(vinhoId: string) {
        try {
            const listaVinhos = await prismaClient.listaVinhos.findMany({
                where: {
                    vinhoId: vinhoId,
                },
                include: {
                    lista: true, // Inclui os detalhes da lista relacionada
                },
            });

            return listaVinhos;
        } catch (error) {
            console.error("Erro ao buscar relacionamentos ListaVinho por vinho:", error);
            throw error;
        }
    }

    async deleteListaVinhos({ listaId, vinhoId }: ListaVinhosRequest) {
        try {
            const deletedListaVinho = await prismaClient.listaVinhos.delete({
                where: {
                    listaId_vinhoId: {
                        listaId: listaId,
                        vinhoId: vinhoId,
                    },
                },
            });
            return deletedListaVinho;
        } catch (error) {
            console.error("Erro ao deletar relacionamento ListaVinho:", error);
            throw error;
        }
    }
}

export { ListaVinhosServices };