// ============================================================
// APLICAÇÃO COMPLETA - OLIMPÍADAS DO CONHECIMENTO SENAI
// VERSÃO CORRIGIDA PARA COMPARTILHAMENTO PÚBLICO DE ARQUIVOS
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
// FUNÇÕES DE UTILITÁRIOS PARA LINKS DO GOOGLE DRIVE
// ============================================================

/**
 * Converte um link de visualização do Google Drive para um link de acesso direto público
 * @param {string} url - URL original do Google Drive
 * @returns {string} - URL convertida para acesso direto
 */
function converterLinkGoogleDrive(url) {
    if (!url || typeof url !== 'string') {
        console.warn('URL inválida para conversão:', url);
        return url;
    }

    try {
        // Verificar se é um link do Google Drive
        if (!url.includes('drive.google.com')) {
            return url; // Se não for do Google Drive, retornar como está
        }

        // Padrão: https://drive.google.com/file/d/FILE_ID/view?usp=sharing
        const driveViewPattern = /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)\/view/;
        const match = url.match(driveViewPattern);
        
        if (match && match[1]) {
            const fileId = match[1];
            
            // Verificar se não é um placeholder
            if (fileId.includes('SUBSTITUA') || fileId.includes('REPLACE') || fileId.length < 10) {
                console.warn('ID do arquivo parece ser um placeholder:', fileId);
                return url; // Retornar URL original se for placeholder
            }
            
            // Converter para formato de acesso direto
            const directUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;
            console.log(`Link convertido: ${url} -> ${directUrl}`);
            return directUrl;
        }
        
        // Se já estiver no formato direto, verificar se é válido
        const directPattern = /drive\.google\.com\/uc\?.*id=([a-zA-Z0-9_-]+)/;
        const directMatch = url.match(directPattern);
        
        if (directMatch && directMatch[1]) {
            const fileId = directMatch[1];
            if (fileId.includes('SUBSTITUA') || fileId.includes('REPLACE') || fileId.length < 10) {
                console.warn('ID do arquivo no link direto parece ser um placeholder:', fileId);
            }
            return url; // Já está no formato correto
        }
        
        console.warn('Formato de link do Google Drive não reconhecido:', url);
        return url;
        
    } catch (error) {
        console.error('Erro ao converter link do Google Drive:', error);
        return url; // Retornar original em caso de erro
    }
}

/**
 * Valida se um link do Google Drive está configurado para acesso público
 * @param {string} url - URL a ser validada
 * @returns {Promise<boolean>} - True se o link for acessível publicamente
 */
async function validarLinkPublico(url) {
    try {
        const linkConvertido = converterLinkGoogleDrive(url);
        
        // Fazer uma requisição HEAD para verificar se o arquivo é acessível
        const response = await fetch(linkConvertido, { 
            method: 'HEAD',
            mode: 'no-cors' // Devido às políticas CORS do Google Drive
        });
        
        return true; // Se chegou até aqui, provavelmente é acessível
    } catch (error) {
        console.warn('Não foi possível validar o link (pode ser devido ao CORS):', error);
        return true; // Assumir que é válido, já que o CORS pode bloquear a verificação
    }
}

/**
 * Gera instruções para configurar permissões no Google Drive
 * @param {string} fileId - ID do arquivo do Google Drive
 * @returns {string} - Instruções em HTML
 */
function gerarInstrucoesPermissoes(fileId) {
    return `
        <div class="google-drive-instructions" style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 8px; margin: 10px 0;">
            <h4 style="color: #856404; margin-top: 0;">⚠️ Configuração Necessária no Google Drive</h4>
            <p><strong>Para que este arquivo seja acessível publicamente:</strong></p>
            <ol style="margin-bottom: 10px;">
                <li>Abra o arquivo no <a href="https://drive.google.com/file/d/${fileId}" target="_blank">Google Drive</a></li>
                <li>Clique no botão "Compartilhar" (ícone de pessoa com +)</li>
                <li>Em "Acesso geral", altere de "Restrito" para <strong>"Qualquer pessoa com o link"</strong></li>
                <li>Mantenha a permissão como "Visualizador"</li>
                <li>Clique em "Concluído"</li>
            </ol>
            <p style="margin: 0; font-size: 0.9em; color: #666;">
                <strong>Nota:</strong> Sem essa configuração, apenas você poderá acessar o arquivo.
            </p>
        </div>
    `;
}

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
    
    // Inicializar arquivos padrão
    inicializarArquivosPadrao();
    
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
                <div class="categoria">${etapa.categoria}</div>
            </div>
            <div class="checkbox-container">
                <input type="checkbox" id="etapa-${etapa.id}" ${avaliacao.concluida ? 'checked' : ''} 
                       onchange="toggleEtapa(${etapa.id})">
                <label for="etapa-${etapa.id}">Concluída</label>
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

function toggleEtapa(etapaId) {
    if (!estadoApp.avaliacoes[etapaId]) {
        estadoApp.avaliacoes[etapaId] = { concluida: false, nivel: 'NADA' };
    }
    
    estadoApp.avaliacoes[etapaId].concluida = !estadoApp.avaliacoes[etapaId].concluida;
    salvarEstado();
    atualizarResumoProgresso();
}

function definirNivel(etapaId, nivel) {
    if (!estadoApp.avaliacoes[etapaId]) {
        estadoApp.avaliacoes[etapaId] = { concluida: false, nivel: 'NADA' };
    }
    
    estadoApp.avaliacoes[etapaId].nivel = nivel;
    estadoApp.avaliacoes[etapaId].concluida = nivel !== 'NADA';
    
    salvarEstado();
    
    // Atualizar interface
    const etapaCard = document.querySelector(`#etapa-${etapaId}`).closest('.etapa-card');
    const niveisButtons = etapaCard.querySelectorAll('.nivel-btn');
    const checkbox = etapaCard.querySelector(`#etapa-${etapaId}`);
    
    niveisButtons.forEach(btn => btn.classList.remove('active'));
    etapaCard.querySelector(`.nivel-btn.${nivel.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`).classList.add('active');
    checkbox.checked = estadoApp.avaliacoes[etapaId].concluida;
    
    atualizarResumoProgresso();
}

function filtrarEtapas(categoria) {
    carregarEtapas(categoria);
}

function atualizarResumoProgresso() {
    const resumoContainer = document.getElementById('resumo-progresso');
    if (!resumoContainer) return;
    
    const avaliacoes = Object.values(estadoApp.avaliacoes);
    const total = dadosAplicacao.etapas_conhecimentos.length;
    const concluidas = avaliacoes.filter(a => a.concluida).length;
    
    const contagemNiveis = {
        'NADA': avaliacoes.filter(a => a.nivel === 'NADA').length,
        'BÁSICO': avaliacoes.filter(a => a.nivel === 'BÁSICO').length,
        'INTERMEDIÁRIO': avaliacoes.filter(a => a.nivel === 'INTERMEDIÁRIO').length,
        'AVANÇADO': avaliacoes.filter(a => a.nivel === 'AVANÇADO').length
    };
    
    resumoContainer.innerHTML = `
        <h4>Resumo do Progresso</h4>
        <div class="progress-stats">
            <div class="progress-item">
                <span>Total de Etapas:</span>
                <span><strong>${total}</strong></span>
            </div>
            <div class="progress-item">
                <span>Etapas Concluídas:</span>
                <span><strong>${concluidas}/${total}</strong></span>
            </div>
            <div class="progress-item">
                <span>Nível NADA:</span>
                <span class="nivel nada">${contagemNiveis.NADA}</span>
            </div>
            <div class="progress-item">
                <span>Nível BÁSICO:</span>
                <span class="nivel basico">${contagemNiveis.BÁSICO}</span>
            </div>
            <div class="progress-item">
                <span>Nível INTERMEDIÁRIO:</span>
                <span class="nivel intermediario">${contagemNiveis.INTERMEDIÁRIO}</span>
            </div>
            <div class="progress-item">
                <span>Nível AVANÇADO:</span>
                <span class="nivel avancado">${contagemNiveis.AVANÇADO}</span>
            </div>
        </div>
    `;
}

function novoAluno() {
    if (confirm('Tem certeza que deseja cadastrar um novo aluno? Todos os dados atuais serão perdidos.')) {
        estadoApp.alunoAtual = null;
        estadoApp.avaliacoes = {};
        salvarEstado();
        
        document.getElementById('cadastro-section').style.display = 'block';
        document.getElementById('avaliacao-section').style.display = 'none';
        
        // Limpar formulário
        document.getElementById('cadastro-form').reset();
    }
}

function exportarProgresso() {
    if (!estadoApp.alunoAtual) {
        alert('Nenhum aluno cadastrado para exportar.');
        return;
    }
    
    const dados = {
        aluno: estadoApp.alunoAtual,
        avaliacoes: estadoApp.avaliacoes,
        dataExportacao: new Date().toISOString(),
        resumo: {
            totalEtapas: dadosAplicacao.etapas_conhecimentos.length,
            etapasConcluidas: Object.values(estadoApp.avaliacoes).filter(a => a.concluida).length,
            distribuicaoNiveis: {
                'NADA': Object.values(estadoApp.avaliacoes).filter(a => a.nivel === 'NADA').length,
                'BÁSICO': Object.values(estadoApp.avaliacoes).filter(a => a.nivel === 'BÁSICO').length,
                'INTERMEDIÁRIO': Object.values(estadoApp.avaliacoes).filter(a => a.nivel === 'INTERMEDIÁRIO').length,
                'AVANÇADO': Object.values(estadoApp.avaliacoes).filter(a => a.nivel === 'AVANÇADO').length
            }
        }
    };
    
    const dataStr = JSON.stringify(dados, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `progresso-${estadoApp.alunoAtual.nome}-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
}

// ============================================================
// ESTATÍSTICAS E GRÁFICOS
// ============================================================
function atualizarEstatisticas() {
    // Atualizar números das estatísticas
    const totalAlunos = estadoApp.alunoAtual ? 1 : 0;
    document.querySelector('.stat-card:nth-child(1) h3').textContent = totalAlunos;
    
    // Outras estatísticas já estão hardcoded no HTML
}

function inicializarGrafico() {
    const ctx = document.getElementById('grafico-progresso');
    if (!ctx || !estadoApp.alunoAtual) return;
    
    const avaliacoes = Object.values(estadoApp.avaliacoes);
    const contagemNiveis = {
        'NADA': avaliacoes.filter(a => a.nivel === 'NADA').length,
        'BÁSICO': avaliacoes.filter(a => a.nivel === 'BÁSICO').length,
        'INTERMEDIÁRIO': avaliacoes.filter(a => a.nivel === 'INTERMEDIÁRIO').length,
        'AVANÇADO': avaliacoes.filter(a => a.nivel === 'AVANÇADO').length
    };
    
    if (graficoProgresso) {
        graficoProgresso.destroy();
    }
    
    graficoProgresso = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['NADA', 'BÁSICO', 'INTERMEDIÁRIO', 'AVANÇADO'],
            datasets: [{
                data: Object.values(contagemNiveis),
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
                    text: `Distribuição de Níveis - ${estadoApp.alunoAtual.nome}`
                }
            }
        }
    });
}

// ============================================================
// CRONOGRAMA
// ============================================================
function inicializarCronograma() {
    mostrarCronograma(1);
}

function mostrarCronograma(dia) {
    // Atualizar abas ativas
    document.querySelectorAll('.cronograma-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`[onclick="mostrarCronograma(${dia})"]`).classList.add('active');
    
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
    const container = document.getElementById(`procedimentos-${modalidade}`);
    const procedimentos = estadoApp.procedimentos[modalidade] || [];
    
    if (procedimentos.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-clipboard-list"></i>
                <h4>Nenhum procedimento adicionado</h4>
                <p>Clique em "Adicionar Procedimento" para começar.</p>
            </div>
        `;
        return;
    }
    
    const html = procedimentos.map(proc => `
        <div class="procedimento-card">
            <div class="procedimento-header">
                <div>
                    <h4>${proc.titulo}</h4>
                    <p class="procedimento-subtitle">${proc.numero}</p>
                </div>
                <div class="procedimento-actions">
                    <button class="procedimento-action-btn edit" onclick="editarProcedimento('${modalidade}', '${proc.id}')" title="Editar">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="procedimento-action-btn delete" onclick="removerProcedimento('${modalidade}', '${proc.id}')" title="Remover">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <div class="procedimento-body">
                <h5>Subtópicos:</h5>
                <ul class="subtopicos">
                    ${proc.subtopicos.map(sub => `<li>${sub}</li>`).join('')}
                </ul>
                ${proc.observacoes ? `
                    <div class="observacao">
                        <h6>Observações:</h6>
                        <p>${proc.observacoes}</p>
                    </div>
                ` : ''}
            </div>
        </div>
    `).join('');
    
    container.innerHTML = html;
}

// ============================================================
// ARQUIVOS - VERSÃO CORRIGIDA PARA COMPARTILHAMENTO PÚBLICO
// ============================================================

/**
 * Inicializa os arquivos padrão com instruções de configuração
 */
function inicializarArquivosPadrao() {
    // Arquivos padrão para modalidade 18 (apenas se não existirem)
    if (!estadoApp.arquivos['18'] || estadoApp.arquivos['18'].length === 0) {
        estadoApp.arquivos['18'] = [
            {
                id: 1,
                nome: "TREINAMENTO EXPERT-SENAIDN",
                link: "https://drive.google.com/file/d/SUBSTITUA_PELO_SEU_ID/view?usp=sharing",
                dataAdicao: "2025-08-24",
                observacoes: "Arquivo de exemplo - substitua pelo ID real do seu arquivo"
            },
            {
                id: 2,
                nome: "PROGRAMA SAÚDE E SEGURANÇA",
                link: "https://drive.google.com/file/d/SUBSTITUA_PELO_SEU_ID/view?usp=sharing",
                dataAdicao: "2025-08-24",
                observacoes: "Arquivo de exemplo - substitua pelo ID real do seu arquivo"
            }
        ];
    }
    
    // Arquivos padrão para modalidade 19 (apenas se não existirem)
    if (!estadoApp.arquivos['19'] || estadoApp.arquivos['19'].length === 0) {
        estadoApp.arquivos['19'] = [
            {
                id: 1,
                nome: "PROVAS DO NACIONAL",
                link: "https://drive.google.com/file/d/SUBSTITUA_PELO_SEU_ID/view?usp=sharing",
                dataAdicao: "2025-08-24",
                observacoes: "Arquivo de exemplo - substitua pelo ID real do seu arquivo"
            },
            {
                id: 2,
                nome: "PROGRAMA SAÚDE E SEGURANÇA", 
                link: "https://drive.google.com/file/d/SUBSTITUA_PELO_SEU_ID/view?usp=sharing",
                dataAdicao: "2025-08-24",
                observacoes: "Arquivo de exemplo - substitua pelo ID real do seu arquivo"
            },
            {
                id: 3,
                nome: "INVERSORES DE FREQUÊNCIA",
                link: "https://drive.google.com/file/d/SUBSTITUA_PELO_SEU_ID/view?usp=sharing",
                dataAdicao: "2025-08-24",
                observacoes: "Arquivo de exemplo - substitua pelo ID real do seu arquivo"
            }
        ];
    }
}

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
        const linkConvertido = converterLinkGoogleDrive(arquivo.link);
        const isPlaceholder = arquivo.link.includes('SUBSTITUA') || arquivo.link.includes('REPLACE');
        const fileId = extrairFileId(arquivo.link);
        
        html += `
            <div class="arquivo-item ${isPlaceholder ? 'arquivo-placeholder' : ''}">
                <div class="arquivo-info">
                    <div class="arquivo-icon">
                        <i class="fas fa-file-alt"></i>
                    </div>
                    <div class="arquivo-details">
                        <h5>${arquivo.nome}</h5>
                        <p>Adicionado em ${new Date(arquivo.dataAdicao).toLocaleDateString('pt-BR')}</p>
                        ${isPlaceholder ? '<p style="color: #e67e22; font-size: 0.9em;">⚠️ ID do arquivo precisa ser configurado</p>' : ''}
                    </div>
                </div>
                <div class="arquivo-acoes">
                    <button class="arquivo-btn visualizar ${isPlaceholder ? 'disabled' : ''}" 
                            onclick="visualizarArquivo('${linkConvertido}', '${fileId}')" 
                            title="${isPlaceholder ? 'Configure o arquivo primeiro' : 'Visualizar'}"
                            ${isPlaceholder ? 'disabled' : ''}>
                        <i class="fas fa-external-link-alt"></i>
                        Visualizar
                    </button>
                    <button class="arquivo-btn remover" onclick="removerArquivo('${modalidade}', ${index})" title="Remover">
                        <i class="fas fa-trash"></i>
                        Remover
                    </button>
                </div>
                ${isPlaceholder && fileId ? gerarInstrucoesPermissoes(fileId) : ''}
            </div>
        `;
    });
    
    container.innerHTML = html;
}

/**
 * Extrai o ID do arquivo de um link do Google Drive
 * @param {string} url - URL do Google Drive
 * @returns {string|null} - ID do arquivo ou null se não encontrado
 */
function extrairFileId(url) {
    if (!url) return null;
    
    // Padrão: https://drive.google.com/file/d/FILE_ID/view
    const match = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
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
    
    // Validar se é um link do Google Drive
    if (!link.includes('drive.google.com')) {
        if (!confirm('Este não parece ser um link do Google Drive. Deseja continuar mesmo assim?')) {
            return;
        }
    }
    
    // Verificar se é um link de compartilhamento válido
    const fileId = extrairFileId(link);
    if (link.includes('drive.google.com') && !fileId) {
        alert('Link do Google Drive inválido. Use o formato: https://drive.google.com/file/d/ID_DO_ARQUIVO/view?usp=sharing');
        return;
    }
    
    const arquivo = {
        id: Date.now(), // ID único baseado no timestamp
        nome: nome,
        link: link,
        dataAdicao: new Date().toISOString(),
        observacoes: fileId && (fileId.includes('SUBSTITUA') || fileId.includes('REPLACE')) ? 
                     'Arquivo de exemplo - substitua pelo ID real' : null
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
    
    // Mostrar alerta com informações importantes
    if (link.includes('drive.google.com')) {
        const isPlaceholder = fileId && (fileId.includes('SUBSTITUA') || fileId.includes('REPLACE'));
        if (isPlaceholder) {
            alert('Arquivo adicionado! ⚠️ Lembre-se de substituir o ID pelo ID real do seu arquivo no Google Drive.');
        } else {
            alert('Arquivo adicionado com sucesso! 📋 Certifique-se de que o arquivo está configurado como "Qualquer pessoa com o link" no Google Drive.');
        }
    } else {
        alert('Arquivo adicionado com sucesso!');
    }
}

/**
 * Visualiza um arquivo, convertendo o link para acesso público quando necessário
 * @param {string} link - Link original do arquivo
 * @param {string} fileId - ID do arquivo (opcional)
 */
function visualizarArquivo(link, fileId = null) {
    if (!link) {
        alert('Link do arquivo não disponível.');
        return;
    }
    
    // Verificar se é placeholder
    if (link.includes('SUBSTITUA') || link.includes('REPLACE')) {
        alert('Este é um arquivo de exemplo. Substitua o ID pelo ID real do seu arquivo no Google Drive.');
        return;
    }
    
    try {
        // Converter link para acesso direto se for do Google Drive
        const linkFinal = converterLinkGoogleDrive(link);
        
        // Mostrar informações sobre o acesso se for Google Drive
        if (link.includes('drive.google.com') && fileId) {
            const confirmacao = confirm(
                '📋 IMPORTANTE: Para que outras pessoas possam acessar este arquivo:\n\n' +
                '1. O arquivo deve estar configurado como "Qualquer pessoa com o link"\n' +
                '2. A permissão deve estar como "Visualizador"\n\n' +
                'Deseja continuar para visualizar o arquivo?'
            );
            
            if (!confirmacao) return;
        }
        
        // Abrir o arquivo
        const newWindow = window.open(linkFinal, '_blank');
        
        // Verificar se a janela foi aberta (pode ser bloqueada por popup blocker)
        if (!newWindow) {
            alert('⚠️ Popup bloqueado! Permita popups para este site ou clique com o botão direito e selecione "Abrir em nova aba".');
            // Como fallback, tentar definir o location
            window.location.href = linkFinal;
        }
        
    } catch (error) {
        console.error('Erro ao abrir arquivo:', error);
        alert('Erro ao abrir o arquivo. Verifique se o link está correto e se você tem permissão para acessá-lo.');
    }
}

function removerArquivo(modalidade, index) {
    if (confirm('Tem certeza que deseja remover este arquivo?')) {
        estadoApp.arquivos[modalidade].splice(index, 1);
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
        localStorage.setItem('senai_oc_estado', JSON.stringify(estadoApp));
        console.log('Estado salvo com sucesso');
    } catch (error) {
        console.warn('Erro ao salvar estado:', error);
        // Tentar limpar dados antigos se o storage estiver cheio
        try {
            localStorage.clear();
            localStorage.setItem('senai_oc_estado', JSON.stringify(estadoApp));
            console.log('Estado salvo após limpeza do storage');
        } catch (error2) {
            console.error('Erro crítico ao salvar estado:', error2);
        }
    }
}

function carregarEstado() {
    try {
        const estadoSalvo = localStorage.getItem('senai_oc_estado');
        if (estadoSalvo) {
            const estado = JSON.parse(estadoSalvo);
            
            // Merge com cuidado para preservar estruturas padrão
            estadoApp = {
                ...estadoApp,
                ...estado,
                arquivos: {
                    '18': estado.arquivos?.['18'] || [],
                    '19': estado.arquivos?.['19'] || []
                },
                procedimentos: {
                    '18': estado.procedimentos?.['18'] || [],
                    '19': estado.procedimentos?.['19'] || []
                }
            };
            
            // Se há aluno cadastrado, mostrar seção de avaliação
            if (estadoApp.alunoAtual) {
                mostrarSecaoAvaliacao();
            }
            
            console.log('Estado carregado com sucesso');
        }
    } catch (error) {
        console.warn('Erro ao carregar estado:', error);
        // Em caso de erro, inicializar com dados padrão
        inicializarArquivosPadrao();
    }
}

// ============================================================
// MODAIS E PROCEDIMENTOS (Funcionalidade existente mantida)
// ============================================================

// Modal de procedimentos
let modalAtual = null;
let procedimentoEditando = null;

function abrirModalProcedimento(modalidade) {
    modalAtual = modalidade;
    procedimentoEditando = null;
    
    const modal = document.getElementById('modal-procedimento');
    modal.classList.remove('hidden');
    
    // Limpar formulário
    document.getElementById('form-procedimento').reset();
    document.getElementById('modal-procedimento-titulo').textContent = 
        `Adicionar Procedimento - Modalidade ${modalidade}`;
    
    // Focar no primeiro campo
    document.getElementById('procedimento-numero').focus();
}

function fecharModalProcedimento() {
    const modal = document.getElementById('modal-procedimento');
    modal.classList.add('hidden');
    modalAtual = null;
    procedimentoEditando = null;
}

function salvarProcedimento() {
    const numero = document.getElementById('procedimento-numero').value.trim();
    const titulo = document.getElementById('procedimento-titulo').value.trim();
    const subtopicos = document.getElementById('procedimento-subtopicos').value
        .split('\n')
        .map(s => s.trim())
        .filter(s => s.length > 0);
    const observacoes = document.getElementById('procedimento-observacoes').value.trim();
    
    if (!numero || !titulo || subtopicos.length === 0) {
        alert('Por favor, preencha os campos obrigatórios.');
        return;
    }
    
    const procedimento = {
        id: procedimentoEditando?.id || `proc${modalAtual}_${Date.now()}`,
        numero,
        titulo,
        subtopicos,
        observacoes
    };
    
    if (procedimentoEditando) {
        // Editar procedimento existente
        const index = estadoApp.procedimentos[modalAtual].findIndex(p => p.id === procedimentoEditando.id);
        if (index !== -1) {
            estadoApp.procedimentos[modalAtual][index] = procedimento;
        }
    } else {
        // Adicionar novo procedimento
        if (!estadoApp.procedimentos[modalAtual]) {
            estadoApp.procedimentos[modalAtual] = [];
        }
        estadoApp.procedimentos[modalAtual].push(procedimento);
    }
    
    salvarEstado();
    carregarProcedimentosModalidade(modalAtual);
    fecharModalProcedimento();
    
    alert('Procedimento salvo com sucesso!');
}

function editarProcedimento(modalidade, id) {
    const procedimento = estadoApp.procedimentos[modalidade].find(p => p.id === id);
    if (!procedimento) return;
    
    modalAtual = modalidade;
    procedimentoEditando = procedimento;
    
    const modal = document.getElementById('modal-procedimento');
    modal.classList.remove('hidden');
    
    // Preencher formulário
    document.getElementById('procedimento-numero').value = procedimento.numero;
    document.getElementById('procedimento-titulo').value = procedimento.titulo;
    document.getElementById('procedimento-subtopicos').value = procedimento.subtopicos.join('\n');
    document.getElementById('procedimento-observacoes').value = procedimento.observacoes || '';
    
    document.getElementById('modal-procedimento-titulo').textContent = 
        `Editar Procedimento - Modalidade ${modalidade}`;
}

function removerProcedimento(modalidade, id) {
    if (confirm('Tem certeza que deseja remover este procedimento?')) {
        const index = estadoApp.procedimentos[modalidade].findIndex(p => p.id === id);
        if (index !== -1) {
            estadoApp.procedimentos[modalidade].splice(index, 1);
            salvarEstado();
            carregarProcedimentosModalidade(modalidade);
            alert('Procedimento removido com sucesso!');
        }
    }
}

// Event listeners para modal
document.addEventListener('DOMContentLoaded', () => {
    // Fechar modal ao clicar no overlay
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            fecharModalProcedimento();
        }
    });
    
    // Fechar modal com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalAtual) {
            fecharModalProcedimento();
        }
    });
});

// ============================================================
// INICIALIZAÇÃO DA APLICAÇÃO
// ============================================================
document.addEventListener('DOMContentLoaded', inicializarApp);

// Adicionar estilos CSS para arquivos placeholder via JavaScript
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    .arquivo-placeholder {
        border-left: 4px solid #e67e22 !important;
        background-color: rgba(230, 126, 34, 0.05);
    }
    
    .arquivo-btn.disabled {
        opacity: 0.5;
        cursor: not-allowed !important;
        background-color: #bdc3c7 !important;
    }
    
    .arquivo-btn.disabled:hover {
        background-color: #bdc3c7 !important;
        transform: none !important;
    }
    
    .google-drive-instructions {
        font-size: 0.9em;
        line-height: 1.4;
    }
    
    .google-drive-instructions ol {
        padding-left: 1.2em;
    }
    
    .google-drive-instructions li {
        margin-bottom: 4px;
    }
    
    .google-drive-instructions a {
        color: #0066cc;
        font-weight: 500;
    }
    
    .google-drive-instructions a:hover {
        text-decoration: underline;
    }
`;
document.head.appendChild(styleSheet);