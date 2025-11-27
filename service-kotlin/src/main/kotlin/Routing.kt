package com.example

import com.example.models.Partida
import com.example.models.ResultadoInput
import com.example.services.ApuracaoService
import com.example.services.DatabaseService
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Application.configureRouting(
    db: DatabaseService,
    apuracao: ApuracaoService
) {
    routing {
        get("/") {
            call.respondText("Olá! Este é o Back-end Kotlin do Admin!")
        }

        route("/admin") {

            // POST /admin/partidas -> Criar nova partida
            post("/partidas") {
                try {
                    val partida = call.receive<Partida>()
                    val idSalvo = db.salvarPartida(partida)
                    call.respond(HttpStatusCode.Created, "Partida criada com ID: $idSalvo")
                } catch (e: Exception) {
                    call.respond(HttpStatusCode.BadRequest, e.message ?: "Erro ao criar partida")
                }
            }

            put("/partidas/{id}") {
                try {
                    val partidaId = call.parameters["id"]
                        ?: return@put call.respond(HttpStatusCode.BadRequest, "ID da partida não informado")

                    val partidaAtualizada = call.receive<Partida>()

                    db.updatePartida(partidaId, partidaAtualizada)

                    call.respond(HttpStatusCode.OK, "Partida $partidaId atualizada com sucesso")

                } catch (e: Exception) {
                    call.respond(HttpStatusCode.InternalServerError, e.message ?: "Erro ao atualizar partida")
                }
            }

            // DELETE /admin/partidas/{id} -> Excluir uma partida
            delete("/partidas/{id}") {
                try {
                    val partidaId = call.parameters["id"]
                        ?: return@delete call.respond(HttpStatusCode.BadRequest, "ID da partida não informado")

                    db.deletePartida(partidaId)
                    call.respond(HttpStatusCode.OK, "Partida $partidaId deletada com sucesso")
                } catch (e: Exception) {
                    call.respond(HttpStatusCode.InternalServerError, e.message ?: "Erro ao deletar")
                }
            }

            // POST /admin/resultado -> Inserir resultado e DISPARAR apuração
            post("/resultado") {
                try {
                    val input = call.receive<ResultadoInput>()

                    db.atualizarResultado(input)

                    val palpitesApurados = apuracao.calcularPontos(input.partidaId)

                    call.respond(HttpStatusCode.OK, "Resultado da partida ${input.partidaId} salvo. $palpitesApurados palpites foram apurados.")
                } catch (e: Exception) {
                    call.respond(HttpStatusCode.InternalServerError, e.message ?: "Erro na apuração")
                }
            }
        }
    }
}