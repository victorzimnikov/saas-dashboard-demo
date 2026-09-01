import type { IStorage } from "./storage.types";

type Keys = "demo/vuejs/users";

class SessionStorage implements IStorage<Keys> {
  public getItem: IStorage<Keys>["getItem"] = (key) => {
    if (typeof window !== "undefined") {
      return window.sessionStorage.getItem(key);
    }

    return null;
  };

  public setItem: IStorage<Keys>["setItem"] = (key, value) => {
    if (typeof window !== "undefined") {
      return window.sessionStorage.setItem(key, value);
    }
  };

  public removeItem: IStorage<Keys>["removeItem"] = (key) => {
    if (typeof window !== "undefined") {
      return window.sessionStorage.removeItem(key);
    }
  };
}

export const sessionStorage = new SessionStorage();
