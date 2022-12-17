export const mainTemplate = (content, token) => `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Тестовое задание для Альфа Банка</title>
            <script src="/static/client.js" type="application/javascript"></script>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
            <script>
                if ("${token}" && "${token}" != 'undefined') localStorage.setItem('token', "${token}")
            </script>
        </head>
        <body>
            <div id="react_root">${content}</div>
        </body>
    </html>
`