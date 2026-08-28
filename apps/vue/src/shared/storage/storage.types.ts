export interface IStorage<KEY extends string> {
  getItem: (key: KEY) => string | null;
  setItem: (key: KEY, value: string) => void;
  removeItem: (key: KEY) => void;
}
