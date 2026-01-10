import axios from "axios";

const fetchOrderList = async () => {
    try {
        const { data, status } = await axios.get("/api/orders/admin")
        return { data, status };
    } catch (error) {
        console.log(error);
        return { status: 500, message: "an error occured" }
    }
}

export { fetchOrderList }