import { createContext, useState, useEffect } from 'react';
import apiLocal from '../services/api';
import { toast } from 'react-toastify';

export const AutenticadoContexto = createContext();

export default function AuthProvider({ children }) {
    
    const [tokenT, setTokenT] = useState(() => localStorage.getItem('@token') ? true : false);
    const [token, setToken] = useState(() => localStorage.getItem('@token') ? JSON.parse(localStorage.getItem('@token')) : '');
    const [usuarioId, setUsuarioId] = useState(() => localStorage.getItem('@id') ? JSON.parse(localStorage.getItem('@id')) : null);
    const [listaId, setListaId] = useState(() => localStorage.getItem('@listaId') ? JSON.parse(localStorage.getItem('@listaId')) : null);

   
    useEffect(() => {
        if (token) {
            localStorage.setItem('@token', JSON.stringify(token));
        } else {
            localStorage.removeItem('@token');
        }

        if (usuarioId) {
            localStorage.setItem('@id', JSON.stringify(usuarioId));
        } else {
            localStorage.removeItem('@id');
        }

        if (listaId) {
            localStorage.setItem('@listaId', JSON.stringify(listaId));
        } else {
            localStorage.removeItem('@listaId');
        }

    }, [token, usuarioId, listaId]);

    const autenticado = !!tokenT;

    async function verificarToken() {
        const iToken = localStorage.getItem('@token');
        if (!iToken) {
            setTokenT(false);
            return;
        }
        const tokenU = JSON.parse(iToken);
        setToken(tokenU);
        try {
            const resposta = await apiLocal.get('/VerificaToken', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (resposta.data.id) {
                const listaIdLocal = localStorage.getItem('@listaId');
                if (listaIdLocal) {
                    setListaId(JSON.parse(listaIdLocal));
                }
                setTokenT(true);
                setUsuarioId(resposta.data.id);
                localStorage.setItem('@id', JSON.stringify(resposta.data.id));
                localStorage.setItem('@nome', JSON.stringify(resposta.data.nome));
            }
        } catch (err) {
            console.error("Erro ao verificar token:", err);
            setTokenT(false); 
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
            });
            localStorage.setItem('@id', JSON.stringify(resposta.data.id));
            localStorage.setItem('@token', JSON.stringify(resposta.data.token));
            localStorage.setItem('@nome', JSON.stringify(resposta.data.nome));
            localStorage.setItem('@listaId', JSON.stringify(resposta.data.listaId));
            setTokenT(true);
            setUsuarioId(resposta.data.id);
            setListaId(resposta.data.listaId);
        } catch (err) {
            toast.error('Erro de Comunicação');
            setTokenT(false); 
        }
    }

    return (
        <AutenticadoContexto.Provider value={{ autenticado, loginEntrada, verificarToken, token, usuarioId, listaId, setListaIdContext }}>
            {children}
        </AutenticadoContexto.Provider>
    );
}