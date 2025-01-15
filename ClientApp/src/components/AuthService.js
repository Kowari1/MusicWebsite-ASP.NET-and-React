import axios from "./axiosSetup";

export const checkTokenAndFetchUser = async (login) => {
    const token = localStorage.getItem("authToken");
    if (token) {
        try {
            console.log("curentWork");
            const { data } = await axios.get("/api/User/current", {
                headers: { Authorization: `Bearer ${token}` },
            });
            login({ ...data, token });
        } catch (error) {
            console.error("Ошибка при проверке токена:", error.response?.data || error.message);
            localStorage.removeItem("authToken");
        }
    }
};