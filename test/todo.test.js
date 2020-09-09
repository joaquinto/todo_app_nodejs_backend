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

describe('Get A single todo', ()=>{
  let request;
  beforeEach(async () => {
    request = chai.request(app);
    const resq = await chai.request(app).get(`${url}`)
    todoId = resq.body.data[0]._id
  });
  it('should return todo object', async () => {
    const res = await request
    .get(`${url}/${todoId}`)
    res.body.should.have.property('message').equal('Todo gotten successfully')
    res.body.should.have.property('status').equal(200)
    res.body.should.have.property('data')
  })
  it('should return incorrect length for id', async ()=>{
    const res = await request
    .get(`${url}/5f`)
    res.body.should.have.property('message').equal('Bad Request')
    res.body.should.have.property('status').equal(400)
    res.body.should.have.property('data')
    res.body.data[0].should.equal('id length must be at least 3 characters long')
  })
  it('should return todo not found', async () => {
    const res = await request
    .get(`${url}/5f47b70bb22ae51b74b54867`) 
    res.body.should.have.property('message').equal('Todo not found')
    res.body.should.have.property('status').equal(404)
  })

})

describe('GET TODOS', ()=>{
  let request;
    beforeEach(() => {
      request = chai.request(app);
    })
    it('should return all todos', async () => {
      const res = await request.get(`${url}`);
      res.body.should.have.property('message').equal('Todos fetched successfully')
      res.body.should.have.property('data')
      res.body.should.have.property('status').equal(200)
    })
})

describe('Update Todo', ()=>{
  let request;
  beforeEach(async () => {
    request = chai.request(app);
    const resq = await chai.request(app).get(`${url}`)
    todoId = resq.body.data[0]._id
  });
  it('should return todo object', async () => {
    const res = await request
    .put(`${url}/${todoId}`)
    .send(todoData.todo);
    res.body.should.have.property('message').equal('Todo updated successfully')
    res.body.should.have.property('status').equal(200)
    res.body.should.have.property('data')
  })

  it('should return incorrect length for id', async ()=>{
    const res = await request
    .put(`${url}/5f`)
    res.body.should.have.property('message').equal('Bad Request')
    res.body.should.have.property('status').equal(400)
    res.body.should.have.property('data')
    res.body.data[0].should.equal('id length must be at least 3 characters long')
  })

  it('should return an error for empty title', async () => {
    const res = await request
      .put(`${url}/5f47b79jh22ae51b74b54867`)
      .send(todoData.todoWithEmptyTitle);
    res.body.should.have.property('message').equal('Bad Request')
    res.body.should.have.property('status').equal(400)
    res.body.should.have.property('data')
    res.body.data[0].should.equal('title is not allowed to be empty')
    res.body.data[1].should.equal('title length must be at least 3 characters long')
  })

  it('should return an error for missing title', async () => {
      const res = await request
        .put(`${url}/5f47b79bb22ae51b74b54867`)
        .send(todoData.todoWithMissingTitle);
      res.body.should.have.property('message').equal('Bad Request')
      res.body.should.have.property('status').equal(400)
      res.body.should.have.property('data')
      res.body.data[0].should.equal('title is required')
  })

  it('should return an error for least title character count', async () => {
    const res = await request
      .put(`${url}/5f47b79bb22ae51b74b54867`)
      .send(todoData.todoWithLessTitle);
    res.body.should.have.property('message').equal('Bad Request')
    res.body.should.have.property('status').equal(400)
    res.body.should.have.property('data')
    res.body.data[0].should.equal('title length must be at least 3 characters long')
  })

  it('should return an error for empty description', async () => {
    const res = await request
      .put(`${url}/5f47b79bb22ae51b74b54867`)
      .send(todoData.todoWithEmptyDesc);
    res.body.should.have.property('message').equal('Bad Request')
    res.body.should.have.property('status').equal(400)
    res.body.should.have.property('data')
    res.body.data[0].should.equal('description is not allowed to be empty')
    res.body.data[1].should.equal('description length must be at least 3 characters long')
  })

  it('should return an error for missing description', async () => {
    const res = await request
      .put(`${url}/5f47b79bb22ae51b74b54867`)
      .send(todoData.todoWithMissingDesc);
    res.body.should.have.property('message').equal('Bad Request')
    res.body.should.have.property('status').equal(400)
    res.body.should.have.property('data')
    res.body.data[0].should.equal('description is required')
  })

  it('should return an error for least description character count', async () => {
    const res = await request
      .put(`${url}/5f47b79bb22ae51b74b54867`)
      .send(todoData.todoWithLessDesc);
    res.body.should.have.property('message').equal('Bad Request')
    res.body.should.have.property('status').equal(400)
    res.body.should.have.property('data')
    res.body.data[0].should.equal('description length must be at least 3 characters long')
  })

  // it('should return todo not found', async () => {
  //   const res = await request
  //   .put(`${url}/5f47b79bb22ae51b74b54167`) 
  //   res.body.should.have.property('message').equal('Todo not found')
  //   res.body.should.have.property('status').equal(404)
  // })
})

describe('Update Todo Status', ()=>{
  let request;
  beforeEach(async () => {
    request = chai.request(app);
    const resq = await chai.request(app).get(`${url}`)
    todoId = resq.body.data[0]._id
  });
  it('should return todo object', async () => {
    const res = await request
    .put(`${url}/${todoId}/status_update`)
    .send(todoData.todo);
    res.body.should.have.property('message').equal('Todo updated successfully')
    res.body.should.have.property('status').equal(200)
    res.body.should.have.property('data')
  })

  it('should return incorrect length for id', async ()=>{
    const res = await request
    .put(`${url}/5f/status_update`)
    res.body.should.have.property('message').equal('Bad Request')
    res.body.should.have.property('status').equal(400)
    res.body.should.have.property('data')
    res.body.data[0].should.equal('id length must be at least 3 characters long')
  })

  it('should return todo not found', async () => {
    const res = await request
    .put(`${url}/5f47b70bb22ae51b74b54867/status_update`) 
    res.body.should.have.property('message').equal('Todo not found')
    res.body.should.have.property('status').equal(404)
  })
})

describe('Delete Todo', ()=>{
  let request;
  beforeEach(async () => {
    request = chai.request(app)
    const resq = await chai.request(app).get(`${url}`)
    todoId = resq.body.data[0]._id
  });
  it('should return todo object', async () => {
    const res = await request
    .delete(`${url}/${todoId}`)
    .send(todoData.todo);
    res.body.should.have.property('message').equal('Todo deleted successfully')
    res.body.should.have.property('status').equal(200)
    res.body.should.have.property('data')
  })

  it('should return incorrect length for id', async ()=>{
    const res = await request
    .delete(`${url}/5f`)
    res.body.should.have.property('message').equal('Bad Request')
    res.body.should.have.property('status').equal(400)
    res.body.should.have.property('data')
    res.body.data[0].should.equal('id length must be at least 3 characters long')
  })

  it('should return todo not found', async () => {
    const res = await request
    .delete(`${url}/5f47b70bb22ae51b74b54867`) 
    res.body.should.have.property('message').equal('Todo not found')
    res.body.should.have.property('status').equal(404)
  })

  
})

describe('Welcome', ()=>{
  let request;
  beforeEach(async () => {
    request = chai.request(app)
  });
  it('should return welcome object', async () => {
    const res = await request
    .get('/')
    res.body.should.have.property('message').equal('Todo app up and running')
  })

})