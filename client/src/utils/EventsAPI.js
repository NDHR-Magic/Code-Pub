import axios from "axios";

export const party = async()=>{
    return await axios.get("/api/events/");

}