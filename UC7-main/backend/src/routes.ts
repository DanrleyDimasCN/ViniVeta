import { Router } from 'express';
import multer from 'multer'
import uploadConfig from './config/multer'
import { UsuariosControllers } from './Controllers/Usuarios/usuariosControllers'
import { ListaControllers } from './Controllers/Lista/listaControlles';
import { VinhosControllers } from './Controllers/Vinhos/vinhosControllers';
import { AdminControllers } from './Controllers/Administrador/AdminControllers';
import { estaAutenticado } from './middleware/estaAutenticado';
import { LoginUsuariosControllers } from './Controllers/Login/LoginUsuariosControllers';
import { ListaVinhosControllers } from './Controllers/ListaVinhos/ListaVinhosControllers';


const router = Router();
const upload = multer(uploadConfig.upload('./tmp'))

// Rota - Admnistrador
router.post('/CadastrarAdmin', new AdminControllers().cadastrar_admin)
router.get('/ConsultarAdmin', new AdminControllers().consultarAdmin)

// Rota - Cadastrar Usuarios
router.post('/CadastrarUsuarios',  new UsuariosControllers().cadastro_usuarios)
router.get('/ConsultarUsuariosUnico/:id', estaAutenticado, new UsuariosControllers().consultarUsuariosUnico)
router.get('/ConsultarUsuarios', estaAutenticado, new UsuariosControllers().consultarUsuarios)
router.put('/AlterarDadosUsuarios/:id', estaAutenticado, upload.single('file'), new UsuariosControllers().alterarDadosUsuarios)
router.delete('/ApagarUsuarios/:id', estaAutenticado, new UsuariosControllers().apagarUsuarios)

// Rota - Login Usuarios
router.post('/LoginUsuarios', new LoginUsuariosControllers().loginUsuarios)
router.get('/VerificaToken', estaAutenticado, new LoginUsuariosControllers().verificaToken)

// Rota - Registrar Vinhos
router.post('/CadastrarVinhos', estaAutenticado, new VinhosControllers().registrar_vinhos)
router.get('/vinhos', estaAutenticado, new VinhosControllers().consultarVinhos)
router.get('/vinho/:id', estaAutenticado, new VinhosControllers().consultarVinhoPorId)
router.post("/importarVinhos", estaAutenticado, new VinhosControllers().importarVinhos);


// Rota - Adicionar e consultar Vinhos nas listas
router.post('/AdicionarVinho', estaAutenticado, new ListaControllers().lista_vinhos)
router.get('/ConsultarLista/:usuarioId', estaAutenticado, new ListaControllers().consultarVinhos)

//Rotas - Tabela de relacionamento de ListaVinhos
router.post('/ListaVinhos', estaAutenticado, new ListaVinhosControllers().cadastrarListaVinhos)
router.get('/ListaVinhos/lista/:listaId', estaAutenticado, new ListaVinhosControllers().consultarListaVinhosByLista)
router.get('/ListaVinhos/vinho/:vinhoId', estaAutenticado, new ListaVinhosControllers().consultarListaVinhosByVinho)
router.delete('/ListaVinhos/:listaId/:vinhoId', estaAutenticado, new ListaVinhosControllers().deleteListaVinhos);
router.put('/ListaVinhos/:listaId/:vinhoId', estaAutenticado, new ListaVinhosControllers().editarListaVinhos);
export default router;