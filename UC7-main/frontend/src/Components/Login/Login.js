import React, { useContext, useState } from "react";
import { AutenticadoContexto } from "../../Contexts/authContexts";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import bottle from '../../image/wine-bottler.png'
import glass from '../../image/wine-glass.png'

export default function Login() {

        const { loginEntrada } = useContext(AutenticadoContexto)
        
        const [email, setEmail] = useState('')
        const [password, setPassword] = useState('')

        async function dadosLogin(e) {
            e.preventDefault()
            if(!email || !password) {
                toast.warning('Prencha todos os campos')
                return
            }
            try {
                console.log("Email:", email, "Senha", password);
                
               await loginEntrada(email, password)
            } catch (err) {
                
            }
        }

        return (
        <div>
            <form onSubmit={dadosLogin} className="box-principal-login">
            <div className="box-dados-login">

            <div className="box-image">
                <img src={bottle} alt="" />
                <img src={glass} alt="" />
            </div>
                <input
                type="text"
                placeholder='Digite o E-mail'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <input
                type="password"
                placeholder='Digite a Senha'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <div className="box-button-entrar">
                <button>Entrar</button>
                </div>
                <div className="box-recuperar-senha">
                    <p>Esqueceu a senha?</p>
                </div>
            </div>

            <div className="box-novo-cadastro">
                 <p>Não tem uma conta ? Registre-se <Link to='/cadastro'>Aqui</Link></p>
            </div> 
            </form>
        </div>
        )

}