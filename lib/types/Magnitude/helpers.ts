type Parser<T> = (unit: string) => T;

type KeyAsValueObject<T extends string> = {
    [K in T]: K;
};

function unitParser<T extends KeyAsValueObject<keyof T & string>>(
    unitEnum: T,
): Parser<keyof T> {
    return (unit: string): keyof T => {
        const key = unit as keyof T;
        if (key in unitEnum) {
            return key;
        } else {
            throw new Error(`Invalid unit: ${unit}`);
        }
    };
}

export type { Parser, KeyAsValueObject };
export { unitParser };
