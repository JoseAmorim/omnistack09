import React, { useState, useMemo } from 'react'

import camera from '../../assets/camera.svg'
import './styles.css'
import api from '../../services/api'

const New = ({ history }) => {
    const [company, setCompany] = useState('')
    const [techs, setTechs] = useState('')
    const [price, setPrice] = useState('')
    const [thumbnail, setThumbnail] = useState(null)
    const user = localStorage.getItem('user')

    const preview = useMemo(() => {
        return thumbnail && URL.createObjectURL(thumbnail)
    }, [thumbnail])

    const handleSubmit = async event => {
        event.preventDefault()

        const data = new FormData()

        data.append('thumbnail', thumbnail)
        data.append('company', company)
        data.append('techs', techs)
        data.append('price', price)

        await api.post('/spots', data, {
            headers: {
                user_id: user,
            },
        })

        history.push('/dashboard')
    }

    return (
        <form onSubmit={handleSubmit}>
            <label
                id="thumbnail"
                style={{ backgroundImage: `url(${preview})` }}
                className={thumbnail && 'has-thumbnail'}
            >
                <input
                    type="file"
                    onChange={event => setThumbnail(event.target.files[0])}
                />
                <img src={camera} alt="Select img" />
            </label>

            <label htmlFor="company">Empresa *</label>
            <input
                id="company"
                placeholder="Sua empresa incrível"
                value={company}
                onChange={event => setCompany(event.target.value)}
            />
            <label htmlFor="techs">
                Tecnologias * <span>(Separadas por vírgula)</span>
            </label>
            <input
                id="techs"
                placeholder="Quais tecnologias usam?"
                value={techs}
                onChange={event => setTechs(event.target.value)}
            />
            <label htmlFor="price">
                Valor da diária * <span>(Em branco para por GRATUITO)</span>
            </label>
            <input
                id="price"
                placeholder="Valor cobrado por dia"
                value={price}
                onChange={event => setPrice(event.target.value)}
            />

            <button type="submit" className="btn">
                Cadastrar
            </button>
        </form>
    )
}

export default New
