const User = require("../models/users");
const Courses = require("../models/courses");
const webpush = require('web-push');
const apiKeys = {
    publicKey: "BKXDJ3DYbMrOvqxKkd4I0P5Nn9RfP4GEFl3DI_4EkFE1re1bbZ6-sGVWi5oKFI74ReywZM7cEynR65SftiQN9fs",
    privateKey: "7Te45jqOeCpoeG1rntl4d7Q7I9lWziDJL4Etb5iCN5I"
}

webpush.setVapidDetails(
    'mailto:abhijith@acmeflare.in',
    apiKeys.publicKey,
    apiKeys.privateKey
)

const saveSubscription = async (req, res) => {
    const { subscription, id } = req.body
    if (id) {
        try {
            await User.updateOne(
                { _id: id },
                { $set: { push_notification: subscription } }
            );
            res.status(200).json({ message: "User updated successfully" });
        } catch (error) {
            console.error("Error updating user:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    } else {
        res.status(400).json({ message: "Invalid or missing user ID" });
    }
    
};

const sendNotification = async (req, res) => {
    try {
        const course = await Courses.findOne({ _id: req.query.id }).populate('author')
        const data = {
            title: 'Livestream had Started !',
            text: `${course.author.name} has just started class on "${course.title}".Don't miss the class join ASAP!`,
            image: `${process.env.BASE_URL}/${course.image}`,
            url: `${process.env.BASE_URL}/#/live/${course._id}`,
        }
        const users = await User.find({ type: 'Student' })
        for (const user of users) {
            user?.push_notification && webpush.sendNotification(user?.push_notification, JSON.stringify(data));
        }
        res.status(200).json({ message: "Message sent to push service" });
    } catch (error) {
        return res.status(400).json({ message: "Something Went Wrong !" });
    }
};


module.exports = {
    sendNotification,
    saveSubscription,
};