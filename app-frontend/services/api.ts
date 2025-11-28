// const BASE_URL = 'http://ipdoroteador:3000';

interface User {
    id: string;
    nome: string;
    email: string;
    isAdmin: boolean;
}

let usuarioLogado: User | null = null;

export const api = {

    getUsuario: () => usuarioLogado,

    getPartidas: async () => {
        try {
            const response = await fetch(`${BASE_URL}/partidas`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });

            if (!response.ok) throw new Error('Falha ao buscar partidas');

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Erro na API getPartidas:", error);
            return [];
        }
    },

    getRanking: async () => {
        try {
            const response = await fetch(`${BASE_URL}/ranking`);
            return await response.json();
        } catch (error) {
            console.error("Erro ranking:", error);
            return [];
        }
    },

    getMeusPalpites: async (userId: string) => {
        try {
            const response = await fetch(`${BASE_URL}/palpites/${userId}`);
            return await response.json();
        } catch (error) {
            console.error("Erro ao buscar palpites:", error);
            return [];
        }
    },

    login: async (email: string, senha: string) => {
        console.log("Logando com:", email, senha);
        try {
            const response = await fetch(`${BASE_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, senha })
            });
            const data = await response.json();

            if (response.ok) {
                usuarioLogado = data;
                return { success: true, user: data };
            } else {
                return { success: false, message: data.error || 'Erro no login' };
            }
        } catch (error) {
            return { success: false, message: 'Erro de conexão' };
        }
    },

    register: async (nome: string, email: string, senha: string) => {
        try {
            const response = await fetch(`${BASE_URL}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome, email, senha })
            });

            const data = await response.json();

            if (response.ok) {
                usuarioLogado = data;
                return { success: true };
            } else {
                return { success: false, message: data.error || 'Erro ao cadastrar' };
            }
        } catch (error) {
            console.error("ERRO REAL DO REGISTER:", error);
            return { success: false, message: 'Erro de conexão (Veja o console)' };
        }
    },

    enviarPalpite: async (partidaId: string, placarA: number | string, placarB: number | string) => {
        if (!usuarioLogado) return { success: false, message: 'Usuário não logado' };

        try {
            const response = await fetch(`${BASE_URL}/palpite`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: usuarioLogado.id,
                    partidaId,
                    placarA: Number(placarA),
                    placarB: Number(placarB)
                })
            });

            if (response.ok) return { success: true };
            const data = await response.json().catch(() => ({}));
            return { success: false, message: data.error || 'Erro ao salvar palpite' };
        } catch (error) {
            return { success: false, message: 'Erro de conexão' };
        }
    }
};