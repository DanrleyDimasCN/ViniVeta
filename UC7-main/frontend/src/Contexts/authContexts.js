import { createContext, useState } from 'react'
import apiLocal from '../services/api'
import { toast } from 'react-toastify'

export const AutenticadoContexto = createContext()

export default function AuthProvider({ children }) {

    const [tokenT, setTokenT] = useState(false)
    const [token, setToken] = useState('')
    const [IdUsuario, setIdUsuario] = useState(null)  // <- Adicionando o IdUsuario

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
                setTokenT(true)
                setIdUsuario(resposta.data.id) // <- Salvando o IdUsuario no estado
                localStorage.setItem('@id', JSON.stringify(resposta.data.id))
                localStorage.setItem('@nome', JSON.stringify(resposta.data.nome))
            }
        } catch (err) {
            console.error("Erro ao verificar token:", err)
        }
    }

    async function loginEntrada(email, password) {
        try {
            const resposta = await apiLocal.post('/LoginUsuarios', {
                email,
                password
            })
            localStorage.setItem('@id', JSON.stringify(resposta.data.id))
            localStorage.setItem('@token', JSON.stringify(resposta.data.token))
            localStorage.setItem('@nome', JSON.stringify(resposta.data.nome))
            setTokenT(true)
            setIdUsuario(resposta.data.id) // <- Salvando o IdUsuario no estado
        } catch (err) {
            toast.error('Erro de Comunicação')
        }
    }

    return (
        <AutenticadoContexto.Provider value={{ autenticado, loginEntrada, verificarToken, token, IdUsuario }}>
            {children}
        </AutenticadoContexto.Provider>
    )
}
