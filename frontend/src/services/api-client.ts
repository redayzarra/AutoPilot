import axios, { CanceledError, AxiosError } from 'axios';

export default axios.create({
  baseURL: "http://localhost:5000/drone"
})

export { CanceledError };
export { AxiosError }