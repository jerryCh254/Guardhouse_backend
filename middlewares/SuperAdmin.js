const IsSuperAdmin = async (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: "Token missing or invalid" });
    }
    if (req.user.role !== "SUPER_ADMIN") {
        return res.status(403).json({ message: "Only SUPER ADMIN can change status" });
    }
    next();
};
const IsManager = async (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: "Token missing or invalid" });
    }
    if (req.user.role !== "MANAGER") {
        return res.status(403).json({ message: "Only SUPER ADMIN can change status" });
    }
    next();
};

module.exports = IsSuperAdmin;
