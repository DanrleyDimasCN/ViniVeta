import { Request, Response } from "express";
import { ListaServices } from "../../Services/Lista/ListaServices";


class ListaControllers {
    async lista_vinhos(req: Request, res: Response) {
        const { nome, tipo, uva, pais, regiao, descricao, nota, favorito, usuarioId } = req.body;
        const listaServices = new ListaServices()

        
        const resposta = await listaServices.cadastro_vinhos({
            nome,
            tipo,
            uva,
            pais,
            regiao,
            descricao,
            nota,
            favorito,
            usuarioId
        })
        return res.json(resposta)
    }

    async consultarVinhos(req: Request, res: Response) {
        const listaServices = new ListaServices()
        const resposta = await listaServices.consultarVinhos()
        
        return res.json(resposta)
    }
}

export { ListaControllers }