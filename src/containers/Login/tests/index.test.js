/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";


import Login from "../index";
//Render Test
describe("<Login/>", () => {
  test("should render correctly using default props", () => {
    render(
      <BrowserRouter>

        <Login /> 
      </BrowserRouter>
      ); 
    expect(screen.getByText("Iniciar sesión")).toBeInTheDocument();
    

  });

});

//inicio de sesion mensaje de error
describe("<Login/>", () => {
    test ("Login error message", async () => {
      render(
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      );
      
      const submitButton = screen.getAllByLabelText("Sign in");
      const errorMessage = screen.getByText("Invalid login credentials");
      
      submitButton.click();
      await waitFor(() => expect(errorMessage).toBeInTheDocument());  
    });
  });




