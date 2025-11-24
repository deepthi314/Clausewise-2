import { api } from "./api";

export const fileService = {
  async upload(file) {
    const form = new FormData();
    form.append("file", file);
    return api.post("/files/upload", form, true);
  },
  async list() {
    return api.get("/files/history");
  }
};