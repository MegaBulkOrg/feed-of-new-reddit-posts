import axios from 'axios'
import express from 'express'
import ReactDOM from 'react-dom/server'
import { App } from '../App'
import { mainTemplate } from './mainTemplate'

const app = express()

app.get('/', (req, res) => {
    res.send(mainTemplate(ReactDOM.renderToString(App())))
})

app.get('/auth', (req, res) => {
    axios.post(
        'https://www.reddit.com/api/v1/access_token',
        `grant_type=authorization_code&code=${req.query.code}&redirect_uri=http://localhost:3000/auth`,
        {
            auth: {username: process.env.CLIENT_ID, password: process.env.CLIENT_SECRET},
            headers: {'Content-type': 'application/x-www-form-urlencoded'}
        }
    )
    .then(({data}) => {
        res.send(mainTemplate(ReactDOM.renderToString(App()), data['access_token']))
    })
    .catch((msg) => console.log('Что-то пошло не так при получении токена (файл server.js)'))
})

app.use('/static', express.static('./app/client'))

app.listen(3000, () => console.log('Сервер запустился на http://localhost:3000'))