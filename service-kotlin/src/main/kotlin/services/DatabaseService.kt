package com.example.services

import com.example.models.Palpite
import com.example.models.Partida
import com.example.models.ResultadoInput
import com.google.cloud.firestore.FieldValue
import com.google.cloud.firestore.Firestore
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

class DatabaseService(private val db: Firestore) {

    private val partidasCollection = db.collection("partidas")
    private val palpitesCollection = db.collection("palpites")
    private val usuariosCollection = db.collection("usuarios")

    suspend fun salvarPartida(partida: Partida): String = withContext(Dispatchers.IO) {
        val docRef = partidasCollection.document() // Cria um novo ID
        docRef.set(partida.copy(id = docRef.id)).get() // Salva a partida com seu próprio ID
        return@withContext docRef.id
    }

    suspend fun deletePartida(partidaId: String): Unit = withContext(Dispatchers.IO) {
        partidasCollection.document(partidaId).delete().get()
    }

    suspend fun atualizarResultado(input: ResultadoInput): Unit = withContext(Dispatchers.IO) {
        partidasCollection.document(input.partidaId).update(
            mapOf(
                "placarRealA" to input.placarA,
                "placarRealB" to input.placarB,
                "status" to "ENCERRADA"
            )
        ).get()
    }

    suspend fun getPartida(partidaId: String): Partida? = withContext(Dispatchers.IO) {
        val snapshot = partidasCollection.document(partidaId).get().get()
        return@withContext snapshot.toObject(Partida::class.java)
    }

    suspend fun getPalpites(partidaId: String): List<Palpite> = withContext(Dispatchers.IO) {
        val snapshot = palpitesCollection.whereEqualTo("partidaId", partidaId).get().get()
        return@withContext snapshot.documents.map { doc ->
            doc.toObject(Palpite::class.java)!!.copy(id = doc.id)
        }
    }

    suspend fun salvarPontosNoPalpite(palpiteId: String, pontos: Int): Unit = withContext(Dispatchers.IO) {
        palpitesCollection.document(palpiteId).update("pontosGanhos", pontos).get()
    }

    suspend fun atualizarScoreTotalDoUsuario(userId: String, pontos: Int): Unit = withContext(Dispatchers.IO) {
        usuariosCollection.document(userId).update("pontos", FieldValue.increment(pontos.toLong())).get()
    }

    suspend fun mudarStatusPartida(partidaId: String, status: String): Unit = withContext(Dispatchers.IO) {
        partidasCollection.document(partidaId).update("status", status).get()
    }

    suspend fun updatePartida(partidaId: String, partida: Partida): Unit = withContext(Dispatchers.IO) {
        partidasCollection.document(partidaId).set(partida.copy(id = partidaId)).get()
    }
}