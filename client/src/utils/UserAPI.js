import axios from "axios";

export const signInRequest = async (email, password) => {
    return await axios.post("/api/users/login", { email, password });
}