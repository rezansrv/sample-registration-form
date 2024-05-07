import Description from '../Description.vue'
const balancedMessage = 'The text is balanced.'
const UnbalancedMessage = 'The text is not balanced.'

describe('Description Component | src/components/Description.vue', () => {
    beforeEach(() => {
        cy.mount(Description)
        cy.spy(Description.methods, 'isBalanced').as('isBalanced');
    })
    context('Validation', ()=>{
        it('Passing a balanced text with no special character', ()=>{
            cy.get('input#description').type('Hi How are you doing today?')
            cy.contains(balancedMessage)
            cy.callsIsBalancedOnce()
        })
        it('Passing a balanced text with 1 level special character', ()=>{
            cy.get('input#description').type('Hi How are (you) doing today?')
            cy.contains(balancedMessage)
            cy.callsIsBalancedOnce()
        })
        it('Passing a balanced text with 2 levels of special characters', ()=>{
            cy.get('input#description').type('Hi How [are (you) doing] today?')
            cy.contains(balancedMessage)
            cy.callsIsBalancedOnce()
        })
        it('Passing a balanced text with 3 levels of special characters', ()=>{
            cy.get('input#description').type('Hi {How [are (you) doing] today}?', { parseSpecialCharSequences: false })
            cy.contains(balancedMessage)
            cy.callsIsBalancedOnce()
        })
        it('Passing an unbalanced text with 1 level special start character', ()=>{
            cy.get('input#description').type('Hi How are (you doing today?')
            cy.contains(UnbalancedMessage)
            cy.callsIsBalancedOnce()
        })
        it('Passing an unbalanced text with 1 level special end character', ()=>{
            cy.get('input#description').type('Hi How are you) doing today?')
            cy.contains(UnbalancedMessage)
            cy.callsIsBalancedOnce()
        })
        it('Passing an unbalanced text with 2 levels of special start characters', ()=>{
            cy.get('input#description').type('Hi How [are (you doing today?')
            cy.contains(UnbalancedMessage)
            cy.callsIsBalancedOnce()
        })
        it('Passing an unbalanced text with 2 levels of special end characters', ()=>{
            cy.get('input#description').type('Hi How [are you) doing today?')
            cy.contains(UnbalancedMessage)
            cy.callsIsBalancedOnce()
        })
        it('Passing an unbalanced text with 3 levels of special start characters', ()=>{
            cy.get('input#description').type('Hi {How [are (you doing today?', { parseSpecialCharSequences: false })
            cy.contains(UnbalancedMessage)
            cy.callsIsBalancedOnce()
        })
        it('Passing an unbalanced text with 3 levels of special end characters', ()=>{
            cy.get('input#description').type('Hi How are you) doing] today}?', { parseSpecialCharSequences: false })
            cy.contains(UnbalancedMessage)
            cy.callsIsBalancedOnce()
        })
        it('Passing an unbalanced text with 3 levels of special characters', ()=>{
            cy.get('input#description').type('Hi How (are [you) doing] today}?', { parseSpecialCharSequences: false })
            cy.contains(UnbalancedMessage)
            cy.callsIsBalancedOnce()
        })
    })
})