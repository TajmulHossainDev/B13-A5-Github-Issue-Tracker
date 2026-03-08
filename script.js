const username = document.getElementById("usernameInput");
const password = document.getElementById("passwordInput");
const signupBtn = document.getElementById("signupBtn");

signupBtn.addEventListener("click", function () {
  const userId = username.value;
  const userPass = password.value;

  if (userId === "admin" && userPass === "admin123") {
    window.location.href = "home.html";
  } else {
    alert("invalid username or password");
  }
});
