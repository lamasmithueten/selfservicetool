// LoginValidation.js

import axios from "axios";

// Function to validate user credentials
const loginValidation = async (username, password) => {
  try {
    // Make an HTTP GET request to fetch user data
    const response = await axios.get("http://localhost:3001/users");

    // Extract user data from the response
    const users = response.data;

    // Find the user with the provided username
    const user = users.find((user) => user.username === username);

    // If password is incorrect, return "password incorrect"
    if (user.password !== password) {
      return "password or user incorrect";
    }

    // If both username and password are correct, return "success"
    return "success";
  } catch (error) {
    // If an error occurs during the request, return the error message
    return error.message;
  }
};

export default loginValidation;
