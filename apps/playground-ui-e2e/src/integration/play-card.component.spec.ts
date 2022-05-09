describe('playground-ui', () => {
  beforeEach(() => cy.visit('/iframe.html?id=playcardcomponent--primary'));
  it('should render the component', () => {
    cy.get('play-card').should('exist');
  });
});
