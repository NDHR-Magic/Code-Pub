import axios from "axios";

export const signInRequest = async (email, password) => {
    return await axios.post("/api/users/login", { email, password });
};

export const registerRequest = async (first_name, last_name, username, email, password) => {
    return await axios.post("/api/users/register", { first_name, last_name, username, email, password });
}