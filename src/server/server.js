import axios from 'axios'
import compression from 'compression'
import express from 'express'
import ReactDOM from 'react-dom/server'
import { App } from '../App'
import { mainTemplate } from './mainTemplate'

const IS_DEV = process.env.NODE_ENV === 'development'
const SITE = process.env.SITE === 'undefined' ? 'localhost' : process.env.SITE
const PORT = process.env.PORT === 'undefined' ? 3000 : process.env.PORT

const app = express()

if (IS_DEV) {
    app.use(compression())
}

app.get('/auth', (req, res) => {
    axios.post(
        'https://www.reddit.com/api/v1/access_token',
        `grant_type=authorization_code&code=${req.query.code}&redirect_uri=http://${SITE}:${PORT}/auth`,
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

app.get('*', (req, res) => {res.send(mainTemplate(ReactDOM.renderToString(App())))})

app.listen(PORT, () => console.log(`Сервер запустился на http://${SITE}:${PORT}`))