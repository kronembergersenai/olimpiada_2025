// ============================================================
// APLICAÇÃO COMPLETA - OLIMPÍADAS DO CONHECIMENTO SENAI
// VERSÃO CORRIGIDA COM SUPORTE A COMPARTILHAMENTO
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
        { horario: "17:00", duracao: "30min", acao: "Organização do posto de trabalho", responsaveis: "Competidores" }
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
// FUNÇÕES DE COMPARTILHAMENTO (CORREÇÕES PRINCIPAIS)
// ============================================================

// Função para converter link do Google Drive para formato público direto
function converterLinkGoogleDrive(link) {
    if (!link || !link.includes('drive.google.com')) {
        return link;
    }
    
    // Extrair ID do arquivo do link padrão do Google Drive
    const match = link.match(/\/d\/([a-zA-Z0-9-_]+)/);
    if (match && match[1]) {
        const fileId = match[1];
        // Retornar link de acesso direto público
        return `https://drive.google.com/uc?export=view&id=${fileId}`;
    }
    
    return link;
}

// Função para codificar estado em Base64 para URL
function codificarEstadoParaURL(estado) {
    try {
        const estadoJSON = JSON.stringify(estado);
        return btoa(encodeURIComponent(estadoJSON));
    } catch (error) {
        console.error('Erro ao codificar estado:', error);
        return '';
    }
}

// Função para decodificar estado da URL
function decodificarEstadoDaURL(estadoCodificado) {
    try {
        const estadoJSON = decodeURIComponent(atob(estadoCodificado));
        return JSON.parse(estadoJSON);
    } catch (error) {
        console.error('Erro ao decodificar estado:', error);
        return null;
    }
}

// Função para gerar URL compartilhável
function gerarURLCompartilhavel() {
    const estadoCompartilhavel = {
        alunoAtual: estadoApp.alunoAtual,
        avaliacoes: estadoApp.avaliacoes,
        procedimentos: estadoApp.procedimentos,
        arquivos: estadoApp.arquivos
    };
    
    const estadoCodificado = codificarEstadoParaURL(estadoCompartilhavel);
    const urlAtual = window.location.origin + window.location.pathname;
    return `${urlAtual}?state=${estadoCodificado}`;
}

// Função para carregar estado da URL
function carregarEstadoDaURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const estadoCodificado = urlParams.get('state');
    
    if (estadoCodificado) {
        const estadoCompartilhado = decodificarEstadoDaURL(estadoCodificado);
        if (estadoCompartilhado) {
            // Mesclar estado compartilhado com estado atual
            estadoApp.alunoAtual = estadoCompartilhado.alunoAtual || estadoApp.alunoAtual;
            estadoApp.avaliacoes = {...estadoApp.avaliacoes, ...estadoCompartilhado.avaliacoes};
            estadoApp.procedimentos = {...estadoApp.procedimentos, ...estadoCompartilhado.procedimentos};
            estadoApp.arquivos = {...estadoApp.arquivos, ...estadoCompartilhado.arquivos};
            
            console.log('Estado carregado da URL:', estadoCompartilhado);
            return true;
        }
    }
    return false;
}

// Função para adicionar arquivo com link público
function adicionarArquivoComLinkPublico(modalidade, nome, link) {
    const linkPublico = converterLinkGoogleDrive(link);
    const novoArquivo = {
        id: Date.now(),
        nome: nome.trim(),
        link: linkPublico,
        dataAdicao: new Date().toISOString().split('T')[0]
    };
    
    if (!estadoApp.arquivos[modalidade]) {
        estadoApp.arquivos[modalidade] = [];
    }
    
    estadoApp.arquivos[modalidade].push(novoArquivo);
    salvarEstado();
    
    return novoArquivo;
}

// Função para corrigir links existentes
function corrigirLinksExistentes() {
    Object.keys(estadoApp.arquivos).forEach(modalidade => {
        if (estadoApp.arquivos[modalidade]) {
            estadoApp.arquivos[modalidade] = estadoApp.arquivos[modalidade].map(arquivo => ({
                ...arquivo,
                link: converterLinkGoogleDrive(arquivo.link)
            }));
        }
    });
    salvarEstado();
}

// Função para compartilhar estado atual
function compartilharEstado() {
    const url = gerarURLCompartilhavel();
    
    // Tentar copiar para clipboard
    if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => {
            alert('Link de compartilhamento copiado para a área de transferência!\\n\\nQualquer pessoa com este link poderá acessar o estado atual da aplicação.');
        }).catch(err => {
            console.error('Erro ao copiar:', err);
            mostrarURLCompartilhamento(url);
        });
    } else {
        mostrarURLCompartilhamento(url);
    }
}

// Função para mostrar URL de compartilhamento em modal
function mostrarURLCompartilhamento(url) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3>Link de Compartilhamento</h3>
                <button class="modal-close" onclick="this.closest('.modal').remove()">&times;</button>
            </div>
            <div class="modal-body">
                <p>Copie o link abaixo para compartilhar o estado atual da aplicação:</p>
                <textarea readonly style="width: 100%; height: 100px; margin: 10px 0;">${url}</textarea>
                <p><small>Qualquer pessoa com este link poderá acessar todos os dados salvos, incluindo aluno, avaliações, procedimentos e arquivos.</small></p>
            </div>
            <div class="modal-actions">
                <button class="btn btn--primary" onclick="navigator.clipboard.writeText('${url}').then(() => alert('Copiado!')); this.closest('.modal').remove()">Copiar Link</button>
                <button class="btn btn--secondary" onclick="this.closest('.modal').remove()">Fechar</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Função para adicionar botão de compartilhamento na interface
function adicionarBotaoCompartilhamento() {
    // Adicionar botão no header
    const headerContent = document.querySelector('.header-content');
    if (headerContent) {
        const botaoCompartilhar = document.createElement('button');
        botaoCompartilhar.className = 'btn btn--primary';
        botaoCompartilhar.innerHTML = '<i class="fas fa-share-alt"></i> Compartilhar';
        botaoCompartilhar.onclick = compartilharEstado;
        botaoCompartilhar.style.marginLeft = 'auto';
        headerContent.appendChild(botaoCompartilhar);
    }
}

// ============================================================
// FUNÇÕES DE INICIALIZAÇÃO (MODIFICADAS)
// ============================================================
function inicializarApp() {
    console.log('Inicializando aplicação com suporte a compartilhamento...');
    
    // Tentar carregar estado da URL primeiro
    const estadoCarregadoDaURL = carregarEstadoDaURL();
    
    if (!estadoCarregadoDaURL) {
        // Se não há estado na URL, carregar do localStorage
        carregarEstado();
    }
    
    // Corrigir links existentes para formato público
    corrigirLinksExistentes();
    
    // Inicializar navegação das abas
    inicializarNavegacao();
    
    // Inicializar formulários
    inicializarFormularios();
    
    // Inicializar cronograma
    inicializarCronograma();
    
    // Inicializar procedimentos padrão
    inicializarProcedimentosPadrao();
    
    // Adicionar botão de compartilhamento
    adicionarBotaoCompartilhamento();
    
    console.log('Aplicação inicializada com suporte a compartilhamento!');
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
                <input type="checkbox" id="etapa-${etapa.id}" ${avaliacao.concluida ? 'checked' : ''} 
                       onchange="marcarEtapaConcluida(${etapa.id}, this.checked)">
                <label for="etapa-${etapa.id}">Concluída</label>
            </div>
        </div>
        <div class="nivel-selector">
            <button class="nivel-btn nada ${avaliacao.nivel === 'NADA' ? 'active' : ''}" 
                    onclick="definirNivelEtapa(${etapa.id}, 'NADA')">NADA</button>
            <button class="nivel-btn basico ${avaliacao.nivel === 'BÁSICO' ? 'active' : ''}" 
                    onclick="definirNivelEtapa(${etapa.id}, 'BÁSICO')">BÁSICO</button>
            <button class="nivel-btn intermediario ${avaliacao.nivel === 'INTERMEDIÁRIO' ? 'active' : ''}" 
                    onclick="definirNivelEtapa(${etapa.id}, 'INTERMEDIÁRIO')">INTERMEDIÁRIO</button>
            <button class="nivel-btn avancado ${avaliacao.nivel === 'AVANÇADO' ? 'active' : ''}" 
                    onclick="definirNivelEtapa(${etapa.id}, 'AVANÇADO')">AVANÇADO</button>
        </div>
    `;
    
    return card;
}

function marcarEtapaConcluida(etapaId, concluida) {
    if (!estadoApp.avaliacoes[etapaId]) {
        estadoApp.avaliacoes[etapaId] = { nivel: 'NADA' };
    }
    
    estadoApp.avaliacoes[etapaId].concluida = concluida;
    salvarEstado();
    atualizarResumoProgresso();
}

function definirNivelEtapa(etapaId, nivel) {
    if (!estadoApp.avaliacoes[etapaId]) {
        estadoApp.avaliacoes[etapaId] = { concluida: false };
    }
    
    estadoApp.avaliacoes[etapaId].nivel = nivel;
    salvarEstado();
    
    // Atualizar interface
    const card = event.target.closest('.etapa-card');
    const botoes = card.querySelectorAll('.nivel-btn');
    botoes.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    atualizarResumoProgresso();
}

function filtrarEtapas(categoria) {
    carregarEtapas(categoria);
}

function atualizarResumoProgresso() {
    const totalEtapas = dadosAplicacao.etapas_conhecimentos.length;
    const etapasConcluidas = Object.values(estadoApp.avaliacoes).filter(av => av.concluida).length;
    
    const niveis = { 'NADA': 0, 'BÁSICO': 0, 'INTERMEDIÁRIO': 0, 'AVANÇADO': 0 };
    Object.values(estadoApp.avaliacoes).forEach(av => {
        if (av.nivel) niveis[av.nivel]++;
    });
    
    // Atualizar interface do resumo
    const resumoContainer = document.querySelector('.progress-stats');
    if (resumoContainer) {
        resumoContainer.innerHTML = `
            <div class="progress-item">
                <span>Total de Etapas:</span>
                <span>${totalEtapas}</span>
            </div>
            <div class="progress-item">
                <span>Concluídas:</span>
                <span>${etapasConcluidas}</span>
            </div>
            <div class="progress-item">
                <span class="nivel nada">NADA:</span>
                <span>${niveis['NADA']}</span>
            </div>
            <div class="progress-item">
                <span class="nivel basico">BÁSICO:</span>
                <span>${niveis['BÁSICO']}</span>
            </div>
            <div class="progress-item">
                <span class="nivel intermediario">INTERMEDIÁRIO:</span>
                <span>${niveis['INTERMEDIÁRIO']}</span>
            </div>
            <div class="progress-item">
                <span class="nivel avancado">AVANÇADO:</span>
                <span>${niveis['AVANÇADO']}</span>
            </div>
        `;
    }
}

// ============================================================
// FUNÇÕES DO CRONOGRAMA
// ============================================================
function inicializarCronograma() {
    // Inicializar abas do cronograma
    const cronogramaTabs = document.querySelectorAll('.cronograma-tab');
    cronogramaTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            const dia = parseInt(e.currentTarget.getAttribute('data-dia'));
            mostrarCronograma(dia);
        });
    });
}

function mostrarCronograma(dia) {
    // Atualizar abas ativas
    const tabs = document.querySelectorAll('.cronograma-tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    document.querySelector(`[data-dia="${dia}"]`).classList.add('active');
    
    // Mostrar conteúdo do dia
    const container = document.getElementById('cronograma-content');
    const atividades = cronogramaDias[dia] || [];
    
    container.innerHTML = atividades.map(atividade => `
        <div class="atividade-item">
            <div class="horario">${atividade.horario}</div>
            <div class="duracao">${atividade.duracao}</div>
            <div class="acao">${atividade.acao}</div>
            <div class="responsaveis">${atividade.responsaveis}</div>
        </div>
    `).join('');
}

// ============================================================
// FUNÇÕES DE PROCEDIMENTOS
// ============================================================
function inicializarProcedimentosPadrao() {
    // Carregar procedimentos padrão se não existirem
    if (!estadoApp.procedimentos['18'] || estadoApp.procedimentos['18'].length === 0) {
        estadoApp.procedimentos['18'] = [];
    }
    if (!estadoApp.procedimentos['19'] || estadoApp.procedimentos['19'].length === 0) {
        estadoApp.procedimentos['19'] = [];
    }
}

function carregarProcedimentos() {
    const modalidade18Container = document.getElementById('procedimentos-18');
    const modalidade19Container = document.getElementById('procedimentos-19');
    
    renderizarProcedimentos('18', modalidade18Container);
    renderizarProcedimentos('19', modalidade19Container);
}

function renderizarProcedimentos(modalidade, container) {
    const procedimentos = estadoApp.procedimentos[modalidade] || [];
    
    if (procedimentos.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-clipboard-list"></i>
                <h4>Nenhum procedimento cadastrado</h4>
                <p>Clique em "Adicionar Procedimento" para começar.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = procedimentos.map(procedimento => `
        <div class="procedimento-card">
            <div class="procedimento-header">
                <h4>${procedimento.titulo}</h4>
                <p class="procedimento-subtitle">${procedimento.subtitulo || ''}</p>
                <div class="procedimento-actions">
                    <button class="procedimento-action-btn edit" onclick="editarProcedimento('${modalidade}', ${procedimento.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="procedimento-action-btn delete" onclick="removerProcedimento('${modalidade}', ${procedimento.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <div class="procedimento-body">
                <h5>Subtópicos:</h5>
                <ul class="subtopicos">
                    ${procedimento.subtopicos.map(subtopico => `<li>${subtopico}</li>`).join('')}
                </ul>
                ${procedimento.observacoes ? `
                    <div class="observacao">
                        <h6>Observações:</h6>
                        <p>${procedimento.observacoes}</p>
                    </div>
                ` : ''}
            </div>
        </div>
    `).join('');
}

function adicionarProcedimento(modalidade) {
    abrirModalProcedimento(modalidade);
}

function abrirModalProcedimento(modalidade, procedimentoId = null) {
    const procedimento = procedimentoId 
        ? estadoApp.procedimentos[modalidade].find(p => p.id === procedimentoId)
        : null;
    
    const isEdicao = !!procedimento;
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3>${isEdicao ? 'Editar' : 'Adicionar'} Procedimento - Modalidade ${modalidade}</h3>
                <button class="modal-close" onclick="this.closest('.modal').remove()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label class="form-label">Título do Procedimento:</label>
                    <input type="text" class="form-control" id="procedimento-titulo" value="${procedimento?.titulo || ''}" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Subtítulo (opcional):</label>
                    <input type="text" class="form-control" id="procedimento-subtitulo" value="${procedimento?.subtitulo || ''}">
                </div>
                <div class="form-group">
                    <label class="form-label">Subtópicos (um por linha):</label>
                    <textarea class="form-control" id="procedimento-subtopicos" rows="5" required>${procedimento?.subtopicos?.join('\\n') || ''}</textarea>
                </div>
                <div class="form-group">
                    <label class="form-label">Observações (opcional):</label>
                    <textarea class="form-control" id="procedimento-observacoes" rows="3">${procedimento?.observacoes || ''}</textarea>
                </div>
            </div>
            <div class="modal-actions">
                <button class="btn btn--primary" onclick="salvarProcedimento('${modalidade}', ${procedimentoId})">
                    ${isEdicao ? 'Atualizar' : 'Salvar'} Procedimento
                </button>
                <button class="btn btn--secondary" onclick="this.closest('.modal').remove()">Cancelar</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function salvarProcedimento(modalidade, procedimentoId = null) {
    const titulo = document.getElementById('procedimento-titulo').value.trim();
    const subtitulo = document.getElementById('procedimento-subtitulo').value.trim();
    const subtopicosTexto = document.getElementById('procedimento-subtopicos').value.trim();
    const observacoes = document.getElementById('procedimento-observacoes').value.trim();
    
    if (!titulo || !subtopicosTexto) {
        alert('Por favor, preencha pelo menos o título e os subtópicos.');
        return;
    }
    
    const subtopicos = subtopicosTexto.split('\\n').filter(s => s.trim());
    
    const procedimento = {
        id: procedimentoId || Date.now(),
        titulo,
        subtitulo,
        subtopicos,
        observacoes,
        dataModificacao: new Date().toISOString()
    };
    
    if (!estadoApp.procedimentos[modalidade]) {
        estadoApp.procedimentos[modalidade] = [];
    }
    
    if (procedimentoId) {
        // Editar existente
        const index = estadoApp.procedimentos[modalidade].findIndex(p => p.id === procedimentoId);
        estadoApp.procedimentos[modalidade][index] = procedimento;
    } else {
        // Adicionar novo
        estadoApp.procedimentos[modalidade].push(procedimento);
    }
    
    salvarEstado();
    carregarProcedimentos();
    
    // Fechar modal
    document.querySelector('.modal').remove();
    
    alert(`Procedimento "${titulo}" ${procedimentoId ? 'atualizado' : 'adicionado'} com sucesso!`);
}

function editarProcedimento(modalidade, procedimentoId) {
    abrirModalProcedimento(modalidade, procedimentoId);
}

function removerProcedimento(modalidade, procedimentoId) {
    if (confirm('Tem certeza que deseja remover este procedimento?')) {
        estadoApp.procedimentos[modalidade] = estadoApp.procedimentos[modalidade].filter(p => p.id !== procedimentoId);
        salvarEstado();
        carregarProcedimentos();
        alert('Procedimento removido com sucesso!');
    }
}

// ============================================================
// FUNÇÕES DE ARQUIVOS (MODIFICADAS PARA SUPORTE A COMPARTILHAMENTO)
// ============================================================
function carregarArquivos() {
    // Carregar arquivos das duas modalidades
    carregarArquivosModalidade('18');
    carregarArquivosModalidade('19');
}

function carregarArquivosModalidade(modalidade) {
    const container = document.getElementById(`arquivos-lista-${modalidade}`);
    const arquivos = estadoApp.arquivos[modalidade] || [];
    
    if (arquivos.length === 0) {
        container.innerHTML = `
            <div class="no-arquivos">
                <p>Nenhum arquivo adicionado ainda.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = arquivos.map(arquivo => `
        <div class="arquivo-item">
            <div class="arquivo-info">
                <div class="arquivo-icon">
                    <i class="fas fa-file-alt"></i>
                </div>
                <div class="arquivo-details">
                    <h5>${arquivo.nome}</h5>
                    <p>Adicionado em ${new Date(arquivo.dataAdicao).toLocaleDateString('pt-BR')}</p>
                </div>
            </div>
            <div class="arquivo-acoes">
                <a href="${arquivo.link}" target="_blank" class="arquivo-btn visualizar">
                    <i class="fas fa-eye"></i> Visualizar
                </a>
                <button class="arquivo-btn remover" onclick="removerArquivo('${modalidade}', ${arquivo.id})">
                    <i class="fas fa-trash"></i> Remover
                </button>
            </div>
        </div>
    `).join('');
}

// Função modificada para usar links públicos
function adicionarArquivo(modalidade) {
    const nomeInput = document.getElementById(`nome-arquivo-${modalidade}`);
    const linkInput = document.getElementById(`link-arquivo-${modalidade}`);
    
    const nome = nomeInput.value.trim();
    const link = linkInput.value.trim();
    
    if (!nome || !link) {
        alert('Por favor, preencha todos os campos.');
        return;
    }
    
    // Verificar se é um link válido do Google Drive
    if (!link.includes('drive.google.com')) {
        alert('Por favor, insira um link válido do Google Drive.');
        return;
    }
    
    // Adicionar arquivo com link público
    const arquivo = adicionarArquivoComLinkPublico(modalidade, nome, link);
    
    // Limpar campos
    nomeInput.value = '';
    linkInput.value = '';
    
    // Recarregar lista de arquivos
    carregarArquivos();
    
    alert(`Arquivo "${arquivo.nome}" adicionado com sucesso!\\nO link foi convertido para acesso público direto.`);
}

function removerArquivo(modalidade, arquivoId) {
    if (confirm('Tem certeza que deseja remover este arquivo?')) {
        estadoApp.arquivos[modalidade] = estadoApp.arquivos[modalidade].filter(a => a.id !== arquivoId);
        salvarEstado();
        carregarArquivos();
        alert('Arquivo removido com sucesso!');
    }
}

// ============================================================
// FUNÇÕES DE ESTATÍSTICAS E GRÁFICO
// ============================================================
function atualizarEstatisticas() {
    // Atualizar número de alunos (sempre 1 quando há aluno cadastrado)
    const numAlunos = estadoApp.alunoAtual ? 1 : 0;
    const elementoAlunos = document.querySelector('.stat-card h3');
    if (elementoAlunos) {
        elementoAlunos.textContent = numAlunos;
    }
}

function inicializarGrafico() {
    const canvas = document.getElementById('grafico-progresso');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Calcular dados do progresso
    const totalEtapas = dadosAplicacao.etapas_conhecimentos.length;
    const etapasAvaliadas = Object.keys(estadoApp.avaliacoes).length;
    const etapasConcluidas = Object.values(estadoApp.avaliacoes).filter(av => av.concluida).length;
    
    const niveis = { 'NADA': 0, 'BÁSICO': 0, 'INTERMEDIÁRIO': 0, 'AVANÇADO': 0 };
    Object.values(estadoApp.avaliacoes).forEach(av => {
        if (av.nivel) niveis[av.nivel]++;
    });
    
    // Destruir gráfico anterior se existir
    if (graficoProgresso) {
        graficoProgresso.destroy();
    }
    
    // Criar novo gráfico
    graficoProgresso = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['NADA', 'BÁSICO', 'INTERMEDIÁRIO', 'AVANÇADO'],
            datasets: [{
                data: [niveis['NADA'], niveis['BÁSICO'], niveis['INTERMEDIÁRIO'], niveis['AVANÇADO']],
                backgroundColor: ['#8B5A3C', '#CC0000', '#FF8C00', '#228B22'],
                borderWidth: 2,
                borderColor: '#fff'
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
                    text: `Progresso das Etapas (${etapasConcluidas}/${totalEtapas} concluídas)`
                }
            }
        }
    });
}

// ============================================================
// FUNÇÕES DE PERSISTÊNCIA (MANTIDAS PARA COMPATIBILIDADE)
// ============================================================
function salvarEstado() {
    try {
        localStorage.setItem('olimpiadas-conhecimento-estado', JSON.stringify(estadoApp));
    } catch (error) {
        console.error('Erro ao salvar estado:', error);
    }
}

function carregarEstado() {
    try {
        const estadoSalvo = localStorage.getItem('olimpiadas-conhecimento-estado');
        if (estadoSalvo) {
            const estado = JSON.parse(estadoSalvo);
            Object.assign(estadoApp, estado);
        }
    } catch (error) {
        console.error('Erro ao carregar estado:', error);
    }
}

// ============================================================
// INICIALIZAÇÃO DA APLICAÇÃO
// ============================================================
document.addEventListener('DOMContentLoaded', inicializarApp);