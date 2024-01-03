import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { server } from "../mocks/server";
import Register from "./register";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const customRender = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <UserContext.Provider value={providerProps}>{ui}</UserContext.Provider>,
    renderOptions
  );
};

describe("Signup Page", () => {
  let providerProps;

  beforeAll(() => {
    server.listen(); // Start the test server
  });

  afterEach(() => {
    server.resetHandlers(); // Reset any runtime request handlers between tests
  });

  afterAll(() => {
    server.close(); // Close the test server after all tests are done
  });

  test("should sign up a user when the form is submitted with valid data", async () => {
    customRender(
      <Router>
        <Register />
      </Router>,
      { providerProps }
    );


    fireEvent.change(screen.getByPlaceholderText("Enter your username"), {
      target: { value: "testuser4" },
    });

    fireEvent.change(screen.getByPlaceholderText("Enter your email"), {
      target: { value: "testuser4@gmail.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("Enter your Password"), {
      target: { value: "testpassword" },
    });

    fireEvent.change(screen.getByPlaceholderText("Re-Enter your password"), {
        target: { value: "testpassword" },
        });

    const createAccountButton = screen.getByRole("button", {
      name: /REGISTER/i,
    });

    fireEvent.click(createAccountButton);

    // Check if the success message is displayed
    await waitFor(() => {;
      expect(window.location.href).toBe("http://localhost/");
    });

  });
});