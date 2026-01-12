/**
 * Expontentially weighted moving average and standard deviation.
 * Can be used for measuring values like ping.
 */
export default class EWMASD {
    discount: number;
    est_average: number;
    est_variance: number;
    initialized: boolean;
    constructor(discount: number);
    update(measurement: number): void;
    average(): number;
    variance(): number;
    stddev(): number;
}
