import type { IStorage } from "./storage.types";

type Keys = "demo/vuejs/tokens";

class LocalStorage implements IStorage<Keys> {
  public getItem: IStorage<Keys>["getItem"] = (key) => {
    if (typeof window !== "undefined") {
      return window.localStorage.getItem(key);
    }

    return null;
  };

  public setItem: IStorage<Keys>["setItem"] = (key, value) => {
    if (typeof window !== "undefined") {
      return window.localStorage.setItem(key, value);
    }
  };

  public removeItem: IStorage<Keys>["removeItem"] = (key) => {
    if (typeof window !== "undefined") {
      return window.localStorage.removeItem(key);
    }
  };
}

export const localStorage = new LocalStorage();
