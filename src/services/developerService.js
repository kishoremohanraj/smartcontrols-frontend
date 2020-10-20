import http from "./httpService";

const apiEndpoint = "http://localhost:5000/api/developers";

export function addDeveloperData(data) {
  return http.post(apiEndpoint, data);
}

export function getDeveloperData(id) {
  return http.get(`${apiEndpoint}/${id}`);
}
