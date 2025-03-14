import { Request, Response } from "express";
import { AdminServices } from "../../Services/Administrador/AdminServices";

class AdminControllers {
    async cadastrar_admin(req: Request, res: Response) {
        const {pseudoNome, senha} = req.body
        const adminServices = new AdminServices()
        const resposta = await adminServices.cadastrar_admin({
            pseudoNome,
            senha
        })
        return res.json(resposta)
    }

    async consultarAdmin(req: Request, res: Response) {
        const adminServices = new AdminServices()
        const resposta = await adminServices.consultar_admin()

        return res.json(resposta)
    }
}

export { AdminControllers };