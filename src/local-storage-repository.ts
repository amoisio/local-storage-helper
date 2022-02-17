export class LocalStorageRepository<TItem> {
  private readonly storeKey: string;
  private readonly keyResolver: (item: TItem) => string;

  constructor(storeKey: string, keyResolver: (item: TItem) => string) {
    this.storeKey = storeKey;
    this.keyResolver = keyResolver;
  }

  public getAll(): TItem[] {
    return this.readItems();
  }

  public getByKey(key: string): TItem {
    const match = this.findByKey(key);
    if (match === undefined) {
      throw new Error(`Item not found for key ${key}.`);
    } else {
      return match;
    }
  }
  
  public findByKey(key: string): TItem | undefined {
    const items = this.readItems();
    return this.find(key, items);
  }

  public findMatching(predicate: (item: TItem) => boolean): TItem[] {
    const items = this.readItems();
    return items.filter(predicate);
  }

  public addOrUpdate(item: TItem): void {
    const items = this.readItems();
    const match = this.find(this.keyResolver(item), items);    
    if (match === undefined) {
      items.push(item);
    } else {
      Object.assign(match, item);
    }
    this.writeItems(items);
  }

  public remove(key: string): TItem {
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

  private find(key: string, items: TItem[]): TItem | undefined {
    return items.find(item => this.keyResolver(item) == key);
  }

  private readItems(): TItem[] {
    const str = localStorage.getItem(this.storeKey);
    return str === null ? [] : JSON.parse(str);
  }

  private writeItems(items: TItem[]) {
    const str = JSON.stringify(items);
    localStorage.setItem(this.storeKey, str);
  }
}
