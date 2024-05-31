import axios from "axios";
import { message } from "react-message-popup";

const LoginRequest = async (formData) => {
  try {
    const headers = {
      accept: "*/*",
      "x-api-key": "keyTest",
      "Content-Type": "application/json",
    };

    const response = await axios.post(
      "https://api.mwerr.de/api/v1/Session",
      {
        usernameOrEmail: formData.usernameOrEmail,
        password: formData.password,
      },
      { headers: headers }
    );

    message.success("Anemldung Erfolgreich", 2000);
    return response.data;
  } catch (error) {
    message.error("Benutzername oder Passwort sind falsch", 2000);
  }
};

export default LoginRequest;
