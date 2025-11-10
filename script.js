// URL base do calendário do Google com ambos os calendários
const baseURL = "https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=America%2FSao_Paulo"
  + "&src=892c75608373b5dad6199a07949f0fa8e09f8b4041885220f081ce03de9d050c%40group.calendar.google.com&color=%23F6BF26"   // amarelo
  + "&src=bd2d794a96abb5b4708c08e2efad8136c5663b9ba346e7d4597a7e48fc506435%40group.calendar.google.com&color=%23E67C73"   // vermelho
  + "&src=167c0e7f60a4ecdfbf2dcba6d71dab6c3541fec1af014bd7515a6757861b5533%40group.calendar.google.com&color=%234285F4"   // azul espacial
  + "&showTitle=0&showTabs=0&showPrint=0&showCalendars=0&showTz=0";


// Estado atual da visualização
let currentMode = 'AGENDA';

// Mapeamento de modos para labels
const modeLabels = {
    'DAY': 'Hoje',
    'WEEK': 'Semana',
    'AGENDA': 'Agenda'
};

/**
 * Função para mudar a visualização do calendário
 * @param {string} mode - Modo de visualização (DAY, WEEK, AGENDA)
 */
function changeView(mode) {
    // Atualizar o estado atual
    currentMode = mode;
    
    // Atualizar o iframe com a nova URL
    const iframe = document.getElementById('calendarFrame');
    iframe.src = `${baseURL}&mode=${mode}`;
    
    // Atualizar os estados dos botões
    updateButtonStates();
    
    // Adicionar feedback visual (scroll suave até o calendário)
    setTimeout(() => {
        const calendarContent = document.querySelector('.calendar-content');
        if (calendarContent) {
            calendarContent.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }, 300);
}

/**
 * Atualizar os estados visuais dos botões
 */
function updateButtonStates() {
    const buttons = document.querySelectorAll('.calendar-controls button');
    
    buttons.forEach(button => {
        // Remover classe ativa de todos os botões
        button.classList.remove('active');
        
        // Adicionar classe ativa ao botão correspondente ao modo atual
        if (button.getAttribute('data-mode') === currentMode) {
            button.classList.add('active');
        }
    });
}

/**
 * Inicializar a página quando o DOM estiver carregado
 */
document.addEventListener('DOMContentLoaded', function() {
    // Definir o estado inicial dos botões
    updateButtonStates();
    
    // Adicionar listeners de teclado para acessibilidade
    document.addEventListener('keydown', function(event) {
        // Tecla 'D' para Dia
        if (event.key === 'd' || event.key === 'D') {
            changeView('DAY');
        }
        // Tecla 'S' para Semana
        if (event.key === 's' || event.key === 'S') {
            changeView('WEEK');
        }
        // Tecla 'A' para Agenda
        if (event.key === 'a' || event.key === 'A') {
            changeView('AGENDA');
        }
    });
});
