import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/todo",
    headers: {
        "Content-Type": "application/json"
    }
});

export const getToDos = () => api.get("/getAll");
export const createToDo = (payload) => api.post("/Create", payload);
export const removeToDo = (id) => api.delete(`/${id}`);
// export const updateOne = (id, payload) => api.patch(`/update/${id}`, payload);

export default api;