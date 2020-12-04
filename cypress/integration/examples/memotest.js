///<reference types= "Cypress"/>

const URL = '127.0.0.1:8081';
const NUMERO_CUADROS = 12;

context('Memotest', () => {
    before(() => {
        cy.visit(URL);
    });

    describe('juega al memotest', () => {

        it('se asegura que haya un tablero con cuadros', () => {
            cy.get('.tablero').find('.col-4').should('have.length', NUMERO_CUADROS);
        });

        it('da click en boton empezar', () => {
            cy.get('#empezar').click()
        });

        it('se asegura que los cuadros sean aleatorios', () => {
            let cuadrosOriginales = [];
            cy.get('.col-4').then((cuadros) => {
                cuadros.each(function(i, cuadro) {
                    cuadrosOriginales.push(cuadro.id)
                });
            });
            cy.visit(URL);

            let cuadrosNuevos = [];
            cy.get('.col-4').then((cuadros) => {
                cuadros.each(function(i, cuadro) {
                    cuadrosNuevos.push(cuadro.id)
                });
            });
            cy.wrap(cuadrosOriginales).should('not.deep.equal', cuadrosNuevos)
        });



    });

    describe('resuelve el juego', () => {

        it('empieza el juego', () => {
            cy.get('#empezar').click();

        });
        let mapaDePares, listaDePares;
        it('obtiene pares de cuadro', () => {
            cy.get('.col-4').then(cuadros => {
                mapaDePares = obtenerParesDeCuadros(cuadros);
                listaDePares = Object.values(mapaDePares);
                cy.get('.col-4').should('have.length', NUMERO_CUADROS);
            });
        });

        it('resuelve el juego', () => {
            cy.get('.col-4').should('have.length', NUMERO_CUADROS);

            listaDePares.forEach((par) => {
                cy.get(par[0]).click();
                cy.get(par[1]).click();
            });
            cy.get('.carta').should('have.length', 0);

            cy.get('.tablero').should('not.be.visible');
            cy.get('.felicitaciones').should('be.visible');
            cy.get('.ganaste').should('be.visible');
        })


    });
});

function obtenerParesDeCuadros(cuadros) {
    const pares = {};
    const estilo = {};
    cuadros.each((i, cuadro) => {

        const id = cuadro.id

        if (pares[id]) {
            pares[id].push(cuadro);
        } else {
            pares[id] = [cuadro];
        }
    });


    return pares;

}