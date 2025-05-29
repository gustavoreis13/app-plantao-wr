// --- Variáveis Globais de Estado e Dados ---
let registrosDaSessao = [];
let editandoRegistroIndex = null;
let revisaoIniciada = false;

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
const verificadores = ["Felipe", "Gustavo", "Josemar", "Rafael"];
const condominios = [ // Certifique-se de que esta lista está completa e correta
  { id: "condo_01", nome: "PENÍNSULA", acessos: [{ descricao: "Acesso Principal", tipo: "rdp", valor: "Peninsula.Dyndns.org" }], itens_checklist: [{ id_item: "item_01_01", descricao: "CFTV", total_unidades: 94 },{ id_item: "item_01_02", descricao: "Controle de Acesso", total_unidades: 9 },{ id_item: "item_01_03", descricao: "Status Geral dos Portões", total_unidades: 1 },{ id_item: "item_01_04", descricao: "C.E", total_unidades: 6 },{ id_item: "item_01_05", descricao: "I/O", total_unidades: 3 }]},
  { id: "condo_05", nome: "BOUGAINVILLE", acessos: [{ descricao: "TeamViewer ID", tipo: "teamviewer", valor: "678956493" }], itens_checklist: [{ id_item: "item_05_01", descricao: "NVD 223", total_unidades: 5 },{ id_item: "item_05_02", descricao: "NVD 252", total_unidades: 31 },{ id_item: "item_05_03", descricao: "NVD 254", total_unidades: 30 }]},
  { id: "condo_04", nome: "CDM ABC JF", acessos: [{ descricao: "AnyDesk ID", tipo: "anydesk", valor: "909537479" }], itens_checklist: [{ id_item: "item_04_01", descricao: "CFTV", total_unidades: 254 }]},
  { id: "condo_03", nome: "MANÁCAS", acessos: [{ descricao: "AnyDesk ID", tipo: "anydesk", valor: "102374483" }], itens_checklist: [{ id_item: "item_03_01", descricao: "DVR Portaria P3", total_unidades: 15 },{ id_item: "item_03_02", descricao: "NVD Perímetro", total_unidades: 11 },{ id_item: "item_03_03", descricao: "NVD P3+ Speed", total_unidades: 16 },{ id_item: "item_03_04", descricao: "C.A", total_unidades: 7 }]},
  { id: "condo_15", nome: "ECO CASA BRANCA", acessos: [ { descricao: "SIMNEXT NVD 1", tipo: "simnext_id", valor: "G05G2700119GN" }, { descricao: "SIMNEXT NVD 2", tipo: "simnext_id", valor: "G05I4200024DJ" }, { descricao: "SIMNEXT DVR 1", tipo: "simnext_id", valor: "8J9L0400122P5" } ], itens_checklist: [{ id_item: "item_15_01", descricao: "NVD 01", total_unidades: 22 },{ id_item: "item_15_02", descricao: "NVD 02", total_unidades: 24 },{ id_item: "item_15_03", descricao: "DVC CLUBE", total_unidades: 22 }]},
  { id: "condo_16", nome: "QUINTAS DE CASA BRANCA", acessos: [ { descricao: "AnyDesk (Alternativa)", tipo: "anydesk", valor: "1684437935" }, { descricao: "DVR 1 (Externo)", tipo: "link", valor: "wrqcb.dyndns.org:1003" }, { descricao: "DVR 1 (Interno)", tipo: "info_copiar", valor: "192.168.1.10" }, { descricao: "DVR 2 (Externo)", tipo: "link", valor: "wrqcb.dyndns.org:1103" }, { descricao: "DVR 2 (Interno)", tipo: "info_copiar", valor: "192.168.1.11" } ], itens_checklist: [] },
  { id: "condo_02", nome: "RETIRO", acessos: [ { descricao: "DVR Portaria", tipo: "link", valor: "http://d4440c4f88cb.sn.mynetname.net:4003/doc/page/login.asp?_1748527071816" }, { descricao: "DVR Cozinha", tipo: "link", valor: "http://d4440c4f88cb.sn.mynetname.net:3703/doc/page/login.asp" }, { descricao: "DVR Avançado", tipo: "link", valor: "http://d4440c4f88cb.sn.mynetname.net:5003/doc/page/login.asp?_1748526886632" }, { descricao: "NVD Lado Esquerdo", tipo: "link", valor: "http://d4440c4f88cb.sn.mynetname.net:3401/doc/page/login.asp?_1748526934503" }, { descricao: "NVD Lado Direito", tipo: "link", valor: "http://d4440c4f88cb.sn.mynetname.net:3303/doc/page/login.asp?_1748526962748" }, { descricao: "NVD Área Central", tipo: "link", valor: "http://d4440c4f88cb.sn.mynetname.net:3203/doc/page/login.asp?_1748527000132" }, { descricao: "NVD Estradinha", tipo: "link", valor: "http://d4440c4f88cb.sn.mynetname.net:13101/" } ], itens_checklist: [{ id_item: "item_02_01", descricao: "NVR ESTRADINHA", total_unidades: 8 },{ id_item: "item_02_02", descricao: "DVR Portaria", total_unidades: 16 },{ id_item: "item_02_03", descricao: "DVR Avançado", total_unidades: 10 },{ id_item: "item_02_04", descricao: "DVR Cozinha", total_unidades: 3 },{ id_item: "item_02_05", descricao: "NVD AREA CENTRAL", total_unidades: 14 },{ id_item: "item_02_06", descricao: "NVD LADO DIREITO", total_unidades: 16 },{ id_item: "item_02_07", descricao: "NVD LADO ESQUERDO", total_unidades: 13 },{ id_item: "item_02_08", descricao: "Catraca pedestre", total_unidades: 1 },{ id_item: "item_02_09", descricao: "catraca clube", total_unidades: 1 },{ id_item: "item_02_10", descricao: "saída de veículos", total_unidades: 1 },{ id_item: "item_02_11", descricao: "entrada de veículos", total_unidades: 1 }]},
  { id: "condo_13", nome: "EPAMIG PITANGUI ITAP", acessos: [ { descricao: "NVD 1", tipo: "link", valor: "http://179.109.160.11:10003/" }, { descricao: "NVD 2", tipo: "link", valor: "http://179.109.160.11:10006/" }, { descricao: "NVD 3", tipo: "link", valor: "http://179.109.160.11:10009/" }, { descricao: "Situator", tipo: "link", valor: "http://179.109.160.11:10000/app/login" } ], itens_checklist: [{ id_item: "item_13_01", descricao: "C.A", total_unidades: 4 },{ id_item: "item_13_02", descricao: "NVD 01", total_unidades: 29 },{ id_item: "item_13_03", descricao: "NVD 02", total_unidades: 31 },{ id_item: "item_13_04", descricao: "NVD 03", total_unidades: 15 }]},
  { id: "condo_12", nome: "EPAMIG JUIZ DE FORA", acessos: [ { descricao: "NVD 1", tipo: "link", valor: "http://45.169.51.102:10003/" }, { descricao: "NVD 2", tipo: "link", valor: "http://45.169.51.102:10006/" }, { descricao: "Situator", tipo: "link", valor: "http://45.169.51.102:10000/app/login" } ], itens_checklist: [{ id_item: "item_12_01", descricao: "CFTV", total_unidades: 50 },{ id_item: "item_12_02", descricao: "Situator", total_unidades: 1 },{ id_item: "item_12_03", descricao: "Catraca", total_unidades: 2 },{ id_item: "item_12_04", descricao: "Cancela", total_unidades: 1 }]},
  { id: "condo_09", nome: "EPAMIG UBERABA", acessos: [ { descricao: "NVD 1", tipo: "link", valor: "http://177.69.91.189:10001/" }, { descricao: "XPE 3101", tipo: "link", valor: "http://177.69.91.189:10007/fcgi/do?id=1" } ], itens_checklist: [{ id_item: "item_09_01", descricao: "CFTV", total_unidades: 22 },{ id_item: "item_09_02", descricao: "C.A", total_unidades: 2 }]},
  { id: "condo_11", nome: "EPAMIG PATOS DE MINAS", acessos: [{ descricao: "NVD 1", tipo: "link", valor: "http://45.188.42.2:10000/" }], itens_checklist: [{ id_item: "item_11_01", descricao: "CFTV", total_unidades: 10 }]},
  { id: "condo_10", nome: "EPAMIG PATROCÍNIO", acessos: [ { descricao: "NVD 1", tipo: "link", valor: "http://177.85.2.154:10003/" }, { descricao: "XPE 3101", tipo: "link", valor: "http://177.85.2.154:7503/fcgi/do?id=1" } ], itens_checklist: [{ id_item: "item_10_01", descricao: "CFTV", total_unidades: 14 }]},
  { id: "condo_08", nome: "EPAMIG SANTA RITA", acessos: [ { descricao: "NVD 1", tipo: "link", valor: "http://177.129.185.181:10005/" }, { descricao: "XPE 3200 FACE (1)", tipo: "link", valor: "http://177.129.185.181:10007/fcgi/do?id=1" }, { descricao: "XPE 3200 FACE (2)", tipo: "link", valor: "http://177.129.185.181:10008/fcgi/do?id=1" }, { descricao: "TVIP 3000", tipo: "link", valor: "http://177.129.185.181:10012/fcgi/do?id=1" } ], itens_checklist: [{ id_item: "item_08_01", descricao: "CFTV", total_unidades: 16 },{ id_item: "item_08_02", descricao: "C.A", total_unidades: 2 }]},
  { id: "condo_07", nome: "EPAMIG SEDE BH", acessos: [ { descricao: "CIP 850", tipo: "link", valor: "http://201.17.134.15/" }, { descricao: "Situator", tipo: "link", valor: "http://177.69.38.5:10002/app/login" }, { descricao: "D-guard", tipo: "link", valor: "http://177.69.38.5:10000/#!/login" } ], itens_checklist: [{ id_item: "item_07_01", descricao: "CFTV", total_unidades: 24 },{ id_item: "item_07_02", descricao: "C.A", total_unidades: 6 }]},
  { id: "condo_14", nome: "VALE DO OURO", acessos: [ { descricao: "DVR 1", tipo: "link", valor: "http://179.106.100.102:10002/" }, { descricao: "DVR 2", tipo: "link", valor: "http://179.106.100.102:10005/" }, { descricao: "DVR 3", tipo: "link", valor: "http://179.106.100.102:10008/" }, { descricao: "DVR 4", tipo: "link", valor: "http://179.106.100.102:10011/" } ], itens_checklist: [{ id_item: "item_14_01", descricao: "NVD 01", total_unidades: 20 },{ id_item: "item_14_02", descricao: "NVD 02", total_unidades: 23 },{ id_item: "item_14_03", descricao: "NVD 03", total_unidades: 21 },{ id_item: "item_14_04", descricao: "NVD 04", total_unidades: 14 }]},
  { id: "condo_06", nome: "FAZENDA SANTA RITA (MARIA PIA)", acessos: [{ descricao: "AnyDesk ID", tipo: "anydesk", valor: "155935785" }], itens_checklist: [{ id_item: "item_06_01", descricao: "NVD 1", total_unidades: 21 }]}
];

// --- Lógica Principal da Aplicação ---
document.addEventListener('DOMContentLoaded', () => {
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) { currentYearSpan.textContent = new Date().getFullYear(); }

    const plantonistaSelect = document.getElementById('plantonista');
    const condominioSelect = document.getElementById('condominio');
    const checklistContainer = document.getElementById('itens-checklist-container');
    const condominioLinkWrapper = document.getElementById('condominio-link-wrapper'); 
    const btnAcaoPrincipal = document.getElementById('btn-acao-principal');
    const btnRevisarRegistros = document.getElementById('btn-revisar-registros');
    const btnFinalizarExportarJson = document.getElementById('btn-finalizar-exportar-json');
    const btnExportarPdf = document.getElementById('btn-exportar-pdf');

    const areaEntradaDados = document.getElementById('area-entrada-dados');
    const areaRevisao = document.getElementById('area-revisao');
    const registrosParaRevisaoContainer = document.getElementById('registros-para-revisao-container');

    function atualizarEstadoBotoesEInterface() {
        if (!btnAcaoPrincipal || !btnRevisarRegistros || !btnFinalizarExportarJson || !btnExportarPdf || !areaEntradaDados || !areaRevisao) {
            return;
        }
        const haRegistros = registrosDaSessao.length > 0;

        if (editandoRegistroIndex !== null) { 
            btnAcaoPrincipal.textContent = 'Salvar Alterações';
            btnAcaoPrincipal.classList.remove('hidden');
            btnRevisarRegistros.textContent = 'Cancelar Edição';
            btnRevisarRegistros.classList.remove('hidden'); 
            btnFinalizarExportarJson.classList.add('hidden');
            btnExportarPdf.classList.add('hidden'); 
            areaEntradaDados.classList.remove('hidden');
            areaRevisao.classList.add('hidden');
            if(plantonistaSelect) plantonistaSelect.disabled = true; 
            if(condominioSelect) condominioSelect.disabled = true;
        } else if (revisaoIniciada) { 
            btnAcaoPrincipal.classList.add('hidden'); 
            btnRevisarRegistros.textContent = 'Voltar à Entrada de Dados'; 
            btnRevisarRegistros.classList.remove('hidden'); 
            btnFinalizarExportarJson.disabled = !haRegistros;
            btnFinalizarExportarJson.classList.remove('hidden'); 
            btnExportarPdf.disabled = !haRegistros; 
            btnExportarPdf.classList.remove('hidden');
            areaEntradaDados.classList.add('hidden');
            areaRevisao.classList.remove('hidden');
            if(plantonistaSelect) plantonistaSelect.disabled = false;
            if(condominioSelect) condominioSelect.disabled = false;
        } else { 
            btnAcaoPrincipal.textContent = 'Adicionar à Revisão';
            btnAcaoPrincipal.classList.remove('hidden');
            btnRevisarRegistros.textContent = 'Revisar Registros';
            btnRevisarRegistros.classList.remove('hidden'); 
            btnFinalizarExportarJson.disabled = true; 
            btnFinalizarExportarJson.classList.remove('hidden'); 
            btnExportarPdf.disabled = true; 
            btnExportarPdf.classList.remove('hidden');
            areaEntradaDados.classList.remove('hidden');
            areaRevisao.classList.add('hidden');
            if(plantonistaSelect) plantonistaSelect.disabled = false;
            if(condominioSelect) condominioSelect.disabled = false;
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
                                        alert(`'${acesso.valor}' copiado para a área de transferência!`);
                                    }).catch(err => {
                                        console.error('Falha ao copiar: ', err);
                                        alert('Falha ao copiar. Verifique as permissões ou copie manually.');
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
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('checklist-item');
            itemDiv.dataset.itemId = item.id_item;

            const itemLabel = document.createElement('label');
            itemLabel.textContent = `${item.descricao} (Total: ${item.total_unidades})`;
            itemLabel.htmlFor = `item_func_${item.id_item}`;

            const funcionandoLabelText = document.createTextNode(' Funcionando: ');
            const funcionandoInput = document.createElement('input');
            funcionandoInput.type = 'number';
            funcionandoInput.id = `item_func_${item.id_item}`;
            funcionandoInput.min = 0;
            funcionandoInput.max = item.total_unidades;
            
            const defeitoLabelText = document.createTextNode(' Com Defeito: ');
            const defeitoInput = document.createElement('input');
            defeitoInput.type = 'number';
            defeitoInput.id = `item_def_${item.id_item}`;
            defeitoInput.min = 0;
            defeitoInput.max = item.total_unidades;

            const obsTextarea = document.createElement('textarea');
            obsTextarea.id = `item_obs_${item.id_item}`;
            obsTextarea.placeholder = 'Observações...';
            obsTextarea.rows = 2;

            if (dadosParaPreencher) {
                const itemPreenchido = dadosParaPreencher.find(dp => dp.id_item_original === item.id_item);
                if (itemPreenchido) {
                    funcionandoInput.value = itemPreenchido.funcionando;
                    defeitoInput.value = itemPreenchido.com_defeito;
                    obsTextarea.value = itemPreenchido.observacao;
                } else { 
                    funcionandoInput.value = item.total_unidades;
                    defeitoInput.value = 0;
                }
            } else { 
                funcionandoInput.value = item.total_unidades;
                defeitoInput.value = 0;
            }
            
            funcionandoInput.addEventListener('input', function() {
                this.classList.remove('input-error');
                defeitoInput.classList.remove('input-error');
                let funcionando = parseInt(this.value);
                const total = parseInt(item.total_unidades);
                if (isNaN(funcionando) || funcionando < 0) funcionando = 0;
                if (funcionando > total) funcionando = total;
                this.value = funcionando;
                defeitoInput.value = total - funcionando;
            });

            defeitoInput.addEventListener('input', function() {
                this.classList.remove('input-error');
                funcionandoInput.classList.remove('input-error');
                let comDefeito = parseInt(this.value);
                const total = parseInt(item.total_unidades);
                if (isNaN(comDefeito) || comDefeito < 0) comDefeito = 0;
                if (comDefeito > total) comDefeito = total;
                this.value = comDefeito;
                funcionandoInput.value = total - comDefeito;
            });
            
            obsTextarea.addEventListener('input', function() {
                const defeitoVal = parseInt(defeitoInput.value) || 0;
                if (defeitoVal === 0 || (defeitoVal > 0 && this.value.trim() !== '')) {
                    this.classList.remove('input-error');
                }
            });

            itemDiv.appendChild(itemLabel);
            itemDiv.appendChild(funcionandoLabelText);
            itemDiv.appendChild(funcionandoInput);
            itemDiv.appendChild(defeitoLabelText);
            itemDiv.appendChild(defeitoInput);
            itemDiv.appendChild(obsTextarea);
            checklistContainer.appendChild(itemDiv);
        });
    }
    
    if (checklistContainer && (!condominioSelect || !condominioSelect.value)) {
         renderChecklist(null);
         if(condominioLinkWrapper) condominioLinkWrapper.classList.add('hidden'); 
    }
    
    function validarChecklistAtual() {
        let isValid = true;
        if (!checklistContainer) { return false; }
        const itensVisiveis = checklistContainer.querySelectorAll('.checklist-item');
         if (itensVisiveis.length === 0 ) {
             if (editandoRegistroIndex === null && condominioSelect && condominioSelect.value) {
                const condoSelecionado = condominios.find(c => c.id === condominioSelect.value);
                if(condoSelecionado && (!condoSelecionado.itens_checklist || condoSelecionado.itens_checklist.length === 0)){
                    return true;
                }
                alert("Condomínio selecionado não possui itens de checklist para validar ou ocorreu um erro na renderização.");
                return false; 
            }
            return true; 
        }

        itensVisiveis.forEach(itemDiv => {
            const inputsNumericos = itemDiv.querySelectorAll('input[type="number"]');
            const textareaObs = itemDiv.querySelector('textarea');
            const defeitoInput = itemDiv.querySelector('input[id^="item_def_"]');
            const comDefeitoValue = parseInt(defeitoInput.value) || 0;

            inputsNumericos.forEach(input => {
                if (input.value.trim() === '') { 
                    isValid = false;
                    input.classList.add('input-error');
                } else {
                    input.classList.remove('input-error');
                }
            });

            if (comDefeitoValue > 0) { 
                if (textareaObs.value.trim() === '') {
                    isValid = false;
                    textareaObs.classList.add('input-error');
                } else {
                    textareaObs.classList.remove('input-error');
                }
            } else { 
                textareaObs.classList.remove('input-error');
            }
        });
        return isValid;
    }

    function renderReviewPage() {
        if (!registrosParaRevisaoContainer) return;
        registrosParaRevisaoContainer.innerHTML = ''; 

        if (registrosDaSessao.length === 0) {
            registrosParaRevisaoContainer.innerHTML = '<p>Nenhum registro para revisar ainda. Adicione alguns primeiro.</p>';
            return;
        }

        registrosDaSessao.forEach((registro, index) => {
            const registroDiv = document.createElement('div');
            registroDiv.classList.add('registro-revisao-item');
            
            let htmlInterno = `<h3>${registro.condominio_nome}</h3>`;
            htmlInterno += `<p><strong>Plantonista:</strong> ${registro.plantonista}</p>`;
            htmlInterno += `<p><strong>Data/Hora Verificação:</strong> ${registro.data_hora_verificacao}</p>`;
            
            const condominioOriginal = condominios.find(c => c.id === registro.condominio_id);
            if (condominioOriginal && condominioOriginal.acessos && condominioOriginal.acessos.length > 0) {
                htmlInterno += `<h4>Acessos:</h4>`;
                condominioOriginal.acessos.forEach(acesso => {
                    let valorDisplay = acesso.valor;
                    if (acesso.tipo === 'link' && valorDisplay && !valorDisplay.startsWith('http')) {
                        valorDisplay = 'http://' + valorDisplay;
                    }
                    htmlInterno += `<p class="access-item" style="font-size:0.9em;">
                        <span class="access-description">${acesso.descricao}:</span> 
                        <span class="copyable-text">${acesso.valor}</span>
                        ${acesso.tipo === 'link' ? ` (<a href="${valorDisplay}" target="_blank">Abrir</a>)` : ''}
                    </p>`;
                });
            }

            htmlInterno += `<h4>Itens do Checklist:</h4>`;
            registro.checklist_resultados.forEach(item => {
                htmlInterno += `
                    <div class="checklist-item-revisao">
                        <p><strong>Item:</strong> ${item.descricao} (Total: ${item.total_unidades})</p>
                        <p><strong>Funcionando:</strong> ${item.funcionando}</p>
                        <p><strong>Com Defeito:</strong> ${item.com_defeito}</p>
                        <p><strong>Observação:</strong> ${item.observacao || "Nenhuma"}</p>
                    </div>
                `;
            });

            const btnEditar = document.createElement('button');
            btnEditar.classList.add('btn-editar-registro');
            btnEditar.textContent = 'Editar este Registro';
            btnEditar.dataset.index = index; 
            btnEditar.addEventListener('click', function() {
                iniciarEdicaoRegistro(parseInt(this.dataset.index));
            });

            registroDiv.innerHTML = htmlInterno;
            registroDiv.appendChild(btnEditar);
            registrosParaRevisaoContainer.appendChild(registroDiv);
        });
    }

    function iniciarEdicaoRegistro(index) {
        if (index < 0 || index >= registrosDaSessao.length) return;
        
        editandoRegistroIndex = index;
        revisaoIniciada = false; 

        const registroParaEditar = registrosDaSessao[editandoRegistroIndex];

        if (plantonistaSelect) plantonistaSelect.value = registroParaEditar.plantonista;
        
        popularCondominiosDropdown(registroParaEditar.condominio_id); 
        if (condominioSelect) condominioSelect.value = registroParaEditar.condominio_id;

        const condominioObjOriginal = condominios.find(c => c.id === registroParaEditar.condominio_id);
        renderChecklist(condominioObjOriginal, registroParaEditar.checklist_resultados);
        
        if (condominioLinkWrapper) {
            condominioLinkWrapper.innerHTML = ''; 
            condominioLinkWrapper.classList.add('hidden');
            if (condominioObjOriginal && condominioObjOriginal.acessos && condominioObjOriginal.acessos.length > 0) {
                const accessListContainer = document.createElement('div');
                accessListContainer.classList.add('access-list-container');
                condominioObjOriginal.acessos.forEach(acesso => {
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
                        copyButton.type = 'button';
                        copyButton.classList.add('btn-copiar-info');
                        copyButton.addEventListener('click', () => {
                            navigator.clipboard.writeText(acesso.valor).then(() => {
                                alert(`'${acesso.valor}' copiado!`);
                            }).catch(err => {
                                alert('Falha ao copiar.');
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
        atualizarEstadoBotoesEInterface(); 
    }
    
    if (btnAcaoPrincipal) {
        btnAcaoPrincipal.addEventListener('click', function() {
            const plantonistaSelecionado = plantonistaSelect ? plantonistaSelect.value : '';
            const condominioIdSelecionado = (editandoRegistroIndex !== null) 
                                         ? registrosDaSessao[editandoRegistroIndex].condominio_id 
                                         : (condominioSelect ? condominioSelect.value : '');
            
            if (!plantonistaSelecionado) {
                alert("Por favor, selecione o Plantonista.");
                if(plantonistaSelect) plantonistaSelect.focus();
                return;
            }
            if (editandoRegistroIndex === null && !condominioIdSelecionado) { 
                alert("Por favor, selecione um Condomínio.");
                if(condominioSelect) condominioSelect.focus();
                return;
            }

            if (!validarChecklistAtual()) {
                alert("Preencha todos os campos obrigatórios do checklist. Observação é obrigatória se houver itens com defeito.");
                return;
            }

            const dataHoraRegistro = lastFetchedTime ? new Date(lastFetchedTime.getTime()) : new Date();
            const condominioObj = condominios.find(c => c.id === condominioIdSelecionado);

            if (!condominioObj) { 
                alert("Erro: Condomínio não encontrado para o ID: " + condominioIdSelecionado);
                return;
            }

            const resultadosChecklist = [];
            const itensDoDOM = checklistContainer.querySelectorAll('.checklist-item');
            itensDoDOM.forEach(itemDiv => {
                const itemId = itemDiv.dataset.itemId;
                const itemOriginal = condominioObj.itens_checklist.find(i => i.id_item === itemId);
                resultadosChecklist.push({
                    id_item_original: itemId,
                    descricao: itemOriginal ? itemOriginal.descricao : 'N/A',
                    total_unidades: itemOriginal ? itemOriginal.total_unidades : 0,
                    funcionando: parseInt(itemDiv.querySelector(`input[id^="item_func_"]`).value) || 0,
                    com_defeito: parseInt(itemDiv.querySelector(`input[id^="item_def_"]`).value) || 0,
                    observacao: itemDiv.querySelector(`textarea[id^="item_obs_"]`).value.trim()
                });
            });

            const registroProcessado = {
                plantonista: plantonistaSelecionado,
                condominio_id: condominioObj.id, 
                condominio_nome: condominioObj.nome,
                data_hora_verificacao: (editandoRegistroIndex !== null) ? registrosDaSessao[editandoRegistroIndex].data_hora_verificacao : formatDateTime(dataHoraRegistro),
                timestamp_verificacao_iso: (editandoRegistroIndex !== null) ? registrosDaSessao[editandoRegistroIndex].timestamp_verificacao_iso : dataHoraRegistro.toISOString(),
                checklist_resultados: resultadosChecklist
            };

            if (editandoRegistroIndex !== null) { 
                registrosDaSessao[editandoRegistroIndex] = registroProcessado;
                alert(`Alterações no condomínio "${condominioObj.nome}" salvas com sucesso!`);
                editandoRegistroIndex = null;
                revisaoIniciada = true; 
                renderReviewPage(); 
            } else { 
                registrosDaSessao.push(registroProcessado);
                alert(`Condomínio "${condominioObj.nome}" adicionado à lista de revisão. ${registrosDaSessao.length} registro(s) na sessão.`);
                popularCondominiosDropdown(); 
                if(condominioSelect) condominioSelect.value = '';
                renderChecklist(null);
                 if(condominioLinkWrapper) condominioLinkWrapper.classList.add('hidden'); 
            }
            atualizarEstadoBotoesEInterface();
        });
    }

    if (btnRevisarRegistros) {
        btnRevisarRegistros.addEventListener('click', function() {
            if (editandoRegistroIndex !== null) { 
                editandoRegistroIndex = null;   
                revisaoIniciada = true;         
                renderReviewPage();             
            } else { 
                revisaoIniciada = !revisaoIniciada; 
                if (revisaoIniciada) {
                    renderReviewPage();
                } else { 
                    popularCondominiosDropdown(); 
                    if(condominioSelect) condominioSelect.value = ''; 
                    renderChecklist(null); 
                    if(condominioLinkWrapper) condominioLinkWrapper.classList.add('hidden');
                }
            }
            atualizarEstadoBotoesEInterface();
        });
    }

    if (btnFinalizarExportarJson) {
        btnFinalizarExportarJson.addEventListener('click', function() {
            if (registrosDaSessao.length === 0) {
                alert("Nenhuma verificação foi registrada nesta sessão para exportar.");
                return;
            }
            if (!revisaoIniciada && editandoRegistroIndex === null) { 
                 alert("Por favor, revise os registros antes de finalizar e exportar o JSON.");
                 revisaoIniciada = true; 
                 renderReviewPage();
                 atualizarEstadoBotoesEInterface();
                 return;
            }

            const dataHoraExportacao = lastFetchedTime ? new Date(lastFetchedTime.getTime()) : new Date();
            const timestampArquivo = dataHoraExportacao.toISOString().slice(0,19).replace(/:/g,'-').replace('T','_');
            const plantonistaNomeParaArquivo = (plantonistaSelect.value || (registrosDaSessao.length > 0 ? registrosDaSessao[0].plantonista : 'Plantonista')).replace(/[^a-zA-Z0-9_.-]/g, '_'); 
            const nomeArquivoFinal = `plantao_WR_${plantonistaNomeParaArquivo}_${timestampArquivo}.json`;

            const jsonData = JSON.stringify(registrosDaSessao, null, 2);
            const blob = new Blob([jsonData], { type: 'application/json' });
            const url = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = nomeArquivoFinal;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            alert(`Relatório JSON completo com ${registrosDaSessao.length} verificações foi exportado como '${nomeArquivoFinal}'!`);

            registrosDaSessao = [];
            revisaoIniciada = false;
            editandoRegistroIndex = null;
            if (plantonistaSelect) plantonistaSelect.value = '';
            popularCondominiosDropdown(); 
            if (condominioSelect) condominioSelect.value = '';
            renderChecklist(null);
            if(condominioLinkWrapper) condominioLinkWrapper.classList.add('hidden');
            atualizarEstadoBotoesEInterface();
        });
    }

    if (btnExportarPdf) {
        btnExportarPdf.addEventListener('click', function() {
            if (registrosDaSessao.length === 0) {
                alert("Nenhuma verificação foi registrada nesta sessão para exportar para PDF.");
                return;
            }
             if (!revisaoIniciada && editandoRegistroIndex === null) {
                 alert("Por favor, revise os registros antes de exportar para PDF.");
                 revisaoIniciada = true;
                 renderReviewPage();
                 atualizarEstadoBotoesEInterface();
                 return;
            }

            const { jsPDF } = window.jspdf; 
            const doc = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });
            doc.setFont('helvetica', 'normal');

            let startY = 15;
            const pageHeight = doc.internal.pageSize.height;
            const pageWidth = doc.internal.pageSize.width;
            const margin = 14;
            let pageNumber = 1;

            function addHeaderPdf() { 
                doc.setFontSize(18);
                doc.setTextColor(4, 3, 48); 
                doc.text("Relatório de Plantão WR", pageWidth / 2, startY, { align: "center" });
                startY += 8;
                doc.setDrawColor(4, 3, 48); 
                doc.line(margin, startY, pageWidth - margin, startY); 
                startY += 8;
            }
            function addFooterPdf() {
                doc.setFontSize(10);
                doc.setTextColor(100);
                doc.text("Página " + pageNumber, pageWidth - margin, pageHeight - 10, {align: 'right'});
            }
            
            addHeaderPdf();
            addFooterPdf();

            const plantonistaNome = (plantonistaSelect && plantonistaSelect.value && editandoRegistroIndex === null) 
                                ? plantonistaSelect.value 
                                : (registrosDaSessao.length > 0 ? registrosDaSessao[0].plantonista : 'N/A');
            doc.setFontSize(12);
            doc.setTextColor(0, 0, 0); 
            doc.text(`Plantonista: ${plantonistaNome}`, margin, startY);
            startY += 7;
            doc.text(`Data da Exportação: ${formatDateTime(new Date())}`, margin, startY);
            startY += 10;

            registrosDaSessao.forEach((registro, index) => {
                const estimativaAlturaCabecalhoRegistro = 20; 
                const estimativaAlturaPorItemChecklist = 7; 
                const estimativaAlturaTabela = registro.checklist_resultados.length * estimativaAlturaPorItemChecklist + 10; 
                
                if (startY + estimativaAlturaCabecalhoRegistro + estimativaAlturaTabela > pageHeight - 20) { 
                    doc.addPage();
                    pageNumber++;
                    startY = 15; 
                    addHeaderPdf();
                    addFooterPdf();
                    doc.setFontSize(12);
                    doc.setTextColor(0,0,0);
                    doc.text(`Plantonista: ${plantonistaNome} (continuação)`, margin, startY);
                    startY += 7;
                    doc.text(`Data da Exportação: ${formatDateTime(new Date())}`, margin, startY);
                    startY += 10;
                }

                doc.setFontSize(14);
                doc.setFont('helvetica', 'bold');
                doc.text(registro.condominio_nome, margin, startY);
                startY += 6;
                doc.setFontSize(10);
                doc.setFont('helvetica', 'normal');
                doc.text(`Data da Verificação: ${registro.data_hora_verificacao}`, margin, startY);
                startY += 8;

                // NÃO ADICIONAR Informações de Acesso ao PDF
                // A seção que adicionava condominioOriginal.acessos foi removida daqui.

                const head = [["Item", "Total", "Funcionando", "Defeito", "Observação"]];
                const body = registro.checklist_resultados.map(item => [
                    item.descricao,
                    item.total_unidades.toString(),
                    item.funcionando.toString(),
                    item.com_defeito.toString(),
                    item.observacao || "-"
                ]);

                doc.autoTable({
                    startY: startY,
                    head: head,
                    body: body,
                    theme: 'striped', 
                    headStyles: { fillColor: [4, 3, 48], textColor: [255,255,255], fontStyle: 'bold' }, 
                    styles: { font: 'helvetica', fontSize: 9, cellPadding: 2, overflow: 'linebreak' }, 
                    columnStyles: {
                        0: { cellWidth: 50 }, 
                        1: { cellWidth: 15, halign: 'center' },  
                        2: { cellWidth: 25, halign: 'center' }, 
                        3: { cellWidth: 20, halign: 'center' },  
                        4: { cellWidth: 'auto' }  
                    },
                    didDrawPage: function (dataHook) {
                        if (dataHook.pageNumber > pageNumber) {
                            pageNumber = dataHook.pageNumber;
                        }
                        addFooterPdf(); 
                    }
                });
                startY = doc.autoTable.previous.finalY + 10; 
            });
            if (doc.internal.getNumberOfPages() === pageNumber) {
                doc.setPage(pageNumber); 
                addFooterPdf();
            }

            const nomeArquivoBase = `relatorio_plantao_WR_${plantonistaNome.replace(/[^a-zA-Z0-9_.-]/g, '_')}`;
            const timestampArquivo = (lastFetchedTime || new Date()).toISOString().slice(0,10);
            const nomeArquivoFinal = `${nomeArquivoBase}_${timestampArquivo}.pdf`;
            
            doc.save(nomeArquivoFinal);
            alert(`Relatório PDF exportado como '${nomeArquivoFinal}'! (Sem informações de acesso internas)`);
        });
    }
    atualizarEstadoBotoesEInterface(); 
});