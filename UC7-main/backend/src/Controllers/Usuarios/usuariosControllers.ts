import { Request, Response } from 'express';
import { UsuariosServices } from '../../Services/Usuarios/UsuariosServices';

class UsuariosControllers {
    async cadastro_usuarios(req: Request, res: Response) {
        const { nome, sobrenome, email, data_nascimento, genero, password } = req.body;
        const enviarDadosService = new UsuariosServices();
        const resposta = await enviarDadosService.cadastrar_usuarios({
            nome,
            sobrenome,
            email,
            data_nascimento,
            genero,
            password
        })
        return res.json(resposta);
    }

    async consultarUsuarios(req: Request, res: Response) {
        const enviarDadosServices = new UsuariosServices();
        const resposta = await enviarDadosServices.consultarUsuarios();
        return res.json(resposta);
    }

    async consultarUsuariosUnico(req: Request, res: Response) {
        const { id } = req.params;
        const enviarDadosServices = new UsuariosServices();
        const resposta = await enviarDadosServices.consultarUsuariosUnico(id)
        return res.json(resposta);
    }

    async alterarDadosUsuarios(req: Request, res: Response) {
        const { id } = req.params;
        const { nome, email, password } = req.body;
        let banner = null; 
    
        if (req.file) {
            const { originalname, filename } = req.file;
            banner = filename; 
        }
    
        const enviarDadosServices = new UsuariosServices();
        const resposta = await enviarDadosServices.alterarDadosUsuarios({
            id,
            nome,
            email,
            password,
            banner
        });
    
        return res.json({
            dados: resposta.dados,
            banner: banner 
        });
    }

    async apagarUsuarios(req: Request, res: Response) {
        const { id } = req.params;
        const enviarDadosServices = new UsuariosServices();
        const resposta = await enviarDadosServices.apagarUsuarios(id);
        return res.json(resposta);
    }
}

export { UsuariosControllers };
