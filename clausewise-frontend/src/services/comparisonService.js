import { api } from "./api";

export const comparisonService = {
  async compare(documentId, secondFile) {
    const form = new FormData();
    form.append("file", secondFile);
    return api.post(`/compare/${documentId}`, form, true);
  }
};