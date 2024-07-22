import React from "react";

interface InputProps {
    id: string;
    type: string;
    name: string;
    autoComplete: string;
    className?: string;
    required?: boolean;
    placeholder?: string;
    inputLabel?: string;
    value?: string; // Add value prop
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Add onChange prop
}

const Input: React.FC<InputProps> = ({
    id,
    type,
    name,
    autoComplete,
    className = "",
    required = false,
    placeholder = "",
    inputLabel,
    value,
    onChange, // Destructure onChange prop
}) => {
    return (
        <div>
            <label
                htmlFor={name}
                className="block text-sm font-medium leading-6 text-gray-900"
            >
                {inputLabel}
            </label>
            <div className="mt-2">
                <input
                    id={id}
                    name={name}
                    type={type}
                    required={required}
                    autoComplete={autoComplete}
                    className={`ps-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${className}`}
                    placeholder={placeholder}
                    value={value} // Pass value to input
                    onChange={onChange} // Pass onChange to input
                />
            </div>
        </div>
    );
};

export default Input;
