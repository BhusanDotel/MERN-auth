export const User = async () => {
  const authToken = localStorage.getItem("authToken");
  if (authToken) {
    return fetch("http://localhost:5000/user").then((res) => res.json());
  }
};
