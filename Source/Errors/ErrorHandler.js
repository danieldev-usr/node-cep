exports.NotFound = (request, response, next) => {
    response.status(404)
    response.render('Error/404')
}