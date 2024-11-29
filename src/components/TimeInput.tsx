import { useDebounce } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import { Duration } from "../types/Task";

interface TimeInputProps {
    onDurationChange: (taskData: Duration) => void;
    initialDuration?: Duration;
};

/**
 * Checks if a given string represents a valid number within a specified range.
 *
 * @param {string} input - The string to be validated.
 * @param {number} min - The minimum allowed value (inclusive). Defaults to -Infinity.
 * @param {number} max - The maximum allowed value (exclusive). Defaults to Infinity.
 * @return {boolean} True if the input string represents a valid number within the specified range, false otherwise.
 */
function isValidNumber(input: string, limits:{min?: number, max?: number}={min: -Infinity, max: Infinity}) {
    const value = parseInt(input);
    
    return !isNaN(value) && value >= (limits.min || -Infinity) && value < (limits.max || Infinity);
}


export function TimeInput({ onDurationChange, initialDuration = { hours: 0, minutes: 0 } }: TimeInputProps) {

    const [hours, setHours] = useState<string>(initialDuration.hours > 0 ? initialDuration.hours.toString().padStart(2, '0') : '');
    const [minutes, setMinutes] = useState<string>(initialDuration.minutes > 0 ? initialDuration.minutes.toString().padStart(2, '0') : '');
    const debouncedHours = useDebounce(hours, 300);
    const debouncedMinutes = useDebounce(minutes, 300);

    const inputClassName = "bg-background outline-transparent px-2 py-3 max-w-10 text-center";

    useEffect(() => {

        if ((hours === '' && minutes === '') || isNaN(parseInt(hours)) || isNaN(parseInt(minutes))) return;

        onDurationChange({ hours: parseInt(hours), minutes: parseInt(minutes) });

    }, [debouncedHours, debouncedMinutes, onDurationChange])

    return (
        <div
            role="time input"
            aria-description="This is an input group that has hours and minutes to add duration values."
            className="flex bg-background w-min"
        >
            <label htmlFor="hour-input" role="hour input label" className="sr-only">hours</label>
            <input
                value={hours}
                type="text"
                name="hour-input"
                id="hour-input"
                inputMode="numeric"
                pattern="\d{2}"
                role="hour-input"
                placeholder="hh"
                maxLength={2}
                className={inputClassName}
                onChange={(event) => {
                    setHours(isValidNumber(event.target.value, {min: 0, max: 23})? parseInt(event.target.value).toString() : '');
                }}
                onBlur={() => {
                    if(hours === '') return;
                    setHours(hours.padStart(2, '0'));
                }}
            />
            <span role="separator" className="py-3">:</span>
            <label htmlFor="minute-input" role="minute input label" className="sr-only">minutes</label>
            <input
                value={minutes}
                type="text"
                name="minute-input"
                id="minute-input"
                inputMode="numeric"
                pattern="\d{2}"
                role="minute-input"
                placeholder="mm"
                maxLength={2}
                className={inputClassName}
                onChange={(event) => {
                    setMinutes(isValidNumber(event.target.value, {min: 0, max: 60}) ? parseInt(event.target.value).toString() : '');
                }}
                onBlur={() => {
                    if(minutes === '') return;
                    setMinutes(minutes.padStart(2, '0'));
                }}
            />
        </div>
    );
}