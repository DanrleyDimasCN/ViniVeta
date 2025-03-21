import { createContext, useState } from 'react'
import apiLocal from '../services/api'
import { toast } from 'react-toastify'

export const AutenticadoContexto = createContext()

export default function AuthProvider({ children }) {

    const [tokenT, setTokenT] = useState(false)
    const [token, setToken] = useState('')
    const [usuarioId, setUsuarioId] = useState(null)
    const [listaId, setListaId] = useState(null);

    const autenticado = !!tokenT

    async function verificarToken() {
        const iToken = localStorage.getItem('@token')
        if (!iToken) {
            setTokenT(false)
            return
        }
        const tokenU = JSON.parse(iToken)
        setToken(tokenU)
        try {
            const resposta = await apiLocal.get('/VerificaToken', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (resposta.data.id) {
                const listaIdLocal = localStorage.getItem('@listaId');
                if (listaIdLocal) {
                    setListaId(JSON.parse(listaIdLocal));
                }
                setTokenT(true)
                setUsuarioId(resposta.data.id)
                localStorage.setItem('@id', JSON.stringify(resposta.data.id))
                localStorage.setItem('@nome', JSON.stringify(resposta.data.nome))
            }
        } catch (err) {
            console.error("Erro ao verificar token:", err)
        }
    }

    const setListaIdContext = (id) => {
        setListaId(id);
        localStorage.setItem('@listaId', JSON.stringify(id));
    };

    async function loginEntrada(email, password) {
        try {
            const resposta = await apiLocal.post('/LoginUsuarios', {
                email,
                password
            })
            localStorage.setItem('@id', JSON.stringify(resposta.data.id))
            localStorage.setItem('@token', JSON.stringify(resposta.data.token))
            localStorage.setItem('@nome', JSON.stringify(resposta.data.nome))
            localStorage.setItem('@listaId', JSON.stringify(resposta.data.listaId));
            setTokenT(true)
            setUsuarioId(resposta.data.id)
            setListaId(resposta.data.listaId);
        } catch (err) {
            toast.error('Erro de Comunicação')
        }
    }

    return (
        <AutenticadoContexto.Provider value={{ autenticado, loginEntrada, verificarToken, token, usuarioId, listaId, setListaIdContext }}>
            {children}
        </AutenticadoContexto.Provider>
    )
}
