package com.example.services

import kotlinx.coroutines.coroutineScope

class ApuracaoService(private val db: DatabaseService) {

    suspend fun calcularPontos(partidaId: String): Int {

        val resultadoReal = db.getPartida(partidaId)
            ?: throw Exception("Partida não encontrada")

        if (resultadoReal.placarRealA == null || resultadoReal.placarRealB == null) {
            throw Exception("Placar real não definido para esta partida")
        }

        val listaDePalpites = db.getPalpites(partidaId)

        var palpitesApurados = 0

        coroutineScope {
            for (palpite in listaDePalpites) {
                var pontosGanhos = 0

                if (palpite.placarA == resultadoReal.placarRealA && palpite.placarB == resultadoReal.placarRealB) {
                    pontosGanhos = 10
                }
                else {
                    val vencedorReal = when {
                        resultadoReal.placarRealA > resultadoReal.placarRealB -> "A"
                        resultadoReal.placarRealA < resultadoReal.placarRealB -> "B"
                        else -> "EMPATE"
                    }
                    val vencedorPalpite = when {
                        palpite.placarA > palpite.placarB -> "A"
                        palpite.placarA < palpite.placarB -> "B"
                        else -> "EMPATE"
                    }

                    if (vencedorReal == vencedorPalpite) {
                        pontosGanhos = 5
                    }
                }

                if (palpite.id != null) {
                    db.salvarPontosNoPalpite(palpite.id, pontosGanhos)
                }

                if (pontosGanhos > 0) {
                    db.atualizarScoreTotalDoUsuario(palpite.userId, pontosGanhos)
                }

                palpitesApurados++
            }
        }

        db.mudarStatusPartida(partidaId, "APURADA")

        return palpitesApurados
    }
}