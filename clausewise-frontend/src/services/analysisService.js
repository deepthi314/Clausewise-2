import { api } from "./api";

export const analysisService = {
  async overview(documentId) {
    return api.get(`/analysis/${documentId}/overview`);
  },
  async simplify(documentId, mode) {
    return api.post(`/analysis/${documentId}/simplify`, { mode });
  },
  async extract(documentId) {
    return api.get(`/analysis/${documentId}/extract`);
  },
  async risk(documentId) {
    return api.get(`/analysis/${documentId}/risk`);
  },
  async fairness(documentId) {
    return api.get(`/analysis/${documentId}/fairness`);
  }
};