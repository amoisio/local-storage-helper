export class LocalStorageMock implements Storage {
  private store: any;
  constructor() {
    this.store = {};
  }

  [name: string]: any;
  
  get length(): number {
    return Object.getOwnPropertyNames(this.store).length;
  }
  
  key(index: number): string | null {
    return Object.getOwnPropertyNames(this.store)[index];
  }
  
  removeItem(key: string): void {
    delete this.store[key];
  }

  clear() {
    this.store = {};
  }

  getItem(key: string) {
    return this.store[key] || null;
  }

  setItem(key: string, value: string) {
    this.store[key] = value;
  }
}