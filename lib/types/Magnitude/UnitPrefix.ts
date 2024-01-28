type PrefixSpec = {
    siName: string;
    symbol: string;
    exp: number;
};

function mkPrefix(symbol: string, siName: string, exp: number): PrefixSpec {
    return { symbol, siName, exp };
}

const UnitPrefixes: { [key: string]: PrefixSpec } = {
    q: mkPrefix('q', 'quecto', -30),
    r: mkPrefix('r', 'ranto', -27),
    y: mkPrefix('y', 'yocto', -24),
    z: mkPrefix('z', 'zepto', -21),
    a: mkPrefix('a', 'atto', -18),
    f: mkPrefix('f', 'femto', -15),
    p: mkPrefix('p', 'pico', -12),
    n: mkPrefix('n', 'nano', -9),
    // u: mkPrefix('u', 'micro', -6),
    µ: mkPrefix('µ', 'micro', -6),
    m: mkPrefix('m', 'milli', -3),
    c: mkPrefix('c', 'centi', -2),
    d: mkPrefix('d', 'deci', -1),
    '': mkPrefix('', '', 0),
    da: mkPrefix('da', 'deca', 1),
    h: mkPrefix('h', 'hecto', 2),
    k: mkPrefix('k', 'kilo', 3),
    M: mkPrefix('M', 'mega', 6),
    G: mkPrefix('G', 'giga', 9),
    T: mkPrefix('T', 'tera', 12),
    P: mkPrefix('P', 'peta', 15),
    E: mkPrefix('E', 'exa', 18),
    Z: mkPrefix('Z', 'zetta', 21),
    Y: mkPrefix('Y', 'yotta', 24),
    R: mkPrefix('R', 'ronna', 27),
    Q: mkPrefix('Q', 'quetta', 30),
};
Object.freeze(UnitPrefixes);

const prefixSymbolAliases: { [key: string]: string } = {
    u: 'µ',
};

const prefixesByIncreasingExponent = Object.values(UnitPrefixes).sort(
    (a, b) => a.exp - b.exp,
);
const prefixesByDecreasingExponent = [
    ...prefixesByIncreasingExponent,
].reverse();
const smallestExponentPrefix = prefixesByIncreasingExponent[0];
const defaultPrefix = UnitPrefixes[''];

const prefixMatchers = {
    simple: '[' + Object.keys(UnitPrefixes).join('') + ']',
    capturing: '(' + Object.keys(UnitPrefixes).join('|') + ')',
    optional: '[' + Object.keys(UnitPrefixes).join('') + ']?',
    capturingOptional: '(' + Object.keys(UnitPrefixes).join('|') + ')?',
} as const;
Object.freeze(prefixMatchers);

function prefixBySymbol(symbol: string): PrefixSpec | undefined {
    return UnitPrefixes[prefixSymbolAliases[symbol] ?? symbol];
}

function bestPrefixByValue(value: number): PrefixSpec {
    if (value === 0) {
        return defaultPrefix;
    }
    const exp = Math.floor(Math.log10(value));
    const prefix =
        prefixesByDecreasingExponent.find(prefix => prefix.exp <= exp) ??
        smallestExponentPrefix;
    return prefix;
}

export type { PrefixSpec };
export { UnitPrefixes, prefixMatchers, prefixBySymbol, bestPrefixByValue };
