/**
 * Expontentially weighted moving average and standard deviation.
 * Can be used for measuring values like ping.
 */
export default class EWMASD {
    constructor(discount) {
        Object.defineProperty(this, "discount", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "est_average", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "est_variance", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "initialized", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.discount = discount;
        this.est_average = 0;
        this.est_variance = 0;
        this.initialized = false;
    }
    update(measurement) {
        if (!this.initialized) {
            this.est_average = measurement;
            this.initialized = true;
        }
        else {
            let delta = measurement - this.est_average;
            this.est_variance =
                (1 - this.discount) *
                    (this.est_variance + this.discount * delta * delta);
            this.est_average =
                this.discount * measurement + (1 - this.discount) * this.est_average;
        }
    }
    average() {
        return this.est_average;
    }
    variance() {
        return this.est_variance;
    }
    stddev() {
        return Math.sqrt(this.est_variance);
    }
}
//# sourceMappingURL=ewmasd.js.map