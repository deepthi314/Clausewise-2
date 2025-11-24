import { api } from "./api";

export const chatbotService = {
  async ask(message) {
    return api.post("/chatbot/ask", { message });
  }
};