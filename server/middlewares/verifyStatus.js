const User = require("../models/users");

const verifyStatus = async (req, res, next) => {
    try {
        const id = req?.query?.user_id
        if (id) {
            const user = await User.findOne({ _id: id })
            if (user && user.status) {
                return res.json({ blocked: true, message: "Account temporarly blocked by Administrator !" });
            }
        }
        next()
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Something Went Wrong !" });
    }
}

module.exports = verifyStatus  