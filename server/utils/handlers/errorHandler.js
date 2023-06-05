/**
 * Error handler for the API
 *
 * @param {import("fastify").FastifyError} error
 * @param {import("fastify").FastifyRequest} req
 * @param {import("fastify").FastifyReply} res
 */
const errorHandler = (error, req, res) => {
	res.code().send({})
}

export default errorHandler
