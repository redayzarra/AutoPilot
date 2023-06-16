import apiClient from "./api-client";

export type FlipDirection = "F" | "L" | "R" | "B";
export type MoveDirection = "forward" | "back";
export type RotateDirection = "cw" | "ccw";

class DroneService {
  getBattery() {
    const controller = new AbortController();

    const request = apiClient.get("/query/battery", {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }

  getSerialNumber() {
    const controller = new AbortController();

    const request = apiClient.get("/query/sn", {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }

  takeOff() {
    const controller = new AbortController();
    const request = apiClient.post("/takeoff", { signal: controller.signal });
    return { request, cancel: () => controller.abort() };
  }

  land() {
    const controller = new AbortController();
    const request = apiClient.post("/land", { signal: controller.signal });
    return { request, cancel: () => controller.abort() };
  }

  stop() {
    const controller = new AbortController();
    const request = apiClient.post("/stop", { signal: controller.signal });
    return { request, cancel: () => controller.abort() };
  }

  flip(direction: FlipDirection) {
    const controller = new AbortController();
    const request = apiClient.post(
      "/flip",
      { direction },
      { signal: controller.signal }
    );
    return { request, cancel: () => controller.abort() };
  }

  move(direction: MoveDirection) {
    const controller = new AbortController();
    const request = apiClient.post(
      "/drone/move",
      { direction },
      { signal: controller.signal }
    );
    return { request, cancel: () => controller.abort() };
  }

  rotate(direction: RotateDirection) {
    const controller = new AbortController();
    const request = apiClient.post(
      "/drone/rotate",
      { direction },
      { signal: controller.signal }
    );
    return { request, cancel: () => controller.abort() };
  }
}

export default new DroneService();
