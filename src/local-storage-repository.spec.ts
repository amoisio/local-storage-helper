import { LocalStorageRepository } from './local-storage-repository.js';

class Dto {
  constructor(
    public readonly key: string,
    public readonly val: string) {
    
  }
}

const resolver = (dto: Dto) => dto.key;

describe('local-storage-repository', () => {
  it('can be created', () => {
    const repo = new LocalStorageRepository<Dto>('key', resolver);
    expect(repo).toBeDefined();
  });
});