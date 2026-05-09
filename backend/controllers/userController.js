const User = require('../models/User');

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateProfile = async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;

    // if (req.body.password) {
    //   const salt = await bcrypt.genSalt(10);
    //   user.password = await bcrypt.hash(req.body.password, salt);
    // }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      role: updatedUser.role,
      token: req.headers.authorization.split(' ')[1] // keep the same token
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

module.exports = {
  updateProfile,
};
