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

function inicializarApp() {
    console.log('Inicializando aplicação...');
    
    // Inicializar navegação das abas
    inicializarNavegacao();
    
    // Inicializar formulários
    inicializarFormularios();
    
    // Inicializar cronograma
    inicializarCronograma();
    
    // Inicializar procedimentos padrão
    inicializarProcedimentosPadrao();
    
    // Carregar estado salvo
    carregarEstado();
    
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
    document.getElementById('modalidade-atual').textContent = 
        `${estadoApp.alunoAtual.modalidade} - ${estadoApp.alunoAtual.modalidadeNome}`;
    
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
                       id="check-${etapa.id}" 
                       ${avaliacao.concluida ? 'checked' : ''}
                       onchange="toggleEtapaConcluida(${etapa.id})">
                <label for="check-${etapa.id}">Concluída</label>
            </div>
        </div>
        <div class="nivel-selector">
            <button class="nivel-btn nada ${avaliacao.nivel === 'NADA' ? 'active' : ''}" 
                    onclick="definirNivel(${etapa.id}, 'NADA')">NADA</button>
            <button class="nivel-btn basico ${avaliacao.nivel === 'BÁSICO' ? 'active' : ''}" 
                    onclick="definirNivel(${etapa.id}, 'BÁSICO')">BÁSICO</button>
            <button class="nivel-btn intermediario ${avaliacao.nivel === 'INTERMEDIÁRIO' ? 'active' : ''}" 
                    onclick="definirNivel(${etapa.id}, 'INTERMEDIÁRIO')">INTER.</button>
            <button class="nivel-btn avancado ${avaliacao.nivel === 'AVANÇADO' ? 'active' : ''}" 
                    onclick="definirNivel(${etapa.id}, 'AVANÇADO')">AVANÇ.</button>
        </div>
    `;
    
    return card;
}

function toggleEtapaConcluida(etapaId) {
    if (!estadoApp.avaliacoes[etapaId]) {
        estadoApp.avaliacoes[etapaId] = { concluida: false, nivel: 'NADA' };
    }
    
    estadoApp.avaliacoes[etapaId].concluida = !estadoApp.avaliacoes[etapaId].concluida;
    
    salvarEstado();
    atualizarResumoProgresso();
    atualizarGrafico();
}

function definirNivel(etapaId, nivel) {
    if (!estadoApp.avaliacoes[etapaId]) {
        estadoApp.avaliacoes[etapaId] = { concluida: false, nivel: 'NADA' };
    }
    
    estadoApp.avaliacoes[etapaId].nivel = nivel;
    estadoApp.avaliacoes[etapaId].concluida = true;
    
    // Atualizar checkbox
    const checkbox = document.getElementById(`check-${etapaId}`);
    if (checkbox) {
        checkbox.checked = true;
    }
    
    // Atualizar botões
    const card = checkbox?.closest('.etapa-card');
    if (card) {
        const botoes = card.querySelectorAll('.nivel-btn');
        botoes.forEach(btn => btn.classList.remove('active'));
        
        const botaoAtivo = card.querySelector(`.nivel-btn.${nivel.toLowerCase()}`);
        if (botaoAtivo) {
            botaoAtivo.classList.add('active');
        }
    }
    
    salvarEstado();
    atualizarResumoProgresso();
    atualizarGrafico();
}

function filtrarEtapas(categoria) {
    carregarEtapas(categoria);
}

function atualizarResumoProgresso() {
    const contadores = { NADA: 0, BÁSICO: 0, INTERMEDIÁRIO: 0, AVANÇADO: 0 };
    
    dadosAplicacao.etapas_conhecimentos.forEach(etapa => {
        const avaliacao = estadoApp.avaliacoes[etapa.id];
        if (avaliacao && avaliacao.concluida) {
            contadores[avaliacao.nivel]++;
        } else {
            contadores.NADA++;
        }
    });
    
    // Atualizar contadores na interface
    document.getElementById('count-nada').textContent = contadores.NADA;
    document.getElementById('count-basico').textContent = contadores.BÁSICO;
    document.getElementById('count-intermediario').textContent = contadores.INTERMEDIÁRIO;
    document.getElementById('count-avancado').textContent = contadores.AVANÇADO;
}

// ============================================================
// FUNÇÕES DE GRÁFICO
// ============================================================

function inicializarGrafico() {
    const canvas = document.getElementById('progressChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Dados iniciais
    const dados = obterDadosGrafico();
    
    if (graficoProgresso) {
        graficoProgresso.destroy();
    }
    
    graficoProgresso = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['NADA', 'BÁSICO', 'INTERMEDIÁRIO', 'AVANÇADO'],
            datasets: [{
                data: dados,
                backgroundColor: [
                    '#8B5A3C', // NADA - marrom
                    '#CC0000', // BÁSICO - vermelho
                    '#FF8C00', // INTERMEDIÁRIO - laranja
                    '#228B22'  // AVANÇADO - verde
                ],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percent = ((context.parsed * 100) / total).toFixed(1);
                            return `${context.label}: ${context.parsed} (${percent}%)`;
                        }
                    }
                }
            }
        }
    });
}

function obterDadosGrafico() {
    const contadores = { NADA: 0, BÁSICO: 0, INTERMEDIÁRIO: 0, AVANÇADO: 0 };
    
    dadosAplicacao.etapas_conhecimentos.forEach(etapa => {
        const avaliacao = estadoApp.avaliacoes[etapa.id];
        if (avaliacao && avaliacao.concluida) {
            contadores[avaliacao.nivel]++;
        } else {
            contadores.NADA++;
        }
    });
    
    return [contadores.NADA, contadores.BÁSICO, contadores.INTERMEDIÁRIO, contadores.AVANÇADO];
}

function atualizarGrafico() {
    if (graficoProgresso) {
        const dados = obterDadosGrafico();
        graficoProgresso.data.datasets[0].data = dados;
        graficoProgresso.update();
    }
}

// ============================================================
// FUNÇÃO DE GERAÇÃO DE PDF (CORRIGIDA)
// ============================================================

function gerarPDF() {
    if (!estadoApp.alunoAtual) {
        alert('Nenhum aluno cadastrado para gerar relatório.');
        return;
    }
    
    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Header
        doc.setFillColor(0, 102, 204);
        doc.rect(0, 0, 210, 30, 'F');
        
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(20);
        doc.setFont(undefined, 'bold');
        doc.text('SENAI PETRÓPOLIS', 20, 15);
        doc.setFontSize(14);
        doc.text('Olimpíadas do Conhecimento', 20, 23);
        
        // Reset text color for content
        doc.setTextColor(0, 0, 0);
        let yPosition = 45;
        
        // Informações do Aluno
        doc.setFontSize(16);
        doc.setFont(undefined, 'bold');
        doc.text('RELATÓRIO DE AVALIAÇÃO DE CONHECIMENTOS', 20, yPosition);
        yPosition += 15;
        
        doc.setFontSize(12);
        doc.setFont(undefined, 'normal');
        doc.text(`Aluno: ${estadoApp.alunoAtual.nome}`, 20, yPosition);
        yPosition += 8;
        doc.text(`Modalidade: ${estadoApp.alunoAtual.modalidade} - ${estadoApp.alunoAtual.modalidadeNome}`, 20, yPosition);
        yPosition += 8;
        doc.text(`Data: ${new Date().toLocaleDateString('pt-BR')}`, 20, yPosition);
        yPosition += 20;
        
        // ===== GRÁFICO FRONTAL COM TIMEOUT PARA GARANTIR RENDERIZAÇÃO =====
        if (graficoProgresso) {
            try {
                const canvas = document.getElementById('progressChart');
                if (canvas) {
                    const imgData = canvas.toDataURL('image/png', 1.0);
                    
                    doc.setFont(undefined, 'bold');
                    doc.setFontSize(14);
                    doc.text('GRÁFICO DE DISTRIBUIÇÃO DOS NÍVEIS:', 20, yPosition);
                    yPosition += 15;
                    
                    // Adicionar gráfico centralizado com melhor qualidade
                    const imgWidth = 140;
                    const imgHeight = 140;
                    const xPos = (210 - imgWidth) / 2;
                    
                    doc.addImage(imgData, 'PNG', xPos, yPosition, imgWidth, imgHeight);
                    yPosition += imgHeight + 20;
                }
            } catch (chartError) {
                console.warn('Erro ao capturar gráfico:', chartError);
                yPosition += 10;
            }
        }
        
        // Contar avaliações
        const contadores = { NADA: 0, BÁSICO: 0, INTERMEDIÁRIO: 0, AVANÇADO: 0 };
        let totalAvaliadas = 0;
        
        dadosAplicacao.etapas_conhecimentos.forEach(etapa => {
            const avaliacao = estadoApp.avaliacoes[etapa.id];
            if (avaliacao && avaliacao.concluida) {
                contadores[avaliacao.nivel]++;
                totalAvaliadas++;
            } else {
                contadores.NADA++;
            }
        });
        
        // Verificar se precisa de nova página
        if (yPosition > 220) {
            doc.addPage();
            yPosition = 20;
        }
        
        // Resumo estatístico
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.text('RESUMO ESTATÍSTICO:', 20, yPosition);
        yPosition += 12;
        
        doc.setFontSize(11);
        doc.setFont(undefined, 'normal');
        doc.text(`Total de Etapas: ${dadosAplicacao.etapas_conhecimentos.length}`, 20, yPosition);
        yPosition += 7;
        doc.text(`Etapas Avaliadas: ${totalAvaliadas}`, 20, yPosition);
        yPosition += 7;
        doc.text(`Progresso: ${((totalAvaliadas/dadosAplicacao.etapas_conhecimentos.length)*100).toFixed(1)}%`, 20, yPosition);
        yPosition += 12;
        
        // Distribuição por níveis
        doc.setFont(undefined, 'bold');
        doc.text('Distribuição por Níveis:', 20, yPosition);
        yPosition += 8;
        
        doc.setFont(undefined, 'normal');
        doc.text(`NADA: ${contadores.NADA} etapas (${((contadores.NADA/46)*100).toFixed(1)}%)`, 25, yPosition);
        yPosition += 7;
        doc.text(`BÁSICO: ${contadores.BÁSICO} etapas (${((contadores.BÁSICO/46)*100).toFixed(1)}%)`, 25, yPosition);
        yPosition += 7;
        doc.text(`INTERMEDIÁRIO: ${contadores.INTERMEDIÁRIO} etapas (${((contadores.INTERMEDIÁRIO/46)*100).toFixed(1)}%)`, 25, yPosition);
        yPosition += 7;
        doc.text(`AVANÇADO: ${contadores.AVANÇADO} etapas (${((contadores.AVANÇADO/46)*100).toFixed(1)}%)`, 25, yPosition);
        yPosition += 20;
        
        // ===== NOVA PÁGINA PARA TABELAS DAS ETAPAS =====
        doc.addPage();
        yPosition = 20;
        
        doc.setFontSize(16);
        doc.setFont(undefined, 'bold');
        doc.text('DETALHAMENTO DAS ETAPAS POR CATEGORIA', 20, yPosition);
        yPosition += 20;
        
        // Agrupar por categoria
        const categorias = {};
        dadosAplicacao.etapas_conhecimentos.forEach(etapa => {
            if (!categorias[etapa.categoria]) {
                categorias[etapa.categoria] = [];
            }
            categorias[etapa.categoria].push(etapa);
        });
        
        // Função para adicionar tabela de categoria
        function adicionarTabelaCategoria(categoria, etapas) {
            if (yPosition > 240) {
                doc.addPage();
                yPosition = 20;
            }
            
            doc.setFontSize(13);
            doc.setFont(undefined, 'bold');
            doc.text(categoria.toUpperCase(), 20, yPosition);
            yPosition += 10;
            
            doc.setFontSize(9);
            doc.setFont(undefined, 'bold');
            doc.setFillColor(240, 240, 240);
            doc.rect(20, yPosition - 5, 170, 8, 'F');
            doc.text('ETAPA', 22, yPosition);
            doc.text('STATUS', 140, yPosition);
            doc.text('NÍVEL', 160, yPosition);
            yPosition += 10;
            
            doc.setFont(undefined, 'normal');
            etapas.forEach((etapa, index) => {
                if (yPosition > 270) {
                    doc.addPage();
                    yPosition = 20;
                    
                    doc.setFontSize(13);
                    doc.setFont(undefined, 'bold');
                    doc.text(categoria.toUpperCase() + ' (continuação)', 20, yPosition);
                    yPosition += 10;
                    
                    doc.setFontSize(9);
                    doc.setFont(undefined, 'bold');
                    doc.setFillColor(240, 240, 240);
                    doc.rect(20, yPosition - 5, 170, 8, 'F');
                    doc.text('ETAPA', 22, yPosition);
                    doc.text('STATUS', 140, yPosition);
                    doc.text('NÍVEL', 160, yPosition);
                    yPosition += 10;
                    doc.setFont(undefined, 'normal');
                }
                
                const avaliacao = estadoApp.avaliacoes[etapa.id] || { concluida: false, nivel: 'NADA' };
                
                if (index % 2 === 0) {
                    doc.setFillColor(250, 250, 250);
                    doc.rect(20, yPosition - 5, 170, 8, 'F');
                }
                
                const maxWidth = 115;
                let textoEtapa = etapa.etapa;
                const linhasTexto = doc.splitTextToSize(textoEtapa, maxWidth);
                const status = avaliacao.concluida ? 'Concluída' : 'Pendente';
                
                // CORREÇÃO: Alterada cor AVANÇADO para verde mais visível
                let corNivel;
                switch(avaliacao.nivel) {
                    case 'NADA': corNivel = [139, 90, 60]; break;
                    case 'BÁSICO': corNivel = [204, 0, 0]; break;
                    case 'INTERMEDIÁRIO': corNivel = [255, 140, 0]; break;
                    case 'AVANÇADO': corNivel = [34, 139, 34]; break;
                    default: corNivel = [0, 0, 0];
                }
                
                doc.setTextColor(0, 0, 0);
                linhasTexto.forEach((linha, indexLinha) => {
                    doc.text(linha, 22, yPosition + (indexLinha * 4));
                });
                
                doc.text(status, 140, yPosition);
                doc.setTextColor(corNivel[0], corNivel[1], corNivel[2]);
                doc.text(avaliacao.nivel, 160, yPosition);
                
                yPosition += Math.max(8, linhasTexto.length * 4);
            });
            
            yPosition += 10;
        }
        
        Object.keys(categorias).forEach(categoria => {
            adicionarTabelaCategoria(categoria, categorias[categoria]);
        });
        
        // ===== PÁGINA DE LEGENDAS E OBSERVAÇÕES =====
        doc.addPage();
        yPosition = 20;
        
        doc.setFontSize(16);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(0, 0, 0);
        doc.text('LEGENDAS E OBSERVAÇÕES', 20, yPosition);
        yPosition += 20;
        
        doc.setFontSize(12);
        doc.setFont(undefined, 'bold');
        doc.text('Níveis de Conhecimento:', 20, yPosition);
        yPosition += 10;
        
        doc.setFontSize(10);
        doc.setFont(undefined, 'normal');
        
        // NADA
        doc.setFillColor(139, 90, 60);
        doc.rect(20, yPosition - 3, 15, 6, 'F');
        doc.setTextColor(255, 255, 255);
        doc.text('NADA', 22, yPosition);
        doc.setTextColor(0, 0, 0);
        doc.text('Conhecimento inexistente ou insuficiente', 40, yPosition);
        yPosition += 8;
        
        // BÁSICO
        doc.setFillColor(204, 0, 0);
        doc.rect(20, yPosition - 3, 15, 6, 'F');
        doc.setTextColor(255, 255, 255);
        doc.text('BÁSICO', 22, yPosition);
        doc.setTextColor(0, 0, 0);
        doc.text('Conhecimento elementar da competência', 40, yPosition);
        yPosition += 8;
        
        // INTERMEDIÁRIO
        doc.setFillColor(255, 140, 0);
        doc.rect(20, yPosition - 3, 15, 6, 'F');
        doc.setTextColor(255, 255, 255);
        doc.text('INTERM.', 22, yPosition);
        doc.setTextColor(0, 0, 0);
        doc.text('Conhecimento parcial com autonomia limitada', 40, yPosition);
        yPosition += 8;
        
        // CORREÇÃO: AVANÇADO agora com cor verde mais visível
        doc.setFillColor(34, 139, 34);
        doc.rect(20, yPosition - 3, 15, 6, 'F');
        doc.setTextColor(255, 255, 255);
        doc.text('AVANÇ.', 22, yPosition);
        doc.setTextColor(0, 0, 0);
        doc.text('Conhecimento completo com total autonomia', 40, yPosition);
        yPosition += 15;
        
        // Observações gerais
        doc.setFontSize(12);
        doc.setFont(undefined, 'bold');
        doc.text('Observações Gerais:', 20, yPosition);
        yPosition += 10;
        
        doc.setFontSize(10);
        doc.setFont(undefined, 'normal');
        const observacoes = [
            '• Este relatório apresenta a avaliação individual do competidor nas 46 etapas de conhecimento.',
            '• As etapas estão organizadas por categorias técnicas para melhor visualização.',
            '• O status "Concluída" indica que a etapa foi avaliada pelo instrutor.',
            '• O nível representa o grau de domínio da competência pelo aluno.',
            '• Recomenda-se foco especial nas etapas com níveis NADA e BÁSICO.',
            '• Este documento serve como base para planejamento de treinamentos futuros.'
        ];
        
        observacoes.forEach(obs => {
            const linhas = doc.splitTextToSize(obs, 170);
            linhas.forEach(linha => {
                doc.text(linha, 20, yPosition);
                yPosition += 5;
            });
            yPosition += 2;
        });
        
        // Rodapé em todas as páginas
        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setTextColor(100, 100, 100);
            doc.setFontSize(8);
            doc.text(`Página ${i} de ${pageCount}`, 20, 290);
            doc.text(`Gerado em ${new Date().toLocaleString('pt-BR')}`, 120, 290);
            doc.text('SENAI Petrópolis - Olimpíadas do Conhecimento', 20, 285);
        }
        
        // Salvar PDF
        const fileName = `Avaliacao_${estadoApp.alunoAtual.nome.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.pdf`;
        doc.save(fileName);
        
        alert('Relatório PDF gerado com sucesso!\n✓ Gráfico posicionado no início\n✓ Etapas organizadas em tabelas\n✓ Legendas e observações incluídas\n✓ Problemas de encoding corrigidos\n✓ Cor AVANÇADO alterada para verde');
        
    } catch (error) {
        console.error('Error generating PDF:', error);
        alert('Erro ao gerar PDF. Verifique se a biblioteca jsPDF foi carregada.\nDetalhes: ' + error.message);
    }
}

// ============================================================
// FUNÇÕES AUXILIARES
// ============================================================

function resetarCadastro() {
    if (confirm('Tem certeza que deseja alterar os dados do aluno? Todas as avaliações serão perdidas.')) {
        estadoApp.alunoAtual = null;
        estadoApp.avaliacoes = {};
        
        document.getElementById('cadastro-section').style.display = 'block';
        document.getElementById('avaliacao-section').style.display = 'none';
        
        // Limpar formulário
        document.getElementById('nome-aluno').value = '';
        document.getElementById('modalidade-aluno').value = '';
        
        salvarEstado();
    }
}

function limparAvaliacao() {
    if (confirm('Tem certeza que deseja limpar todas as avaliações?')) {
        estadoApp.avaliacoes = {};
        salvarEstado();
        carregarEtapas();
        atualizarResumoProgresso();
        atualizarGrafico();
    }
}

function atualizarEstatisticas() {
    // Atualizar total de alunos (sempre 1 se houver aluno cadastrado)
    const totalAlunos = estadoApp.alunoAtual ? 1 : 0;
    const elementoTotalAlunos = document.getElementById('total-alunos');
    if (elementoTotalAlunos) {
        elementoTotalAlunos.textContent = totalAlunos;
    }
}

// ============================================================
// CRONOGRAMA
// ============================================================

function inicializarCronograma() {
    const cronogramaTabs = document.querySelectorAll('.cronograma-tab');
    cronogramaTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            const dia = parseInt(e.target.getAttribute('data-dia'));
            
            // Atualizar tabs ativos
            cronogramaTabs.forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');
            
            // Mostrar cronograma do dia
            mostrarCronograma(dia);
        });
    });
    
    // Mostrar dia 1 por padrão
    mostrarCronograma(1);
}

function mostrarCronograma(dia) {
    const container = document.getElementById('cronograma-content');
    const atividades = cronogramaDias[dia] || [];
    
    let html = '<div class="cronograma-content">';
    
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
    
    html += '</div>';
    container.innerHTML = html;
}

// ============================================================
// PROCEDIMENTOS
// ============================================================

function inicializarProcedimentosPadrao() {
    // Procedimentos padrão da modalidade 18
    if (estadoApp.procedimentos['18'].length === 0) {
        estadoApp.procedimentos['18'] = [
            {
                id: 'proc18_1',
                numero: 'PEX N° 01',
                titulo: 'INSTALAÇÃO DE SISTEMA BÁSICO RESIDENCIAL',
                subtopicos: [
                    '1.1. Marcação e furação das caixas',
                    '1.2. Passagem de eletrodutos',
                    '1.3. Enfiação dos condutores',
                    '1.4. Conexões e ligações',
                    '1.5. Testes de continuidade'
                ],
                observacoes: 'Seguir rigorosamente as normas NBR 5410 e NBR 14136.'
            }
        ];
    }
    
    // Procedimentos padrão da modalidade 19
    if (estadoApp.procedimentos['19'].length === 0) {
        estadoApp.procedimentos['19'] = [
            {
                id: 'proc19_1',
                numero: 'PEX N° 01',
                titulo: 'PROGRAMAÇÃO BÁSICA DE CLP',
                subtopicos: [
                    '1.1. Configuração do hardware',
                    '1.2. Programação em Ladder',
                    '1.3. Teste das entradas e saídas',
                    '1.4. Simulação do processo',
                    '1.5. Download para o equipamento'
                ],
                observacoes: 'Verificar compatibilidade do software com o hardware utilizado.'
            }
        ];
    }
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
    
    container.innerHTML = '';
    procedimentos.forEach(proc => {
        const card = criarCardProcedimento(proc, modalidade);
        container.appendChild(card);
    });
}

function criarCardProcedimento(procedimento, modalidade) {
    const card = document.createElement('div');
    card.className = 'procedimento-card';
    
    const subtopicosHtml = procedimento.subtopicos.map(sub => `<li>${sub}</li>`).join('');
    const observacoesHtml = procedimento.observacoes ? 
        `<div class="observacao">
            <h6>Observações/Tolerâncias:</h6>
            <p>${procedimento.observacoes}</p>
        </div>` : '';
    
    card.innerHTML = `
        <div class="procedimento-header">
            <div class="procedimento-actions">
                <button class="procedimento-action-btn edit" onclick="editarProcedimento('${procedimento.id}', '${modalidade}')" title="Editar">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="procedimento-action-btn delete" onclick="excluirProcedimento('${procedimento.id}', '${modalidade}')" title="Excluir">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            <h4>${procedimento.numero}</h4>
            <p class="procedimento-subtitle">${procedimento.titulo}</p>
        </div>
        <div class="procedimento-body">
            <h5>Subtópicos:</h5>
            <ul class="subtopicos">${subtopicosHtml}</ul>
            ${observacoesHtml}
        </div>
    `;
    
    return card;
}

// ============================================================
// ARQUIVOS
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
    
    const arquivo = {
        nome: nome,
        link: link,
        dataAdicao: new Date().toISOString()
    };
    
    if (!estadoApp.arquivos[modalidade]) {
        estadoApp.arquivos[modalidade] = [];
    }
    
    estadoApp.arquivos[modalidade].push(arquivo);
    salvarEstado();
    
    // Limpar formulário
    form.reset();
    
    // Recarregar lista
    carregarArquivosModalidade(modalidade);
    
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
// PERSISTÊNCIA DE DADOS
// ============================================================

function salvarEstado() {
    try {
        localStorage.setItem('senai_oc_estado', JSON.stringify(estadoApp));
    } catch (error) {
        console.warn('Erro ao salvar estado:', error);
    }
}

function carregarEstado() {
    try {
        const estadoSalvo = localStorage.getItem('senai_oc_estado');
        if (estadoSalvo) {
            const estado = JSON.parse(estadoSalvo);
            estadoApp = { ...estadoApp, ...estado };
            
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

function abrirModalProcedimento(modalidade) {
    alert(`Funcionalidade de procedimentos em desenvolvimento para modalidade ${modalidade}`);
}

function editarProcedimento(id, modalidade) {
    alert(`Editar procedimento ${id} da modalidade ${modalidade}`);
}

function excluirProcedimento(id, modalidade) {
    if (confirm('Tem certeza que deseja excluir este procedimento?')) {
        const procedimentos = estadoApp.procedimentos[modalidade];
        const index = procedimentos.findIndex(p => p.id === id);
        if (index !== -1) {
            procedimentos.splice(index, 1);
            salvarEstado();
            carregarProcedimentosModalidade(modalidade);
        }
    }
}

// ============================================================
// INICIALIZAÇÃO AUTOMÁTICA
// ============================================================

// Inicialização da aplicação quando DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado, inicializando aplicação...');
    inicializarApp();
});

// Fallback para garantir inicialização
window.addEventListener('load', function() {
    console.log('Window carregada, garantindo inicialização...');
    if (typeof inicializarApp === 'function') {
        inicializarApp();
    }
});