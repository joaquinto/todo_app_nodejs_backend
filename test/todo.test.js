const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../index')
const todoData = require('./testData/todoData')
chai.should()
chai.use(chaiHttp)

const url = '/todos'

describe('POST TODO', () => {
    let request;
    beforeEach(() => {
        request = chai.request(app);
    });
    it('should return todo object', async () => {
        const res = await request
          .post(`${url}`)
          .send(todoData.todo);
        res.body.should.have.property('message').equal('Todo created successfully')
        res.body.should.have.property('status').equal(201)
        res.body.should.have.property('data')
    })

    it('should return an error for empty title', async () => {
        const res = await request
          .post(`${url}`)
          .send(todoData.todoWithEmptyTitle);
        res.body.should.have.property('message').equal('Bad Request')
        res.body.should.have.property('status').equal(400)
        res.body.should.have.property('data')
        res.body.data[0].should.equal('title is not allowed to be empty')
        res.body.data[1].should.equal('title length must be at least 3 characters long')
    })

    it('should return an error for missing title', async () => {
        const res = await request
          .post(`${url}`)
          .send(todoData.todoWithMissingTitle);
        res.body.should.have.property('message').equal('Bad Request')
        res.body.should.have.property('status').equal(400)
        res.body.should.have.property('data')
        res.body.data[0].should.equal('title is required')
    })

    it('should return an error for least title character count', async () => {
        const res = await request
          .post(`${url}`)
          .send(todoData.todoWithLessTitle);
        res.body.should.have.property('message').equal('Bad Request')
        res.body.should.have.property('status').equal(400)
        res.body.should.have.property('data')
        res.body.data[0].should.equal('title length must be at least 3 characters long')
    })

    it('should return an error for empty description', async () => {
        const res = await request
          .post(`${url}`)
          .send(todoData.todoWithEmptyDesc);
        res.body.should.have.property('message').equal('Bad Request')
        res.body.should.have.property('status').equal(400)
        res.body.should.have.property('data')
        res.body.data[0].should.equal('description is not allowed to be empty')
        res.body.data[1].should.equal('description length must be at least 3 characters long')
    })

    it('should return an error for missing description', async () => {
        const res = await request
          .post(`${url}`)
          .send(todoData.todoWithMissingDesc);
        res.body.should.have.property('message').equal('Bad Request')
        res.body.should.have.property('status').equal(400)
        res.body.should.have.property('data')
        res.body.data[0].should.equal('description is required')
    })

    it('should return an error for least description character count', async () => {
        const res = await request
          .post(`${url}`)
          .send(todoData.todoWithLessDesc);
        res.body.should.have.property('message').equal('Bad Request')
        res.body.should.have.property('status').equal(400)
        res.body.should.have.property('data')
        res.body.data[0].should.equal('description length must be at least 3 characters long')
    })
})