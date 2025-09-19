import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ error: 'Not authorized, token failed' });
    }
  }
  if (!token) {
    res.status(401).json({ error: 'Not authorized, no token' });
  }
};

// 👇 Add this new function
export const admin = (req, res, next) => {
  // This middleware must run AFTER the 'protect' middleware
  if (req.user && req.user.role === 'admin') {
    next(); // User is an admin, proceed to the route
  } else {
    res.status(403).json({ error: 'Not authorized as an admin' }); // 403 Forbidden
  }
};