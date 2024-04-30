import bcrypt from "bcryptjs";

const saltRounds = 10; // Number of salt rounds for bcrypt hashing

const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw error;
  }
};

export default hashPassword;
