export const PersistentStorage = {
  prefix: "_",
  engine: localStorage,
  getData(key: string, parse = true) {
    const itemKey = `${this.prefix}${key}`;
    const dataStr = this.engine.getItem(itemKey);
    if (dataStr == null || dataStr === "undefined") return null;
    if (parse) return JSON.parse(dataStr);
    return dataStr;
  },
  setData(key: string, value: unknown, stringify = true) {
    const itemKey = `${this.prefix}${key}`;
    if (stringify) return this.engine.setItem(itemKey, JSON.stringify(value));
    return this.engine.setItem(itemKey, value as string);
  },
  remove(key: string) {
    const itemKey = `${this.prefix}${key}`;
    this.engine.removeItem(itemKey);
  },
  clear() {
    this.engine.clear();
  },
};

export const EphemeralStorage = {
  prefix: "_",
  engine: sessionStorage,
  getData(key: string, parse = true) {
    const itemKey = `${this.prefix}${key}`;
    const dataStr = this.engine.getItem(itemKey);
    if (dataStr == null || dataStr === "undefined") return null;
    if (parse) return JSON.parse(dataStr);
    return dataStr;
  },
  setData(key: string, value: unknown, stringify = true) {
    const itemKey = `${this.prefix}${key}`;
    if (stringify) return this.engine.setItem(itemKey, JSON.stringify(value));
    return this.engine.setItem(itemKey, value as string);
  },
  remove(key: string) {
    const itemKey = `${this.prefix}${key}`;
    this.engine.removeItem(itemKey);
  },
  clear() {
    this.engine.clear();
  },
};