const jwt = require('jsonwebtoken')

const auth = async function (req, res, next) {
    try {
        const token = await req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(403).json({message: "User is not authorized"})
        }
        console.log(token);
        const decodedData = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decodedData
        next()
    } catch (e) {
        console.log(e)
        return res.status(403).json({message: "User is not authorized"})
    }
};

module.exports = auth