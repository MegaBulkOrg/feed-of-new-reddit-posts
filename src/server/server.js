import axios from 'axios';
import compression from "compression";
import express from "express";
import helmet from "helmet";
import ReactDOMServer from "react-dom/server";
import { ServerApp } from "../App";
import { mainTemplate } from "./mainTemplate";

const SITE =
  process.env.SITE === "undefined" || process.env.SITE === undefined
    ? "localhost"
    : process.env.SITE;
const PORT =
  process.env.PORT === "undefined" || process.env.PORT === undefined
    ? 3000
    : process.env.PORT;

const app = express();

if (process.env.NODE_ENV === "production") {
  app.use(compression());
  app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );
}

app.use("/static", express.static("./app/client"));

app.get("/auth", (req, res) => {
    axios.post(
        'https://www.reddit.com/api/v1/access_token',
        `grant_type=authorization_code&code=${req.query.code}&redirect_uri=http://${SITE}:${PORT}/auth`,
        {
            auth: {username: process.env.CLIENT_ID, password: process.env.CLIENT_SECRET},
            headers: {'Content-type': 'application/x-www-form-urlencoded'}
        }
    )
    .then(({data}) => {
        res.send(mainTemplate(ReactDOMServer.renderToString(ServerApp(req.url)), data['access_token']))
    })
    .catch((msg) => console.log('[server.js]: что-то пошло не так при получении токена'))
})

app.get("*", (req, res) => {
  res.send(mainTemplate(ReactDOMServer.renderToString(ServerApp(req.url))));
});

app.listen(PORT, () =>
  console.log(`[server.js]: приложение запустилось на http://${SITE}:${PORT}`)
);
