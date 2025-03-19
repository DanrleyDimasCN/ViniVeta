import { Request, Response } from "express";
import { VinhosServices } from "../../Services/Vinhos/vinhosServices";

const vinhosServices = new VinhosServices();

class VinhosControllers {
    async registrar_vinhos(req: Request, res: Response) {
        try {
            const { nome, tipo, uva, pais, regiao, descricao, nota_media, historia, produtor, teor_alcoolico, amadurecimento, harmonizacao, olfativo, gustativo, temperatura_servico } = req.body;

            const resposta = await vinhosServices.registrar_vinhos({
                nome,
                tipo,
                uva,
                pais,
                regiao,
                descricao,
                nota_media,
                historia,
                produtor,
                teor_alcoolico,
                amadurecimento,
                harmonizacao,
                olfativo,
                gustativo,
                temperatura_servico,
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

    async importarVinhos(req: Request, res: Response) {
        try {
            const resultado = await vinhosServices.importarVinhos();
            return res.json(resultado);
        } catch (error) {
            console.error("Erro ao importar vinhos:", error);
            return res.status(500).json({ message: "Erro ao importar vinhos" });
        }
    }

    async consultarVinhoPorId(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const vinho = await vinhosServices.consultarVinhoPorId(id);

            if (vinho) {
                return res.json(vinho);
            } else {
                return res.status(404).json({ message: 'Vinho não encontrado' });
            }
        } catch (error) {
            console.error("Erro ao consultar vinho:", error);
            return res.status(500).json({ message: "Erro ao consultar vinho" });
        }
    }
}

export { VinhosControllers };