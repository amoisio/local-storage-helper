export class LocalStorageRepository<T = any, K extends T[keyof T] | string = string> {
  private readonly storeKey: string;
  private readonly keyResolver: (item: T) => K;

  constructor(storeKey: string, keyResolver: (item: T) => K) {
    this.storeKey = storeKey;
    this.keyResolver = keyResolver;
  }

  public getAll(): T[] {
    return this.readItems();
  }

  public getByKey(key: K): T {
    const match = this.findByKey(key);
    if (match === undefined) {
      throw new Error(`Item not found for key ${key}.`);
    } else {
      return match;
    }
  }
  
  public findByKey(key: K): T | undefined {
    const items = this.readItems();
    return this.find(key, items);
  }

  public findMatching(predicate: (item: T) => boolean): T[] {
    const items = this.readItems();
    return items.filter(predicate);
  }

  public addOrUpdate(item: T): void {
    const items = this.readItems();
    const match = this.find(this.keyResolver(item), items);    
    if (match === undefined) {
      items.push(item);
    } else {
      Object.assign(match, item);
    }
    this.writeItems(items);
  }

  public remove(key: K): T {
    const items = this.readItems();
    const match = this.find(key, items);
    if (match === undefined) {
      throw new Error(`Item not found for key ${key}.`);
    } 
    const index = items.findIndex(item => item === match);
    items.splice(index, 1);
    this.writeItems(items);
    return match;
    
  }

  private find(key: K, items: T[]): T | undefined {
    return items.find(item => this.keyResolver(item) == key);
  }

  private readItems(): T[] {
    const str = localStorage.getItem(this.storeKey);
    return str === null ? [] : JSON.parse(str);
  }

  private writeItems(items: T[]) {
    const str = JSON.stringify(items);
    localStorage.setItem(this.storeKey, str);
  }
}
