/**
 * A reversible permutation algorithm to turn a sequential index
 * into a unique 6-digit ID between 111111 and 999999.
 */
export declare class IdGenerator {
    private static readonly MODULUS;
    private static readonly OFFSET;
    private static readonly PRIME;
    private static readonly XOR_MASK;
    static generate(counter: number): string;
}
