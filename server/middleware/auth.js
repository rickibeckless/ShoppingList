import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, 'mysecretkey');
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate' });
    }
};

export { auth };