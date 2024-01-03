// pages/SigninPage.test.js
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom"; // Import BrowserRouter
import { UserContext } from "../context/UserContext";
import { server } from "../mocks/server";
import Login from "./login";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const customRender = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <UserContext.Provider value={providerProps}>{ui}</UserContext.Provider>,
    renderOptions
  );
};

describe("Signin Page", () => {
  let providerProps;
  beforeEach(() => {
    providerProps = {
      user: null,
      isLoading: false,
    };
  });

  test("should render correctly", () => {
    customRender(
      <Router>
        <Login />
      </Router>,
      { providerProps }
    );
  });

  test("should log in a user when the form is submitted", async () => {
    customRender(
      <Router>
        <Login />
      </Router>,
      { providerProps }
    );

    // Simulate user input
    fireEvent.change(screen.getByPlaceholderText("Enter your username"), {
      target: { value: "testuser" },
    });

    fireEvent.change(screen.getByPlaceholderText("Enter your Password"), {
      target: { value: "testpassword" },
    });

    const signInButton = screen.getByRole("button", { name: /LOGIN/i });

    fireEvent.click(signInButton);

    // Wait for the API call to complete=
    await waitFor(() => {
      expect(window.location.href).toBe("http://localhost/");
    });
  });
});
