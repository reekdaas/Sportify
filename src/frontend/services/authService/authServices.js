import axios from "axios";

export const logInService = async (userData, setToken, setUserData) => {
  try {
    const response = await axios.post(`/api/auth/login`, userData);
    console.log(response);
    const {
      data: { encodedToken: token, foundUser },
    } = response;
    localStorage.setItem("token", token);
    localStorage.setItem("userDetails", JSON.stringify(foundUser));
    setToken(token);
    setUserData(foundUser);

    // console.log(token);
    // console.log(foundUser);
  } catch (err) {
    console.log(err);
  }
};
