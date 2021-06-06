const axios = require('axios');
const Global = require('../Configs/globalConfigs.json');
const format = require('string-format');

const getApi = async (request, response, cep) => {
    cep = cep.replace(/\s/g, '');
    cep = cep.replace(/-/g, '');
    cep = parseInt(cep)

    if (isNaN(cep)) {
        request.flash('error', Global.messages.error['is-nan']);
        response.redirect('/consulta/');
        return;
    }

    const axiosGet = async (getCep) => {
        await axios.get(format(Global['api-url'], getCep))
            .then(axiosResponse => {
                request.flash('success', format(Global.messages.success['cep-found'], getCep))
                request.flash('success_response', `${axiosResponse.data}`)

                let finalResponse = {
                    response_cep: axiosResponse.data.cep,
                    response_logradouro: axiosResponse.data.logradouro,
                    response_complemento: axiosResponse.data.complemento,
                    response_bairro: axiosResponse.data.bairro,
                    response_localidade: axiosResponse.data.localidade,
                    response_uf: axiosResponse.data.uf,
                    response_ibge: axiosResponse.data.ibge,
                    response_gia: axiosResponse.data.gia,
                    response_ddd: axiosResponse.data.ddd,
                    response_siafi: axiosResponse.data.siafi
                }

                return response.render('API/response', finalResponse)
            })
            .catch(function (error) {
                if (error) {
                    console.log(error.message)
                    request.flash('error', format(Global.messages.error['cep-notfound'], getCep))
                    request.flash('error_response', 'deu tudo errado, isto é uma resposta de erro')
                    return response.redirect('/consulta/');
                };
            });
    }

    const getData = await axiosGet(cep);
};

module.exports = { getApi }