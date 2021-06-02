'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const PedidoProduto = use ('App/Models/PedidoProduto')

/**
 * Resourceful controller for interacting with pedidoprodutos
 */
class PedidoProdutoController {
  /**
   * Show a list of all pedidoprodutos.
   * GET pedidoprodutos
   *
   * @param {object} ctxS
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const {page,perPage} = request.all()
    return PedidoProduto.query().paginate(page, perPage)
  }

  /**
   * Render a form to be used for creating a new pedidoproduto.
   * GET pedidoprodutos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
 
  async store ({ request, response }) {

    const campos = PedidoProduto.getCamposCadastro()
    const dados = request.only (campos)

    return await PedidoProduto.create(dados)

  }

  /**
   * Display a single pedidoproduto.
   * GET pedidoprodutos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    return await PedidoProduto.findOrFail(params.id)
  }

  /**
   * Render a form to update an existing pedidoproduto.
   * GET pedidoprodutos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */

  async update ({ params, request, response }) {
    const campos = PedidoProduto.getCamposCadastro()
    const dados = request.only(campos)

    const pedidoproduto = await PedidoProduto.findOrFail(params.id)

    pedidoproduto.merge(dados)
    await pedidoproduto.save()

    return pedidoproduto
  }

  /**
   * Delete a pedidoproduto with id.
   * DELETE pedidoprodutos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const pedidoproduto = await PedidoProduto.findOrFail(params.id)
    return await pedidoproduto.delete()
  }
}

module.exports = PedidoProdutoController
