const request = require('supertest')

const app = require('./app')

describe('/add', () => {

    it('success', (done) => {
        const a = 2
        const b = 4
        const expected = 6

        request(app)
            .post('/add')
            .send({ a, b })
            .set('Accept', 'application/json')
            .end((err, res) => {

                if (err) return done(err)

                const result = res.body.result
                if (result === expected) return done()

                done(new Error(`receive:${result} expected:${expected}`))
            })
    })

    it('not a number', (done) => {
        const a = 'a'
        const b = 2

        request(app)
            .post('/add')
            .send({ a, b })
            .set('Accept', 'application/json')
            .expect(200, { error: 'operand is not a number' }, done)
    })
})