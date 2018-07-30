function Middleware (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");

    if (!req.headers.authorization || req.headers.authorization !== 'RecarSecretTokenOMG') {
        res.status(401);
        res.send('Unauthorized');
        return;
    }
    
    next();
}

module.exports = Middleware;