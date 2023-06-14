import apiClient from "./api-client";

class DroneService {
  getBattery() {
    const controller = new AbortController();

    const request = apiClient
      .get("/query/battery", {
        signal: controller.signal,
      });
    return {request, cancel: () => controller.abort()};
  }

  getSerialNumber() {
    const controller = new AbortController();

    const request = apiClient
      .get("/query/sn", {
        signal: controller.signal,
      });
    return {request, cancel: () => controller.abort()};
  }
}

export default new DroneService();