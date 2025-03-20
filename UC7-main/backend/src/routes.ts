import { Router } from 'express';

import { UsuariosControllers } from './Controllers/Usuarios/usuariosControllers'
import { ListaControllers } from './Controllers/Lista/listaControlles';
import { VinhosControllers } from './Controllers/Vinhos/vinhosControllers';
import { AdminControllers } from './Controllers/Administrador/AdminControllers';
import { estaAutenticado } from './middleware/estaAutenticado';
import { LoginUsuariosControllers } from './Controllers/Login/LoginUsuariosControllers';

const router = Router();

// Rota - Admnistrador
router.post('/CadastrarAdmin', new AdminControllers().cadastrar_admin)
router.get('/ConsultarAdmin', new AdminControllers().consultarAdmin)

// Rota - Cadastrar Usuarios
router.post('/CadastrarUsuarios',  new UsuariosControllers().cadastro_usuarios)
router.post('/ConsultarUsuariosUnico', estaAutenticado, new UsuariosControllers().consultarUsuariosUnico)
// router.get('/ConsultarUsuariosUnico', estaAutenticado, new UsuariosControllers().consultarUsuariosUnico)
router.get('/ConsultarUsuarios', new UsuariosControllers().consultarUsuarios)
router.put('/AlterarDadosUsuarios', estaAutenticado, new UsuariosControllers().alterarDadosUsuarios)
router.delete('/ApagarUsuarios/:id', estaAutenticado, new UsuariosControllers().apagarUsuarios)

// Rota - Login Usuarios
router.post('/LoginUsuarios', new LoginUsuariosControllers().loginUsuarios)
router.get('/VerificaToken', estaAutenticado, new LoginUsuariosControllers().verificaToken)

// // Rota - Registrar Vinhos
router.post('/CadastrarVinhos', estaAutenticado, new VinhosControllers().registrar_vinhos)
router.get('/vinhos', estaAutenticado, new VinhosControllers().consultarVinhos)
router.post("/importarVinhos", estaAutenticado, new VinhosControllers().importarVinhos);


// Rota - Adicionar e consultar Vinhos
router.post('/AdicionarVinho', estaAutenticado, new ListaControllers().lista_vinhos)
router.get('/ConsultarLista', estaAutenticado, new ListaControllers().consultarVinhos)

export default router;