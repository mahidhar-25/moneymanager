import React from "react";

interface CircleWithTextProps {
    color: string | undefined;
    customClass: string;
    text: string | number;
}

const CircleWithText: React.FC<CircleWithTextProps> = ({
    color,
    customClass,
    text,
}) => {
    return (
        <div className="flex">
            <span
                className={`rounded-full ${customClass}`}
                style={{ backgroundColor: color }}
            ></span>
            <span className="text-center ms-2">{text}</span>
        </div>
    );
};

export default CircleWithText;
