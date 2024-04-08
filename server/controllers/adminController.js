const User = require("../models/users");
const Courses = require("../models/courses");

const getCourses = async (req, res) => {
    try {
        const search = req?.query?.search
        const filter = {};

        if (search) {
            filter.$or = [
                { subject: { $regex: new RegExp(search, 'i') } },
                { title: { $regex: new RegExp(search, 'i') } },
                { subtitle: { $regex: new RegExp(search, 'i') } },
                { language: { $regex: new RegExp(search, 'i') } },
                { tutor: { $regex: new RegExp(search, 'i') } },
            ];
        }
        const courses = await Courses.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'author',
                    foreignField: '_id',
                    as: 'authorDetails'
                }
            },
            {
                $match: filter
            }
        ]);
        return res.json(courses);
    } catch (error) {
        return res.status(400).json({ message: "Something Went Wrong !" });
    }
};

const getUsers = async (req, res) => {
    try {
        const search = req.query.search
        const filter = {};
        if (req.params.type) {
            filter.type = req.params.type;
        }
        if (search) {
            filter.$or = [
                { name: { $regex: new RegExp(search, 'i') } },
                { email: { $regex: new RegExp(search, 'i') } },
                { phone: { $regex: new RegExp(search, 'i') } },
                { insitution: { $regex: new RegExp(search, 'i') } },
            ];
        }
        const users = await User.find(filter)
        return res.json(users);
    } catch (error) {
        return res.status(400).json({ message: "Something Went Wrong !" });
    }
};

const blockUser = async (req, res) => {
    try {
        const id = req?.params?.id
        if (!id) {
            return res.status(403).json({ message: "Request credentials missing !" });
        }
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found !" });
        }

        user.status = !user.status;
        await user.save();
        return res.json(user);
    } catch (error) {
        return res.status(400).json({ message: "Something Went Wrong !" });
    }
};

module.exports = {
    getUsers,
    getCourses,
    blockUser
};