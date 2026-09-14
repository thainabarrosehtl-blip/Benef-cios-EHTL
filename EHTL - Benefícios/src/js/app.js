import { renderDashboard, renderEmployees, renderBenefits, renderPlaceholder, bindEmployeeSearch, bindViewActions } from './ui/views.js';

const app = document.querySelector('#app');
const pageTitle = document.querySelector('#page-title');
const competencySelect = document.querySelector('#competency-select');
let currentView = 'dashboard';

const labels = { dashboard: 'Dashboard', employees: 'Colaboradores', benefits: 'Beneficios', dependents: 'Dependentes', documents: 'Atestados', competencies: 'Competencias', reports: 'Relatorios', settings: 'Configuracoes' };

function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.querySelector('#toast-region').append(toast);
  setTimeout(() => toast.remove(), 3000);
}

function render(view = currentView) {
  currentView = view;
  const competency = competencySelect.value;
  pageTitle.textContent = labels[view];
  document.querySelectorAll('.nav-item').forEach((item) => item.classList.toggle('active', item.dataset.view === view));
  if (view === 'dashboard') app.innerHTML = renderDashboard(competency);
  else if (view === 'employees') app.innerHTML = renderEmployees();
  else if (view === 'benefits') app.innerHTML = renderBenefits(competency);
  else app.innerHTML = renderPlaceholder(labels[view], `Gestao / ${labels[view]}`);
  bindViewActions(render, showToast);
  bindEmployeeSearch();
}

competencySelect.addEventListener('change', () => render(currentView));
render();