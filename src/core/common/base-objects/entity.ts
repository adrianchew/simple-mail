import { UniqueIdentifier } from './unique-identifier';

export abstract class Entity<T> {
  protected readonly _id: UniqueIdentifier;
  protected readonly _props: T;

  constructor (props: T, id?: UniqueIdentifier) {
    this._id = id ? id : new UniqueIdentifier();
    this._props = props;
  }

  get id(): string | number {
    return this._id.toValue();
  }
}
