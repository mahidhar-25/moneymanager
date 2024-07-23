"use client";

import { PieChart } from "@mui/x-charts/PieChart";
import { useState } from "react";
export default function LenderManagerDashboard() {
    const [dashboardData, setDashboardData] = useState({
        AmountData: {
            principalAmount: 200000,
            interestAmount: 20000,
        },
        RepaymentData: {
            paidPeople: 400,
            notPaidPeople: 300,
        },
    });
    const data = [
        {
            id: 0,
            value: dashboardData.AmountData.principalAmount,
            label: "Principal",
        },
        {
            id: 1,
            value: dashboardData.AmountData.interestAmount,
            label: "Interest",
        },
    ];

    const repaymentData = [
        { label: "paid people", value: dashboardData.RepaymentData.paidPeople },
        {
            label: "Not paid people",
            value: dashboardData.RepaymentData.notPaidPeople,
        },
    ];

    return (
        <div className="border-b p-3 w-full h-auto">
            <div className="flex flex-col w-full">
                <div className="text-center w-full">Dashboard</div>
                <div className="flex flex-row me-10">
                    <div className="w-1/2">
                        <PieChart
                            series={[
                                {
                                    data,
                                    highlightScope: {
                                        faded: "global",
                                        highlighted: "item",
                                    },
                                    faded: {
                                        innerRadius: 30,
                                        additionalRadius: -30,
                                        color: "gray",
                                    },
                                },
                            ]}
                            height={200}
                        />
                    </div>
                    <div className="w-1/2">
                        <PieChart
                            series={[
                                {
                                    data: repaymentData,
                                    highlightScope: {
                                        faded: "global",
                                        highlighted: "item",
                                    },
                                    faded: {
                                        innerRadius: 30,
                                        additionalRadius: -30,
                                        color: "gray",
                                    },
                                },
                            ]}
                            height={200}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
