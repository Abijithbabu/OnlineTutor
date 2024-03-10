const User = require("../models/users");
const Courses = require("../models/courses");

const subscribe = async (req, res) => {
    const {user,id} = req.body
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

module.exports = {
    subscribe
};