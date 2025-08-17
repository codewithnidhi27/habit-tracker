import API from "./api";

export const getHabits = () => API.get("/habits");
export const addHabit = (payload) => API.post("/habits", payload);
export const completeHabit = (id) => API.put(`/habits/${id}/complete`);
export const deleteHabit = (id) => API.delete(`/habits/${id}`);
