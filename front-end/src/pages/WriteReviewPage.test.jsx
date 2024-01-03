import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import WriteReviewPage from "./WriteReviewPage";

describe("WriteReviewPage", () => {
  const movieDetails = { movie: { title: "Movie Title" } };
  const reviewID = "12345"; // A mock review ID

  it("submits review and shows success message", async () => {
    // Mock axios PUT request
    const mock = new MockAdapter(axios);
    mock
      .onPut(
        `http://localhost:3001/movies/${movieDetails.id}/reviews/${reviewID}`
      )
      .reply(200);

    render(
      <MemoryRouter initialEntries={[{ state: { movieDetails, reviewID } }]}>
        <WriteReviewPage />
      </MemoryRouter>
    );

    // Select the rating stars and click on the first star
    const ratingStars = screen.getAllByRole("button");
    fireEvent.click(ratingStars[0]);

    // Type review text in the textarea
    const reviewText = "This is a great movie!";
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: reviewText },
    });

    const submitButton = screen.getAllByRole("button")[1]; // Second button is the SVG button
    fireEvent.click(submitButton);

    // Wait for the review to be submitted and success message to appear
    await waitFor(() => {
      // Assert that the review was submitted successfully
      expect(
        screen.getByText("Review submitted successfully!")
      ).toBeInTheDocument();
    });
  });
});
