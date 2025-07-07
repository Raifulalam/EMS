const User = require('../models/UserModel');

exports.followUser = async (req, res) => {
    const visitedProfileId = req.params.id; // user being visited (to be followed)
    const visitorId = req.user.id;          // logged-in user (follower)

    if (visitorId === visitedProfileId) {
        return res.status(400).json({ error: 'You cannot follow yourself' });
    }

    try {
        // Add the visitor to the visited user's followers
        await User.findByIdAndUpdate(visitedProfileId, {
            $addToSet: { followers: visitorId }
        });

        // Add the visited profile to the visitor's following
        await User.findByIdAndUpdate(visitorId, {
            $addToSet: { following: visitedProfileId }
        });

        res.json({ message: 'Followed successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to follow user' });
    }
};




exports.unfollowUser = async (req, res) => {
    const visitedProfileId = req.params.id; // user being visited (to be unfollowed)
    const visitorId = req.user.id;          // logged-in user (unfollower)

    if (visitorId === visitedProfileId) {
        return res.status(400).json({ error: 'You cannot unfollow yourself' });
    }

    try {
        // Remove the visitor from the visited user's followers
        await User.findByIdAndUpdate(visitedProfileId, {
            $pull: { followers: visitorId }
        });

        // Remove the visited profile from the visitor's following
        await User.findByIdAndUpdate(visitorId, {
            $pull: { following: visitedProfileId }
        });

        res.json({ message: 'Unfollowed successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to unfollow user' });
    }
};


exports.userDetails = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId)
            .populate('following')
            .populate('followers')
            .populate('posts')
            .populate('comments');

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to get user details' });
    }
};
