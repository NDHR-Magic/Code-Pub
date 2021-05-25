import axios from "axios";

export const party = async()=>{
    return await axios.get("/api/events/");

}

export const getOneEvent = async(id, userInfo)=>{
    console.log(userInfo);
    return await axios.get(`/api/events/${id}`, {
        headers: {
            Authorization: `Bearer ${userInfo.token}`
        }
    });
};