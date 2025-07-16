import jwt from "jsonwebtoken";

const userAuth = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  let token = null;
  if (authHeader) {
    if (authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    } else {
      token = authHeader;
    }
  }

  if (!token) {
    return res.json({ sucess: false, message: "Not Authorized Login Again,," });
  }
  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    if (tokenDecode.id) {
      req.userId = tokenDecode.id;
    } else {
      return res.json({ sucess: false, message: "Not Authorized Login Again" });
    }
    return next();
  } catch (error) {
    return res.json({ sucess: false, message: error.message });
  }
};

export default userAuth;
