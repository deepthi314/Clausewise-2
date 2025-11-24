import { api } from "./api";

export const lawUpdateService = {
  async latest() {
    return api.get("/laws/latest");
  }
};