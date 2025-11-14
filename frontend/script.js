const API_URL = 'http://localhost:3000/cards';

// 1. Carregar Cards ao iniciar
document.addEventListener('DOMContentLoaded', listarCards);

async function listarCards() {
    const res = await fetch(API_URL);
    const cards = await res.json();
    const container = document.getElementById('dashboard');
    container.innerHTML = ''; // Limpa antes de renderizar

    cards.forEach(card => {
        const html = montarHTMLCard(card);
        container.innerHTML += html;
    });
}

// 2. Criar novo Card
async function criarCard() {
    const cidade = document.getElementById('cidadeInput').value;
    const atividade = document.getElementById('atividadeSelect').value;

    if (!cidade) return alert("Digite uma cidade!");

    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cidade, atividade })
        });

        if (res.ok) {
            document.getElementById('cidadeInput').value = ''; // Limpa input
            listarCards(); // Recarrega a lista
        } else {
            alert("Erro ao criar card. Verifique a cidade.");
        }
    } catch (error) {
        console.error(error);
    }
}

// 3. Atualizar Card (Reconsulta API)
async function atualizarCard(id) {
    try {
        const res = await fetch(`${API_URL}/${id}`, { method: 'PUT' });
        if (res.ok) {
            listarCards(); // Recarrega para mostrar novos dados
            alert("Clima atualizado com sucesso!");
        }
    } catch (error) {
        console.error(error);
    }
}

// 4. Deletar Card
async function deletarCard(id) {
    if (!confirm("Tem certeza que deseja excluir?")) return;

    try {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        listarCards();
    } catch (error) {
        console.error(error);
    }
}

// Helper: Monta o HTML de um card
function montarHTMLCard(card) {
    const classeStatus = card.status ? 'aprovado' : 'reprovado';
    const statusTexto = card.status ? '✅ Aprovado' : '❌ Inviável';
    
    return `
        <div class="card ${classeStatus}">
            <h3>${card.cidade}</h3>
            <p>Atividade: <strong>${card.atividade}</strong></p>
            <div class="temp">${card.temp}°C</div>
            <p>${statusTexto}</p>
            <span class="msg">"${card.mensagem}"</span>
            
            <div class="actions">
                <button class="btn-update" onclick="atualizarCard(${card.id})">🔄 Atualizar</button>
                <button class="btn-delete" onclick="deletarCard(${card.id})">🗑️ Excluir</button>
            </div>
        </div>
    `;
}