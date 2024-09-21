import Cliente from '../models/cliente.js'
import type { HttpContext } from '@adonisjs/core/http'

export default class ClientesController {

  // get all
  async index({ response }: HttpContext) {
    const clientes = await Cliente.all()
    return response.json(clientes)
  }

  // create
  async store({ request, response }: HttpContext) {
    const data = request.only(['nome', 'cpf', 'email', 'telefone'])
    const cliente = await Cliente.create(data)
    return response.status(201).json(cliente)
  }

  // get id
  async show({ params, response }: HttpContext) {
    const cliente = await Cliente.findOrFail(params.id)
    return response.json(cliente)
  }

  // update
  async update({ params, request, response }: HttpContext) {
    const cliente = await Cliente.findOrFail(params.id)
    const data = request.only(['nome', 'cpf', 'email', 'telefone'])
    cliente.merge(data)
    await cliente.save()
    return response.json(cliente)
  }

  // delete
  async destroy({ params, response }: HttpContext) {
    try {
      const cliente = await Cliente.findOrFail(params.id)
      const deletedCliente = cliente.toJSON()
      await cliente.delete()

      return response.status(200).json({
        message: 'Deletado com sucesso',
        data: deletedCliente,
      })
    } catch (error) {
      console.error(error)
      return response.status(500).json({ message: 'Erro interno do servidor' })
    }
  }
}