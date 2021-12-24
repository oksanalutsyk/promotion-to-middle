describe('Login', () => {
  it('Should login if email and password are valid', () => {
    cy.visit('/')
    cy.url().should('includes', 'auth/login')
  
    cy.get(`[data-cy="login-email"]`).type('sef@gmail.gom')
    cy.get(`[data-cy="login-password"]`).type('123456789')
    
    cy.get(`[data-cy="login-submit-button"]`).click()

    // TODO
    // redirect to dashboard
  })

  it('Should not login if email or password are invalid', () => {
    cy.visit('/')
    cy.url().should('includes', 'auth/login')
  
    cy.get(`[data-cy="login-email"]`).type('sef@gmail.gom')
    cy.get(`[data-cy="login-password"]`).type('1234')
    
    cy.get(`[data-cy="login-submit-button"]`).click()

  })



  it('Should login if email and password are valid (with GOOGLE)', () => {
    cy.visit('/')
    cy.url().should('includes', 'login')
    
    cy.log('Logging in to Google')

    cy.request({
      method: 'POST',
      url: 'https://oauth2.googleapis.com/token',
      body: {
        grant_type: 'refresh_token',
        client_id: '974582432978-h36rta581tipa8jgkt1tvtuff8epogq7.apps.googleusercontent.com',
        client_secret: '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',
        refresh_token: '1//04shepULcmib-CgYIARAAGAQSNwF-L9IrbHDF4jt6wLJxn41i9_ZsnQjleBfU3Hqr7pJZfDJ81MrT9wVTQ2Q07bRr4Qpuw4VTCVA',
      },
    }).then(({ body }) => {
      const { access_token, id_token } = body
  
      cy.request({
        method: 'GET',
        url: 'https://www.googleapis.com/oauth2/v3/userinfo',
        headers: { Authorization: `Bearer ${access_token}` },
      }).then(({ body }) => {
        cy.log(body)
        const userItem = {
          token: id_token,
          user: {
            googleId: body.sub,
            email: body.email,
            givenName: body.given_name,
            familyName: body.family_name,
            imageUrl: body.picture,
          },
        }
  
        window.localStorage.setItem('user', JSON.stringify(userItem))
        cy.visit('/')

      })
    })
  })
})
