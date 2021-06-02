'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const TipoPagamento = use ('App/Models/TipoPagamento')

/**
 * Resourceful controller for interacting with tipopagamentos
 */
class TipoPagamentoController {
  /**
   * Show a list of all tipopagamentos.
   * GET tipopagamentos
   *
   * @param {object} ctxS
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const {page,perPage} = request.all()
    return TipoPagamento.query().paginate(page, perPage)
  }

  /**
   * Render a form to be used for creating a new tipopagamento.
   * GET tipopagamentos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
 
  async store ({ request, response }) {

    const campos = TipoPagamento.getCamposCadastro()
    const dados = request.only (campos)

    return await TipoPagamento.create(dados)

  }

  /**
   * Display a single tipopagamento.
   * GET tipopagamentos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    return await TipoPagamento.findOrFail(params.id)
  }

  /**
   * Render a form to update an existing tipopagamento.
   * GET tipopagamentos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */

  async update ({ params, request, response }) {
    const campos = TipoPagamento.getCamposCadastro()
    const dados = request.only(campos)

    const tipopagamento = await TipoPagamento.findOrFail(params.id)

    tipopagamento.merge(dados)
    await tipopagamento.save()

    return tipopagamento
  }

  /**
   * Delete a tipopagamento with id.
   * DELETE tipopagamentos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const tipoPagamento = await TipoPagamento.findOrFail(params.id)
    return await tipoPagamento.delete()
  }
}

module.exports = TipoPagamentoController
