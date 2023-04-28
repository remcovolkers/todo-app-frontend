describe('Todo CRUD operations', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3001');
    });

    it('creates a new todo item', () => {
        cy.get('.create-todo-form #title').type('My new todo');
        cy.get('.create-todo-form #description').type('This is a description');
        cy.get('.create-todo-form button[type="submit"]').click();

        cy.contains('My new todo').should('be.visible');
        cy.contains('This is a description').should('be.visible');
    });

    it('edits a todo item', () => {
        cy.get('.todo-list ul .todo-item').first().within(() => {
            cy.get('.edit-button').click();

            cy.get('input[name="title"]').clear().type('Updated todo');
            cy.get('input[name="description"]').clear().type('Updated description');
            cy.get('.save-button').click();
        });

        cy.contains('Updated todo').should('be.visible');
        cy.contains('Updated description').should('be.visible');
    });

    it('marks a todo item as completed', () => {
        cy.get('.todo-list ul .todo-item').first().within(() => {
            cy.get('.todo-item-details').click();
        });
        cy.wait(500);
        cy.get('.todo-list ul .todo-item').first().should('have.class', 'completed');
    });


    it('deletes a todo item', () => {
        cy.get('.create-todo-form #title').type('To be deleted');
        cy.get('.create-todo-form #description').type('To be deleted');
        cy.get('.create-todo-form button[type="submit"]').click();
        cy.wait(500);
        cy.get('.todo-list ul .todo-item').first().within(() => {
            cy.get('.delete-button').click();
        });

        cy.get('.todo-item').should('have.length', 0);
    });

    it('deletes a completed todo item', () => {
        cy.get('.completed-todos ul li').first().then(($completedTodo) => {
            const todoText = $completedTodo.text();
            cy.get('.completed-todos ul li').first().find('.delete-completed').click();
            cy.get('.completed-todos ul li').should('have.length', 0);
        });
    });
});
