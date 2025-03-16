import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import api from '../../services/api'
import { toast } from "react-toastify"
import logo from '../../image/Rectangle11.png'
import back from '../../image/back.svg'

export default function Cadastrar() {


    const mudarTela = useNavigate()
    const [nome, setNome ] = useState('')
    const [sobrenome, setSobrenome ] = useState('')
    const [email, setEmail ] = useState('')
    const [data_nascimento, setDataNascimento ] = useState('')
    const [genero, setGenero ] = useState('NAO_INFORMADO')
    const [password, setPassword ] = useState('')
    const [confirmePassword, setConfirmePassword ] = useState('')

    const escolherGenero = (e) => {
        setGenero(e.target.value);
    }

    const formatarData = (data) => {
        return data;
    }
    
    async function CadastroUsuarios(e) {
      try {
        e.preventDefault()

        if(!nome || !sobrenome || !email || !data_nascimento || !genero || !password) {
            alert("Campo em Branco")
            return
        }

        if(password !== confirmePassword) {
            alert("No campo 'Confirme a sua senha' a senha tem que ser a mesma digitada acima.")
            return
        }

        const dataFormatada = formatarData(data_nascimento)

        console.log('Data formatada para envio:', dataFormatada);


        await api.post('/CadastrarUsuarios', {
            nome,
            sobrenome,
            email,
            data_nascimento: dataFormatada,
            genero,
            password,
        })
        toast.success('Cadastro Efetuado com Sucesso', {
            toastId: 'ToastId'
        })
        mudarTela('/')
        
      } catch (err) {
        toast.error('Erro ao se comunicar com o back-end', {
            toastId: 'ToastId'
        })
      }
    }

    return (
        <div className="box-principal-cadastro">
        <div className="box-imagem-logo">
            <img src={logo} alt="" />
        </div>
            <form onSubmit={CadastroUsuarios}>
            <div className="box-p-aviso">
            <Link to='/'><img src={back} alt="Voltar" /></Link>
            <p>Prencha as informações abaixo</p>
            </div>
            <input
            type="text"
            placeholder='Nome'
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            />

            <input
            type="text"
            placeholder='Sobrenome'
            value={sobrenome}
            onChange={(e) => setSobrenome(e.target.value)}
            />

            <input
            type="text"
            placeholder='E-mail'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />

            <input
            type="date"
            placeholder='Data de Nascimento'
            value={data_nascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
            />
            <div className="box-cadastro-genero">
                <label>
                <input
                    type="radio"
                    value={"MASCULINO"}
                    checked={genero === "MASCULINO"}
                    placeholder='genero'
                    onChange={escolherGenero}
                    />
                    Masculino
                </label>
                <label>
                <input
                    type="radio"
                    value={"FEMININO"}
                    checked={genero === "FEMININO"}
                    placeholder='genero'
                    onChange={escolherGenero}
                    />
                    Feminino
                </label>
                <label>
                <input
                    type="radio"
                    value={"NAO_INFORMADO"}
                    checked={genero === "NAO_INFORMADO"}
                    placeholder='genero'
                    onChange={escolherGenero}
                    />
                    Prefiro não informar
                </label>
            </div>

            <input
            type="password"
            placeholder='Senha'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />

            <input
            type="password"
            placeholder='Confirme a sua Senha'
            value={confirmePassword}
            onChange={(e) => setConfirmePassword(e.target.value)}
            />

            <div className="box-button-cadastrar"><button type="submit">Registrar</button></div>
            </form>
        </div>
    )
}