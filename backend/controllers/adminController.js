const User = require('../models/User');

/**
 * @desc    Get summary statistics for the admin dashboard
 * @route   GET /api/admin/stats
 * @access  Private (Admin only)
 */
exports.getAdminStats = async (req, res) => {
    try {
        // Count all documents where the role is 'Student'
        const totalStudents = await User.countDocuments({ role: 'Student' });

        // Count students who are currently inside
        const studentsInside = await User.countDocuments({ role: 'Student', currentStatus: 'Inside' });

        // Calculate students outside
        const studentsOutside = totalStudents - studentsInside;

        // Send the stats as a JSON response
        res.json({
            totalStudents,
            studentsInside,
            studentsOutside,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


/**
 * @desc    Get detailed lists of students based on their status
 * @route   GET /api/admin/status-lists
 * @access  Private (Admin only)
 */
exports.getStatusLists = async (req, res) => {
    try {
        // Find all students inside, selecting only their name and roll number
        const insideCampus = await User.find({ role: 'Student', currentStatus: 'Inside' }).select('name rollNo');

        // Find all students on a local outing
        const onLocalOuting = await User.find({ role: 'Student', currentStatus: 'Local Outing' }).select('name rollNo');
        
        // Find all students on a non-local outing
        const onNonLocalOuting = await User.find({ role: 'Student', currentStatus: 'Non-Local Outing' }).select('name rollNo');

        // Send the lists as a JSON response
        res.json({
            insideCampus,
            onLocalOuting,
            onNonLocalOuting,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};