const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
   // get header 'x-access-token'
    const accessToken = req.headers['x-access-token'];
    if (!accessToken) {
        return res.sendStatus(401);
    }   
    jwt.verify(accessToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.sendStatus(401);
        }
        req.userId = decoded.id;
        next();
    });
}

module.exports = authMiddleware;