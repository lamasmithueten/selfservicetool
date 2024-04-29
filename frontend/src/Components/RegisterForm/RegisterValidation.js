const validateForm = (formData) => {
  let errors = {
    username: "",
    email: "",
    password: "",
    role: "",
  };

  if (!formData.username) {
    errors.username = "* Benutzername darf nicht leer sein";
  }

  if (!formData.email) {
    errors.email = "* E-Mail darf nicht leer sein";
  } else if (!isValidEmail(formData.email)) {
    errors.email = "* Ungültige Email-Adresse";
  }

  if (!formData.password) {
    errors.password = "* Passwort darf nicht leer sein";
  } else if (formData.password.length < 8) {
    errors.password = "* Passwort ist zu kurz";
  } else if (!/[A-Z]/.test(formData.password)) {
    errors.password =
      "* Passwort muss mindestens einen Großbuchstaben enthalten";
  } else if (!/\d/.test(formData.password)) {
    errors.password = "* Passwort muss mindestens eine Zahl enthalten";
  } else if (!/[^a-zA-Z0-9]/.test(formData.password)) {
    errors.password = "* Passwort muss mindestens ein Sonderzeichen enthalten";
  }

  return errors;
};

const isValidEmail = (email) => {
  // Simple email validation regex
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

module.exports = { validateForm, isValidEmail };
