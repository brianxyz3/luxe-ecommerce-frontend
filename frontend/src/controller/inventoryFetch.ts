import axios from "axios";

const fetchInventoryList = async () => {
    try {
        const { data, status } = await axios.get("/api/inventory")
        return { data, status };
    } catch (error) {
        console.log(error);
        return {status: 500, message: "an error occured in getting inventory details"}
    }
}

export { fetchInventoryList }