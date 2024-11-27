import { useEffect, useRef, useState } from "react";

interface TimeInputProps {
    onChange: (minutes: number, seconds: number) => void;
    initialMinutes?: number;
    initialSeconds?: number;
};

export function TimeInput({ onChange, initialMinutes = 0, initialSeconds = 0 }: TimeInputProps) {
    const [minutes, setMinutes] = useState('');
    const [seconds, setSeconds] = useState('');

    const secondRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
       if(initialMinutes > 0) {
           setMinutes(initialMinutes.toString().padStart(2, '0'));
       }

       if(initialSeconds > 0) {
           setSeconds(initialSeconds.toString().padStart(2, '0'));
       }
    }, [initialMinutes, initialSeconds])

    useEffect(() => {
        if (minutes.length === 2) {
            secondRef.current?.focus();
        }
    }, [minutes]);

    useEffect(() => {
        if (seconds.length === 0 && minutes.length === 0) return;

        onChange(parseInt(minutes), parseInt(seconds));
    }, [minutes, seconds])


    return (
        <>
            <label htmlFor="minute-input" role="minute input label" className="sr-only">Minutes</label>
            <input
                value={minutes}
                type="text"
                name="minute-input"
                id="minute-input"
                inputMode="numeric"
                pattern="\d{2}"
                role="minute-input"
                placeholder="00"
                maxLength={2}
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
            <label htmlFor="second-input" role="second input label" className="sr-only">Seconds</label>
            <input
                ref={secondRef}
                value={seconds}
                type="text"
                name="second-input"
                id="second-input"
                inputMode="numeric"
                pattern="\d{2}"
                role="second-input"
                placeholder="00"
                maxLength={2}
                onBlur={() => {
                    if (seconds.length > 0) {
                        setSeconds(seconds.padStart(2, '0'));
                    }
                }}
                onChange={(event) => {
                    const parsedInput = parseInt(event.target.value);
                    const isValid = !isNaN(parsedInput);
                    const updatedInput = isValid && (parsedInput < 60) ? parsedInput.toString() : '';
                    setSeconds(updatedInput);
                }}
            />
        </>
    );
}