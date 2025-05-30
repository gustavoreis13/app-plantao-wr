// --- Variáveis Globais de Estado e Dados ---
let registrosDaSessao = [];
let editandoRegistroIndex = null;
let revisaoIniciada = false;
let plantonistaConfirmado = false; 

// --- Lógica de Data/Hora ---
const currentDatetimeElement = document.getElementById('current-datetime');
let lastFetchedTime = null;
function formatDateTime(dateObj) { 
    if (!dateObj || !(dateObj instanceof Date)) { return "Data inválida"; }
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    const seconds = String(dateObj.getSeconds()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}
async function fetchTimeFromAPI() { 
    try {
        const response = await fetch('http://worldtimeapi.org/api/timezone/America/Sao_Paulo');
        if (!response.ok) { throw new Error(`API Error: ${response.status} ${response.statusText}`);}
        const data = await response.json();
        lastFetchedTime = new Date(data.datetime);
    } catch (error) {
        console.error("Falha ao buscar hora da API:", error);
        if (!lastFetchedTime) { lastFetchedTime = new Date(); } 
    }
    updateLiveClockDisplay();
}
let clockInterval;
function updateLiveClockDisplay() { 
    if (clockInterval) clearInterval(clockInterval);
    clockInterval = setInterval(() => {
        const now = new Date();
        let statusMessage = "(Local)";
        if (lastFetchedTime) {
            const diffSeconds = Math.abs((now.getTime() - lastFetchedTime.getTime()) / 1000);
            if (diffSeconds < (10 * 60) + 30) { statusMessage = `(Sincronizado com API)`;} 
            else { statusMessage = `(API Desatualizada - Usando Local)`;}
        }
        if (currentDatetimeElement) { currentDatetimeElement.textContent = `${formatDateTime(now)} ${statusMessage}`; }
    }, 1000);
}
fetchTimeFromAPI().then(() => {}); 
setInterval(fetchTimeFromAPI, 10 * 60 * 1000); 

// --- Dados da Aplicação ---
const verificadores = ["Filipe", "Gustavo", "Josemar", "Rafael"];

const condominios = [
  { 
    id: "condo_01", nome: "PENÍNSULA", 
    acessos: [{ descricao: "Acesso Principal", tipo: "rdp", valor: "Peninsula.Dyndns.org" }], 
    itens_checklist: [
        { id_item: "item_01_01", descricao: "CFTV", total_unidades: 94 },
        { id_item: "item_01_02", descricao: "Controle de Acesso", total_unidades: 9 },
        { id_item: "item_01_03", descricao: "Status Geral dos Portões", total_unidades: 8 }, // ATUALIZADO
        { id_item: "item_01_04", descricao: "Cerca Elétrica", total_unidades: 6 },         // ATUALIZADO (Nome e Total)
        { id_item: "item_01_05", descricao: "Dispositivos I/O", total_unidades: 3 }       // ATUALIZADO (Nome e Total)
    ]},
  { 
    id: "condo_02", nome: "RETIRO", // Mapeado de "Retiro das Pedras"
    acessos: [ 
        { descricao: "DVR Portaria", tipo: "link", valor: "http://d4440c4f88cb.sn.mynetname.net:4003/doc/page/login.asp?_1748527071816" }, 
        { descricao: "DVR Cozinha", tipo: "link", valor: "http://d4440c4f88cb.sn.mynetname.net:3703/doc/page/login.asp" }, 
        { descricao: "DVR Avançado", tipo: "link", valor: "http://d4440c4f88cb.sn.mynetname.net:5003/doc/page/login.asp?_1748526886632" }, 
        { descricao: "NVD Lado Esquerdo", tipo: "link", valor: "http://d4440c4f88cb.sn.mynetname.net:3401/doc/page/login.asp?_1748526934503" }, 
        { descricao: "NVD Lado Direito", tipo: "link", valor: "http://d4440c4f88cb.sn.mynetname.net:3303/doc/page/login.asp?_1748526962748" }, 
        { descricao: "NVD Área Central", tipo: "link", valor: "http://d4440c4f88cb.sn.mynetname.net:3203/doc/page/login.asp?_1748527000132" }, 
        { descricao: "NVD Estradinha", tipo: "link", valor: "http://d4440c4f88cb.sn.mynetname.net:13101/" } 
    ], 
    itens_checklist: [
        { id_item: "item_02_01", descricao: "NVR ESTRADINHA", total_unidades: 8 },
        { id_item: "item_02_02", descricao: "DVR Portaria", total_unidades: 16 },
        { id_item: "item_02_03", descricao: "DVR Avançado", total_unidades: 10 },
        { id_item: "item_02_04", descricao: "DVR Cozinha", total_unidades: 3 },
        { id_item: "item_02_05", descricao: "NVD AREA CENTRAL", total_unidades: 14 },
        { id_item: "item_02_06", descricao: "NVD LADO DIREITO", total_unidades: 16 },
        { id_item: "item_02_07", descricao: "NVD LADO ESQUERDO", total_unidades: 13 },
        // Catracas e entradas/saídas removidas conforme solicitado
        { id_item: "item_02_12", descricao: "Cancelas e Portões", total_unidades: 4 }, // NOVO
        { id_item: "item_02_13", descricao: "Faciais", total_unidades: 5 }             // NOVO
    ]},
  { 
    id: "condo_03", nome: "MANÁCAS", 
    acessos: [{ descricao: "AnyDesk ID", tipo: "anydesk", valor: "102374483" }], 
    itens_checklist: [
        { id_item: "item_03_01", descricao: "DVR Portaria P3", total_unidades: 15 },
        { id_item: "item_03_02", descricao: "NVD Perímetro", total_unidades: 11 },
        { id_item: "item_03_03", descricao: "NVD P3+ Speed", total_unidades: 16 },
        { id_item: "item_03_04", descricao: "C.A", total_unidades: 7 },
        { id_item: "item_03_05", descricao: "Cancelas", total_unidades: 2 } // NOVO
    ]},
  { 
    id: "condo_04", nome: "CDM ABC JF", 
    acessos: [{ descricao: "AnyDesk ID", tipo: "anydesk", valor: "909537479" }], 
    itens_checklist: [
        { id_item: "item_04_01", descricao: "CFTV", total_unidades: 254 },
        { id_item: "item_04_02", descricao: "Controle de Acesso", total_unidades: 2 }, // NOVO
        { id_item: "item_04_03", descricao: "Cancelas", total_unidades: 3 },           // NOVO
        { id_item: "item_04_04", descricao: "Computadores (SRV, Monitoramento e C.A)", total_unidades: 6 } // NOVO
    ]},
  { 
    id: "condo_05", nome: "BOUGAINVILLE", 
    acessos: [{ descricao: "TeamViewer ID", tipo: "teamviewer", valor: "678956493" }], 
    itens_checklist: [
        { id_item: "item_05_01", descricao: "NVD 223", total_unidades: 5 },
        { id_item: "item_05_02", descricao: "NVD 252", total_unidades: 31 },
        { id_item: "item_05_03", descricao: "NVD 254", total_unidades: 30 }
    ]},
  { 
    id: "condo_06", nome: "FAZENDA SANTA RITA (MARIA PIA)", 
    acessos: [{ descricao: "AnyDesk ID", tipo: "anydesk", valor: "155935785" }], 
    itens_checklist: [
        { id_item: "item_06_01", descricao: "NVD 1", total_unidades: 21 }
    ]},
  { 
    id: "condo_07", nome: "EPAMIG SEDE BH", 
    acessos: [ { descricao: "CIP 850", tipo: "link", valor: "http://201.17.134.15/" }, { descricao: "Situator", tipo: "link", valor: "http://177.69.38.5:10002/app/login" }, { descricao: "D-guard", tipo: "link", valor: "http://177.69.38.5:10000/#!/login" } ], 
    itens_checklist: [
        { id_item: "item_07_01", descricao: "CFTV", total_unidades: 24 },
        { id_item: "item_07_02", descricao: "C.A", total_unidades: 6 },
        { id_item: "item_07_03", descricao: "Computadores (SRV, Monitoramento e C.A)", total_unidades: 4 }, // NOVO
        { id_item: "item_07_04", descricao: "Atendedor", total_unidades: 3 },                               // NOVO
        { id_item: "item_07_05", descricao: "Situator", total_unidades: 1 }                                // NOVO
    ]},
  { 
    id: "condo_08", nome: "EPAMIG SANTA RITA", 
    acessos: [ { descricao: "NVD 1", tipo: "link", valor: "http://177.129.185.181:10005/" }, { descricao: "XPE 3200 FACE (1)", tipo: "link", valor: "http://177.129.185.181:10007/fcgi/do?id=1" }, { descricao: "XPE 3200 FACE (2)", tipo: "link", valor: "http://177.129.185.181:10008/fcgi/do?id=1" }, { descricao: "TVIP 3000", tipo: "link", valor: "http://177.129.185.181:10012/fcgi/do?id=1" } ], 
    itens_checklist: [
        { id_item: "item_08_01", descricao: "CFTV", total_unidades: 16 },
        { id_item: "item_08_02", descricao: "C.A", total_unidades: 2 },
        { id_item: "item_08_03", descricao: "Cancela", total_unidades: 1 } // NOVO
    ]},
  { 
    id: "condo_09", nome: "EPAMIG UBERABA", 
    acessos: [ { descricao: "NVD 1", tipo: "link", valor: "http://177.69.91.189:10001/" }, { descricao: "XPE 3101", tipo: "link", valor: "http://177.69.91.189:10007/fcgi/do?id=1" } ], 
    itens_checklist: [
        { id_item: "item_09_01", descricao: "CFTV", total_unidades: 22 },
        { id_item: "item_09_02", descricao: "C.A", total_unidades: 2 }
    ]},
  { 
    id: "condo_10", nome: "EPAMIG PATROCÍNIO", 
    acessos: [ { descricao: "NVD 1", tipo: "link", valor: "http://177.85.2.154:10003/" }, { descricao: "XPE 3101", tipo: "link", valor: "http://177.85.2.154:7503/fcgi/do?id=1" } ], 
    itens_checklist: [
        { id_item: "item_10_01", descricao: "CFTV", total_unidades: 14 },
        { id_item: "item_10_02", descricao: "Controle de acesso", total_unidades: 2 } // NOVO
    ]},
  { 
    id: "condo_11", nome: "EPAMIG PATOS DE MINAS", 
    acessos: [{ descricao: "NVD 1", tipo: "link", valor: "http://45.188.42.2:10000/" }], 
    itens_checklist: [
        { id_item: "item_11_01", descricao: "CFTV", total_unidades: 10 }
    ]},
  { 
    id: "condo_12", nome: "EPAMIG JUIZ DE FORA", // Mapeado de "EPAMIG JF ILCT"
    acessos: [ { descricao: "NVD 1", tipo: "link", valor: "http://45.169.51.102:10003/" }, { descricao: "NVD 2", tipo: "link", valor: "http://45.169.51.102:10006/" }, { descricao: "Situator", tipo: "link", valor: "http://45.169.51.102:10000/app/login" } ], 
    itens_checklist: [
        { id_item: "item_12_01", descricao: "CFTV", total_unidades: 50 },
        { id_item: "item_12_02", descricao: "Situator", total_unidades: 1 },
        { id_item: "item_12_03", descricao: "Catraca", total_unidades: 2 },
        { id_item: "item_12_04", descricao: "Cancela", total_unidades: 1 },
        { id_item: "item_12_05", descricao: "Computadores (SRV, Monitoramento e C.A)", total_unidades: 2 } // NOVO
    ]},
  { 
    id: "condo_13", nome: "EPAMIG PITANGUI ITAP", // Mapeado de "Pitangui"
    acessos: [ { descricao: "NVD 1", tipo: "link", valor: "http://179.109.160.11:10003/" }, { descricao: "NVD 2", tipo: "link", valor: "http://179.109.160.11:10006/" }, { descricao: "NVD 3", tipo: "link", valor: "http://179.109.160.11:10009/" }, { descricao: "Situator", tipo: "link", valor: "http://179.109.160.11:10000/app/login" } ], 
    itens_checklist: [
        { id_item: "item_13_01", descricao: "Controle de Acesso", total_unidades: 4 }, // ATUALIZADO (Nome)
        { id_item: "item_13_02", descricao: "NVD 01", total_unidades: 29 },
        { id_item: "item_13_03", descricao: "NVD 02", total_unidades: 31 },
        { id_item: "item_13_04", descricao: "NVD 03", total_unidades: 15 },
        { id_item: "item_13_05", descricao: "Faciais + Catracas (dois faciais por catraca)", total_unidades: 4 }, // NOVO
        { id_item: "item_13_06", descricao: "Computadores (SRV, Monitoramento e C.A)", total_unidades: 2 }  // NOVO
    ]},
  { 
    id: "condo_14", nome: "VALE DO OURO", 
    acessos: [ { descricao: "DVR 1", tipo: "link", valor: "http://179.106.100.102:10002/" }, { descricao: "DVR 2", tipo: "link", valor: "http://179.106.100.102:10005/" }, { descricao: "DVR 3", tipo: "link", valor: "http://179.106.100.102:10008/" }, { descricao: "DVR 4", tipo: "link", valor: "http://179.106.100.102:10011/" } ], 
    itens_checklist: [
        { id_item: "item_14_01", descricao: "NVD 01", total_unidades: 20 },
        { id_item: "item_14_02", descricao: "NVD 02", total_unidades: 23 },
        { id_item: "item_14_03", descricao: "NVD 03", total_unidades: 21 },
        { id_item: "item_14_04", descricao: "NVD 04", total_unidades: 14 },
        { id_item: "item_14_05", descricao: "Vídeo Porteiro", total_unidades: 3 } // NOVO
    ]},
  { 
    id: "condo_15", nome: "ECO CASA BRANCA", 
    acessos: [ { descricao: "SIMNEXT NVD 1", tipo: "simnext_id", valor: "G05G2700119GN" }, { descricao: "SIMNEXT NVD 2", tipo: "simnext_id", valor: "G05I4200024DJ" }, { descricao: "SIMNEXT DVR 1", tipo: "simnext_id", valor: "8J9L0400122P5" } ], 
    itens_checklist: [
        { id_item: "item_15_01", descricao: "NVD 01", total_unidades: 22 },
        { id_item: "item_15_02", descricao: "NVD 02", total_unidades: 24 },
        { id_item: "item_15_03", descricao: "DVC CLUBE", total_unidades: 22 }
    ]},
  { 
    id: "condo_16", nome: "QUINTAS DE CASA BRANCA", 
    acessos: [ 
        { descricao: "AnyDesk (Alternativa)", tipo: "anydesk", valor: "1684437935" },
        { descricao: "DVR 1 (Externo)", tipo: "link", valor: "wrqcb.dyndns.org:1003" }, 
        { descricao: "DVR 1 (Interno)", tipo: "info_copiar", valor: "192.168.1.10" },
        { descricao: "DVR 2 (Externo)", tipo: "link", valor: "wrqcb.dyndns.org:1103" }, 
        { descricao: "DVR 2 (Interno)", tipo: "info_copiar", valor: "192.168.1.11" }
    ], 
    itens_checklist: [ // ATUALIZADO
        { id_item: "item_16_01", descricao: "CFTV", total_unidades: 47 },
        { id_item: "item_16_02", descricao: "Controle de acesso", total_unidades: 10 },
        { id_item: "item_16_03", descricao: "Cancela", total_unidades: 3 },
        { id_item: "item_16_04", descricao: "Vídeo Porteiro", total_unidades: 4 },
        { id_item: "item_16_05", descricao: "Computadores (SRV, Monitoramento e C.A)", total_unidades: 2 }
    ]}
];

// --- Lógica Principal da Aplicação ---
document.addEventListener('DOMContentLoaded', () => {
    // --- Referências aos Elementos DOM ---
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) { currentYearSpan.textContent = new Date().getFullYear(); }

    const plantonistaSelect = document.getElementById('plantonista');
    const condominioSelect = document.getElementById('condominio');
    const checklistContainer = document.getElementById('itens-checklist-container');
    const condominioLinkWrapper = document.getElementById('condominio-link-wrapper'); 
    const btnAcaoPrincipal = document.getElementById('btn-acao-principal');
    const btnRevisarRegistros = document.getElementById('btn-revisar-registros');
    const btnFinalizarSessao = document.getElementById('btn-finalizar-sessao'); 
    const btnExportarPdfHtml = document.getElementById('btn-exportar-pdf'); 
    const notificationToast = document.getElementById('notification-toast');
    const toastMessage = document.getElementById('toast-message');
    const areaEntradaDados = document.getElementById('area-entrada-dados');
    const areaRevisao = document.getElementById('area-revisao');
    const registrosParaRevisaoContainer = document.getElementById('registros-para-revisao-container');

    let toastTimeout;
    function showToast(message, type = 'info', duration = 3000) { 
        if (!notificationToast || !toastMessage) return;
        clearTimeout(toastTimeout); 
        toastMessage.textContent = message;
        notificationToast.className = 'toast'; 
        notificationToast.classList.add(type); 
        notificationToast.classList.remove('hidden');
        toastTimeout = setTimeout(() => {
            notificationToast.classList.add('hidden');
        }, duration);
    }
    
    function atualizarEstadoBotoesEInterface() {
        if (!btnAcaoPrincipal || !btnRevisarRegistros || !btnFinalizarSessao || !btnExportarPdfHtml || !areaEntradaDados || !areaRevisao) {
            return;
        }
        const haRegistros = registrosDaSessao.length > 0;
        const todosOsCondominiosPreenchidos = haRegistros && (registrosDaSessao.length === condominios.filter(c => c.itens_checklist && c.itens_checklist.length > 0).length); // Considera apenas condomínios que têm checklist

        if (plantonistaSelect) {
            plantonistaSelect.disabled = plantonistaConfirmado || editandoRegistroIndex !== null;
        }
        if(condominioSelect) {
            condominioSelect.disabled = !plantonistaConfirmado || editandoRegistroIndex !== null;
        }
        
        btnExportarPdfHtml.classList.add('hidden'); 

        if (editandoRegistroIndex !== null) { 
            btnAcaoPrincipal.textContent = 'Salvar Alterações';
            btnAcaoPrincipal.classList.remove('hidden');
            btnRevisarRegistros.textContent = 'Cancelar Edição';
            btnRevisarRegistros.classList.remove('hidden'); 
            btnFinalizarSessao.classList.add('hidden'); 
            areaEntradaDados.classList.remove('hidden');
            areaRevisao.classList.add('hidden');
        } else if (revisaoIniciada) { 
            btnAcaoPrincipal.classList.add('hidden'); 
            btnRevisarRegistros.textContent = 'Voltar à Entrada de Dados'; 
            btnRevisarRegistros.classList.remove('hidden'); 
            
            btnFinalizarSessao.disabled = !todosOsCondominiosPreenchidos; 
            if (todosOsCondominiosPreenchidos && !btnFinalizarSessao.disabled) { 
                btnFinalizarSessao.classList.add('finalizar-ativo'); 
            } else {
                btnFinalizarSessao.classList.remove('finalizar-ativo');
            }
            btnFinalizarSessao.classList.remove('hidden'); 

            areaEntradaDados.classList.add('hidden');
            areaRevisao.classList.remove('hidden');
        } else { 
            btnAcaoPrincipal.textContent = 'Adicionar à Revisão';
            btnAcaoPrincipal.classList.remove('hidden');
            btnRevisarRegistros.textContent = 'Revisar Registros';
            btnRevisarRegistros.classList.remove('hidden'); 
            btnFinalizarSessao.disabled = true; 
            btnFinalizarSessao.classList.remove('finalizar-ativo'); 
            btnFinalizarSessao.classList.remove('hidden'); 
            areaEntradaDados.classList.remove('hidden');
            areaRevisao.classList.add('hidden');
        }
        if (btnRevisarRegistros) {
             btnRevisarRegistros.disabled = !haRegistros && editandoRegistroIndex === null;
        }
    }

    if (plantonistaSelect) {
        verificadores.forEach(nomePlantonista => {
            const option = document.createElement('option');
            option.value = nomePlantonista;
            option.textContent = nomePlantonista;
            plantonistaSelect.appendChild(option);
        });
        plantonistaSelect.addEventListener('change', function() { 
            if (this.value && !plantonistaConfirmado) {
                setTimeout(() => {
                    const confirmado = confirm(`Você confirma que é o Plantonista: ${this.value}?`);
                    if (confirmado) {
                        plantonistaConfirmado = true;
                        if (condominioSelect) condominioSelect.disabled = false; 
                        showToast(`Plantonista ${this.value} confirmado.`, 'info');
                    } else {
                        this.value = ''; 
                        plantonistaConfirmado = false;
                        if (condominioSelect) condominioSelect.disabled = true;
                    }
                    atualizarEstadoBotoesEInterface();
                }, 0);
            } else if (!this.value) { 
                 plantonistaConfirmado = false;
                 if(condominioSelect) condominioSelect.disabled = true;
                 atualizarEstadoBotoesEInterface();
            }
        });
    } else {
        console.error("Elemento select 'plantonista' não encontrado no DOM.");
    }

    function popularCondominiosDropdown(idCondominioParaSelecionar = null) {
        if (!condominioSelect) { return; }
        const valorSelecionadoAnteriormente = idCondominioParaSelecionar || condominioSelect.value;
        
        while (condominioSelect.options.length > 1) { condominioSelect.remove(1); }

        condominios.forEach(condominio => {
            const option = document.createElement('option');
            option.value = condominio.id;
            option.textContent = condominio.nome;
            if (editandoRegistroIndex === null && registrosDaSessao.some(reg => reg.condominio_id === condominio.id)) {
                option.disabled = true;
                option.textContent += " (Concluído)";
            } else if (editandoRegistroIndex !== null && registrosDaSessao[editandoRegistroIndex] && registrosDaSessao[editandoRegistroIndex].condominio_id === condominio.id) {
                option.disabled = false; 
            }
            condominioSelect.appendChild(option);
        });
        
        if (valorSelecionadoAnteriormente) {
            condominioSelect.value = valorSelecionadoAnteriormente;
            const optSelecionada = condominioSelect.options[condominioSelect.selectedIndex];
            if (editandoRegistroIndex === null && optSelecionada && optSelecionada.disabled && optSelecionada.value !== "") {
                condominioSelect.value = "";
            }
        } else {
            condominioSelect.value = ""; 
        }
    }
    
    if (condominioSelect) {
        popularCondominiosDropdown(); 
        condominioSelect.addEventListener('change', function() { 
            const selectedCondominioId = this.value;
            if (checklistContainer) { 
                const errorFields = checklistContainer.querySelectorAll('.input-error');
                errorFields.forEach(field => field.classList.remove('input-error'));
            }

            if (condominioLinkWrapper) {
                condominioLinkWrapper.innerHTML = ''; 
                condominioLinkWrapper.classList.add('hidden');

                if (selectedCondominioId) {
                    const condominioSelecionado = condominios.find(condo => condo.id === selectedCondominioId);
                    if (condominioSelecionado && condominioSelecionado.acessos && condominioSelecionado.acessos.length > 0) {
                        const accessListContainer = document.createElement('div');
                        accessListContainer.classList.add('access-list-container');

                        condominioSelecionado.acessos.forEach(acesso => {
                            const p = document.createElement('p');
                            p.classList.add('access-item');
                            
                            const descSpan = document.createElement('span');
                            descSpan.classList.add('access-description');
                            descSpan.textContent = acesso.descricao ? `${acesso.descricao}: ` : 'Acesso: ';
                            p.appendChild(descSpan);

                            if (acesso.tipo === "link") {
                                const link = document.createElement('a');
                                let url = acesso.valor;
                                if (url && !url.toLowerCase().startsWith('http://') && !url.toLowerCase().startsWith('https://')) {
                                    url = 'http://' + url; 
                                }
                                link.href = url;
                                link.textContent = acesso.valor; 
                                link.target = "_blank"; 
                                p.appendChild(link);
                            } else if (["rdp", "teamviewer", "anydesk", "simnext_id", "info_copiar"].includes(acesso.tipo)) {
                                const valueSpan = document.createElement('span');
                                valueSpan.textContent = acesso.valor;
                                valueSpan.classList.add('copyable-text'); 
                                p.appendChild(valueSpan);

                                const copyButton = document.createElement('button');
                                copyButton.textContent = 'Copiar';
                                copyButton.classList.add('btn-copiar-info');
                                copyButton.type = 'button';
                                copyButton.addEventListener('click', () => {
                                    navigator.clipboard.writeText(acesso.valor).then(() => {
                                        showToast(`'${acesso.valor}' copiado!`, 'success');
                                    }).catch(err => {
                                        console.error('Falha ao copiar: ', err);
                                        showToast('Falha ao copiar. Verifique permissões ou copie manualmente.', 'error');
                                    });
                                });
                                p.appendChild(copyButton);
                            } else { 
                                p.appendChild(document.createTextNode(acesso.valor));
                            }
                            accessListContainer.appendChild(p);
                        });
                        condominioLinkWrapper.appendChild(accessListContainer);
                        condominioLinkWrapper.classList.remove('hidden');
                    }
                }
            }

            if (selectedCondominioId) {
                const condominioSelecionado = condominios.find(condo => condo.id === selectedCondominioId);
                renderChecklist(condominioSelecionado);
            } else {
                renderChecklist(null); 
                if(condominioLinkWrapper) condominioLinkWrapper.classList.add('hidden');
            }
        });
    } else {
        console.error("Elemento select 'condominio' não encontrado no DOM.");
    }
    
    function renderChecklist(condominio, dadosParaPreencher = null) { 
        if (!checklistContainer) { return; }
        checklistContainer.innerHTML = '';
        if (!condominio || !condominio.itens_checklist || condominio.itens_checklist.length === 0) {
            checklistContainer.innerHTML = '<p>Selecione um condomínio para ver o checklist ou este condomínio não possui itens.</p>';
            return;
        }
        condominio.itens_checklist.forEach(item => {
            const itemDiv = document.createElement('div'); itemDiv.classList.add('checklist-item'); itemDiv.dataset.itemId = item.id_item;
            const itemLabel = document.createElement('label'); itemLabel.textContent = `${item.descricao} (Total: ${item.total_unidades})`; itemLabel.htmlFor = `item_func_${item.id_item}`;
            const funcionandoLabelText = document.createTextNode(' Funcionando: '); const funcionandoInput = document.createElement('input'); funcionandoInput.type = 'number'; funcionandoInput.id = `item_func_${item.id_item}`; funcionandoInput.min = 0; funcionandoInput.max = item.total_unidades;
            const defeitoLabelText = document.createTextNode(' Com Defeito: '); const defeitoInput = document.createElement('input'); defeitoInput.type = 'number'; defeitoInput.id = `item_def_${item.id_item}`; defeitoInput.min = 0; defeitoInput.max = item.total_unidades;
            const obsTextarea = document.createElement('textarea'); obsTextarea.id = `item_obs_${item.id_item}`; obsTextarea.placeholder = 'Observações...'; obsTextarea.rows = 2;
            if (dadosParaPreencher) {
                const itemPreenchido = dadosParaPreencher.find(dp => dp.id_item_original === item.id_item);
                if (itemPreenchido) { funcionandoInput.value = itemPreenchido.funcionando; defeitoInput.value = itemPreenchido.com_defeito; obsTextarea.value = itemPreenchido.observacao; } 
                else { funcionandoInput.value = item.total_unidades; defeitoInput.value = 0; }
            } else { funcionandoInput.value = item.total_unidades; defeitoInput.value = 0;}
            funcionandoInput.addEventListener('input', function() { this.classList.remove('input-error'); defeitoInput.classList.remove('input-error'); let funcVal = parseInt(this.value); const total = item.total_unidades; if (isNaN(funcVal) || funcVal < 0) funcVal = 0; if (funcVal > total) funcVal = total; this.value = funcVal; defeitoInput.value = total - funcVal; });
            defeitoInput.addEventListener('input', function() { this.classList.remove('input-error'); funcionandoInput.classList.remove('input-error'); let defVal = parseInt(this.value); const total = item.total_unidades; if (isNaN(defVal) || defVal < 0) defVal = 0; if (defVal > total) defVal = total; this.value = defVal; funcionandoInput.value = total - defVal; });
            obsTextarea.addEventListener('input', function() { const defVal = parseInt(defeitoInput.value) || 0; if (defVal === 0 || (defVal > 0 && this.value.trim() !== '')) { this.classList.remove('input-error'); } });
            itemDiv.appendChild(itemLabel); itemDiv.appendChild(funcionandoLabelText); itemDiv.appendChild(funcionandoInput); itemDiv.appendChild(defeitoLabelText); itemDiv.appendChild(defeitoInput); itemDiv.appendChild(obsTextarea); checklistContainer.appendChild(itemDiv);
        });
    }
    
    if (checklistContainer && (!condominioSelect || !condominioSelect.value)) {
         renderChecklist(null);
         if(condominioLinkWrapper) condominioLinkWrapper.classList.add('hidden'); 
    }
    
    function validarChecklistAtual() { 
        let isValid = true; if (!checklistContainer) { return false; }
        const itensVisiveis = checklistContainer.querySelectorAll('.checklist-item');
         if (itensVisiveis.length === 0 ) {
             if (editandoRegistroIndex === null && condominioSelect && condominioSelect.value) {
                const condoSelecionado = condominios.find(c => c.id === condominioSelect.value);
                if(condoSelecionado && (!condoSelecionado.itens_checklist || condoSelecionado.itens_checklist.length === 0)){ return true; }
                showToast("Condomínio selecionado não possui itens para validar ou erro na renderização.", "error"); return false; 
            } return true; 
        }
        itensVisiveis.forEach(itemDiv => {
            const inputsNumericos = itemDiv.querySelectorAll('input[type="number"]'); const textareaObs = itemDiv.querySelector('textarea'); const defeitoInput = itemDiv.querySelector('input[id^="item_def_"]'); const comDefeitoValue = parseInt(defeitoInput.value) || 0;
            inputsNumericos.forEach(input => { if (input.value.trim() === '') { isValid = false; input.classList.add('input-error');} else {input.classList.remove('input-error');}});
            if (comDefeitoValue > 0) { if (textareaObs.value.trim() === '') {isValid = false; textareaObs.classList.add('input-error');} else {textareaObs.classList.remove('input-error');}} else { textareaObs.classList.remove('input-error');}
        }); return isValid;
    }

    function renderReviewPage() { 
         if (!registrosParaRevisaoContainer) return; registrosParaRevisaoContainer.innerHTML = ''; 
        if (registrosDaSessao.length === 0) { registrosParaRevisaoContainer.innerHTML = '<p>Nenhum registro para revisar.</p>'; return; }
        registrosDaSessao.forEach((registro, index) => {
            const registroDiv = document.createElement('div'); registroDiv.classList.add('registro-revisao-item');
            let htmlInterno = `<h3>${registro.condominio_nome}</h3><p><strong>Plantonista:</strong> ${registro.plantonista}</p><p><strong>Data/Hora Verificação:</strong> ${registro.data_hora_verificacao}</p>`;
            const condominioOriginal = condominios.find(c => c.id === registro.condominio_id);
            if (condominioOriginal && condominioOriginal.acessos && condominioOriginal.acessos.length > 0) {
                htmlInterno += `<h4>Acessos:</h4>`;
                condominioOriginal.acessos.forEach(acesso => { let valorDisplay = acesso.valor; if (acesso.tipo === 'link' && valorDisplay && !valorDisplay.startsWith('http')) { valorDisplay = 'http://' + valorDisplay; } htmlInterno += `<p class="access-item" style="font-size:0.9em;"><span class="access-description">${acesso.descricao}:</span> <span class="copyable-text">${acesso.valor}</span> ${acesso.tipo === 'link' ? ` (<a href="${valorDisplay}" target="_blank">Abrir</a>)` : ''}</p>`;});
            }
            htmlInterno += `<h4>Itens do Checklist:</h4>`;
            registro.checklist_resultados.forEach(item => { htmlInterno += `<div class="checklist-item-revisao"><p><strong>Item:</strong> ${item.descricao} (Total: ${item.total_unidades})</p><p><strong>Funcionando:</strong> ${item.funcionando}</p><p><strong>Com Defeito:</strong> ${item.com_defeito}</p><p><strong>Observação:</strong> ${item.observacao || "Nenhuma"}</p></div>`;});
            const btnEditar = document.createElement('button'); btnEditar.classList.add('btn-editar-registro'); btnEditar.textContent = 'Editar este Registro'; btnEditar.dataset.index = index; btnEditar.addEventListener('click', function() { iniciarEdicaoRegistro(parseInt(this.dataset.index)); });
            registroDiv.innerHTML = htmlInterno; registroDiv.appendChild(btnEditar); registrosParaRevisaoContainer.appendChild(registroDiv);
        });
    }

    function iniciarEdicaoRegistro(index) { 
        if (index < 0 || index >= registrosDaSessao.length) return;
        editandoRegistroIndex = index; revisaoIniciada = false; 
        const registroParaEditar = registrosDaSessao[editandoRegistroIndex];
        if (plantonistaSelect) plantonistaSelect.value = registroParaEditar.plantonista;
        popularCondominiosDropdown(registroParaEditar.condominio_id); 
        if (condominioSelect) condominioSelect.value = registroParaEditar.condominio_id;
        const condominioObjOriginal = condominios.find(c => c.id === registroParaEditar.condominio_id);
        renderChecklist(condominioObjOriginal, registroParaEditar.checklist_resultados);
        if (condominioLinkWrapper) {
            condominioLinkWrapper.innerHTML = ''; condominioLinkWrapper.classList.add('hidden');
            if (condominioObjOriginal && condominioObjOriginal.acessos && condominioObjOriginal.acessos.length > 0) {
                const accessListContainer = document.createElement('div'); accessListContainer.classList.add('access-list-container');
                condominioObjOriginal.acessos.forEach(acesso => {
                    const p = document.createElement('p'); p.classList.add('access-item'); const descSpan = document.createElement('span'); descSpan.classList.add('access-description'); descSpan.textContent = acesso.descricao ? `${acesso.descricao}: ` : 'Acesso: '; p.appendChild(descSpan);
                    if (acesso.tipo === "link") { const link = document.createElement('a'); let url = acesso.valor; if (url && !url.toLowerCase().startsWith('http://') && !url.toLowerCase().startsWith('https://')) { url = 'http://' + url; } link.href = url; link.textContent = acesso.valor; link.target = "_blank"; p.appendChild(link); } 
                    else if (["rdp", "teamviewer", "anydesk", "simnext_id", "info_copiar"].includes(acesso.tipo)) { const valueSpan = document.createElement('span'); valueSpan.textContent = acesso.valor; valueSpan.classList.add('copyable-text'); p.appendChild(valueSpan); const copyButton = document.createElement('button'); copyButton.textContent = 'Copiar'; copyButton.type = 'button'; copyButton.classList.add('btn-copiar-info'); copyButton.addEventListener('click', () => { navigator.clipboard.writeText(acesso.valor).then(() => { showToast(`'${acesso.valor}' copiado!`, 'success'); }).catch(err => { showToast('Falha ao copiar.', 'error'); }); }); p.appendChild(copyButton); } 
                    else { p.appendChild(document.createTextNode(acesso.valor)); }
                    accessListContainer.appendChild(p);
                });
                condominioLinkWrapper.appendChild(accessListContainer); condominioLinkWrapper.classList.remove('hidden');
            }
        }
        atualizarEstadoBotoesEInterface(); 
    }
    
    if (btnAcaoPrincipal) { 
        btnAcaoPrincipal.addEventListener('click', function() {
            if (editandoRegistroIndex === null && (!plantonistaSelect.value || !plantonistaConfirmado)) { showToast("Por favor, selecione e confirme o Plantonista.", "error"); if(plantonistaSelect && !plantonistaSelect.disabled) plantonistaSelect.focus(); return; }
            const plantonistaSelecionado = plantonistaSelect ? plantonistaSelect.value : ''; const condominioIdSelecionado = (editandoRegistroIndex !== null) ? registrosDaSessao[editandoRegistroIndex].condominio_id : (condominioSelect ? condominioSelect.value : '');
            if (editandoRegistroIndex === null && !condominioIdSelecionado) { showToast("Por favor, selecione um Condomínio.", "error"); if(condominioSelect) condominioSelect.focus(); return; }
            if (!validarChecklistAtual()) { showToast("Preencha campos obrigatórios. Observação é necessária para itens com defeito.", "error"); return; }
            const dataHoraRegistro = lastFetchedTime ? new Date(lastFetchedTime.getTime()) : new Date(); const condominioObj = condominios.find(c => c.id === condominioIdSelecionado);
            if (!condominioObj) { showToast("Erro: Condomínio não encontrado.", "error"); return; }
            const resultadosChecklist = []; const itensDoDOM = checklistContainer.querySelectorAll('.checklist-item');
            itensDoDOM.forEach(itemDiv => { const itemId = itemDiv.dataset.itemId; const itemOriginal = condominioObj.itens_checklist.find(i => i.id_item === itemId); resultadosChecklist.push({ id_item_original: itemId, descricao: itemOriginal ? itemOriginal.descricao : 'N/A', total_unidades: itemOriginal ? itemOriginal.total_unidades : 0, funcionando: parseInt(itemDiv.querySelector(`input[id^="item_func_"]`).value) || 0, com_defeito: parseInt(itemDiv.querySelector(`input[id^="item_def_"]`).value) || 0, observacao: itemDiv.querySelector(`textarea[id^="item_obs_"]`).value.trim() }); });
            const registroProcessado = { plantonista: plantonistaSelecionado, condominio_id: condominioObj.id, condominio_nome: condominioObj.nome, data_hora_verificacao: (editandoRegistroIndex !== null) ? registrosDaSessao[editandoRegistroIndex].data_hora_verificacao : formatDateTime(dataHoraRegistro), timestamp_verificacao_iso: (editandoRegistroIndex !== null) ? registrosDaSessao[editandoRegistroIndex].timestamp_verificacao_iso : dataHoraRegistro.toISOString(), checklist_resultados: resultadosChecklist };
            if (editandoRegistroIndex !== null) { registrosDaSessao[editandoRegistroIndex] = registroProcessado; showToast(`Alterações em "${condominioObj.nome}" salvas!`, 'success'); editandoRegistroIndex = null; revisaoIniciada = true; renderReviewPage(); } 
            else { registrosDaSessao.push(registroProcessado); showToast(`"${condominioObj.nome}" adicionado. ${registrosDaSessao.length} registro(s).`, 'success'); popularCondominiosDropdown(); if(condominioSelect) condominioSelect.value = ''; renderChecklist(null); if(condominioLinkWrapper) condominioLinkWrapper.classList.add('hidden'); }
            atualizarEstadoBotoesEInterface();
        });
    }

    if (btnRevisarRegistros) { 
        btnRevisarRegistros.addEventListener('click', function() {
            if (editandoRegistroIndex !== null) { editandoRegistroIndex = null; revisaoIniciada = true; renderReviewPage(); showToast("Edição cancelada.", "info"); } 
            else { revisaoIniciada = !revisaoIniciada; if (revisaoIniciada) { renderReviewPage(); } else { popularCondominiosDropdown(); if(condominioSelect) condominioSelect.value = ''; renderChecklist(null); if(condominioLinkWrapper) condominioLinkWrapper.classList.add('hidden');}}
            atualizarEstadoBotoesEInterface();
        });
    }
    
    // Função de Geração de PDF (Revisada - SEM LOGO, layout mais simples)
    function gerarRelatorioPDF() {
        if (registrosDaSessao.length === 0) {
            showToast("Nenhuma verificação registrada para gerar PDF.", "error");
            return false; 
        }
        const { jsPDF } = window.jspdf; 
        const doc = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });
        
        let pageNumber = 1; 
        const margin = 15; 
        const pageWidth = doc.internal.pageSize.width; 
        const pageHeight = doc.internal.pageSize.height; 
        let currentY = 0; 

        function addPageHeadersAndFooters() { 
            currentY = margin; 
            doc.setFontSize(16); doc.setTextColor(4, 3, 48); 
            doc.text("Relatório de Plantão WR", pageWidth / 2, currentY, { align: "center" }); 
            currentY += 7; 
            doc.setDrawColor(4, 3, 48); 
            doc.line(margin, currentY, pageWidth - margin, currentY); 
            currentY += 7; 
            // Footer
            doc.setFontSize(9); doc.setTextColor(100); 
            doc.text("Página " + pageNumber, pageWidth - margin, pageHeight - 10, {align: 'right'});
        }
        
        addPageHeadersAndFooters(); // Para a primeira página

        const plantonistaNome = (plantonistaSelect && plantonistaSelect.value && plantonistaConfirmado) ? plantonistaSelect.value : (registrosDaSessao.length > 0 ? registrosDaSessao[0].plantonista : 'N/A');
        doc.setFontSize(11); doc.setTextColor(0, 0, 0); 
        doc.text(`Plantonista: ${plantonistaNome}`, margin, currentY); currentY += 6;
        doc.text(`Data da Exportação: ${formatDateTime(new Date())}`, margin, currentY); currentY += 9;

        registrosDaSessao.forEach((registro, idx) => {
            const minSpaceForHeader = 15; // Espaço para nome do condo e data
            const minSpaceForTable = 30; // Espaço mínimo para uma tabela começar (header + algumas linhas)
            
            // Verifica se há espaço para o cabeçalho do condomínio e um pedaço da tabela
            if (currentY + minSpaceForHeader + minSpaceForTable > pageHeight - (margin + 10)) { 
                doc.addPage(); pageNumber++; addPageHeadersAndFooters();
                // Repetir info do plantonista na nova página
                doc.setFontSize(11); doc.setTextColor(0,0,0); 
                doc.text(`Plantonista: ${plantonistaNome} (continuação)`, margin, currentY); currentY += 6;
                doc.text(`Data da Exportação: ${formatDateTime(new Date())}`, margin, currentY); currentY += 9;
            } else if (idx > 0) { // Se não for o primeiro registro e não pulou página, adiciona espaço
                 currentY += 5;
            }

            doc.setFontSize(13); doc.setFont('helvetica', 'bold'); 
            doc.text(registro.condominio_nome, margin, currentY); currentY += 6;
            doc.setFontSize(9); doc.setFont('helvetica', 'normal'); 
            doc.text(`Data da Verificação: ${registro.data_hora_verificacao}`, margin, currentY); currentY += 7; 
            
            const head = [["Item", "Total", "Func.", "Defeito", "Observação"]]; 
            const body = registro.checklist_resultados.map(item => [ item.descricao, item.total_unidades.toString(), item.funcionando.toString(), item.com_defeito.toString(), item.observacao || "-" ]);
            
            doc.autoTable({ 
                startY: currentY, head: head, body: body, theme: 'grid', 
                headStyles: { fillColor: [4, 3, 48], textColor: [255,255,255], fontStyle: 'bold', halign: 'center', fontSize: 8 }, 
                styles: { font: 'helvetica', fontSize: 8, cellPadding: 1.5, overflow: 'linebreak', valign: 'middle' }, 
                columnStyles: { 
                    0: { cellWidth: 55, fontStyle: 'bold' }, 
                    1: { cellWidth: 13, halign: 'center' },  
                    2: { cellWidth: 18, halign: 'center' }, 
                    3: { cellWidth: 18, halign: 'center' },  
                    4: { cellWidth: 'auto' }  
                },
                didDrawPage: function (dataHook) { 
                    pageNumber = dataHook.pageNumber; // autoTable informa a página atual
                    addPageHeadersAndFooters(); // Adiciona nosso cabeçalho/rodapé à página que o autoTable desenhou
                    currentY = dataHook.cursor.y; // Atualiza currentY para onde o autoTable parou na nova página
                }
            });
            currentY = doc.autoTable.previous.finalY + 8; 
        });
        // Garante que o rodapé da última página seja desenhado se o autotable não tiver chamado didDrawPage para ela
        if (doc.internal.getNumberOfPages() === pageNumber) { 
             doc.setPage(pageNumber); addFooterPdfInterna(); 
        }

        const nomeArquivoBase = `relatorio_plantao_WR_${plantonistaNome.replace(/[^a-zA-Z0-9_.-]/g, '_')}`;
        const timestampArquivo = (lastFetchedTime || new Date()).toISOString().slice(0,10);
        const nomeArquivoFinal = `${nomeArquivoBase}_${timestampArquivo}.pdf`;
        
        doc.save(nomeArquivoFinal);
        showToast(`Relatório PDF gerado como '${nomeArquivoFinal}'!`, 'success');
        return true; 
    }

    // Botão de Finalizar Sessão (gera PDF e reseta)
    if (btnFinalizarSessao) { 
        btnFinalizarSessao.addEventListener('click', function() {
            if (registrosDaSessao.length === 0) { showToast("Nenhuma verificação registrada para finalizar.", "error"); return; }
            
            const todosOsCondominiosPreenchidosNaSessao = registrosDaSessao.length === condominios.filter(c => c.itens_checklist && c.itens_checklist.length > 0).length;
            if (!todosOsCondominiosPreenchidosNaSessao && revisaoIniciada) {
                 showToast("Todos os condomínios com checklist precisam ser verificados antes de finalizar.", "info");
                 return;
            }
            if (!revisaoIniciada && registrosDaSessao.length > 0) { 
                 showToast("Por favor, revise os registros antes de finalizar.", "info"); 
                 revisaoIniciada = true; renderReviewPage(); atualizarEstadoBotoesEInterface(); return;
            }

            if (!gerarRelatorioPDF()) {
                showToast("Não foi possível gerar o PDF. A sessão não será finalizada.", "error");
                return; 
            }
            
            showToast(`Sessão finalizada e relatório PDF gerado.`, 'success', 4000);

            registrosDaSessao = []; revisaoIniciada = false; editandoRegistroIndex = null; plantonistaConfirmado = false; 
            if (plantonistaSelect) { plantonistaSelect.value = ''; plantonistaSelect.disabled = false; }
            popularCondominiosDropdown(); 
            if (condominioSelect) { condominioSelect.value = ''; condominioSelect.disabled = true; }
            renderChecklist(null); if(condominioLinkWrapper) condominioLinkWrapper.classList.add('hidden');
            atualizarEstadoBotoesEInterface();
        });
    }
    
    atualizarEstadoBotoesEInterface(); 
});