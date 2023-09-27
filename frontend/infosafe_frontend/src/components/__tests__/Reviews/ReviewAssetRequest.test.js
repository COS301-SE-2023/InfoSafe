import React, {useState} from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import ReviewAssetRequest from "../../Reviews/ReviewAssetRequest.js";

describe("ReviewAssetRequest Component", () => {
    const assetRequest = {
        asset_id: "1",
        request_status: "Pending",
        asset: {
            asset_name: "asset 1"
        },
        user: {
            first_name: "John",
            last_name: "Doe"
        },
        reason: "Need new asset",
        desired_date: "2023/10/10"
    };

    it("renders correctly with review data", () => {
        const { getByText } = render(
            <ReviewAssetRequest assetRequest={assetRequest} popupOpen={true} popupClose={() => {}} />
        );

        // Ensure that the component renders with user data
        expect(screen.getByText("Review Asset Request")).toBeInTheDocument();
        expect(screen.getByText("Device Name")).toBeInTheDocument();
        expect(screen.getByText("asset 1")).toBeInTheDocument();
        expect(screen.getByText("User")).toBeInTheDocument();
        expect(screen.getByText("John Doe")).toBeInTheDocument();
        expect(screen.getByText("Reason")).toBeInTheDocument();
        expect(screen.getByText("Need new asset")).toBeInTheDocument();
        expect(screen.getByText("Date Required")).toBeInTheDocument();
        expect(screen.getByText("2023/10/10")).toBeInTheDocument();
        expect(screen.getByText("Status")).toBeInTheDocument();
        expect(screen.getByText("Pending")).toBeInTheDocument();
    });

    it("calls popupClose when back button is clicked", () => {
        const popupCloseMock = jest.fn();

        const { getByTestId } = render(
            <ReviewAssetRequest assetRequest={assetRequest} popupOpen={true} popupClose={popupCloseMock} />
        );

        // eslint-disable-next-line testing-library/prefer-screen-queries
        const backButton = getByTestId("back-button"); // Select the button by test ID
        fireEvent.click(backButton);

        // Ensure that popupClose was called when the back button is clicked
        expect(popupCloseMock).toHaveBeenCalled();
    });
});
