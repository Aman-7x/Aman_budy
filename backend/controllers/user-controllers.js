import User from "../model/User.js";
import bcrypt from "bcryptjs";
export const getAllUser = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    console.log(err);
  }
  if (!users) {
    return res.status(404).json({ message: "No Users Found" });
  }
  return res.status(200).json({ users });
};

// Sign up
export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  let existingUser;
  try {
    // cheak existing of user
    existingUser = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  // if user is already exist
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "Usser Already Exists! Login Instead" });
  }

  //for hashed password   
  const hashedPassword = bcrypt.hashSync(password);

  //New user
  const user = new User({
    name,
    email,
    password: hashedPassword
  });

  try {
    //save user data in database
    await user.save();
  } catch (err) {
    return console.log(err);
  }
  return res.status(201).json({ user });
};
//User login
export const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    // cheak existing of user
    existingUser = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  // if user is already exist
  if (!existingUser) {
    return res.status(404).json({ message: "User Not Found" });
  }

  //compare password
  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if(!isPasswordCorrect) {
    return res.status(400).json({ message:"Incorrect Password"}); 
 }
 return res.status(200).json({ message: "Login Successfull" });
};
