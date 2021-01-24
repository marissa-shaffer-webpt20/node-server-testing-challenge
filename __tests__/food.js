const supertest = require('supertest')
const server = require('../server')
const db = require('../data/config')
const { intersect } = require('../data/config')

beforeEach(async() => {
    await db.seed.run()
})

afterAll(async () => {
    await db.destroy()
})

describe('food tests', () => {
    it('gets food list', async () => {
        const res = await supertest(server).get('/food')
        expect(res.body.length).toBeGreaterThanOrEqual(3)
    })

    it('gets food by id', async() => {
        const res = await supertest(server).get('/food/2')
        expect(res.body.name).toBe('Black Beans')
    })

    it ('create new food', async () => {
        const res = await supertest(server)
            .post('/food')
            .send({ name: "Barrito", type: "entree"})
        expect(res.body.name).toBe("Barrito")
    })

    it ('updates a food', async() => {
        const res = await supertest(server)
            .put('/food/1')
            .send({ name: 'Fajitas', type: 'Specialty'})
        expect(res.body.name).toBe('Fajitas')
        expect(res.body.type).toBe('Specialty')
    })

    it('deletes a food', async() => {
        const res = await supertest(server)
            .delete('/food/1')
        expect(res.statusCode).toBe(204)
    })
})