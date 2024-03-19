const User = require("../models/users");
const Courses = require("../models/courses");

const getCourses = async (req, res) => {
    try {
      const courses = await Courses.find({ author: req.query.id })
      return res.json(courses);
    } catch (error) {
      return res.status(400).json({ message: "Something Went Wrong !" });
    }
  };

const courseDetails = async (req, res) => {
    try {
      const course = await Courses.findOne({ _id: req.query.id }).populate('author')
      return res.json(course);
    } catch (error) {
      return res.status(400).json({ message: "Something Went Wrong !" });
    }
  };

const createCourse = async (req, res) => {
    const { ...data } = req.body;    
    try {
        if (!req.file) { 
            return res.status(499).json({ message: "Image is required" });
        }
        const filepath = req.file.path.replace(/\\/g, "/").slice(7);
        const course = new Courses({
            ...data,
            image: filepath,
            availableDays:data?.availableDays?.split(','),
        });
        await course.save();
        if (!course) { 
            return res.status(400).json({ message: "Something Went Wrong !" });
        }
        return res
            .status(200)
            .json({ message: "Course Created Successfully !" });
    } catch (error) {
        console.log(error.message);
        return new Error(error);
    }
};

const editCourse = async (req, res) => {
    const { ...data } = req.body;
    delete data.subscribers
    delete data.likes
    data.availableDays = data?.availableDays?.split(',')
    try {
      if (req.file) {
        const filepath = req.file.path.replace(/\\/g, "/").slice(7);
        data.image = filepath 
      }
      const course = Courses.updateOne(
        { _id: data._id },
        { $set: data },
        { upsert: true }
      )
        .then((result) => {
          console.log("Update result:", result);
        })
        .catch((error) => {
          console.error("Error updating document:", error);
        });
      if (!course) {
        return res.status(404).json({ message: "Something Went Wrong !" });
      }
  
      return res
        .status(200)
        .json({ message: "Course Updated Successfully !" });
    } catch (error) {
      return new Error(error);
    }
  };
  
  const updateProfile = async (req, res) => {
    const { ...data } = req.body;    
    try {
      if (req.file) {
        const filepath = req.file.path.replace(/\\/g, "/").slice(7);
        data.image = filepath 
      }
        const user = await User.updateOne(
          { _id: data._id },
          { $set: data },
          { upsert: true, new: true }
        )
        console.log(user);
        if (!user) { 
            return res.status(400).json({ message: "Something Went Wrong !" });
        }
        return res
            .status(200)
            .json({ message: "Updated Successfully !" });
    } catch (error) {
        console.log(error.message);
        return new Error(error);
    }
};
module.exports = {
    createCourse,
    getCourses,
    editCourse,
    courseDetails,
    updateProfile
};