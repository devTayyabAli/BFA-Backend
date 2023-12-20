const User = require("../models/user");
const userSchema = require("../models/userModel");


// GET all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
    if (users.length === 0) {
      return res
        .status(404)
        .json({ error: true, error_message: "User not found" });
    } else {
      return res.status(200).json({ error: false, users: users });
    }
  } catch (error) {
    res.json({ error: true, error_message: error.message });
  }
};

// GET users by ID
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id)
    if (!user) {
      res.json({ error: true, error_message: "User not found" });
    } else {
      res.json({ error: false, user: user });
    }
  } catch (error) {
    res.json({ error: true, error_message: error.message });
  }
};

// POST new user
const createUser = async (req, res) => {
  try {
    const { name,FatherName,cnicNo,noOfForm, email,totalBirds,tehsil,district,phoneNumber,cellNO,permanentResidency,businessResidency,Qualification } = req.body;
    // const existingUser = await User.findOne({ email });
    // console.log("existingUser",existingUser);
    // if (existingUser) {
    //   return res.status(201).json({
    //     error: true,
    //     error_msg: "Email already exists",
    //   });
    // }


    // Create a new User instance with the hashed password
    const user = new User({
      name: name,
      email: email,
      Qualification:Qualification,
      businessResidency:businessResidency,
      permanentResidency:permanentResidency,
      cellNO:cellNO,
      phoneNumber:phoneNumber,
      district:district,
      tehsil:tehsil,
      totalBirds:totalBirds,
      noOfForm:noOfForm,
      cnicNo:cnicNo,
      FatherName:FatherName,

    });

    // Save the user to the database
    await user.save();
    return res.status(200).json({
      error: false,
      user: user,
      success_message: "User created successfully",
    });
  } catch (error) {
    res.json({ error: true, error_message: error.message });
  }
};

// PUT update user by ID
const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    })
    if (!user) {
      res.json({ error: true, message: "User not found" });
    } else {
      res.json({ error: false, user: user });
    }
  } catch (error) {
    res.json({ error: true, error_message: error.message });
  }
};

// DELETE user by ID
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      res.json({ error: true, error_message: "User not found" });
    } else {
      res.json({
        error: false,
        success_message: "User deleted successfully",
      });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};



const register = async (req, res) => {
  try {
      const { username, useremail, password } = req.body;

      // Basic validation
      if (!username || !useremail || !password) {
          return res.status(400).json({ success: false, message: 'All fields are required' });
      }

      // Check if useremail is already registered
      let UserData = await userSchema.findOne({ useremail: useremail })

      if (UserData) {
          return res.status(400).json({ success: false, message: 'User with this email already exists' });
      }


      const newUser = new userSchema({ username, useremail, password });
      await newUser.save();
      res.json({ success: true, message: 'Registration successful' });
  } catch (error) {
      console.error("error while get user", error);
  }
}

const LogIn = async (req, res) => {
  try {

      const { useremail, password } = req.body;

      // Basic validation
      if (!useremail || !password) {
          return res.status(400).json({ message: 'All fields are required' });
      }

      // Check if user exists
      const user = await userSchema.findOne({useremail,password});
      console.log("user",user);
      if (!user) {
          return res.status(401).json({ message: 'Invalid credentials' });
      }

      res.json({ message: 'Login successful' });
  } catch (error) {
      console.error("error while get user", error);

  }
}
module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  register,
  LogIn
};
