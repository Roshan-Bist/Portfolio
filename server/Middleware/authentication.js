const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
    const raw = req.headers.authorization;
    if (!raw) {
        return res.status(401).json({ message: "Unauthorized. Please log in." });
    }

    // Accept either raw token or "Bearer <token>"
    const token = raw.startsWith("Bearer ") ? raw.slice(7).trim() : raw.trim();
    const secret = (process.env.JWT_SECRET || "").trim();

    if (!secret) {
        console.error("JWT_SECRET is missing");
        return res.status(500).json({ message: "Server auth is not configured." });
    }

    jwt.verify(token, secret, (err, user) => {
        if (err) {
            const expired = err.name === "TokenExpiredError";
            return res.status(403).json({
                message: expired
                    ? "Session expired. Please log in again."
                    : "Invalid token. Please log in again.",
                code: expired ? "TOKEN_EXPIRED" : "TOKEN_INVALID",
            });
        }
        req.user = user;
        next();
    });
};

module.exports = authenticate;
