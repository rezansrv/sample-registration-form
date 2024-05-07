import Wizard from '../Wizard.vue'
const invalidEmailAddress='Invalid email address.'
const validUsername= 'valid_username'
const validemail= 'user@local.test'

describe('Wizard Component | src/components/Wizard.vue', () => {
  beforeEach(() => {
    cy.mount(Wizard)
  })
  
  context('Username', ()=>{
    context('Validation', ()=>{
      it('Username validation works on empty username', () => {
        cy.get('button#btn-next').click()
        cy.contains('Invalid Username.')
      })
      it('Username validation works on invalid chars username', () => {
        cy.get('input#username').type('invalid@user name')
        cy.get('button#btn-next').click()
        cy.contains('Invalid Username.')
      })
    
      it('Username validation works on invalid short username', () => {
        
        cy.get('input#username').type('usr')
        cy.get('button#btn-next').click()
        cy.contains('Invalid Username.')
      })
    
      it('Username validation works on invalid long username', () => {
        
        cy.get('input#username').type('asdjasdhuasdiuahsdiuhasdiuhasdiuhasdiuhasdiuahs.i_a')
        cy.get('button#btn-next').click()
        cy.contains('Invalid Username.')
      })
    
      it('Username validation works on valid username', () => {
        
        cy.get('input#username').type(validUsername)
        cy.get('button#btn-next').click()
        cy.contains('Email:')
      })
    })
    context('Buttons', ()=>{
      it('Prev button is disabled in the first step', () => {
        cy.get('button#btn-prev').should('have.attr','disabled')
      })
    
      it('Prev button works after submiting valid username', () => {
        
        cy.get('input#username').type(validUsername)
        cy.get('button#btn-next').click()
        cy.contains('Email:')
        cy.get('button#btn-prev').not('[disabled="disabled"]')
        cy.get('button#btn-prev').click()
        cy.contains('Username:')
      })
    })
  })

  context('Email', ()=>{
    context('Validation', ()=>{
      it('Email validation works on empty username', () => {
        cy.wizardValidUsername(validUsername)
        cy.get('button#btn-next').click()
        cy.contains(invalidEmailAddress)
      })
      
      it('email validation works on invalid email address', () => {
        cy.wizardValidUsername(validUsername)
        cy.get('input#email').type('user @local.test')
        cy.get('button#btn-next').click()
        cy.contains(invalidEmailAddress)
      })
    
      it('Username validation works on valid username', () => {
        cy.wizardValidUsername(validUsername)
        cy.get('input#email').type(validemail)
        cy.get('button#btn-next').click()
        cy.contains('Step: review')
        cy.contains(`Username: ${validUsername}`)
        cy.contains(`Email: ${validemail}`)
      })
    })
    context('Buttons', ()=>{    
      it('Prev button works after submiting valid email', () => {
        cy.wizardValidUsername(validUsername)
        cy.get('input#email').type(validemail)
        cy.get('button#btn-next').click()
        cy.get('button#btn-prev').not('[disabled="disabled"]')
        cy.get('button#btn-prev').click()
        cy.contains('Email:')
      })

      it('Next button is disabled in the last step', () => {
        cy.wizardValidUsername(validUsername)
        cy.get('input#email').type(validemail)
        cy.get('button#btn-next').click()
        cy.get('button#btn-prev').not('[disabled="disabled"]')
        cy.get('button#btn-next').should('have.attr','disabled')
      })
    })
  })
})
