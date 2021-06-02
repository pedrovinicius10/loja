'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Pagamento = use ('App/Models/Pagamento')

/**
 * Resourceful controller for interacting with pagamentos
 */
class PagamentoController {
  /**
   * Show a list of all pagamentos.
   * GET pagamentos
   *
   * @param {object} ctxS
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const {page,perPage} = request.all()
    return Pagamento.query().paginate(page, perPage)
  }

  /**
   * Render a form to be used for creating a new pagamento.
   * GET pagamentos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
 
  async store ({ request, response }) {

    const campos = Pagamento.getCamposCadastro()
    const dados = request.only (campos)

    return await Pagamento.create(dados)

  }

  /**
   * Display a single pagamento.
   * GET pagamentos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    return await Pagamento.findOrFail(params.id)
  }

  /**
   * Render a form to update an existing pagamento.
   * GET pagamentos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */

  async update ({ params, request, response }) {
    const campos = Pagamento.getCamposCadastro()
    const dados = request.only(campos)

    const pagamento = await Pagamento.findOrFail(params.id)

    pagamento.merge(dados)
    await pagamento.save()

    return pagamento
  }

  /**
   * Delete a pagamento with id.
   * DELETE pagamentos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const pagamento = await Pagamento.findOrFail(params.id)
    return await pagamento.delete()
  }
}

module.exports = PagamentoController
