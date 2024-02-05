import { BaseScalar, Scalar } from '../Scalar';
import { KeyAsValueObject } from '../helpers';

type Multiplier<
    T1 extends KeyAsValueObject<keyof T1 & string>,
    T2 extends KeyAsValueObject<keyof T2 & string>,
    TR extends KeyAsValueObject<keyof TR & string>,
    R extends Scalar<TR>,
> = (a: BaseScalar<T1>, b: BaseScalar<T2>) => R;

export type { Multiplier };
