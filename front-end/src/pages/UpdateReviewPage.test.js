import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import UpdateReviewPage from "./UpdateReviewPage";

describe("UpdateReviewPage", () => {
  const movieDetails = { id: "movie-id", movie: { title: "Movie Title" } };
  const reviewID = "review-id";

  it("loads review data and updates review on submit", async () => {
    // Mock axios GET and PUT requests
    const mock = new MockAdapter(axios);
    const reviewData = {
      rating: 4,
      review: "A great movie!",
    };
    mock
      .onGet(`http://localhost:3001/movies/${movieDetails.id}/reviews/${reviewID}`)
      .reply(200, { data: reviewData });
    mock
      .onPut(`http://localhost:3001/movies/${movieDetails.id}/reviews/${reviewID}`)
      .reply(200);

    render(
      <MemoryRouter initialEntries={[{ state: { movieDetails, reviewID } }]}>
        <UpdateReviewPage />
      </MemoryRouter>
    );

    // Wait for the review data to be loaded and populate the form fields
    await waitFor(() => {
      expect(screen.getByText("Update Your Review")).toBeInTheDocument();
      expect(screen.getByText("Movie Title")).toBeInTheDocument();
      expect(screen.getByText("Rating :")).toBeInTheDocument();
      expect(screen.getAllByRole("button")).toHaveLength(2); // 5 rating stars
      expect(screen.getByText("Your Review :")).toBeInTheDocument();
      expect(screen.getByRole("textbox")).toHaveValue("A great movie!");
    });

    // Select the rating stars and click on the third star
    const ratingStars = screen.getAllByRole("button");
    fireEvent.click(ratingStars[0]);

    // Type review text in the textarea
    const reviewText = "This is a great movie!";
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: reviewText },
    });

    const submitButton = screen.getAllByRole("button")[1]; // Second button is the SVG button
    fireEvent.click(submitButton);

    // Wait for the review to be updated and success message to appear
    await waitFor(() => {
      expect(screen.getByText("Review updated successfully!")).toBeInTheDocument();
    });
  });
});
