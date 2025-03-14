import prismaClient from "../../prisma";
import { hash } from 'bcryptjs';

interface CadUsuarios {
    nome: string;
    sobrenome: string;
    email: string;
    data_nascimento: string;
    genero: "MASCULINO" | "FEMININO" | "NAO_INFORMADO";
    password: string;
}

interface AlterarUsuarios {
    id: string;
    nome: string;
    email: string;
}

class UsuariosServices {
    async cadastrar_usuarios({ nome, sobrenome, email, data_nascimento, genero, password }: CadUsuarios) {


        const senhaCriptografada = await hash(password, 8);
        const emailExiste = await prismaClient.usuario.findFirst({
            where: { email }
        });

        if (emailExiste) {
            throw new Error("E-mail já está cadastrado");
        }

        const dataNascimento = new Date(data_nascimento);
        if (isNaN(dataNascimento.getTime())) {
            throw new Error("Data de nascimento inválida");
        }

        await prismaClient.usuario.create({
            data: {
                nome: nome,
                sobrenome: sobrenome,
                email: email,
                data_nascimento: dataNascimento.toISOString(),
                genero: genero,
                password: senhaCriptografada,
            }
        });

        return { dados: 'Cadastro Efetuado Com Sucesso' };
    }

    async consultarUsuarios() {
      const resposta = await prismaClient.usuario.findMany({
            select: {
                id: true,
                nome: true,
                sobrenome: true,
                email: true,
                data_nascimento: true,
                genero: true
            }
        });
        return resposta
    }

    async consultarUsuariosUnico(id: string) {

        const resposta = await prismaClient.usuario.findFirst({
            where: {
                id: id
            },
            select: {
                nome: true,
                sobrenome: true,
                email: true,
                data_nascimento: true,
                genero: true,
                create_at: true,
                password: true
               
            }
        });

        const hoje = new Date();
        const nascimento = new Date(resposta.data_nascimento);
        let idade = hoje.getFullYear() - nascimento.getFullYear();
        const mes = hoje.getMonth() - nascimento.getMonth();

        if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
            idade--;
        }

        return { ...resposta, idade };
    }

    async alterarDadosUsuarios({ id, nome, email }: AlterarUsuarios) {
         await prismaClient.usuario.update({
            where: {
                id: id,
            },
            data: {
                nome: nome,
                email: email
            }
        });

        return ({dados: 'Cadastro Alterado Com Sucesso'})
    }

    async apagarUsuarios(id: string) {

        await prismaClient.usuario.delete({
            where: {
                id: id 
            }
        });
        return { dados: "Registro Apagado com Sucesso" };
    }
}

export { UsuariosServices };
