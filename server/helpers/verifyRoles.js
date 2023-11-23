const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.role) return res.status(401).json({ message: "No Role" });
    const rolesArray = [...allowedRoles];
    const result = rolesArray.includes(req.role);
    console.log(result);
    if (!result) return res.status(401).json({ message: "No Authorization" });
    next();
  };
};

module.exports = verifyRoles;
