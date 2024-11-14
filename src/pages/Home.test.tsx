import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import "@testing-library/jest-dom";
import { Home } from "./Home";

describe("Home", () => {
    beforeEach(() => {
        render(<Home />);
    })
    it("should render help text", async () => {
        const helpTextRole = "how-to-help-text";

        await screen.findByRole(helpTextRole);

        expect(screen.getByRole(helpTextRole)).toBeInTheDocument();
    });

    it("should render link button", async () => {
        const linkButtonRole = "link-to-session-planner";
        
        await screen.findByRole(linkButtonRole);

        expect(screen.getByRole(linkButtonRole)).toBeInTheDocument();
    })

    it("should redirect to session planner", async () => {
        const linkButtonRole = "link-to-session-planner";

        await screen.findByRole(linkButtonRole);

        expect(screen.getByRole(linkButtonRole)).toHaveAttribute("href", "/session-planner");
    })
});