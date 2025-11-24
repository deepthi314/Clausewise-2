import { api } from "./api";

export const authService = {
  async login(email, password) {
    return api.post("/auth/login", { email, password });
  },
  async signup(name, email, password) {
    return api.post("/auth/signup", { name, email, password });
  }
};