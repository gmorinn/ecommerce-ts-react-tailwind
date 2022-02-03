describe("SignIn method", () => {
    it("user signin when email and password is good", () => {
        cy.visit('http://localhost:3000/sign');
        cy.get('input[id="emailSignIn"]').type('guillaume@gmail.com')
        cy.get('input[id="passwordSignIn"]').type('azertyuiop123')
        cy.findByRole('button', { name: /email login by mail/i}).click()
        cy.url().should('eq', 'http://localhost:3000/')
    })

    it("user signin when email or password is not good", () => {
        cy.visit('http://localhost:3000/sign');
        cy.get('input[id="emailSignIn"]').type('guillaume@gmail.com')
        cy.get('input[id="passwordSignIn"]').type('12345789')
        cy.findByRole('button', { name: /email login by mail/i}).click()
        cy.url().should('eq', 'http://localhost:3000/sign')
        cy.get("form").contains("Email or password incorrect")
    })

    it("user signin when it's not an email", () => {
        cy.visit('http://localhost:3000/sign');
        cy.get('input[id="emailSignIn"]').type('guillaume')
        cy.get('input[id="passwordSignIn"]').type('12345789')
        cy.findByRole('button', { name: /email login by mail/i}).click()
        cy.url().should('eq', 'http://localhost:3000/sign')
    })

    it("user signin when it's not a password", () => {
        cy.visit('http://localhost:3000/sign');
        cy.get('input[id="emailSignIn"]').type('guillaume@gmail.com')
        cy.get('input[id="passwordSignIn"]').type('a')
        cy.findByRole('button', { name: /email login by mail/i}).click()
        cy.get("form").contains("Too small")
        cy.get('input[id="passwordSignIn"]').type('aaaaaaaaaaaaaaaaaaaa')
        cy.findByRole('button', { name: /email login by mail/i}).click()
        cy.get("form").contains("Password must contain at least one number.")
        cy.url().should('eq', 'http://localhost:3000/sign')
    })

    it("user signin when there is no email", () => {
        cy.visit('http://localhost:3000/sign');
        cy.get('input[id="passwordSignIn"]').type('azertyuiop123')
        cy.findByRole('button', { name: /email login by mail/i}).click()
        cy.get(".test-email").contains("Required")
        cy.url().should('eq', 'http://localhost:3000/sign')
    })

    it("user signin when there is no password", () => {
        cy.visit('http://localhost:3000/sign');
        cy.get('input[id="emailSignIn"]').type('guillaume@gmail.com')
        cy.findByRole('button', { name: /email login by mail/i}).click()
        cy.get(".test-password").contains("Required")
        cy.url().should('eq', 'http://localhost:3000/sign')
    })


    it("user signin when there is no password and email", () => {
        cy.visit('http://localhost:3000/sign');
        cy.findByRole('button', { name: /email login by mail/i}).click()
        cy.get(".test-email").contains("Required")
        cy.get(".test-password").contains("Required")
        cy.url().should('eq', 'http://localhost:3000/sign')
    })
})