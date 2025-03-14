import { Request, Response } from "express";
import { VinhosServices } from "../../Services/Vinhos/vinhosServices";

const vinhosServices = new VinhosServices();
class VinhosControllers {
    async registrar_vinhos(req: Request, res: Response) {
        try {
            const { nome, tipo, uva, pais, regiao, descricao,IdLista } = req.body;
            
            const resposta = await vinhosServices.registrar_vinhos({
                nome,
                tipo,
                uva,
                pais,
                regiao,
                descricao,
                IdLista
            });

            return res.json(resposta);
        } catch (error) {
            console.error("Erro ao registrar vinho:", error);
            return res.status(500).json({ message: "Erro ao registrar vinho" });
        }
    }

    async consultarVinhos(req: Request, res: Response) {
        try {
            const vinhos = await vinhosServices.consultarVinhos();
            return res.json(vinhos);
        } catch (error) {
            console.error("Erro ao consultar vinhos:", error);
            return res.status(500).json({ message: "Erro ao consultar vinhos" });
        }
    }
}

export { VinhosControllers };
