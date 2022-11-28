const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');

// eslint-disable-next-line no-unused-vars
const should = chai.should();

chai.use(chaiHttp);

// eslint-disable-next-line no-undef
describe('Teste GET', () => {
    // eslint-disable-next-line no-undef
    it('deve receber os jogos da api', done => {
        chai.request(app)
            .get('/projects')
            .end((err, res) => {
                res.should.status(200);
                res.body.should.be.a('array');
                done();
            });
    });
});

// eslint-disable-next-line no-undef
describe('Teste POST ', () => {
    // eslint-disable-next-line no-undef
    it('deve criar um autoro', done => {
        const game = {
            title: 'teste',
            owner: 'Lucas teste',
        };
        chai.request(app)
            .post('/projects')
            .type('json')
            .send(game)
            .end((err, res) => {
                if (err) {
                    console.log(err);
                    done(err);
                }
                res.should.have.status(200);

                done();
            });
    }); // <= AQUI NO FINAL
});

// eslint-disable-next-line no-undef
describe('Teste GET/:id', () => {
    // eslint-disable-next-line no-undef
    it('Teste buscando por id teste', done => {
        const id = '917bd99c-1bb4-40d4-bf38-858a718c1118';
        chai.request(app)
            .get(`/projects/${id}`)
            .end((err, res) => {
                if (err) {
                    console.log(err);
                    done(err);
                }
                res.should.have.status(200);
                done();
            });
    });
});
