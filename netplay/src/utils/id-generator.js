/**
 * A reversible permutation algorithm to turn a sequential index
 * into a unique 6-digit ID between 111111 and 999999.
 */
export class IdGenerator {
    static generate(counter) {
        // 1. Map counter to the domain size
        let x = counter % this.MODULUS;
        // 2. Modular multiplication (linear congruential generator step)
        // This spreads sequential numbers all over the range
        x = (x * this.PRIME) % this.MODULUS;
        // 3. Add offset to shift range from 0..888888 to 111111..999999
        let id = x + this.OFFSET;
        return id.toString();
    }
}
// Range size: 999999 - 111111 + 1 = 888889
Object.defineProperty(IdGenerator, "MODULUS", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 888889
});
Object.defineProperty(IdGenerator, "OFFSET", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 111111
});
// A large prime number roughly 2/3rds of the modulus to scatter values
// Must be coprime to MODULUS.
Object.defineProperty(IdGenerator, "PRIME", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 568303
});
// An arbitrary XOR mask to shuffle bits
Object.defineProperty(IdGenerator, "XOR_MASK", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 123456
});
//# sourceMappingURL=id-generator.js.map