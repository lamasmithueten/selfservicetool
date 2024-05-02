const validateForm = (formData) => {
  let errors = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    role: "",
  };

  const nameRegex = /^[a-zA-Z]+$/; // Regex to match only letters
  const usernameRegex = /^[a-zA-Z0-9]+$/; // Regex to match letters and numbers

  if (!formData.firstname) {
    errors.firstname = "* Vorname darf nicht leer sein";
  } else if (!nameRegex.test(formData.firstname)) {
    errors.firstname = "* Vorname darf nur Buchstaben enthalten";
  }

  if (!formData.lastname) {
    errors.lastname = "* Nachname darf nicht leer sein";
  } else if (!nameRegex.test(formData.lastname)) {
    errors.lastname = "* Nachname darf nur Buchstaben enthalten";
  }

  if (!formData.username) {
    errors.username = "* Benutzername darf nicht leer sein";
  } else if (!usernameRegex.test(formData.username)) {
    errors.username = "* Benutzername darf nur Buchstaben und Zahlen enthalten";
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
