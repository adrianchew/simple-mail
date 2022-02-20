import hash from "object-hash";
import shallowEqual from "shallowequal";

import { Props } from '../../common'

interface ValueObjectProps extends Props {
  //[index: string]: any;
}

export abstract class ValueObject<T extends ValueObjectProps> {
  public readonly props: T;

  constructor (props: T) {
    this.props = Object.freeze(props);
  }

  public hashCode () : string {
    return hash(this);
  }

  public equals (vo?: ValueObject<T>) : boolean {
    if (vo === null || vo === undefined) {
      return false;
    }
    if (vo.props === undefined) {
      return false;
    }
  
    return shallowEqual(this.props, vo.props);
  }
}
