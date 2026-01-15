/**
 * A reversible permutation algorithm to turn a sequential index
 * into a unique 6-digit ID between 111111 and 999999.
 */
export class IdGenerator {
    // Range size: 999999 - 111111 + 1 = 888889
    // --- CHANGED: Made public for reuse logic ---
    public static readonly MODULUS = 888889;
    private static readonly OFFSET = 111111;
    // A large prime number roughly 2/3rds of the modulus to scatter values
    // Must be coprime to MODULUS.
    private static readonly PRIME = 568303; 
    // An arbitrary XOR mask to shuffle bits
    private static readonly XOR_MASK = 123456;

    static generate(counter: number): string {
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