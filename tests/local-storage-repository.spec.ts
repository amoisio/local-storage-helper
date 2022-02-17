import { LocalStorageRepository } from '../src/local-storage-repository.js';
import { Data } from './data.js';
import { LocalStorageMock } from './local-storage-mock.js';

describe('local-storage-repository', () => {

  beforeEach(() => {
    global.localStorage = new LocalStorageMock();
  });


  it('can be created', () => {
    const repo = new LocalStorageRepository<Data>('key', Data.resolver);
    expect(repo).toBeDefined();
    expect(localStorage.getItem("key")).toBeDefined();
  });

  it('can add a given object to the store with addOrUpdate(.)', () => {
    const repo = new LocalStorageRepository<Data>('key', Data.resolver);
    const dto = new Data("1", "hello");
    
    repo.addOrUpdate(dto);

    expect(localStorage.getItem("key")).toContain('hello');
  });

  it('can update an existing object with addOrUpdate(.)', () => {
    const repo = new LocalStorageRepository<Data>('key', Data.resolver);
    const dto = new Data("1", "hello");
    repo.addOrUpdate(dto);

    const another = new Data("1", "another");
    repo.addOrUpdate(another);

    expect(localStorage.getItem('key')).toContain('another');
    expect(localStorage.getItem('key')).not.toContain('hello');
  });

  it('can get a stored item with getByKey(.)', () => {
    const repo = new LocalStorageRepository<Data>('key', Data.resolver);
    const dto = new Data("1", "hello");
    repo.addOrUpdate(dto);

    const dto2 = repo.getByKey("1");

    expect(dto2.val).toBe(dto.val);
  });

  it('will throw if getting with key that does not exist', () => {
    const repo = new LocalStorageRepository<Data>('key', Data.resolver);
    const dto = new Data("1", "hello");
    repo.addOrUpdate(dto);

    expect(() => repo.getByKey("2")).toThrow();
  });

  it('can find a stored item with findByKey(.)', () => {
    const repo = new LocalStorageRepository<Data>('key', Data.resolver);
    const dto = new Data("1", "hello");
    repo.addOrUpdate(dto);

    const dto2 = repo.findByKey("1");

    expect(dto2!.val).toBe(dto.val);
  });

  it('will return undefined if finding with key that does not exist', () => {
    const repo = new LocalStorageRepository<Data>('key', Data.resolver);
    const dto = new Data("1", "hello");
    repo.addOrUpdate(dto);

    const dto2 = repo.findByKey("2");

    expect(dto2).toBeUndefined();
  });

  it('can get all stored items with getAll(.)', () => {
    const repo = new LocalStorageRepository<Data>('key', Data.resolver);
    const dto1 = new Data("1", "hello");
    repo.addOrUpdate(dto1);
    const dto2 = new Data("2", "world");
    repo.addOrUpdate(dto2);

    const items = repo.getAll();

    expect(items).toContainEqual<Data>(dto1);
    expect(items).toContainEqual<Data>(dto2);
  });

  it('can find all matching items with findMatching(.)', () => {
    const repo = new LocalStorageRepository<Data>('key', Data.resolver);
    const dto1 = new Data("1", "hello");
    repo.addOrUpdate(dto1);
    const dto2 = new Data("2", "world");
    repo.addOrUpdate(dto2);
    const dto3 = new Data("3", "hello america");
    repo.addOrUpdate(dto3);

    const items = repo.findMatching(item => item.val.includes("hello"));

    expect(items).toContainEqual<Data>(dto1);
    expect(items).toContainEqual<Data>(dto3);
    expect(items).not.toContainEqual<Data>(dto2);
  });

  it('can remove an item from the store with remote(.)', () => {
    const repo = new LocalStorageRepository<Data>('key', Data.resolver);
    const dto1 = new Data("1", "hello");
    repo.addOrUpdate(dto1);
    const dto2 = new Data("2", "world");
    repo.addOrUpdate(dto2);

    const removed = repo.remove("2");

    expect(removed).toEqual<Data>(dto2);
    expect(localStorage.getItem("key")).not.toContain("2");
  });

  it('will throw if attempting remove with a key that does not exists in the store', () => {
    const repo = new LocalStorageRepository<Data>('key', Data.resolver);
    const dto1 = new Data("1", "hello");
    repo.addOrUpdate(dto1);
    const dto2 = new Data("2", "world");
    repo.addOrUpdate(dto2);

    expect(() => repo.remove("3")).toThrow();
  });
});