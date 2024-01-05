let {Ticket} = require("../Schema/ticketSchema")
let joi = require("joi")


async function createTicket(params){
    // validation of user input field by using joi library

    let valid = await validate(params).catch((err)=>{
        return {error : err}
    })
    if(!valid || (valid && valid.error)){
        return {error : valid.error}
    }

    // formating the data
    
    let ticketData = {
        product_model : params.product_model,
        issue_type : params.issue_type,
        issue_description : params.issue_description
    }

    // inserting into DB

    let create = await Ticket.create(ticketData).catch((err)=>{
        return {error : err}
    })
    if(!create || (create && create.error)){
        return {error : "Internal Server Error",status : 500}
    }

    return {data : create}
}

async function validate(data){
    let schema = joi.object({
        product_model : joi.string().min(5).max(100),
        issue_type : joi.string().min(5).max(100),
        issue_description : joi.string().min(5).max(200)
    })
    let valid = await schema.validateAsync(data).catch((err)=>{
        return {error : err}
    })
    if(!valid || (valid && valid.error)){
        let errMsg = []
        for(let i of valid.error.details){
            errMsg.push(i.message)
        }
        return {error : errMsg}
    }
    return {data : valid}
}

async function viewTicket(params){
    // find ticket exist or not

    let findTicket = await Ticket.findOne({where:{id:params.id}}).catch((err)=>{
        return {error : err}
    })
    if(!findTicket || (findTicket && findTicket.error)){
        return {error : "Ticket not exist",status : 404}
    }

    // return data

    return {data : findTicket}
}

async function updateTicket(id,params){
    // validate the update input
 
    let valid = await validate(params).catch((err)=>{
        return {error : err}
    })
    if(!valid || (valid && valid.error)){
        return {error : valid.error}
    }

    // find ticket exist or not

    let findTicket = await Ticket.findOne({where:{id}}).catch((err)=>{
        return {error : err}
    })
    if(!findTicket || (findTicket && findTicket.error)){
        return {error : "Ticket not exist",status : 404}
    }

    // format data

    let updata = {
        product_model : params.product_model,
        issue_type : params.issue_type,
        issue_description : params.issue_description
    }

    // insert the updated input to db

    let update = await Ticket.update(updata,{where:{id}}).catch((err)=>{
        return {error : err}
    })
    if(!update || (update && update.error)){
        return {error : "Internal Server Error",status : 500}
    }

    //return data

    return {data : update}
}


async function deleteTicket(id){
    // find ticket

    let findTicket = await Ticket.findOne({where:{id}}).catch((err)=>{
        return {error : err}
    })
    if(!findTicket || (findTicket && findTicket.error)){
        return {error : "Ticket not exist",status : 404}
    }

    // destroy ticket

    let del = await Ticket.destroy({where:{id}}).catch((err)=>{
        return {error : err}
    })
    if(!del || (del && del.error)){
        return {error : "Intenal Server Errror",status : 500}
    }

    return {data : del}
}

module.exports = {
    createTicket,
    viewTicket,
    updateTicket,
    deleteTicket
}