import axios from "axios";
import hashPassword from "../RegisterForm/PasswordHash";

const LoginRequest = async (formData) => {
  // Hash the password before sending it for validation
  const hashedPassword = await hashPassword(formData.password);

  try {
    const response = await axios.post("test/login", {
      username: formData.username,
      password: hashedPassword,
    });

    // Handle response based on your backend logic
    console.log("Login successful:", response.data);
  } catch (error) {
    // Handle errors
    console.error("Login failed:", error);
  }
};

export default LoginRequest;
