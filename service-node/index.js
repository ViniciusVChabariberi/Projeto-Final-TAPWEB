const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

// 1. Configuração do Firebase
// Ele carrega a chave que você colou na pasta
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// 2. Configuração do Servidor Express
const app = express();
app.use(cors()); // Libera acesso para todos (App e Site)
app.use(express.json()); // Permite ler JSON enviado pelo App

// --- ROTAS (ENDPOINTS) ---

// 1. LISTAR PARTIDAS (GET /partidas)
// É essa rota que o seu App vai chamar!
app.get('/partidas', async (req, res) => {
  try {
    const snapshot = await db.collection('partidas').get();
    
    if (snapshot.empty) {
      return res.json([]); // Retorna lista vazia se não tiver jogos
    }

    // Transforma os documentos do Firebase em um array bonitinho
    const partidas = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.json(partidas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. LOGIN (POST /login)
app.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Busca usuário com esse email
    const snapshot = await db.collection('usuarios').where('email', '==', email).get();

    if (snapshot.empty) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    const userDoc = snapshot.docs[0];
    const userData = userDoc.data();

    // Verifica senha (simples para o projeto)
    if (userData.senha !== senha) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    // Devolve sucesso e dados do usuário
    res.json({
      success: true,
      id: userDoc.id,
      nome: userData.nome,
      email: userData.email,
      isAdmin: userData.isAdmin || false
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. REGISTRO (POST /register)
app.post('/register', async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    // Verifica se já existe
    const check = await db.collection('usuarios').where('email', '==', email).get();
    if (!check.empty) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }

    const novoUsuario = {
      nome,
      email,
      senha,
      pontos: 0,
      isAdmin: false
    };

    const docRef = await db.collection('usuarios').add(novoUsuario);
    
    res.status(201).json({ 
        success: true, 
        id: docRef.id, 
        ...novoUsuario 
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. DAR PALPITE (POST /palpite)
app.post('/palpite', async (req, res) => {
  try {
    const { userId, partidaId, placarA, placarB } = req.body;

    const palpiteData = {
      userId,
      partidaId,
      placarA: Number(placarA),
      placarB: Number(placarB),
      pontosGanhos: 0
    };

    // Salva no banco
    const docRef = await db.collection('palpites').add(palpiteData);

    res.status(201).json({ success: true, id: docRef.id });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 5. RANKING (GET /ranking)
app.get('/ranking', async (req, res) => {
  try {
    const snapshot = await db.collection('usuarios')
        .orderBy('pontos', 'desc')
        .limit(20)
        .get();

    const ranking = snapshot.docs.map((doc, index) => ({
        id: doc.id,
        posicao: index + 1,
        ...doc.data()
    }));

    res.json(ranking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- INICIAR SERVIDOR ---
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🔥 Node.js rodando na porta ${PORT}`);
  console.log(`🔗 Rota de partidas: http://localhost:${PORT}/partidas`);
});