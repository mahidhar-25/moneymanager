interface DateDifference {
    years: number;
    months: number;
    days: number;
    totalTime: string;
    completeYears: number;
    completeMonths: number;
    completeDays: number;
}

function parseDate(date: string | Date): Date {
    return typeof date === "string" ? new Date(date) : date;
}

export function getDateDifference(
    start: Date | string,
    end: Date | string
): DateDifference {
    const startDate = parseDate(start);
    if (end === "") {
        end = new Date();
    }
    const endDate = parseDate(end);

    let years = endDate.getFullYear() - startDate.getFullYear();
    let months = endDate.getMonth() - startDate.getMonth();
    let days = endDate.getDate() - startDate.getDate();

    if (days < 0) {
        months--;
        const previousMonth = new Date(
            endDate.getFullYear(),
            endDate.getMonth(),
            0
        ).getDate();
        days += previousMonth;
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    const totalTime = `${years}y ${months}m ${days}d`;

    const completeYears = parseFloat(
        (years + months / 12 + days / 365).toFixed(3)
    );
    const completeMonths = parseFloat(
        (years * 12 + months + days / 30).toFixed(3)
    );
    const completeDays = Math.floor(
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    return {
        years,
        months,
        days,
        totalTime,
        completeYears,
        completeMonths,
        completeDays,
    };
}

// Example usage:
// const startDate = new Date('2020-01-01');
// const endDate = new Date('2023-07-23');
// console.log(getDateDifference(startDate, endDate));
