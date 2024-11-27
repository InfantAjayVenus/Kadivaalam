import { useEffect, useRef, useState } from "react";

interface TimeInputProps {
    onChange: (hours: number, minutes: number) => void;
    initialHours?: number;
    initialMinutes?: number;
};

export function TimeInput({ onChange, initialHours = 0, initialMinutes = 0 }: TimeInputProps) {
    const [hours, setHours] = useState('');
    const [minutes, setMinutes] = useState('');

    const minuteRef = useRef<HTMLInputElement | null>(null);
    const inputClassName = "bg-background outline-transparent px-2 py-3 w-10 text-center";

    useEffect(() => {
       if(initialHours > 0) {
           setHours(initialHours.toString().padStart(2, '0'));
       }

       if(initialMinutes > 0) {
           setMinutes(initialMinutes.toString().padStart(2, '0'));
       }
    }, [initialHours, initialMinutes])

    useEffect(() => {
        if (hours.length === 2) {
            minuteRef.current?.focus();
        }
    }, [hours]);

    useEffect(() => {
        if (minutes.length === 0 && hours.length === 0) return;

        onChange(parseInt(hours), parseInt(minutes));
    }, [hours, minutes])


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
                onBlur={() => {
                    if (hours.length > 0) {
                        setHours(hours.padStart(2, '0'));
                    }
                }}
                onChange={(event) => {
                    const parsedInput = parseInt(event.target.value);
                    const isValid = !isNaN(parsedInput);
                    const updatedInput = isValid && (parsedInput < 60) ? parsedInput.toString() : '';
                    setHours(updatedInput);
                }}
            />
            <span role="separator" className="py-3">:</span>
            <label htmlFor="minute-input" role="minute input label" className="sr-only">minutes</label>
            <input
                ref={minuteRef}
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
                onBlur={() => {
                    if (minutes.length > 0) {
                        setMinutes(minutes.padStart(2, '0'));
                    }
                }}
                onChange={(event) => {
                    const parsedInput = parseInt(event.target.value);
                    const isValid = !isNaN(parsedInput);
                    const updatedInput = isValid && (parsedInput < 60) ? parsedInput.toString() : '';
                    setMinutes(updatedInput);
                }}
            />
        </div>
    );
}