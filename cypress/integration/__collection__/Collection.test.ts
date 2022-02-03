describe("Products by collection", () => {
    it("add one item", () => {
        cy.visit('http://localhost:3000');
        cy.get('#root > div > div:nth-child(2) > div:nth-child(1)').click()
        cy.get('[data-testid="item-0"]').within(() => {
            cy.findByRole('button', { name: /add to cart/i }).click()
        })
        cy.findByRole('list').contains('1')
    })

    it("add one item 2 times and one time an another item", () => {
        cy.visit('http://localhost:3000');
        cy.get('#root > div > div:nth-child(2) > div:nth-child(1)').click()
        cy.get('[data-testid="item-0"]').within(() => {
            cy.findByRole('button', { name: /add to cart/i }).click()
            cy.findByRole('button', { name: /add to cart/i }).click()
        })
        cy.findByRole('list').contains('2')
        cy.get('[data-testid="item-1"]').within(() => {
            cy.findByRole('button', { name: /add to cart/i }).click()
        })
        cy.findByRole('list').contains('3')
    })

    it("add multiple items of multiple collection", () => {
        cy.visit('http://localhost:3000');
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
        cy.findByRole('list').contains('3')
        cy.get('#root > div > nav > div > div > ul > li:nth-child(4) > div:nth-child(1) > div').click()
        cy.get('#root > div > nav > div > div > ul > li:nth-child(4) > div:nth-child(2)').contains('x 1')
        cy.get('#root > div > nav > div > div > ul > li:nth-child(4) > div:nth-child(2)').contains('x 2')
    })

})