const loginController = (req, res, next) => {
  try {
    // Sanitize and Validate Input

    // Call Firebase
    let jwt = null;
    
    // Return HTTP 200 & JWT Token if Successful
    res.status(200).json(jwt);
  } catch (err) {
    next(err);
  }
};

export default loginController;