const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const app = express();
app.use(cors());
app.use(express.json());


app.get('/partidas', async (req, res) => {
  try {
    const snapshot = await db.collection('partidas').get();
    
    if (snapshot.empty) {
      return res.json([]);
    }

    const partidas = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.json(partidas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

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

    if (userData.senha !== senha) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

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

    const docRef = await db.collection('palpites').add(palpiteData);

    res.status(201).json({ success: true, id: docRef.id });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

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

app.get('/palpites/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const snapshot = await db.collection('palpites')
      .where('userId', '==', userId)
      .get();

    const palpites = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.json(palpites);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🔥 Node.js rodando na porta ${PORT}`);
  console.log(`🔗 Rota de partidas: http://localhost:${PORT}/partidas`);
});