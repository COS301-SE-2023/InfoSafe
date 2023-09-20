import React from "react";
import { render, fireEvent} from "@testing-library/react";
import AccessRequestApproval from "../../Edit/AccessRequestApproval";

describe("AccessRequestApproval Component", () => {
    it("calls popupClose when back button is clicked", () => {
        const popupCloseMock = jest.fn();

        const { getByTestId } = render(
            <AccessRequestApproval popupOpen={true} popupClose={popupCloseMock} />
        );

        // eslint-disable-next-line testing-library/prefer-screen-queries
        const backButton = getByTestId("back-button"); // Select the button by test ID
        fireEvent.click(backButton);

        // Ensure that popupClose was called when the back button is clicked
        expect(popupCloseMock).toHaveBeenCalled();
    });
});
