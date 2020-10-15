import http from "./httpService";

const apiEndpoint = "http://localhost:5000/api/users";

export function registerUser(user) {
  return http.post(apiEndpoint, user);
}
