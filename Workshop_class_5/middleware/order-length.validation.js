const orderLength = (req, res, next) => {
  const data = req.body;
//   console.log(data.length);
  if (data.length === 1 || data.length === undefined) {
    next();
  } else {
    res
      .status(400)
      .send({ message: "Cannot send more then 2 orders at a time" });
  }
};

module.exports = orderLength;
