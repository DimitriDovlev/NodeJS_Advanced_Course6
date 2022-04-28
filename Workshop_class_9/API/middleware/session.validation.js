const sessionValidator = (req, res, next) => {
  const loggedIn = req.session.loggedIn;

  if (loggedIn) {
    next();
  } else {
    res.status(403).send(({ message: "User is not logged in" }));
  }
};

module.exports = sessionValidator;
