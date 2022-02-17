export class Data {
  constructor(
    public readonly key: string,
    public readonly val: string) { }

  static resolver(data: Data): string {
    return data.key;
  }
}