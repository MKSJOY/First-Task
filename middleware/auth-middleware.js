import jwt from 'jsonwebtoken';

const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) 
        return res.status(403).json({ message: "Access Denied" });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) 
            return res.status(401).json({ message: "Invalid Token" });
        req.user = decoded;
        next();
    });
};

module.exports = authenticateJWT;
