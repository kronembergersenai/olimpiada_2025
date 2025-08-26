// ============================================================
// APLICAÇÃO COMPLETA - OLIMPÍADAS DO CONHECIMENTO SENAI
// ============================================================

// Estado global da aplicação
let estadoApp = {
    alunoAtual: null,
    avaliacoes: {},
    procedimentos: {
        '18': [],
        '19': []
    },
    arquivos: {
        '18': [],
        '19': []
    }
};

// ============================================================
// FUNÇÃO PARA CARREGAR ARQUIVOS COMPARTILHADOS
// ============================================================

// Função para carregar arquivos compartilhados do arquivos.json
async function carregarArquivosCompartilhados() {
    try {
        const response = await fetch('./arquivos.json');
        if (response.ok) {
            const arquivosCompartilhados = await response.json();
            
            // Fazer merge dos arquivos compartilhados com os locais
            // Os arquivos compartilhados têm prioridade (aparecem primeiro)
            for (const modalidade in arquivosCompartilhados) {
                if (arquivosCompartilhados.hasOwnProperty(modalidade)) {
                    const arquivosLocais = estadoApp.arquivos[modalidade] || [];
                    const arquivosShared = arquivosCompartilhados[modalidade] || [];
                    
                    // Remover duplicatas baseado no nome e link para evitar duplicação
                    const arquivosCombinados = [...arquivosShared];
                    arquivosLocais.forEach(local => {
                        const jaExiste = arquivosShared.some(shared => 
                            shared.nome === local.nome && shared.link === local.link
                        );
                        if (!jaExiste) {
                            arquivosCombinados.push(local);
                        }
                    });
                    
                    estadoApp.arquivos[modalidade] = arquivosCombinados;
                }
            }
            
            console.log('Arquivos compartilhados carregados com sucesso!');
            return true;
        } else {
            console.warn('Não foi possível carregar arquivos.json:', response.status);
            return false;
        }
    } catch (error) {
        console.warn('Erro ao carregar arquivos compartilhados:', error);
        return false;
    }
}

// Dados das etapas de conhecimento
const dadosAplicacao = {
    etapas_conhecimentos: [
        // INFRAESTRUTURA
        { id: 1, etapa: "MARCAÇÃO LINHA DE REFERÊNCIA", categoria: "Infraestrutura" },
        { id: 2, etapa: "MARCAÇÃO CAIXAS E ABRAÇADEIRAS", categoria: "Infraestrutura" },
        { id: 3, etapa: "FIXAÇÃO DE CAIXAS E ABRAÇADEIRAS", categoria: "Infraestrutura" },
        { id: 4, etapa: "FIXAÇÃO DE QUADROS DE DISTRIBUIÇÃO", categoria: "Infraestrutura" },
        { id: 5, etapa: "FIXAÇÃO DE QUADROS DE COMANDO", categoria: "Infraestrutura" },
        { id: 6, etapa: "MONTAGEM DE ELETROCALHAS", categoria: "Infraestrutura" },
        { id: 7, etapa: "MONTAGEM DE LEITOS", categoria: "Infraestrutura" },
        { id: 8, etapa: "MONTAGEM DE CANALETAS DE PVC", categoria: "Infraestrutura" },
        { id: 9, etapa: "ÂNGULOS E CANTOS DE CANALETA PVC", categoria: "Infraestrutura" },

        // ELETRODUTOS
        { id: 10, etapa: "CURVAS DE 90º EM ELETRODUTOS", categoria: "Eletrodutos" },
        { id: 11, etapa: "CURVAS DE 45º EM ELETRODUTOS", categoria: "Eletrodutos" },
        { id: 12, etapa: "CURVA DE 135º EM ELETRODUTOS", categoria: "Eletrodutos" },
        { id: 13, etapa: "CURVA DE 180º EM ELETRODUTOS", categoria: "Eletrodutos" },
        { id: 14, etapa: "CORTE DE ELETRODUTOS E MARCAÇÕES DE DISTÂNCIAS", categoria: "Eletrodutos" },
        { id: 15, etapa: "CURVAS TRANPASSADAS", categoria: "Eletrodutos" },
        { id: 16, etapa: "JEITO E CONTRAJEITO", categoria: "Eletrodutos" },

        // QUADROS
        { id: 17, etapa: "FURAÇÃO E CORTE QUADRO DE COMANDO", categoria: "Quadros" },
        { id: 18, etapa: "MONTAGEM DO NÚCLEO QUADRO DE COMANDO", categoria: "Quadros" },
        { id: 19, etapa: "ARRANJOS E LAYOUT QUADRO DE COMANDO E DIST", categoria: "Quadros" },
        { id: 20, etapa: "ARREMATE DE QUADRO DE DISTRIBUIÇÃO", categoria: "Quadros" },
        { id: 21, etapa: "ARREMATE QUADRO DE COMANDO", categoria: "Quadros" },

        // FIAÇÃO
        { id: 22, etapa: "TREINAMENTO DE CHICOTES EM PAINEL", categoria: "Fiação" },
        { id: 23, etapa: "ENFIAÇÃO DE CONDUTORES", categoria: "Fiação" },

        // COMPONENTES
        { id: 24, etapa: "MONTAGEM DE COMPONENTES DE ACIONAMENTO", categoria: "Componentes" },
        { id: 25, etapa: "MONTAGEM DE COMANDO ELÉTRICO", categoria: "Componentes" },
        { id: 26, etapa: "MONTAGEM E LIGAÇÕES DE RELÉ DE PROTEÇÃO", categoria: "Componentes" },
        { id: 27, etapa: "UTILIZAÇÃO DE RELES DE INTERFACE", categoria: "Componentes" },
        { id: 28, etapa: "UTILIZAÇÃO DE FONTES DIVERSAS", categoria: "Componentes" },
        { id: 29, etapa: "LIGAÇÃO DE RÉGUA DE BORNES", categoria: "Componentes" },

        // AUTOMAÇÃO
        { id: 30, etapa: "MONTAGEM E LIGAÇÕES DE RELÉ PROGRAMÁVEL", categoria: "Automação" },
        { id: 31, etapa: "PROGRAMAÇÃO EM LINGUAGEM LADDER", categoria: "Automação" },
        { id: 32, etapa: "PROGRAMAÇÃO EM LINGUAGEM FDB", categoria: "Automação" },
        { id: 33, etapa: "INVERSOR DE FREQUÊNCIA LIGAÇÕES", categoria: "Automação" },
        { id: 34, etapa: "INVERSOR DE FREQUÊNCIA PARAMETRIZAÇÕES", categoria: "Automação" },
        { id: 35, etapa: "UTILIZAÇÃO DO SOFTWARE TIA PORTAL", categoria: "Automação" },
        { id: 36, etapa: "UTILIZAÇÃO DO SOFTWARE TWIDO", categoria: "Automação" },
        { id: 37, etapa: "PROGRAMAÇÃO DE IHM", categoria: "Automação" },
        { id: 38, etapa: "PROGRAMAÇÃO DO ELIPSE SCADA", categoria: "Automação" },

        // CONHECIMENTOS TEÓRICOS
        { id: 39, etapa: "CONHECIMENTOS DE DIAGRAMAS", categoria: "Conhecimentos Teóricos" },
        { id: 40, etapa: "TÉCNICAS DE AMBIENTAÇÃO PRÉ COMPETIÇÃO", categoria: "Conhecimentos Teóricos" },
        { id: 41, etapa: "INTERPRETAÇÃO DE PROJETOS NO MODELO OLIMPÍADA", categoria: "Conhecimentos Teóricos" },
        { id: 42, etapa: "MANUSEIO DE FERRAMENTAS", categoria: "Conhecimentos Teóricos" },
        { id: 43, etapa: "FICHAS DE AVALIAÇÃO", categoria: "Conhecimentos Teóricos" },

        // INSTALAÇÕES
        { id: 44, etapa: "LIGAÇÃO DE TOMADAS 3P + N + T", categoria: "Instalações" },

        // TESTES
        { id: 45, etapa: "COMISSIONAMENTO FINAL. (USO DO MEGÔMETRO)", categoria: "Testes" },

        // SEGURANÇA
        { id: 46, etapa: "USO E EXIGÊNCIA DE EPI", categoria: "Segurança" }
    ]
};

// Cronograma por dias
const cronogramaDias = {
    1: [
        { horario: "07:30", duracao: "30min", acao: "Credenciamento e recepção dos competidores", responsaveis: "Organização" },
        { horario: "08:00", duracao: "60min", acao: "Sessão de ambientação - conhecimento das bancadas", responsaveis: "Experts" },
        { horario: "09:00", duracao: "15min", acao: "Intervalo", responsaveis: "-" },
        { horario: "09:15", duracao: "120min", acao: "Prova teórica - interpretação de projetos", responsaveis: "Experts" },
        { horario: "11:15", duracao: "45min", acao: "Intervalo para lanche", responsaveis: "-" },
        { horario: "12:00", duracao: "180min", acao: "Prova prática - módulo 1", responsaveis: "Experts" },
        { horario: "15:00", duracao: "15min", acao: "Intervalo", responsaveis: "-" },
        { horario: "15:15", duracao: "105min", acao: "Continuação prova prática", responsaveis: "Experts" },
        { horario: "17:00", duracao: "30min", acao: "Organização do posto de trabalho...", responsaveis: "Competidores" }
    ],
    2: [
        { horario: "07:30", duracao: "30min", acao: "Chegada e preparação", responsaveis: "Competidores" },
        { horario: "08:00", duracao: "240min", acao: "Prova prática - módulo 2", responsaveis: "Experts" },
        { horario: "12:00", duracao: "60min", acao: "Intervalo para almoço", responsaveis: "-" },
        { horario: "13:00", duracao: "240min", acao: "Continuação prova prática - módulo 2", responsaveis: "Experts" },
        { horario: "17:00", duracao: "30min", acao: "Organização do posto de trabalho", responsaveis: "Competidores" }
    ],
    3: [
        { horario: "07:30", duracao: "30min", acao: "Chegada e preparação", responsaveis: "Competidores" },
        { horario: "08:00", duracao: "240min", acao: "Prova prática - módulo 3", responsaveis: "Experts" },
        { horario: "12:00", duracao: "60min", acao: "Intervalo para almoço", responsaveis: "-" },
        { horario: "13:00", duracao: "240min", acao: "Continuação prova prática - módulo 3", responsaveis: "Experts" },
        { horario: "17:00", duracao: "30min", acao: "Organização do posto de trabalho", responsaveis: "Competidores" }
    ],
    4: [
        { horario: "07:30", duracao: "30min", acao: "Chegada e preparação", responsaveis: "Competidores" },
        { horario: "08:00", duracao: "240min", acao: "Prova prática - módulo 4 e testes finais", responsaveis: "Experts" },
        { horario: "12:00", duracao: "60min", acao: "Intervalo para almoço", responsaveis: "-" },
        { horario: "13:00", duracao: "180min", acao: "Finalização e testes de funcionamento", responsaveis: "Experts" },
        { horario: "16:00", duracao: "60min", acao: "Limpeza e organização final", responsaveis: "Competidores" },
        { horario: "17:00", duracao: "30min", acao: "Entrega dos projetos", responsaveis: "Experts" }
    ],
    5: [
        { horario: "08:00", duracao: "120min", acao: "Avaliação final pelos experts", responsaveis: "Experts" },
        { horario: "10:00", duracao: "30min", acao: "Intervalo", responsaveis: "-" },
        { horario: "10:30", duracao: "90min", acao: "Compilação das notas", responsaveis: "Organização" },
        { horario: "12:00", duracao: "120min", acao: "Cerimônia de encerramento", responsaveis: "Organização" },
        { horario: "14:00", duracao: "60min", acao: "Premiação e confraternização", responsaveis: "Organização" }
    ]
};

// Variável para o gráfico
let graficoProgresso = null;

// ============================================================
// FUNÇÕES DE INICIALIZAÇÃO
// ============================================================

async function inicializarApp() {
    console.log('Inicializando aplicação...');
    
    // Inicializar navegação das abas
    inicializarNavegacao();
    
    // Inicializar formulários
    inicializarFormularios();
    
    // Inicializar cronograma
    inicializarCronograma();
    
    // Inicializar procedimentos padrão
    inicializarProcedimentosPadrao();
    
    // Carregar estado salvo (agora inclui arquivos compartilhados)
    await carregarEstado();
    
    console.log('Aplicação inicializada com sucesso!');
}

// ============================================================
// NAVEGAÇÃO ENTRE ABAS
// ============================================================

function inicializarNavegacao() {
    // Adicionar event listeners aos botões de navegação
    const navTabs = document.querySelectorAll('.nav-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    navTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            const targetTab = e.currentTarget.getAttribute('data-tab');
            
            // Remover classe active de todas as abas
            navTabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Adicionar classe active na aba clicada
            e.currentTarget.classList.add('active');
            
            // Mostrar conteúdo correspondente
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
            
            // Executar ações específicas por aba
            switch(targetTab) {
                case 'visao-geral':
                    atualizarEstatisticas();
                    inicializarGrafico();
                    break;
                case 'avaliacao':
                    if (estadoApp.alunoAtual) {
                        mostrarSecaoAvaliacao();
                    }
                    break;
                case 'cronograma':
                    mostrarCronograma(1); // Mostrar dia 1 por padrão
                    break;
                case 'procedimentos':
                    carregarProcedimentos();
                    break;
                case 'arquivos':
                    carregarArquivos();
                    break;
            }
        });
    });
}

// ============================================================
// FUNÇÕES DE FORMULÁRIOS
// ============================================================

function inicializarFormularios() {
    // Formulário de cadastro do aluno
    const formCadastro = document.getElementById('cadastro-form');
    if (formCadastro) {
        formCadastro.addEventListener('submit', (e) => {
            e.preventDefault();
            cadastrarAluno();
        });
    }
    
    // Filtro de categorias
    const filtroCategoria = document.getElementById('filtro-categoria');
    if (filtroCategoria) {
        filtroCategoria.addEventListener('change', (e) => {
            filtrarEtapas(e.target.value);
        });
    }
}

function cadastrarAluno() {
    const nome = document.getElementById('nome-aluno').value.trim();
    const modalidade = document.getElementById('modalidade-aluno').value;
    
    if (!nome || !modalidade) {
        alert('Por favor, preencha todos os campos.');
        return;
    }
    
    const modalidadeNome = modalidade === '18' ? 'Instalações Prediais' : 'Controle Industrial';
    
    estadoApp.alunoAtual = {
        nome: nome,
        modalidade: modalidade,
        modalidadeNome: modalidadeNome,
        dataCadastro: new Date().toISOString()
    };
    
    // Limpar avaliações anteriores
    estadoApp.avaliacoes = {};
    
    // Salvar estado
    salvarEstado();
    
    // Mostrar seção de avaliação
    mostrarSecaoAvaliacao();
    
    alert(`Aluno ${nome} cadastrado com sucesso!`);
}

function mostrarSecaoAvaliacao() {
    document.getElementById('cadastro-section').style.display = 'none';
    document.getElementById('avaliacao-section').style.display = 'block';
    
    // Atualizar informações do aluno
    document.getElementById('nome-atual').textContent = estadoApp.alunoAtual.nome;
    document.getElementById('modalidade-atual').textContent = `${estadoApp.alunoAtual.modalidade} - ${estadoApp.alunoAtual.modalidadeNome}`;
    
    // Carregar etapas
    carregarEtapas();
    
    // Atualizar resumo
    atualizarResumoProgresso();
}

function carregarEtapas(categoriaFiltro = '') {
    const container = document.getElementById('etapas-container');
    container.innerHTML = '';
    
    const etapasFiltradas = categoriaFiltro 
        ? dadosAplicacao.etapas_conhecimentos.filter(etapa => etapa.categoria === categoriaFiltro)
        : dadosAplicacao.etapas_conhecimentos;
    
    etapasFiltradas.forEach(etapa => {
        const etapaCard = criarCardEtapa(etapa);
        container.appendChild(etapaCard);
    });
}

function criarCardEtapa(etapa) {
    const avaliacao = estadoApp.avaliacoes[etapa.id] || { concluida: false, nivel: 'NADA' };
    
    const card = document.createElement('div');
    card.className = 'etapa-card';
    card.innerHTML = `
        <div class="etapa-header">
            <div class="etapa-info">
                <h4>${etapa.etapa}</h4>
                <span class="categoria">${etapa.categoria}</span>
            </div>
            <div class="checkbox-container">
                <input type="checkbox" id="concluida-${etapa.id}" ${avaliacao.concluida ? 'checked' : ''} 
                       onchange="toggleEtapa(${etapa.id})">
                <label for="concluida-${etapa.id}">Concluída</label>
            </div>
        </div>
        <div class="nivel-selector">
            <button class="nivel-btn nada ${avaliacao.nivel === 'NADA' ? 'active' : ''}" 
                    onclick="definirNivel(${etapa.id}, 'NADA')">NADA</button>
            <button class="nivel-btn basico ${avaliacao.nivel === 'BÁSICO' ? 'active' : ''}" 
                    onclick="definirNivel(${etapa.id}, 'BÁSICO')">BÁSICO</button>
            <button class="nivel-btn intermediario ${avaliacao.nivel === 'INTERMEDIÁRIO' ? 'active' : ''}" 
                    onclick="definirNivel(${etapa.id}, 'INTERMEDIÁRIO')">INTERMEDIÁRIO</button>
            <button class="nivel-btn avancado ${avaliacao.nivel === 'AVANÇADO' ? 'active' : ''}" 
                    onclick="definirNivel(${etapa.id}, 'AVANÇADO')">AVANÇADO</button>
        </div>
    `;
    
    return card;
}

function toggleEtapa(id) {
    const checkbox = document.getElementById(`concluida-${id}`);
    if (!estadoApp.avaliacoes[id]) {
        estadoApp.avaliacoes[id] = { concluida: false, nivel: 'NADA' };
    }
    
    estadoApp.avaliacoes[id].concluida = checkbox.checked;
    salvarEstado();
    atualizarResumoProgresso();
}

function definirNivel(id, nivel) {
    if (!estadoApp.avaliacoes[id]) {
        estadoApp.avaliacoes[id] = { concluida: false, nivel: 'NADA' };
    }
    
    estadoApp.avaliacoes[id].nivel = nivel;
    
    // Atualizar interface
    const card = document.querySelector(`input[id="concluida-${id}"]`).closest('.etapa-card');
    const botoes = card.querySelectorAll('.nivel-btn');
    botoes.forEach(btn => btn.classList.remove('active'));
    
    const botaoAtivo = card.querySelector(`.nivel-btn.${nivel.toLowerCase().replace('á', 'a').replace('ó', 'o')}`);
    if (botaoAtivo) {
        botaoAtivo.classList.add('active');
    }
    
    salvarEstado();
    atualizarResumoProgresso();
}

function filtrarEtapas(categoria) {
    carregarEtapas(categoria);
}

function atualizarResumoProgresso() {
    const totalEtapas = dadosAplicacao.etapas_conhecimentos.length;
    const etapasAvaliadas = Object.keys(estadoApp.avaliacoes).length;
    
    const niveisCount = { 'NADA': 0, 'BÁSICO': 0, 'INTERMEDIÁRIO': 0, 'AVANÇADO': 0 };
    
    Object.values(estadoApp.avaliacoes).forEach(avaliacao => {
        niveisCount[avaliacao.nivel]++;
    });
    
    // Atualizar elementos na interface
    const resumoContainer = document.getElementById('resumo-progresso');
    if (resumoContainer) {
        resumoContainer.innerHTML = `
            <h4>Resumo do Progresso</h4>
            <div class="progress-stats">
                <div class="progress-item">
                    <span>Total de Etapas:</span>
                    <span>${totalEtapas}</span>
                </div>
                <div class="progress-item">
                    <span>Avaliadas:</span>
                    <span>${etapasAvaliadas}</span>
                </div>
                <div class="progress-item">
                    <span class="nivel nada">NADA:</span>
                    <span>${niveisCount.NADA}</span>
                </div>
                <div class="progress-item">
                    <span class="nivel basico">BÁSICO:</span>
                    <span>${niveisCount.BÁSICO}</span>
                </div>
                <div class="progress-item">
                    <span class="nivel intermediario">INTERMEDIÁRIO:</span>
                    <span>${niveisCount.INTERMEDIÁRIO}</span>
                </div>
                <div class="progress-item">
                    <span class="nivel avancado">AVANÇADO:</span>
                    <span>${niveisCount.AVANÇADO}</span>
                </div>
            </div>
        `;
    }
    
    atualizarEstatisticas();
}

function novoAluno() {
    if (confirm('Tem certeza que deseja cadastrar um novo aluno? Os dados atuais serão perdidos.')) {
        estadoApp.alunoAtual = null;
        estadoApp.avaliacoes = {};
        
        document.getElementById('cadastro-section').style.display = 'block';
        document.getElementById('avaliacao-section').style.display = 'none';
        
        // Limpar formulário
        document.getElementById('cadastro-form').reset();
        
        salvarEstado();
    }
}

function exportarDados() {
    const dados = {
        aluno: estadoApp.alunoAtual,
        avaliacoes: estadoApp.avaliacoes,
        dataExportacao: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(dados, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `avaliacao-${estadoApp.alunoAtual.nome}-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
}

// ============================================================
// CRONOGRAMA
// ============================================================

function inicializarCronograma() {
    // Inicializar abas do cronograma
    const cronogramaTabsContainer = document.getElementById('cronograma-tabs');
    if (cronogramaTabsContainer) {
        cronogramaTabsContainer.innerHTML = '';
        
        for (let dia = 1; dia <= 5; dia++) {
            const tab = document.createElement('button');
            tab.className = `cronograma-tab ${dia === 1 ? 'active' : ''}`;
            tab.textContent = `Dia ${dia}`;
            tab.onclick = () => mostrarCronograma(dia);
            cronogramaTabsContainer.appendChild(tab);
        }
    }
    
    // Mostrar primeiro dia por padrão
    mostrarCronograma(1);
}

function mostrarCronograma(dia) {
    // Atualizar abas
    const tabs = document.querySelectorAll('.cronograma-tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    tabs[dia - 1].classList.add('active');
    
    // Mostrar conteúdo do dia
    const conteudo = document.getElementById('cronograma-content');
    if (conteudo && cronogramaDias[dia]) {
        conteudo.innerHTML = cronogramaDias[dia].map(atividade => `
            <div class="atividade-item">
                <div class="horario">${atividade.horario}</div>
                <div class="duracao">${atividade.duracao}</div>
                <div class="acao">${atividade.acao}</div>
                <div class="responsaveis">${atividade.responsaveis}</div>
            </div>
        `).join('');
    }
}

// ============================================================
// ESTATÍSTICAS E GRÁFICO
// ============================================================

function atualizarEstatisticas() {
    // Atualizar número de alunos cadastrados
    const alunosCadastrados = estadoApp.alunoAtual ? 1 : 0;
    const elementoAlunos = document.querySelector('.stat-card .stat-info h3');
    if (elementoAlunos) {
        elementoAlunos.textContent = alunosCadastrados;
    }
    
    // Outras estatísticas já são estáticas
}

function inicializarGrafico() {
    const ctx = document.getElementById('grafico-progresso');
    if (!ctx) return;
    
    if (graficoProgresso) {
        graficoProgresso.destroy();
    }
    
    const niveisCount = { 'NADA': 0, 'BÁSICO': 0, 'INTERMEDIÁRIO': 0, 'AVANÇADO': 0 };
    Object.values(estadoApp.avaliacoes).forEach(avaliacao => {
        niveisCount[avaliacao.nivel]++;
    });
    
    graficoProgresso = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['NADA', 'BÁSICO', 'INTERMEDIÁRIO', 'AVANÇADO'],
            datasets: [{
                data: [niveisCount.NADA, niveisCount.BÁSICO, niveisCount.INTERMEDIÁRIO, niveisCount.AVANÇADO],
                backgroundColor: ['#8B5A3C', '#CC0000', '#FF8C00', '#228B22'],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: 'Distribuição dos Níveis de Conhecimento'
                }
            }
        }
    });
}

// ============================================================
// PROCEDIMENTOS TÉCNICOS
// ============================================================

function inicializarProcedimentosPadrao() {
    // Procedimentos padrão para modalidade 18
    if (estadoApp.procedimentos['18'].length === 0) {
        estadoApp.procedimentos['18'] = [
            {
                id: Date.now(),
                titulo: "Instalação de Tomadas e Interruptores",
                subtopicos: [
                    "Marcação dos pontos de instalação",
                    "Furação da alvenaria",
                    "Instalação das caixas de embutir",
                    "Ligação dos condutores",
                    "Instalação dos espelhos e teclas"
                ],
                observacoes: "Sempre verificar a tensão antes de iniciar os trabalhos"
            }
        ];
    }
    
    // Procedimentos padrão para modalidade 19
    if (estadoApp.procedimentos['19'].length === 0) {
        estadoApp.procedimentos['19'] = [
            {
                id: Date.now() + 1,
                titulo: "Programação Básica em Ladder",
                subtopicos: [
                    "Análise do problema de automação",
                    "Criação da lógica de programação",
                    "Inserção dos contatos NA e NF",
                    "Configuração dos temporizadores",
                    "Teste e simulação do programa"
                ],
                observacoes: "Testar sempre a lógica antes de carregar no CLP"
            }
        ];
    }
}

function carregarProcedimentos() {
    const container18 = document.getElementById('procedimentos-18');
    const container19 = document.getElementById('procedimentos-19');
    
    if (container18) {
        container18.innerHTML = estadoApp.procedimentos['18'].length === 0 
            ? '<div class="empty-state"><i class="fas fa-clipboard-list"></i><h4>Nenhum procedimento adicionado</h4><p>Clique em "Adicionar Procedimento" para começar.</p></div>'
            : estadoApp.procedimentos['18'].map(proc => criarCardProcedimento(proc, '18')).join('');
    }
    
    if (container19) {
        container19.innerHTML = estadoApp.procedimentos['19'].length === 0 
            ? '<div class="empty-state"><i class="fas fa-clipboard-list"></i><h4>Nenhum procedimento adicionado</h4><p>Clique em "Adicionar Procedimento" para começar.</p></div>'
            : estadoApp.procedimentos['19'].map(proc => criarCardProcedimento(proc, '19')).join('');
    }
}

function criarCardProcedimento(procedimento, modalidade) {
    return `
        <div class="procedimento-card">
            <div class="procedimento-header">
                <h4>${procedimento.titulo}</h4>
                <p class="procedimento-subtitle">Modalidade #${modalidade}</p>
                <div class="procedimento-actions">
                    <button class="procedimento-action-btn edit" onclick="editarProcedimento(${procedimento.id}, '${modalidade}')" title="Editar">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="procedimento-action-btn delete" onclick="excluirProcedimento(${procedimento.id}, '${modalidade}')" title="Excluir">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <div class="procedimento-body">
                <h5>Subtópicos:</h5>
                <ul class="subtopicos">
                    ${procedimento.subtopicos.map(sub => `<li>${sub}</li>`).join('')}
                </ul>
                ${procedimento.observacoes ? `
                    <div class="observacao">
                        <h6>Observações:</h6>
                        <p>${procedimento.observacoes}</p>
                    </div>
                ` : ''}
            </div>
        </div>
    `;
}

function abrirModalProcedimento(modalidade) {
    document.getElementById('procedimento-modalidade').value = modalidade;
    document.getElementById('procedimento-titulo').value = '';
    document.getElementById('procedimento-subtopicos').value = '';
    document.getElementById('procedimento-observacoes').value = '';
    document.getElementById('procedimento-id').value = '';
    
    document.getElementById('modal-procedimento').classList.remove('hidden');
}

function fecharModalProcedimento() {
    document.getElementById('modal-procedimento').classList.add('hidden');
}

function salvarProcedimento() {
    const modalidade = document.getElementById('procedimento-modalidade').value;
    const titulo = document.getElementById('procedimento-titulo').value.trim();
    const subtopicos = document.getElementById('procedimento-subtopicos').value
        .split('\n')
        .map(s => s.trim())
        .filter(s => s !== '');
    const observacoes = document.getElementById('procedimento-observacoes').value.trim();
    const id = document.getElementById('procedimento-id').value;
    
    if (!titulo || subtopicos.length === 0) {
        alert('Por favor, preencha pelo menos o título e um subtópico.');
        return;
    }
    
    const procedimento = {
        id: id ? parseInt(id) : Date.now(),
        titulo: titulo,
        subtopicos: subtopicos,
        observacoes: observacoes
    };
    
    if (id) {
        // Editar procedimento existente
        const index = estadoApp.procedimentos[modalidade].findIndex(p => p.id === parseInt(id));
        if (index !== -1) {
            estadoApp.procedimentos[modalidade][index] = procedimento;
        }
    } else {
        // Novo procedimento
        estadoApp.procedimentos[modalidade].push(procedimento);
    }
    
    salvarEstado();
    carregarProcedimentos();
    fecharModalProcedimento();
    
    alert('Procedimento salvo com sucesso!');
}

function editarProcedimento(id, modalidade) {
    const procedimento = estadoApp.procedimentos[modalidade].find(p => p.id === id);
    if (!procedimento) return;
    
    document.getElementById('procedimento-modalidade').value = modalidade;
    document.getElementById('procedimento-titulo').value = procedimento.titulo;
    document.getElementById('procedimento-subtopicos').value = procedimento.subtopicos.join('\n');
    document.getElementById('procedimento-observacoes').value = procedimento.observacoes || '';
    document.getElementById('procedimento-id').value = id;
    
    document.getElementById('modal-procedimento').classList.remove('hidden');
}

function excluirProcedimento(id, modalidade) {
    if (confirm('Tem certeza que deseja excluir este procedimento?')) {
        estadoApp.procedimentos[modalidade] = estadoApp.procedimentos[modalidade].filter(p => p.id !== id);
        salvarEstado();
        carregarProcedimentos();
        alert('Procedimento excluído com sucesso!');
    }
}

// ============================================================
// GERENCIAMENTO DE ARQUIVOS
// ============================================================

function carregarArquivos() {
    carregarArquivosModalidade('18');
    carregarArquivosModalidade('19');
}

function carregarArquivosModalidade(modalidade) {
    const container = document.getElementById(`arquivos-lista-${modalidade}`);
    if (!container) return;
    
    const arquivos = estadoApp.arquivos[modalidade] || [];
    
    if (arquivos.length === 0) {
        container.innerHTML = `
            <div class="no-arquivos">
                <p>Nenhum arquivo adicionado ainda.</p>
            </div>
        `;
    } else {
        container.innerHTML = arquivos.map(arquivo => criarItemArquivo(arquivo, modalidade)).join('');
    }
}

function criarItemArquivo(arquivo, modalidade) {
    return `
        <div class="arquivo-item" data-arquivo-id="${arquivo.id}">
            <div class="arquivo-info">
                <i class="fas fa-file-pdf arquivo-icon"></i>
                <div class="arquivo-details">
                    <h5>${arquivo.nome}</h5>
                    <p>Adicionado em ${new Date(arquivo.dataAdicao).toLocaleDateString('pt-BR')}</p>
                </div>
            </div>
            <div class="arquivo-acoes">
                <button class="arquivo-btn visualizar" onclick="visualizarArquivo('${arquivo.link}')">
                    <i class="fas fa-eye"></i>
                    Visualizar
                </button>
                <button class="arquivo-btn remover" onclick="removerArquivo(${arquivo.id}, '${modalidade}')">
                    <i class="fas fa-trash"></i>
                    Remover
                </button>
            </div>
        </div>
    `;
}

function adicionarArquivo(modalidade) {
    const nomeInput = document.getElementById(`arquivo-nome-${modalidade}`);
    const linkInput = document.getElementById(`arquivo-link-${modalidade}`);
    
    const nome = nomeInput.value.trim();
    const link = linkInput.value.trim();
    
    if (!nome || !link) {
        alert('Por favor, preencha o nome e o link do arquivo.');
        return;
    }
    
    // Converter link do Google Drive para formato direto se necessário
    const linkFormatado = formatarLinkGoogleDrive(link);
    
    const arquivo = {
        id: Date.now(),
        nome: nome,
        link: linkFormatado,
        dataAdicao: new Date().toISOString().split('T')[0]
    };
    
    if (!estadoApp.arquivos[modalidade]) {
        estadoApp.arquivos[modalidade] = [];
    }
    
    estadoApp.arquivos[modalidade].push(arquivo);
    
    // Limpar formulário
    nomeInput.value = '';
    linkInput.value = '';
    
    salvarEstado();
    carregarArquivosModalidade(modalidade);
    
    alert('Arquivo adicionado com sucesso!');
}

function formatarLinkGoogleDrive(link) {
    // Se for um link de compartilhamento do Google Drive, converter para visualização direta
    if (link.includes('drive.google.com/file/d/')) {
        // Extrair o ID do arquivo
        const match = link.match(/\/d\/([a-zA-Z0-9-_]+)/);
        if (match) {
            const fileId = match[1];
            // Retornar link direto para visualização
            return `https://drive.google.com/file/d/${fileId}/preview`;
        }
    }
    
    // Se já estiver no formato correto ou for outro tipo de link, retornar como está
    return link;
}

function visualizarArquivo(link) {
    // Abrir arquivo em nova aba
    window.open(link, '_blank');
}

function removerArquivo(id, modalidade) {
    if (confirm('Tem certeza que deseja remover este arquivo?')) {
        estadoApp.arquivos[modalidade] = estadoApp.arquivos[modalidade].filter(arquivo => arquivo.id !== id);
        salvarEstado();
        carregarArquivosModalidade(modalidade);
        alert('Arquivo removido com sucesso!');
    }
}

// ============================================================
// PERSISTÊNCIA DE DADOS
// ============================================================

function salvarEstado() {
    try {
        localStorage.setItem('olimpiadas-conhecimento-estado', JSON.stringify(estadoApp));
        console.log('Estado salvo com sucesso!');
    } catch (error) {
        console.error('Erro ao salvar estado:', error);
    }
}

async function carregarEstado() {
    try {
        // Primeiro carregar arquivos compartilhados
        await carregarArquivosCompartilhados();
        
        // Depois carregar estado local
        const estadoSalvo = localStorage.getItem('olimpiadas-conhecimento-estado');
        if (estadoSalvo) {
            const estadoCarregado = JSON.parse(estadoSalvo);
            
            // Fazer merge do estado carregado com o atual
            estadoApp.alunoAtual = estadoCarregado.alunoAtual || null;
            estadoApp.avaliacoes = estadoCarregado.avaliacoes || {};
            
            // Para procedimentos, usar os salvos ou manter os padrão
            if (estadoCarregado.procedimentos) {
                estadoApp.procedimentos = estadoCarregado.procedimentos;
            }
            
            // Para arquivos, fazer merge com os compartilhados (já carregados)
            if (estadoCarregado.arquivos) {
                for (const modalidade in estadoCarregado.arquivos) {
                    const arquivosLocais = estadoCarregado.arquivos[modalidade] || [];
                    const arquivosAtuais = estadoApp.arquivos[modalidade] || [];
                    
                    // Adicionar arquivos locais que não existem nos compartilhados
                    arquivosLocais.forEach(local => {
                        const jaExiste = arquivosAtuais.some(atual => 
                            atual.nome === local.nome && atual.link === local.link
                        );
                        if (!jaExiste) {
                            arquivosAtuais.push(local);
                        }
                    });
                    
                    estadoApp.arquivos[modalidade] = arquivosAtuais;
                }
            }
            
            console.log('Estado carregado com sucesso!');
            
            // Se existe aluno cadastrado, mostrar seção de avaliação
            if (estadoApp.alunoAtual) {
                mostrarSecaoAvaliacao();
            }
        } else {
            console.log('Nenhum estado salvo encontrado. Usando configuração padrão.');
        }
    } catch (error) {
        console.error('Erro ao carregar estado:', error);
    }
}

// ============================================================
// EVENT LISTENERS GLOBAIS
// ============================================================

// Fechar modal ao clicar no overlay
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        const modal = e.target.closest('.modal');
        if (modal) {
            modal.classList.add('hidden');
        }
    }
});

// Inicializar aplicação quando DOM estiver carregado
document.addEventListener('DOMContentLoaded', inicializarApp);

// Salvar estado antes de sair da página
window.addEventListener('beforeunload', salvarEstado);