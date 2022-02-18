# local-storage-repository

Repository wrapper over local storage. Provides

## Instantiation

A new local storage repository can be instantiated as follow:

``` typescript
const repo = new LocalStorageRepository<T, K>(storageKey, keyResolver)
```

where 
* `T` is the type of items contained in the repo (defaults to `any`)
* `K` is the type of item keys (defaults to `string`)
* `storageKey` is the key used for storing repo data in local storage
* `keyResolver` is a function of type `(item: T) => K` used for resolving item keys.

## Methods

The repository provides the following methods

Method | Description 
--- | --- 
`getAll(): T[]` | Returns all items stored in the repo.
`getByKey(key: K): T` | Returns the matching item or throws an error.
`findByKey(key: K): T \| undefined`| Returns the matching item or undefined.
`findMatching(predicate: (item: T) => boolean): T[]` | Returns all items which match the given predicate.
`addOrUpdate(item: T)` | Adds a new item to local storage or updates an existing item.
`remove(key: K): T` | Removes an item from local storage or throws an error. Returns the removed item.

## Example

Given a type `Data`
``` typescript
class Data {
  constructor(public readonly key: string, public value: number) { }
}
```

Instantiate and store values in local storage
``` typescript
const repo = new LocalStorageRepository<Data>('my-datas', (item: Data) => item.key); 
repo.addOrUpdate(new Data('1', 1.2));
repo.addOrUpdate(new Data('2', 2.0));
```

Find all datas with value over 1.5
``` typescript
const matches = repo.findMatching((item: Data) => item.value > 1.5);
```
Remove the object with key '2' from the store
``` typescript
const removed = repo.remove('2');
```
