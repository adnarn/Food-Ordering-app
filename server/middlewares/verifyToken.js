const admin = require('../Config/firebaseConfig');

const verifyToken = async (req, res, next) => {
  const idToken = req.headers.authorization?.split(" ")[1];  

  if (!idToken) {
    return res.status(401).send({ message: "No token provided" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.userId = decodedToken.uid; // Attach userId to request

    // Log user info from decodedToken
    // console.log("User Info:", {
    //   uid: decodedToken.uid,
    //   email: decodedToken.email,
    //   name: decodedToken.name,
    //   email_verified: decodedToken.email_verified,
    // });
    // console.log(decodedToken.uid)

    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(403).send({ message: "Unauthorized" });
  }
};

module.exports = verifyToken;


