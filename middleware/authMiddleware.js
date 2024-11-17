const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        return next();
    }
    return res.status(403).send('Access denied. Admins only.');
};

const isEditor = (req, res, next) => {
    if (req.user && (req.user.role === 'editor' || req.user.role === 'admin')) {
        return next();
    }
    return res.status(403).send('Access denied. Editors only.');
};

exports.isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        return next();
    }
    res.status(403).send('Access denied.');
};

exports.isEditor = (req, res, next) => {
    if (req.user && (req.user.role === 'editor' || req.user.role === 'admin')) {
        return next();
    }
    res.status(403).send('Access denied.');
};


module.exports = { isAdmin, isEditor };
