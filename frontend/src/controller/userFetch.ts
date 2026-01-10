import axios from "axios";

const fetchUserList = async () => {
    try {
        const { data, status } = await axios.get("/api/users/admin")
        return { data, status };
    } catch (error) {
        console.log(error);
        return { status: 500, message: "an error occured" }
    }
}

export {fetchUserList}