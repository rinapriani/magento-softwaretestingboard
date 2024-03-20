/// <reference types = "cypress"/>

describe ('open luma website url', () => {
    beforeEach(() => {

        cy.visit('https://magento.softwaretestingboard.com/')
    })


    it('I try to create new customer account with different classes of characters in password', () => {
        cy.get('li a[href="https://magento.softwaretestingboard.com/customer/account/create/"]').eq(0).click();
        cy.get('#firstname').type('Rina')
        cy.get('#lastname').type('Apriani')
        cy.get('#email_address').type('rina.apriani498@gmail.com')
        cy.get('#password').type('rinasoftwaretesting')
        cy.get('#password-confirmation').type('rinasoftwaretesting')

        //verify the error message 
        cy.get('#password-error').should('be.visible').and('contain', 'Minimum of different classes of characters in password is 3. Classes of characters: Lower Case, Upper Case, Digits, Special Characters.')
    })

    it('I try to create new customer account with less than 8 characters', () => {
        cy.reload()
        cy.get('li a[href="https://magento.softwaretestingboard.com/customer/account/create/"]').eq(0).click();
        cy.get('#firstname').type('Rina')
        cy.get('#lastname').type('Apriani')
        cy.get('#email_address').type('rina.apriani498@gmail.com')
        cy.get('#password').type('rina')
        cy.get('#password-confirmation').type('rina')

        //verify the error message 
        cy.get('#password-error').should('be.visible').and('contain', 'Minimum length of this field must be equal or greater than 8 symbols. Leading and trailing spaces will be ignored.')
    })

    it('I try to create new customer account with valid data', () => {
        cy.reload()
        cy.get('li a[href="https://magento.softwaretestingboard.com/customer/account/create/"]').eq(0).click();
        cy.get('#firstname').type('Rina')
        cy.get('#lastname').type('Apriani')
        cy.get('#email_address').type('rina.apriani498@gmail.com')
        cy.get('#password').type('Rinasoftwaretesting12')
        cy.get('#password-confirmation').type('Rinasoftwaretesting12')
        cy.get('button.action.submit.primary[title="Create an Account"]').click();
        cy.wait(500)
        cy.contains('div[data-bind]', 'Thank you for registering with Main Website Store').should('be.visible')
    })

})

