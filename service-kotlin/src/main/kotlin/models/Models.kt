package com.example.models

import kotlinx.serialization.Serializable

@Serializable
data class Partida(
    val id: String? = null,
    val timeA: String= "",
    val timeB: String="",
    val data: String="",
    val placarRealA: Int? = null,
    val placarRealB: Int? = null,
    val status: String = "ABERTA"
)

@Serializable
data class ResultadoInput(
    val partidaId: String,
    val placarA: Int,
    val placarB: Int
)

@Serializable
data class Palpite(
    val id: String? = null,
    val userId: String="",
    val partidaId: String="",
    val placarA: Int=0,
    val placarB: Int=0,
    val pontosGanhos: Int? = null
)