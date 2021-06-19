import axios from "axios";

export const party = async () => {
    return await axios.get("/api/events/");
};

export const getOneEvent = async (id, userInfo) => {
    console.log(userInfo);
    return await axios.get(`/api/events/${id}`, {
        headers: {
            Authorization: `Bearer ${userInfo.token}`
        }
    });
};

export const addUserAPI = async (id, userInfo) => {
    return await axios.post(`/api/events/addUser/${id}`, userInfo, {
        headers: {
            Authorization: `Bearer ${userInfo.token}`
        }
    })
};

