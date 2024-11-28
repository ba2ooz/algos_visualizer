import React, { useState, useRef } from "react";
import styles from "./CustomSelect.module.css";

export function CustomSelect({ disabled, options, onChange }) {
    const [selectedValue, setSelectedValue] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const detailsRef = useRef(null);

    const handleSelection = (value) => {
        onChange(value);
        setIsOpen(false);
        setSelectedValue(value);
        if (detailsRef.current) {
            detailsRef.current.removeAttribute("open"); // close the dropdown
        }
    };

    return (
        <details
            ref={detailsRef}
            className={disabled ? styles.disabled : ""}
            open={isOpen}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            >
            <summary>
                {options[selectedValue]}
            </summary>
            <ul>
                {options.map((option, id) => {
                    return (
                        <li key={id}>
                            <label onClick={() => handleSelection(id)} htmlFor={id}>
                                {option}
                            </label>
                        </li>
                    )
                })}
            </ul>
        </details>
    );
};