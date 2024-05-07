// authMiddleware.js
const apiKey = 'tu_api_key'; // Reemplaza 'tu_api_key' con tu propia clave API

const authMiddleware = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader || authorizationHeader !== `Bearer ${apiKey}`) {
        return res.status(401).json({ message: 'No autorizado' });
    }
    next();
};

module.exports = authMiddleware;
