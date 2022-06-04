/// <reference types="Cypress" />

describe('Testando a nivel de api', () => {

  before(()=>{
    cy.request({
      method: 'POST',
      url: 'https://barrigarest.wcaquino.me/signin',
      body: {
        email: Cypress.env('email'),
        senha: Cypress.env('password'),
        redirecionar: false,
      },
    })
    .its('body.token').should('not.be.empty')
    .then(token => {
      Cypress.env('token', token)
    })
  })
  beforeEach(() => {
    cy.request({
      method: 'GET',
      url: 'https://barrigarest.wcaquino.me/reset',
      headers: {
        Authorization: `JWT ${Cypress.env('token')}`,
      },
    })
    .then((response) => {
      expect(response.status).to.eq(200)
    })
  });

  it('deve criar uma conta', () => {
    cy.request({
      method: 'POST',
      url: 'https://barrigarest.wcaquino.me/contas',
      body: {
        nome: 'conta via rest',
      },
      headers:{
        Authorization: `JWT ${Cypress.env('token')}`
       },
    })
    .as('response')
    // apenas uma forma diferente de fazer o then
    cy.get('@response')
    .then((response) => {
      expect(response.status).to.eq(201)
      expect(response.body).to.have.property('id')
      expect(response.body.nome).to.eq('conta via rest')
    })
  })

  it('deve alterar uma conta', () => {

  })

  it('não deve criar conta com nome repetido', () => {

  })

  it('deve criar uma movimentação', () => {

  })

  it('deve excluir uma movimentação', () => {

  })

  it('deve verificar o saldo', () => {

  });

  it('deve alterar uma movimentação e verificar o saldo', () => {

  });

});