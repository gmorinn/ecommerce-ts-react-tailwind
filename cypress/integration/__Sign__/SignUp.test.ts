import { generateEmail, generateName } from "../../../src/utils/generate";


describe("SignUp method", () => {
    it("password and confirm password doesn't match", () => {
        cy.visit('http://localhost:3000/sign');
        cy.get('input[id="email"]').type(generateEmail())
        cy.get('input[id="firstname"]').type(generateName())
        cy.get('input[id="lastname"]').type(generateName())
        cy.get('input[id="password"]').type('azertyuiop')
        cy.get('input[id="confirm_password"]').type('azertyuiop1')
        cy.findByRole('button', {  name: /register register/i}).click()
        cy.url().should('eq', 'http://localhost:3000/sign')
        cy.get(".test-confirm").contains("Wrong password")
    })

    it("password doesn't have number", () => {
        cy.visit('http://localhost:3000/sign');
        cy.get('input[id="email"]').type(generateEmail())
        cy.get('input[id="firstname"]').type(generateName())
        cy.get('input[id="lastname"]').type(generateName())
        cy.get('input[id="password"]').type('azertyuiop')
        cy.get('input[id="confirm_password"]').type('azertyuiop')
        cy.findByRole('button', {  name: /register register/i}).click()
        cy.url().should('eq', 'http://localhost:3000/sign')
        cy.get("form").contains("Password must contain at least one number.")
    })

    it("email already exists", () => {
        cy.visit('http://localhost:3000/sign');
        cy.get('input[id="email"]').type('guillaume@gmail.com')
        cy.get('input[id="firstname"]').type(generateName())
        cy.get('input[id="lastname"]').type(generateName())
        cy.get('input[id="password"]').type('azertyuiop1')
        cy.get('input[id="confirm_password"]').type('azertyuiop1')
        cy.findByRole('button', {  name: /register register/i}).click()
        cy.url().should('eq', 'http://localhost:3000/sign')
        cy.get("form").contains("Email already exists.")
    })

    it("password too small", () => {
        cy.visit('http://localhost:3000/sign');
        cy.get('input[id="email"]').type(generateEmail())
        cy.get('input[id="firstname"]').type(generateName())
        cy.get('input[id="lastname"]').type(generateName())
        cy.get('input[id="password"]').type('azert1')
        cy.get('input[id="confirm_password"]').type('azert1')
        cy.findByRole('button', {  name: /register register/i}).click()
        cy.url().should('eq', 'http://localhost:3000/sign')
        cy.get(".test-password").contains("Too small")
        cy.get(".test-confirm").contains("Too small")
    })

    it("all data are good", () => {
        cy.visit('http://localhost:3000/sign');
        cy.get('input[id="email"]').type(generateEmail())
        cy.get('input[id="firstname"]').type(generateName())
        cy.get('input[id="lastname"]').type(generateName())
        cy.get('input[id="password"]').type('azertyuiop123')
        cy.get('input[id="confirm_password"]').type('azertyuiop123')
        cy.findByRole('button', {  name: /register register/i}).click()
        cy.url().should('eq', 'http://localhost:3000/')
    })

    it("all data are empty", () => {
        cy.visit('http://localhost:3000/sign');
        cy.findByRole('button', {  name: /register register/i}).click()
        cy.get(".test-firstname").contains("Required")
        cy.get(".test-lastname").contains("Required")
        cy.get(".test-email").contains("Required")
        cy.get(".test-password").contains("Required")
        cy.get(".test-confirm").contains("Required")

        cy.url().should('eq', 'http://localhost:3000/sign')
    })

    it("firstname and lastname too small", () => {
        cy.visit('http://localhost:3000/sign');
        cy.get('input[id="firstname"]').type("a")
        cy.get('input[id="lastname"]').type("ab")
        cy.findByRole('button', {  name: /register register/i}).click()
        cy.get(".test-firstname").contains("Too small")
        cy.get(".test-lastname").contains("Too small")

        cy.url().should('eq', 'http://localhost:3000/sign')
    })
})