const User = require('../models/User');

const getProfile = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const user = User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({
            success: true,
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getProfile
};
