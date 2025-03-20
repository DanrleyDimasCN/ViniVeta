import { Request, Response } from "express";
import { ListaVinhosServices } from "../../Services/Lista_Vinhos/ListaVinhosServices";

const listaVinhosServices = new ListaVinhosServices();

class ListaVinhosControllers {
    async adicionarVinhoLista(req: Request, res: Response) {
        try {
            const { listaId, vinhoId } = req.body;
            const listaVinho = await listaVinhosServices.adicionarVinhoLista({ listaId, vinhoId });
            return res.json(listaVinho);
        } catch (error: any) {
            console.error("Erro ao adicionar vinho à lista:", error);
            return res.status(500).json({ message: `Erro ao adicionar vinho à lista: ${error.message}` });
        }
    }

    async removerVinhoLista(req: Request, res: Response) {
        try {
            const { listaId, vinhoId } = req.body;
            const listaVinho = await listaVinhosServices.removerVinhoLista({ listaId, vinhoId });
            return res.json(listaVinho);
        } catch (error) {
            console.error("Erro ao remover vinho da lista:", error);
            return res.status(500).json({ message: "Erro ao remover vinho da lista" });
        }
    }

    async listarVinhosLista(req: Request, res: Response) {
        try {
            const { listaId } = req.params;
            const vinhosLista = await listaVinhosServices.listarVinhosLista(listaId);
            return res.json(vinhosLista);
        } catch (error) {
            console.error("Erro ao listar vinhos da lista:", error);
            return res.status(500).json({ message: "Erro ao listar vinhos da lista" });
        }
    }


    async buscarVinhoListaPorIdComDadosCompletos(req: Request, res: Response) {
        try {
            const { listaId, vinhoId } = req.params;
            const vinhoLista = await listaVinhosServices.buscarVinhoListaPorIdComDadosCompletos(listaId, vinhoId);
            return res.json(vinhoLista);
        } catch (error) {
            console.error("Erro ao buscar vinho da lista por ID com dados completos:", error);
            return res.status(500).json({ message: "Erro ao buscar vinho da lista por ID com dados completos" });
        }
    }
}

export { ListaVinhosControllers };