import React, { useState } from 'react'
import api from '../../services/api'

// import { Container } from './styles';

const Login = ({ history }) => {
    const [email, setEmail] = useState('')

    const handleSubmit = async event => {
        event.preventDefault()

        const response = await api.post('/sessions', { email })

        console.log(response)

        const { _id: id } = response.data

        localStorage.setItem('user', id)

        history.push('/dashboard')
    }

    const handleEmailChange = event => {
        setEmail(event.target.value)
    }

    return (
        <>
            <p>
                Ofereça <strong>spots</strong> para programadores e encotre{' '}
                <strong>talentos</strong> para sua empresa
            </p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">E-Mail *</label>
                <input
                    value={email}
                    onChange={handleEmailChange}
                    type="email"
                    id="email"
                    placeholder="Seu melhor e-mail"
                />
                <button className="btn" type="submit">
                    Entrar
                </button>
            </form>
        </>
    )
}

export default Login
