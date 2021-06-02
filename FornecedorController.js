'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Fornecedor = use ('App/Models/Fornecedor')

/**
 * Resourceful controller for interacting with Fornecedors
 */
class FornecedorController {
  /**
   * Show a list of all Fornecedors.
   * GET Fornecedors
   *
   * @param {object} ctxS
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const {page,perPage} = request.all()
    return Fornecedor.query().paginate(page, perPage)
  }

  /**
   * Render a form to be used for creating a new Fornecedor.
   * GET Fornecedors/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
 
  async store ({ request, response }) {

    const campos = Fornecedor.getCamposCadastro()
    const dados = request.only (campos)

    return await Fornecedor.create(dados)

  }

  /**
   * Display a single Fornecedor.
   * GET Fornecedors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    return await Fornecedor.findOrFail(params.id)
  }

  /**
   * Render a form to update an existing Fornecedor.
   * GET Fornecedors/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */

  async update ({ params, request, response }) {
    const campos = Fornecedor.getCamposCadastro()
    const dados = request.only(campos)

    const fornecedor = await Fornecedor.findOrFail(params.id)

    fornecedor.merge(dados)
    await fornecedor.save()

    return Fornecedor
  }

  /**
   * Delete a Fornecedor with id.
   * DELETE Fornecedors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const fornecedor = await Fornecedor.findOrFail(params.id)
    return await fornecedor.delete()
  }
}

module.exports = FornecedorController
