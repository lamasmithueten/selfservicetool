import axios from "axios";
import { message } from "react-message-popup";

const LoginRequest = async (formData) => {
  // Hash the password before sending it for validation

  try {
    const headers = {
      accept: "*/*",
      "x-api-key": "keyTest",
      "Content-Type": "application/json",
    };

    const response = await axios.post(
      "https://api.mwerr.de/api/Authentication/Login",
      {
        usernameOrEmail: formData.usernameOrEmail,
        password: formData.password,
      },
      { headers: headers }
    );

    // Handle response based on your backend logic
    console.log("Login successful:", response.data);
    message.success("Anemldung Erfolgreich", 2000);
  } catch (error) {
    // Handle errors
    console.error("Login failed:", error);
    message.error("Anmeldung nicht erfolgreich", 4000);
  }
};

export default LoginRequest;
