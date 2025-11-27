package com.example

import com.example.services.ApuracaoService
import com.example.services.DatabaseService
import com.google.auth.oauth2.GoogleCredentials
import com.google.firebase.FirebaseApp
import com.google.firebase.FirebaseOptions
import com.google.firebase.cloud.FirestoreClient
import io.ktor.serialization.kotlinx.json.*
import io.ktor.http.HttpHeaders
import io.ktor.server.application.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.server.plugins.cors.routing.*
import java.io.FileInputStream

fun main(args: Array<String>): Unit = io.ktor.server.netty.EngineMain.main(args)

@Suppress("unused")
fun Application.module() {

    val serviceAccount = FileInputStream("serviceAccountKey.json")

    val options = FirebaseOptions.builder()
        .setCredentials(GoogleCredentials.fromStream(serviceAccount))
        .build()

    FirebaseApp.initializeApp(options)

    val db = FirestoreClient.getFirestore()

    val databaseService = DatabaseService(db)
    val apuracaoService = ApuracaoService(databaseService)

    install(ContentNegotiation) {
        json()
    }
    install(CORS) {
        anyHost()
        allowHeader(HttpHeaders.ContentType)
    }

    configureRouting(databaseService, apuracaoService)
}