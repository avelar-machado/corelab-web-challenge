const auth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token || token !== "Bearer corelab-secret") {
    return res.status(401).json({ message: "Não autorizado" });
  }

  next();
};

export default auth;
