let express = require("express")
let routes = express.Router()
let ticket = require("./Controller/ticketController")

routes.post("/create",ticket.createTicket);
routes.get("/view/:id",ticket.viewTicket);
routes.put("/update/:id",ticket.updateTicket);
routes.delete("/delete/:id",ticket.deleteTicket)

module.exports = {routes}