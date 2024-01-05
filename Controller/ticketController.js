let ticket = require("../Model/ticketModel")

async function createTicket(request,response){
    let data = await ticket.createTicket(request.body).catch((err)=>{
        return {error : err}
    })
    if(!data || (data && data.error)){
        let error = (data && data.error)? data.error : "Internal Server Error";
        let status = (data && data.status)? data.status : 500
        return response.status(status).send({error})
    }
    return response.send({data : "Ticket Generated Successfully"})
}

async function viewTicket(request,response){
    let data = await ticket.viewTicket(request.params).catch((err)=>{
        return {error : err}
    })
    if(!data || (data && data.error)){
        let error = (data && data.error)? data.error : "Internal Server Error";
        let status = (data && data.status)? data.status : 500
        return response.status(status).send({error})
    }
    return response.send({data:data.data})
}

async function updateTicket(request,response){
    let data = await ticket.updateTicket(request.params.id,request.body).catch((err)=>{
        return {error : err}
    })
    if(!data || (data && data.error)){
        let error = (data && data.error)? data.error : "Internal Server Error";
        let status = (data && data.status)? data.status : 500
        return response.status(status).send({error})
    }
    return response.send({msg: "Updated Successfully"})
}

async function deleteTicket(request,response){
    let data = await ticket.deleteTicket(request.params.id).catch((err)=>{
        return {error : err}
    })
    if(!data || (data && data.error)){
        let error = (data && data.error)? data.error : "Internal Server Error";
        let status = (data && data.status)? data.status : 500
        return response.status(status).send({error})
    }

    return response.send("Deleted Successfully")
}

module.exports = {
    createTicket,
    viewTicket,
    updateTicket,
    deleteTicket
}