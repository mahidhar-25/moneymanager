interface SimpleInterest {
    principal: number;
    rate: number;
    time: number;
    interest: number;
}

export function calculateSimpleInterest(principal: number, rate: number, time: number): SimpleInterest {
    const interest = (principal * rate * time) / 100;
    return {
        principal,
        rate,
        time,
        interest,
    };
}

// Example usage:
// const principal = 100000;
// const rate = 18; // 5%
// const time = 1; // 2 years
// console.log(calculateSimpleInterest(principal, rate, time));
