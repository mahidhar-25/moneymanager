import { AccountStatus } from "@prisma/client";
import { getDateDifference } from "./dateTime";

interface SimpleInterest {
    principal: number;
    rate: number;
    time: number;
    interest: number;
}

export interface CompoundingDetail {
    period: number;
    startDate: string;
    endDate: string;
    principal: number;
    interest: number;
}

interface CompoundInterestResult {
    principal: number;
    interest: number;
    startDate: string | Date;
    endDate: string | Date;
    compounded: boolean;
    compoundingDetails?: CompoundingDetail[];
}

export function calculateSimpleInterest(
    principal: number,
    rate: number,
    time: number
): SimpleInterest {
    const interest = (principal * rate * time) / 100;
    return {
        principal,
        rate,
        time,
        interest,
    };
}

export function calculateCompoundInterest(data: {
    principal: number;
    interestRate: number;
    startDate: string | Date;
    endDate: string | Date;
    compounded: boolean;
    forNoOfYears: number;
    accountStatus?: AccountStatus;
}): CompoundInterestResult {
    const {
        principal,
        interestRate,
        startDate,
        endDate,
        forNoOfYears,
        compounded,
    } = data;

    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    const dateDiff = getDateDifference(start, end);
    if (!compounded) {
        const simpleInterestDetail = calculateSimpleInterest(
            principal,
            interestRate,
            dateDiff.completeYears
        );
        return {
            compounded: false,
            principal: simpleInterestDetail.principal,
            interest: simpleInterestDetail.interest,
            endDate,
            startDate,
            compoundingDetails: [],
        };
    }

    let currentPrincipal = principal;
    let totalInterest = 0;
    const compoundingDetails: CompoundingDetail[] = [];
    let currentStartDate = start;
    let period = 1;

    const timeInterval = forNoOfYears;

    while (currentStartDate < end) {
        const simpleInterest = calculateSimpleInterest(
            currentPrincipal,
            interestRate,
            timeInterval
        );
        currentPrincipal += simpleInterest.interest;

        const nextStartDate = new Date(currentStartDate);
        nextStartDate.setFullYear(
            nextStartDate.getFullYear() + Math.floor(timeInterval)
        );
        nextStartDate.setMonth(
            nextStartDate.getMonth() + (timeInterval % 1) * 12
        );

        if (nextStartDate > end) {
            break;
        }

        compoundingDetails.push({
            period: period++,
            startDate: currentStartDate.toISOString(),
            endDate: nextStartDate.toISOString(),
            principal: parseFloat(simpleInterest.principal.toFixed(2)),
            interest: parseFloat(simpleInterest.interest.toFixed(2)),
        });

        currentStartDate = nextStartDate;
    }

    // Calculate interest for the remaining period if any
    console.log(getDateDifference(currentStartDate, end));
    const remainingTimeInYears = getDateDifference(currentStartDate, end);
    if (remainingTimeInYears.completeYears > 0) {
        console.log({
            remainingTimeInYears,
            end: end.toISOString(),
            current: currentStartDate.toISOString(),
        });
        const simpleInterest = calculateSimpleInterest(
            currentPrincipal,
            interestRate,
            remainingTimeInYears.completeYears
        );
        currentPrincipal += simpleInterest.interest;

        compoundingDetails.push({
            period: period++,
            startDate: currentStartDate.toISOString(),
            endDate: end.toISOString(),
            principal: parseFloat(simpleInterest.principal.toFixed(2)),
            interest: parseFloat(simpleInterest.interest.toFixed(2)),
        });
    }

    compoundingDetails.forEach((detail) => {
        totalInterest += detail.interest;
    });

    return {
        compounded: true,
        principal: principal,
        interest: parseFloat(totalInterest.toFixed(2)),
        startDate: start.toISOString(),
        endDate: end.toISOString(),
        compoundingDetails: compoundingDetails,
    };
}
// Example usage:
// const principal = 100000;
// const rate = 18; // 5%
// const time = 1; // 2 years
// console.log(calculateSimpleInterest(principal, rate, time));
