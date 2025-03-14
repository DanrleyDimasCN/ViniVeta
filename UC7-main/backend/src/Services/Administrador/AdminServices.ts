import prismaClient from "../../prisma";

interface AdminType {
    pseudoNome: string
    senha: string
}

class AdminServices {
    async cadastrar_admin({pseudoNome, senha}: AdminType) {
        const resposta = await prismaClient.admin.create({
            data: {
                pseudoNome: pseudoNome,
                senha: senha
            }
        })
        return({dados: "Administrador Cadastrado no Sistema com Sucesso"})
    }


    async consultar_admin () {
        const resposta = await prismaClient.admin.findMany({
            select: {
                pseudoNome: true
            }
        })

        return resposta
    }
}

export { AdminServices }