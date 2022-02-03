describe("Homepage redirections", () => {
    it("hats collection", () => {
        cy.visit('http://localhost:3000');
        cy.get('#root > div > div:nth-child(2) > div:nth-child(1)').click()
        cy.url().should('eq', 'http://localhost:3000/shop/hat')
    })

    it("sneaker collection", () => {
        cy.visit('http://localhost:3000');
        cy.get('#root > div > div:nth-child(2) > div:nth-child(3)').click()
        cy.url().should('eq', 'http://localhost:3000/shop/sneaker')
    })

    it("women collection", () => {
        cy.visit('http://localhost:3000');
        cy.get('#root > div > div:nth-child(3) > div:nth-child(1)').click()
        cy.url().should('eq', 'http://localhost:3000/shop/women')
    })

    it("men collection", () => {
        cy.visit('http://localhost:3000');
        cy.get('#root > div > div:nth-child(3) > div:nth-child(2)').click()
        cy.url().should('eq', 'http://localhost:3000/shop/men')
    })

    it("jackets collection", () => {
        cy.visit('http://localhost:3000');
        cy.get('#root > div > div:nth-child(2) > div:nth-child(2)').click()
        cy.url().should('eq', 'http://localhost:3000/shop/jacket')
    })

    it("shop navigation", () => {
        cy.visit('http://localhost:3000');
        cy.findByRole('link', {  name: /shop/i}).click()
        cy.url().should('eq', 'http://localhost:3000/shop')
    })

    it("contact navigation", () => {
        cy.visit('http://localhost:3000');
        cy.findByRole('link', {  name: /contact/i}).click()
        cy.url().should('eq', 'http://localhost:3000/contact')
    })

    it("sign navigation", () => {
        cy.visit('http://localhost:3000');
        cy.findByRole('link', {  name: /sign/i}).click()
        cy.url().should('eq', 'http://localhost:3000/sign')
    })

    it("redirection homepage with logo navigation", () => {
        cy.visit('http://localhost:3000/contact');
        cy.findByRole('img', {  name: /logo/i}).click()
        cy.url().should('eq', 'http://localhost:3000/')
    })

    it("cart button in navBar", () => {
        cy.visit('http://localhost:3000');
        cy.get('#root > div > nav > div > div > ul > li:nth-child(4) > div > div').click()
        cy.get('#root > div > nav > div > div > ul > li:nth-child(4) > div:nth-child(2)').contains('Card is empty')
        cy.findByRole('button', {  name: /go to checkout/i})
        cy.url().should('eq', 'http://localhost:3000/')
        cy.get('#root > div > nav > div > div > ul > li:nth-child(4) > div > div').click()
        cy.get('#root > div > nav > div > div > ul > li:nth-child(4) > div:nth-child(2)').should('not.exist')
    })
})