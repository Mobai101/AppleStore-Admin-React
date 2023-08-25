const Logout = (props) => {
  localStorage.removeItem("appleToken");
  localStorage.removeItem("appleEmail");
  localStorage.removeItem("appleRole");
  window.location.href = "/login";
};

export default Logout;
