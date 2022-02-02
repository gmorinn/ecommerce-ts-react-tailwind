import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SignIn from '../../../components/sign/SignIn';
import { ProvideAuth } from '../../../hooks/useAuth';

const MockSignIn = () => (
    <ProvideAuth>
        <BrowserRouter>
            <SignIn />
        </BrowserRouter>
    </ProvideAuth>
)

describe('SignIn', () => {
    describe("Email", () => {
        it('should be able to type in input Mail', async () => {
            render(
              <MockSignIn />
          );
            const inputEmailElement = screen.getByPlaceholderText(/Email.../i)
            expect(inputEmailElement).toBeInTheDocument();
          });

          it('check value in input email', async () => {
            render(
              <MockSignIn />
          );
            const inputEmailElement = screen.getByPlaceholderText(/Email.../i)
            fireEvent.change(inputEmailElement, { target: { value: "guillaume.morin@epitech.eu" } })
            expect(inputEmailElement.value).toBe("guillaume.morin@epitech.eu");
          });
    })

    describe("Password", () => {
        it('should be able to type in input Password', async () => {
          render(
            <MockSignIn />
        );
          const inputPasswordElement = screen.getByPlaceholderText(/Password.../i)
          expect(inputPasswordElement).toBeInTheDocument();
        });

        it('check value in input password', async () => {
            render(
              <MockSignIn />
          );
            const inputPasswordElement = screen.getByPlaceholderText(/Password.../i)
            fireEvent.change(inputPasswordElement, { target: { value: "azertyuiop" } })
            expect(inputPasswordElement.value).toBe("azertyuiop");
          });
    })

    describe("Button SignIn", () => {
        // it('inputs should be null', async () => {
        //     render(
        //       <MockSignIn />
        //   );
        //     const inputPasswordElement = screen.getByPlaceholderText(/Password.../i)
        //     expect(inputPasswordElement).toBeInTheDocument();
        //   });
    })


})