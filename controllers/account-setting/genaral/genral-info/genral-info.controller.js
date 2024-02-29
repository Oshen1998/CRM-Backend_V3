const User = require('../../../../models/account-setting/general/general-info/general-info.model');

// Controller to create a new user
exports.createUser = async (req, res) => {
	try {
		const user = new User(req.body);
		await user.save();
		res.status(201).json(user);
	} catch (err) {
		console.error('Error creating user:', err);
		if (err.name === 'ValidationError') {
			return res.status(400).json({ message: 'Validation error', errors: err.errors });
		}
		res.status(500).json({ message: 'Failed to create user' });
	}
};

// Controller to get all users
exports.getAllUsers = async (req, res) => {
	try {
		const users = await User.find();
		res.status(200).json(users);
	} catch (err) {
		console.error('Error getting users:', err);
		res.status(500).json({ message: 'Failed to get users' });
	}
};

// Controller to get a user by ID
exports.getUserById = async (req, res) => {
	const userId = req.params.id;
	try {
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		res.status(200).json(user);
	} catch (err) {
		console.error('Error getting user by ID:', err);
		res.status(500).json({ message: 'Failed to get user' });
	}
};

// Controller to update a user
exports.updateUser = async (req, res) => {
	const userId = req.params.id;
	try {
		const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
		if (!updatedUser) {
			return res.status(404).json({ message: 'User not found' });
		}
		res.status(200).json(updatedUser);
	} catch (err) {
		console.error('Error updating user:', err);
		if (err.name === 'ValidationError') {
			return res.status(400).json({ message: 'Validation error', errors: err.errors });
		}
		res.status(500).json({ message: 'Failed to update user' });
	}
};

// Controller to delete a user
exports.deleteUser = async (req, res) => {
	const userId = req.params.id;
	try {
		const deletedUser = await User.findByIdAndDelete(userId);
		if (!deletedUser) {
			return res.status(404).json({ message: 'User not found' });
		}
		res.status(200).json({ message: 'User deleted successfully' });
	} catch (err) {
		console.error('Error deleting user:', err);
		res.status(500).json({ message: 'Failed to delete user' });
	}
};
