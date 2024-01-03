import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import AllReviews from "./AllReviews";

describe("AllReviews", () => {
  const movieDetails = { id: "123", title: "Movie Title" };
  const reviewsData = [
    {
      _id: "64856dbddb674934e988f33b",
      user: {
        _id: "64856a70305c231a1d46a68b",
        username: "shasmit",
      },
      rating: 4,
      review: "Best Movie",
      likes: [],
      createdAt: "2023-06-11T06:46:21.911Z",
      isLiked: false,
    },
    {
      _id: "6485b884d14602014a81a996",
      user: {
        _id: "6485b692d14602014a81a992",
        username: "Susmit",
      },
      rating: 4,
      review: "Babal movie",
      likes: ["6485b692d14602014a81a992"],
      createdAt: "2023-06-11T12:05:24.848Z",
      isLiked: false,
    },
  ];

  it("renders reviews when data is available", async () => {
    // Mock axios GET request
    const mock = new MockAdapter(axios);
    mock
      .onGet(`http://localhost:3001/movies/${movieDetails.id}/reviews`)
      .reply(200, { data: reviewsData });

    render(
      <MemoryRouter initialEntries={[{ state: { movieDetails } }]}>
        <AllReviews />
      </MemoryRouter>
    );

    // Wait for the reviews to be loaded
    await waitFor(() => {
      // Assert the review contents are rendered correctly
      expect(screen.getByText(reviewsData[0].user.username)).toBeInTheDocument();
      expect(screen.getByText(reviewsData[0].review)).toBeInTheDocument();
      expect(screen.getByText(reviewsData[1].user.username)).toBeInTheDocument();
      expect(screen.getByText(reviewsData[1].review)).toBeInTheDocument();
    });
  });

});
