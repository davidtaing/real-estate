const registerController = (req, res, next) => {
  try {
    // Sanitize and Validate Input

    // Call Firebase
    
    // Return HTTP 204
    res.status(204);
  } catch (err) {
    next(err);
  }
};

export default registerController;