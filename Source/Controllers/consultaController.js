const { getApi } = require("../Functions/getApi")
const Global = require('../Configs/globalConfigs.json')

exports.index = async (request, response) => {
    let Constructor = {
        pageTitle: 'Consulta | Node-CEP',
        success: request.flash('success'),
        error: request.flash('error'),
        success_response: request.flash('success_response'),
        error_response: request.flash('error_response')
    }
    response.render('API/index', Constructor)
}

exports.getApi = async (request, response) => {

    // CEP: 13150-025

    if (!request.body.cep) {
        request.flash('error', Global.messages.error['no-cep'])
        response.redirect('/consulta/')
        return;
    }

    let cep = request.body.cep;
    
    getApi(request, response, cep);
}