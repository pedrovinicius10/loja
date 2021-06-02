'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Cliente = use ('App/Models/Cliente')

/**
 * Resourceful controller for interacting with Clientes
 */
class ClienteController {
  /**
   * Show a list of all Clientes.
   * GET Clientes
   *
   * @param {object} ctxS
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const {page,perPage} = request.all()
    return Cliente.query().paginate(page, perPage)
  }

  /**
   * Render a form to be used for creating a new Cliente.
   * GET Clientes/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
 
  async store ({ request, response }) {

    const campos = Cliente.getCamposCadastro()
    const dados = request.only (campos)

    return await Cliente.create(dados)

  }

  /**
   * Display a single Cliente.
   * GET Clientes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    return await Cliente.findOrFail(params.id)
  }

  /**
   * Render a form to update an existing Cliente.
   * GET Clientes/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */

  async update ({ params, request, response }) {
    const campos = Cliente.getCamposCadastro()
    const dados = request.only(campos)

    const cliente = await Cliente.findOrFail(params.id)

    cliente.merge(dados)
    await cliente.save()

    return Cliente
  }

  /**
   * Delete a Cliente with id.
   * DELETE Clientes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const cliente = await Cliente.findOrFail(params.id)
    return await cliente.delete()
  }
}

module.exports = ClienteController
