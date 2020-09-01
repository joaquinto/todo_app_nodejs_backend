const todoData={
    todo:{
        "title":"Trying this out with Joi",
        "description":"Use Joi for backend validation. Configure it and make sure it works"
    },
    todoWithMissingTitle:{
        "description":"Use Joi for backend validation. Configure it and make sure it works"
    },
    todoWithEmptyTitle:{
        "title":"",
        "description":"Use Joi for backend validation. Configure it and make sure it works"
    },
    todoWithLessTitle:{
        "title":"Tr",
        "description":"Use Joi for backend validation. Configure it and make sure it works"
    },
    todoWithMissingDesc:{
        "title":"Trying this out with Joi",
    },
    todoWithEmptyDesc:{
        "title":"Trying this out with Joi",
        "description":""
    },
    todoWithLessDesc:{
        "title":"Trying this out with Joi",
        "description":"Us"
    },
}

module.exports = todoData