import { cleanup, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom";
import { DurationInput } from "./DurationInput";
import userEvent from "@testing-library/user-event";
import { sleep } from "../lib/sleep";

// vi.useFakeTimers();

describe("TimeInput validation and behaviour", () => {
    const hourInputRole = "hour-input";
    const minuteInputRole = "minute-input";

    beforeEach(() => {
        cleanup();
        render(<DurationInput onDurationChange={() => {}}/>);
    })

    it("should render", async () => {

        await screen.findByRole(hourInputRole);
        await screen.findByRole(minuteInputRole);

        expect(screen.getByRole(hourInputRole)).toBeInTheDocument();
        expect(screen.getByRole(minuteInputRole)).toBeInTheDocument();

    });

    it.skip("should shift focus to seconds when 2 digits are entered", async () => {
        await userEvent.type(screen.getByRole(hourInputRole), "12");
        await sleep(300)

        expect(screen.getByRole(minuteInputRole)).toHaveFocus();
    });

    it("should reset to 0 if number is larger than 60", async () => {
        await userEvent.type(screen.getByRole(hourInputRole), "25");
        await userEvent.type(screen.getByRole(minuteInputRole), "61");
        

        expect(screen.getByRole(hourInputRole)).toHaveValue('');
        expect(screen.getByRole(minuteInputRole)).toHaveValue('');
    });
    it("should reset to 0 if a non numeric value is entered", async () => {
        const inputValue = "a-"
        await userEvent.type(screen.getByRole(hourInputRole), inputValue);
        await userEvent.type(screen.getByRole(minuteInputRole), inputValue);

        expect(screen.getByRole(hourInputRole)).toHaveValue('');
        expect(screen.getByRole(minuteInputRole)).toHaveValue('');
    });

    it("should left pad with 0 if number is smaller than 10 when blurred", async () => {
        const inputValue = "5[Tab]";
        const expectedValue = "05";

        await userEvent.type(screen.getByRole(hourInputRole), inputValue);
        await userEvent.type(screen.getByRole(minuteInputRole), inputValue);
        await sleep(300);

        expect(screen.getByRole(hourInputRole)).toHaveValue(expectedValue);
        expect(screen.getByRole(minuteInputRole)).toHaveValue(expectedValue);
    });
});

describe("TimeInput data update", () => {
    const initialValues = {
        hours: 5,
        minutes: 5
    };
    const hourInputRole = "hour-input";
    const minuteInputRole = "minute-input";
    const onChangeMock = vi.fn();

    describe("on change", () => {
        beforeEach(() => {
            cleanup();
            render(<DurationInput onDurationChange={onChangeMock} />);
        });

        it("should call onchange with the new value", async () => { 
            await userEvent.type(screen.getByRole(hourInputRole), initialValues.hours.toString());
            await userEvent.type(screen.getByRole(minuteInputRole), initialValues.minutes.toString());
            await sleep(300);

            expect(onChangeMock).toHaveBeenCalledWith(initialValues);
        });
    });

    describe("initial Values", () => {
        beforeEach(() => {
            cleanup();
            render(<DurationInput onDurationChange={onChangeMock} initialDuration={initialValues} />);
        });

        it("should render the input with initial values", async () => {
            await screen.findByRole(hourInputRole);
            await screen.findByRole(minuteInputRole);

            expect(screen.getByRole(hourInputRole)).toHaveValue(initialValues.hours.toString().padStart(2, '0'));
            expect(screen.getByRole(minuteInputRole)).toHaveValue(initialValues.minutes.toString().padStart(2, '0'));
        })
    })
});