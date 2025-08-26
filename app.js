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

    const etapasFiltradas = categoriaFiltro ? 
        dadosAplicacao.etapas_conhecimentos.filter(etapa => etapa.categoria === categoriaFiltro) : 
        dadosAplicacao.etapas_conhecimentos;

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
                <input type="checkbox" 
                       id="etapa-${etapa.id}" 
                       ${avaliacao.concluida ? 'checked' : ''}
                       onchange="toggleEtapa(${etapa.id})">
                <label for="etapa-${etapa.id}">Concluída</label>
            </div>
        </div>
        <div class="nivel-selector">
            <button class="nivel-btn nada ${avaliacao.nivel === 'NADA' ? 'active' : ''}" 
                    onclick="setNivel(${etapa.id}, 'NADA')">NADA</button>
            <button class="nivel-btn basico ${avaliacao.nivel === 'BÁSICO' ? 'active' : ''}" 
                    onclick="setNivel(${etapa.id}, 'BÁSICO')">BÁSICO</button>
            <button class="nivel-btn intermediario ${avaliacao.nivel === 'INTERMEDIÁRIO' ? 'active' : ''}" 
                    onclick="setNivel(${etapa.id}, 'INTERMEDIÁRIO')">INTERMEDIÁRIO</button>
            <button class="nivel-btn avancado ${avaliacao.nivel === 'AVANÇADO' ? 'active' : ''}" 
                    onclick="setNivel(${etapa.id}, 'AVANÇADO')">AVANÇADO</button>
        </div>
    `;

    return card;
}

function toggleEtapa(etapaId) {
    if (!estadoApp.avaliacoes[etapaId]) {
        estadoApp.avaliacoes[etapaId] = { concluida: false, nivel: 'NADA' };
    }

    const checkbox = document.getElementById(`etapa-${etapaId}`);
    estadoApp.avaliacoes[etapaId].concluida = checkbox.checked;

    salvarEstado();
    atualizarResumoProgresso();
}

function setNivel(etapaId, nivel) {
    if (!estadoApp.avaliacoes[etapaId]) {
        estadoApp.avaliacoes[etapaId] = { concluida: false, nivel: 'NADA' };
    }

    estadoApp.avaliacoes[etapaId].nivel = nivel;

    // Atualizar botões visuais
    const card = document.querySelector(`#etapa-${etapaId}`).closest('.etapa-card');
    const buttons = card.querySelectorAll('.nivel-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    const activeButton = card.querySelector(`.nivel-btn.${nivel.toLowerCase().replace('ã', 'a').replace('é', 'e')}`);
    if (activeButton) {
        activeButton.classList.add('active');
    }

    salvarEstado();
    atualizarResumoProgresso();
}

function filtrarEtapas(categoria) {
    carregarEtapas(categoria);
}

function atualizarResumoProgresso() {
    const contadores = {
        NADA: 0,
        'BÁSICO': 0,
        'INTERMEDIÁRIO': 0,
        'AVANÇADO': 0
    };

    // Contar avaliações
    Object.values(estadoApp.avaliacoes).forEach(avaliacao => {
        contadores[avaliacao.nivel]++;
    });

    // Contar etapas não avaliadas como NADA
    const totalEtapas = dadosAplicacao.etapas_conhecimentos.length;
    const etapasAvaliadas = Object.keys(estadoApp.avaliacoes).length;
    contadores.NADA += (totalEtapas - etapasAvaliadas);

    // Atualizar contadores na interface
    document.getElementById('count-nada').textContent = contadores.NADA;
    document.getElementById('count-basico').textContent = contadores['BÁSICO'];
    document.getElementById('count-intermediario').textContent = contadores['INTERMEDIÁRIO'];
    document.getElementById('count-avancado').textContent = contadores['AVANÇADO'];
}

function resetarCadastro() {
    estadoApp.alunoAtual = null;
    estadoApp.avaliacoes = {};
    
    document.getElementById('cadastro-section').style.display = 'block';
    document.getElementById('avaliacao-section').style.display = 'none';
    
    // Limpar formulário
    document.getElementById('cadastro-form').reset();
    
    salvarEstado();
    atualizarEstatisticas();
}

function limparAvaliacao() {
    if (confirm('Tem certeza que deseja limpar todas as avaliações?')) {
        estadoApp.avaliacoes = {};
        carregarEtapas();
        atualizarResumoProgresso();
        salvarEstado();
    }
}

// ============================================================
// VISÃO GERAL E ESTATÍSTICAS
// ============================================================

function atualizarEstatisticas() {
    // Atualizar contador de alunos
    const totalAlunos = estadoApp.alunoAtual ? 1 : 0;
    const elementoTotalAlunos = document.getElementById('total-alunos');
    if (elementoTotalAlunos) {
        elementoTotalAlunos.textContent = totalAlunos;
    }

    // Atualizar contador de procedimentos
    const totalProcedimentos = Object.values(estadoApp.procedimentos).reduce((total, modalidade) => total + modalidade.length, 0);
    const elementoTotalProcedimentos = document.getElementById('total-procedimentos');
    if (elementoTotalProcedimentos) {
        elementoTotalProcedimentos.textContent = totalProcedimentos;
    }
}

function inicializarGrafico() {
    const ctx = document.getElementById('progressChart');
    if (!ctx) return;

    // Destruir gráfico anterior se existir
    if (graficoProgresso) {
        graficoProgresso.destroy();
    }

    const contadores = {
        NADA: 0,
        'BÁSICO': 0,
        'INTERMEDIÁRIO': 0,
        'AVANÇADO': 0
    };

    // Contar avaliações
    Object.values(estadoApp.avaliacoes).forEach(avaliacao => {
        contadores[avaliacao.nivel]++;
    });

    // Contar etapas não avaliadas como NADA
    const totalEtapas = dadosAplicacao.etapas_conhecimentos.length;
    const etapasAvaliadas = Object.keys(estadoApp.avaliacoes).length;
    contadores.NADA += (totalEtapas - etapasAvaliadas);

    graficoProgresso = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Nada', 'Básico', 'Intermediário', 'Avançado'],
            datasets: [{
                data: [contadores.NADA, contadores['BÁSICO'], contadores['INTERMEDIÁRIO'], contadores['AVANÇADO']],
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
                }
            }
        }
    });
}

// ============================================================
// CRONOGRAMA
// ============================================================

function inicializarCronograma() {
    // Adicionar event listeners aos botões de cronograma
    const cronoTabs = document.querySelectorAll('.cronograma-tab');
    cronoTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            const dia = parseInt(e.currentTarget.getAttribute('data-dia'));
            mostrarCronograma(dia);
        });
    });
}

function mostrarCronograma(dia) {
    // Atualizar abas ativas
    const cronoTabs = document.querySelectorAll('.cronograma-tab');
    cronoTabs.forEach(tab => {
        tab.classList.remove('active');
        if (parseInt(tab.getAttribute('data-dia')) === dia) {
            tab.classList.add('active');
        }
    });

    // Mostrar conteúdo do dia
    const container = document.getElementById('cronograma-content');
    const atividades = cronogramaDias[dia] || [];

    let html = `<h3>Dia ${dia} - Programação</h3>`;
    
    atividades.forEach(atividade => {
        html += `
            <div class="atividade-item">
                <div class="horario">${atividade.horario}</div>
                <div class="duracao">${atividade.duracao}</div>
                <div class="acao">${atividade.acao}</div>
                <div class="responsaveis">${atividade.responsaveis}</div>
            </div>
        `;
    });

    container.innerHTML = html;
}

// ============================================================
// GERENCIAMENTO DE ESTADO (LOCAL STORAGE)
// ============================================================

function salvarEstado() {
    try {
        localStorage.setItem('senai_oc_estado', JSON.stringify(estadoApp));
    } catch (error) {
        console.warn('Erro ao salvar estado:', error);
    }
}

async function carregarEstado() {
    try {
        // Primeiro, carregar arquivos compartilhados
        await carregarArquivosCompartilhados();
        
        // Depois, carregar estado local e fazer merge
        const estadoSalvo = localStorage.getItem('senai_oc_estado');
        if (estadoSalvo) {
            const estado = JSON.parse(estadoSalvo);
            
            // Preservar os arquivos já carregados (compartilhados + locais)
            const arquivosAtuais = { ...estadoApp.arquivos };
            
            // Fazer merge do estado salvo
            estadoApp = { ...estadoApp, ...estado };
            
            // Fazer merge inteligente dos arquivos (compartilhados + locais sem duplicatas)
            for (const modalidade in arquivosAtuais) {
                const arquivosCompartilhados = arquivosAtuais[modalidade] || [];
                const arquivosLocaisSalvos = estado.arquivos?.[modalidade] || [];
                
                // Combinar arquivos, evitando duplicatas
                const arquivosCombinados = [...arquivosCompartilhados];
                
                arquivosLocaisSalvos.forEach(localSalvo => {
                    const jaExiste = arquivosCompartilhados.some(compartilhado => 
                        compartilhado.nome === localSalvo.nome && compartilhado.link === localSalvo.link
                    );
                    if (!jaExiste) {
                        arquivosCombinados.push(localSalvo);
                    }
                });
                
                estadoApp.arquivos[modalidade] = arquivosCombinados;
            }
            
            // Se há aluno cadastrado, mostrar seção de avaliação
            if (estadoApp.alunoAtual) {
                mostrarSecaoAvaliacao();
            }
        }
    } catch (error) {
        console.warn('Erro ao carregar estado:', error);
    }
}

// ============================================================
// FUNÇÕES DE PROCEDIMENTOS (STUBS PARA MODAIS)
// ============================================================

function inicializarProcedimentosPadrao() {
    // Stub - pode ser implementado futuramente
}

function carregarProcedimentos() {
    carregarProcedimentosModalidade('18');
    carregarProcedimentosModalidade('19');
}

function carregarProcedimentosModalidade(modalidade) {
    const container = document.getElementById(`procedimentos-modalidade-${modalidade}`);
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
    
    let html = '';
    procedimentos.forEach((procedimento, index) => {
        html += `
            <div class="procedimento-card">
                <div class="procedimento-header">
                    <h4>${procedimento.numero}</h4>
                    <p class="procedimento-subtitle">${procedimento.titulo}</p>
                    <div class="procedimento-actions">
                        <button class="procedimento-action-btn edit" onclick="editarProcedimento('${modalidade}', ${index})" title="Editar">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="procedimento-action-btn delete" onclick="excluirProcedimento('${modalidade}', ${index})" title="Excluir">
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
        `;
    });
    
    container.innerHTML = html;
}

function abrirModalProcedimento(modalidade, procedimentoIndex = null) {
    // Stub - implementar modal futuramente
    console.log('Modal procedimento:', modalidade, procedimentoIndex);
}

function editarProcedimento(modalidade, index) {
    // Stub - implementar edição futuramente
    console.log('Editar procedimento:', modalidade, index);
}

function excluirProcedimento(modalidade, index) {
    if (confirm('Tem certeza que deseja excluir este procedimento?')) {
        estadoApp.procedimentos[modalidade].splice(index, 1);
        salvarEstado();
        carregarProcedimentosModalidade(modalidade);
        atualizarEstatisticas();
    }
}

// ============================================================
// FUNÇÕES DE ARQUIVOS
// ============================================================

function carregarArquivos() {
    carregarArquivosModalidade('18');
    carregarArquivosModalidade('19');
}

function carregarArquivosModalidade(modalidade) {
    const container = document.getElementById(`arquivos-lista-${modalidade}`);
    const arquivos = estadoApp.arquivos[modalidade] || [];
    
    if (arquivos.length === 0) {
        container.innerHTML = `
            <h4>Arquivos Disponíveis</h4>
            <div class="no-arquivos">
                <p>Nenhum arquivo adicionado ainda.</p>
            </div>
        `;
        return;
    }
    
    let html = '<h4>Arquivos Disponíveis</h4>';
    arquivos.forEach((arquivo, index) => {
        html += `
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
                    <button class="arquivo-btn visualizar" onclick="visualizarArquivo('${arquivo.link}')" title="Visualizar">
                        <i class="fas fa-external-link-alt"></i>
                        Visualizar
                    </button>
                    <button class="arquivo-btn remover" onclick="removerArquivo('${modalidade}', ${index})" title="Remover">
                        <i class="fas fa-trash"></i>
                        Remover
                    </button>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function adicionarArquivo(event, modalidade) {
    event.preventDefault();
    
    const form = event.target;
    const nome = form.querySelector('input[type="text"]').value.trim();
    const link = form.querySelector('input[type="url"]').value.trim();
    
    if (!nome || !link) {
        alert('Por favor, preencha todos os campos.');
        return;
    }
    
    // Verificar se já existe um arquivo com o mesmo nome e link
    const arquivosExistentes = estadoApp.arquivos[modalidade] || [];
    const arquivoExiste = arquivosExistentes.some(arquivo => 
        arquivo.nome === nome && arquivo.link === link
    );
    
    if (arquivoExiste) {
        alert('Este arquivo já foi adicionado.');
        return;
    }
    
    const novoArquivo = {
        id: Date.now(),
        nome: nome,
        link: link,
        dataAdicao: new Date().toISOString().split('T')[0]
    };
    
    if (!estadoApp.arquivos[modalidade]) {
        estadoApp.arquivos[modalidade] = [];
    }
    
    estadoApp.arquivos[modalidade].push(novoArquivo);
    
    // Salvar estado
    salvarEstado();
    
    // Recarregar lista
    carregarArquivosModalidade(modalidade);
    
    // Limpar formulário
    form.reset();
    
    alert('Arquivo adicionado com sucesso!');
}

function visualizarArquivo(link) {
    window.open(link, '_blank');
}

function removerArquivo(modalidade, index) {
    if (confirm('Tem certeza que deseja remover este arquivo?')) {
        estadoApp.arquivos[modalidade].splice(index, 1);
        salvarEstado();
        carregarArquivosModalidade(modalidade);
    }
}

// ============================================================
// FUNÇÕES DE PDF
// ============================================================

function gerarPDF() {
    if (!estadoApp.alunoAtual) {
        alert('Nenhum aluno cadastrado para gerar PDF.');
        return;
    }
    
    // Stub - implementar geração de PDF futuramente
    alert('Função de geração de PDF será implementada em breve.');
}

// ============================================================
// STUBS PARA FUNÇÕES DE MODAL
// ============================================================

function fecharModalProcedimento() {
    // Stub - implementar modal futuramente
}