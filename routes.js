

const handleRoutes = (req, res) => {
    const { url, method } = req;

    if (url == '/') {
        res.write('<html>');
        res.write('<head><title>Node App</title></head>');
        res.write('<body><h2>CREATE USER: </h2><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Create</button></form></body>');
        res.write('</html>');
        return res.end();
    }
    if(url =='/users') {
        res.write('<html>');
        res.write('<head><title>Node App</title></head>');
        res.write('<body><ul><li>User1</li><li>User2</li><li>User3</li></ul></body>');
        res.write('</html>');
        return res.end();
    }
    if(url == '/create-user' && method === 'POST') {
        const body = [];
        req.on('data', chunk => {
            body.push(chunk);
        })
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const username = parsedBody.split('=')[1];
            console.log(`USERNAME: ${username}`);
            res.statusCode = 302;
            res.setHeader('Location', '/');
            return res.end();
        })
    }
    res.write('NOT FOUND');
    res.end();
}

module.exports = handleRoutes;