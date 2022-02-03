describe("Checkout Page", () => {
    it("check access to checkout page", () => {
        cy.visit('http://localhost:3000');
        cy.get('#root > div > div:nth-child(2) > div:nth-child(1)').click()
        cy.get('[data-testid="item-0"]').within(() => {
            cy.findByRole('button', { name: /add to cart/i }).click()
        })
        cy.get('#root > div > nav > div > div > ul > li:nth-child(4) > div > div').click()
        cy.findByRole('button', { name: /go to checkout/i }).click()
        cy.url().should('eq', 'http://localhost:3000/sign')
    })

    it("flow homepage to buy products", () => {
        cy.visit('http://localhost:3000');
        cy.findByRole('link', { name: /sign/i }).click()
        cy.get('input[id="emailSignIn"]').type('guillaume@gmail.com')
        cy.get('input[id="passwordSignIn"]').type('azertyuiop123')
        cy.findByRole('button', { name: /email login by mail/i}).click()
        
        cy.wait(3000)
        cy.get('#root > div > div:nth-child(2) > div:nth-child(1)').click()
        cy.get('[data-testid="item-0"]').within(() => {
            cy.findByRole('button', { name: /add to cart/i }).click()
            cy.findByRole('button', { name: /add to cart/i }).click()
        })
        cy.findByRole('img', { name: /logo/i }).click()
        cy.get('#root > div > div:nth-child(2) > div:nth-child(2)').click()
        cy.get('[data-testid="item-3"]').within(() => {
            cy.findByRole('button', { name: /add to cart/i }).click()
        })

        cy.findByRole('img', { name: /logo/i }).click()
        cy.get('#root > div > div:nth-child(3) > div:nth-child(1)').click()
        cy.get('[data-testid="item-0"]').within(() => {
            cy.findByRole('button', { name: /add to cart/i }).click()
            cy.findByRole('button', { name: /add to cart/i }).click()
            cy.findByRole('button', { name: /add to cart/i }).click()
        })

        cy.get('[data-testid="item-3"]').within(() => {
            cy.findByRole('button', { name: /add to cart/i }).click()
        })
        cy.get('#root > div > nav > div > div > ul > li:nth-child(4) > div > div').click()
        cy.findByRole('button', { name: /go to checkout/i }).click()
        cy.url().should('eq', 'http://localhost:3000/checkout')
        cy.findByRole('list').contains('7')
    })

    it("when have no products in cart", () => {
        cy.visit('http://localhost:3000');
        cy.visit('http://localhost:3000');
        cy.findByRole('link', { name: /sign/i }).click()
        cy.get('input[id="emailSignIn"]').type('guillaume@gmail.com')
        cy.get('input[id="passwordSignIn"]').type('azertyuiop123')
        cy.findByRole('button', { name: /email login by mail/i}).click()
        cy.get('#root > div > nav > div > div > ul > li:nth-child(4) > div > div').click()
        cy.findByRole('button', { name: /go to checkout/i }).click()
        cy.findByRole('heading', { name: /your shopping cart is empty/i })
        cy.findByRole('button', { name: /buy now !/i }).click()
        cy.url().should('eq', 'http://localhost:3000/shop')
    })

    // it("add quantity in checkout page", () => {
    //     cy.visit('http://localhost:3000');
    //     cy.visit('http://localhost:3000');
    //     cy.findByRole('link', { name: /sign/i }).click()
    //     cy.get('input[id="emailSignIn"]').type('guillaume@gmail.com')
    //     cy.get('input[id="passwordSignIn"]').type('azertyuiop123')
    //     cy.findByRole('button', { name: /email login by mail/i}).click()
    //     cy.get('#root > div > nav > div > div > ul > li:nth-child(4) > div > div').click()
    //     cy.findByRole('button', { name: /go to checkout/i }).click()
    //     cy.findByRole('heading', { name: /your shopping cart is empty/i })
    //     cy.findByRole('button', { name: /buy now !/i }).click()
    //     cy.url().should('eq', 'http://localhost:3000/shop')
    // })
})