import prismaClient from "../../prisma";

interface ListaVinhos {
    usuarioId: string;
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
    async cadastro_vinhos({ usuarioId, nome, tipo, uva, pais, regiao, descricao, nota, favorito }: ListaVinhos) {
        try {
            // Verifica se o usuário já tem uma lista
            let listaExistente = await prismaClient.minha_Lista.findFirst({
                where: {
                    usuarioId: usuarioId
                }
            });

            // Se a lista não existir, crie uma nova lista vazia
            if (!listaExistente) {
                listaExistente = await prismaClient.minha_Lista.create({
                    data: {
                        usuarioId: usuarioId,
                        nome: "Minha Lista de Vinhos", // Nome padrão para a lista
                    }
                });
            }

            // Verifica se o vinho existe na tabela de vinhos
            let vinhoExistente = await prismaClient.vinhos.findFirst({
                where: {
                    nome: nome,
                }
            });

            // Se o vinho não existir, cria um novo vinho
            if (!vinhoExistente) {
                vinhoExistente = await prismaClient.vinhos.create({
                    data: {
                        nome: nome,
                        tipo: tipo,
                        uva: uva,
                        pais: pais,
                        regiao: regiao,
                        descricao: descricao,
                        nota_media: nota,
                        historia: "",
                        produtor: "",
                        teor_alcoolico: "",
                        amadurecimento: "",
                        harmonizacao: "",
                        olfativo: "",
                        gustativo: "",
                        temperatura_servico: "",
                    }
                });
            }

            // Adiciona o vinho à tabela de relacionamento
            await prismaClient.listaVinhos.create({
                data: {
                    listaId: listaExistente.id,
                    vinhoId: vinhoExistente.id,
                }
            });

            return { mensagem: "Vinho adicionado com sucesso à lista" };
        } catch (error: any) {
            console.error("Erro ao adicionar vinho à lista:", error);
            throw new Error(`Erro ao adicionar vinho à lista: ${error.message}`);
        }
    }

    async consultarVinhos(usuarioId: string) {
        const resposta = await prismaClient.minha_Lista.findMany({
            where: {
                usuarioId: usuarioId,
            },
            select: {
                id: true,
                nome: true,
                vinhos: {
                    select: {
                        vinho: true,
                    }
                }
            },
        });

        return resposta;
    }
}

export { ListaServices };