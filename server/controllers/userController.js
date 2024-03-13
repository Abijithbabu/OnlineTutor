const User = require("../models/users");
const Courses = require("../models/courses");

const subscribe = async (req, res) => {
    const { user, id } = req.body
    try {
        const course = await Courses.findOne({ _id: id });
        if (course?.subscribers?.includes(user)) {
            await User.updateOne(
                { _id: user },
                { $pull: { subscriptions: id } }
            )
            await Courses.updateOne(
                { _id: id },
                { $pull: { subscribers: user } }
            )
            return res.status(200).json({ message: "Subscription removed" });
        } else {
            await User.updateOne(
                { _id: user },
                { $addToSet: { subscriptions: id } }
            )
            await Courses.updateOne(
                { _id: id },
                { $addToSet: { subscribers: user } }
            )
            return res.status(200).json({ message: "Subscribed Successfully" });
        }
    } catch (error) {
        return new Error(error);
    }
};

const getCourses = async (req, res) => {
    try {
        const { subject, type, language, search } = req?.body;
        const query = [{ valid: true }];
        const filter = {};

        if (subject && subject.length > 0) {
            filter.subject = { $in: subject };
        }

        if (type && type.length > 0) {
            filter.subscription_type = { $in: type };
        }

        if (language && language.length > 0) {
            filter.language = { $in: language };
        }

        if (search) {
            filter.$or = [
                { subject: { $regex: new RegExp(search, 'i') } },
                { title: { $regex: new RegExp(search, 'i') } },
                { subtitle: { $regex: new RegExp(search, 'i') } },
                { language: { $regex: new RegExp(search, 'i') } },
            ];
        }

        const courses = await Courses.find(filter).populate('author')
        return res.json(courses);
    } catch (error) {
        return res.status(400).json({ message: "Something Went Wrong !" });
    }
};

const bookmark = async (req, res) => {
    const { user, id } = req.body
    try {
        const course = await Courses.findOne({ _id: id });
        if (course?.likes?.includes(user)) {
            await User.updateOne(
                { _id: user },
                { $pull: { bookmarks: id } }
            )
            await Courses.updateOne(
                { _id: id },
                { $pull: { likes: user } }
            )
            return res.status(200).json({ message: "bookmark removed" });
        } else {
            await User.updateOne(
                { _id: user },
                { $addToSet: { bookmarks: id } }
            )
            await Courses.updateOne(
                { _id: id },
                { $addToSet: { likes: user } }
            )
            return res.status(200).json({ message: "bookmard added" });
        }
    } catch (error) {
        return new Error(error);
    }
};
module.exports = {
    getCourses,
    subscribe,
    bookmark
};