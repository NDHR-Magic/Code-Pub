import axios from "axios";

export const createOrderAPI = async (order, userInfo) => {
    console.log(order);
    return await axios.post("/api/orders", order, {
        headers: {
            Authorization: `Bearer ${userInfo.token}`
        }
    });
};

export const getOrderInfo = async (id, userInfo) => {
    return await axios.get(`/api/orders/${id}`, {
        headers: {
            Authorization: `Bearer ${userInfo.token}`
        }
    });
};

export const payOrderAPI = async (order, paymentResult, userInfo) => {
    return await axios.put(`/api/orders/${order.id}/pay`, paymentResult, {
        headers: { Authorization: `Bearer ${userInfo.token}` }
    });
};