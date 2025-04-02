import { Request, Response } from "express";
import { ListaVinhosServices } from "../../Services/ListaVinhos/ListaVinhosServices";

class ListaVinhosControllers {
    async cadastrarListaVinhos(req: Request, res: Response) {
        const { listaId, vinhoId } = req.body;
        const listaVinhosServices = new ListaVinhosServices();

        try {
            const listaVinho = await listaVinhosServices.createListaVinhos({ listaId, vinhoId });
            return res.status(201).json(listaVinho);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

    async consultarListaVinhosByLista(req: Request, res: Response) {
        const { listaId } = req.params;
        const listaVinhosServices = new ListaVinhosServices();

        try {
            const listaVinhos = await listaVinhosServices.getListaVinhosByLista(listaId);
            return res.status(200).json(listaVinhos);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    async consultarListaVinhosByVinho(req: Request, res: Response) {
        const { vinhoId } = req.params;
        const listaVinhosServices = new ListaVinhosServices();

        try {
            const listaVinhos = await listaVinhosServices.getListaVinhosByVinho(vinhoId);
            return res.status(200).json(listaVinhos);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    async editarListaVinhos(req: Request, res: Response) {
        const { listaId, vinhoId } = req.params;
        const { comentario, minha_nota } = req.body;
        const listaVinhosServices = new ListaVinhosServices();

        try {
            const edicaoListaVinhos = await listaVinhosServices.editarListaVinhos({
                listaId,
                vinhoId,
                comentario,
                minha_nota,
            });
            return res.status(200).json({
                message: "Relacionamento ListaVinho atualizado com sucesso",
                data: edicaoListaVinhos,
            });
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    async deleteListaVinhos(req: Request, res: Response) {
        const { listaId, vinhoId } = req.params;
        const listaVinhosServices = new ListaVinhosServices();
    
        try {
            const deletedListaVinho = await listaVinhosServices.deleteListaVinhos({ listaId, vinhoId });
            return res.status(200).json({ message: "Relacionamento ListaVinho deletado com sucesso" });
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }
}

export { ListaVinhosControllers };