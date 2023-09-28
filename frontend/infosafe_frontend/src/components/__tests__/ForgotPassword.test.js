import React, {useState} from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import ForgotPassword from "../ForgotPassword"; // Import your component here

describe("ForgotPassword Component", () => {
    const [email, setEmail] = "example@gmail.com";

    it("renders correctly with user data", () => {
        const { getByText } = render(
            <ForgotPassword />
        );

        // Ensure that the component renders with user data
        expect(screen.getByText("Enter your E-Mail:")).toBeInTheDocument();
        //expect(screen.getByText("example@gmail.com")).toBeInTheDocument();
        expect(screen.getByText("Enter OTP:")).toBeInTheDocument();
        //expect(screen.getByText("Surname")).toBeInTheDocument();
        expect(screen.getByText("Enter new password:")).toBeInTheDocument();
        //expect(screen.getByText("Email")).toBeInTheDocument();
        expect(screen.getByText("Re-enter new password:")).toBeInTheDocument();
        //expect(screen.getByText("System Role")).toBeInTheDocument();
    });

});
