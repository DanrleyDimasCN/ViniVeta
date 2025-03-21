import { Request, Response } from "express";
import { ListaServices } from "../../Services/Lista/ListaServices";

class ListaControllers {
    async lista_vinhos(req: Request, res: Response) {
        const { usuarioId, nome, tipo, uva, pais, regiao, descricao, nota, favorito } = req.body;
        const listaServices = new ListaServices();

        try {
            const resposta = await listaServices.cadastro_vinhos({
                usuarioId,
                nome,
                tipo,
                uva,
                pais,
                regiao,
                descricao,
                nota,
                favorito,
            });
            return res.status(201).json({ mensagem: "Vinho adicionado à lista com sucesso" }); // Mensagem atualizada
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

    async consultarVinhos(req: Request, res: Response) {
        const listaServices = new ListaServices();
        const { usuarioId } = req.params;

        if (!usuarioId) {
            return res.status(400).json({ error: "usuarioId é necessário." });
        }

        try {
            const resposta = await listaServices.consultarVinhos(usuarioId);
            return res.status(200).json(resposta);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }
}

export { ListaControllers };