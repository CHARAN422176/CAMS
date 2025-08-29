const User = require('../models/User');
const Outing = require('../models/Outing');

exports.logExit = async (req, res) => {
    const { outingType } = req.body;
    const user = await User.findById(req.user.id);
    if (user.currentStatus !== 'Inside') return res.status(400).json({ msg: 'Already on an outing' });

    const newOuting = new Outing({ user: user._id, outingType });
    await newOuting.save();

    user.currentStatus = `${outingType} Outing`;
    user.activeOutingId = newOuting._id;
    await user.save();

    res.json(user);
};

exports.logEntry = async (req, res) => {
    const user = await User.findById(req.user.id);
    if (user.currentStatus === 'Inside') return res.status(400).json({ msg: 'Already inside campus' });

    await Outing.findByIdAndUpdate(user.activeOutingId, { status: 'Completed', inTime: new Date() });

    user.currentStatus = 'Inside';
    user.activeOutingId = null;
    await user.save();

    res.json(user);
};

exports.getStatus = async (req, res) => {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
};