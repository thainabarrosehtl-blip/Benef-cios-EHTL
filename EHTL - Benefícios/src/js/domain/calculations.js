import { settings } from '../data/mock-data.js';

const parseDate = (value) => new Date(`${value}T12:00:00`);

export function getCompetencyDays(competency) {
  const [year, month] = competency.split('-').map(Number);
  const days = new Date(year, month, 0).getDate();
  return Array.from({ length: days }, (_, index) => new Date(year, month - 1, index + 1));
}

function isWorkday(date, employee) {
  const weekday = date.getDay();
  if (employee.schedule === '12x36') return Math.floor((date - parseDate(employee.admission)) / 86400000) % 2 === 0;
  if (employee.schedule === 'Plantao') return weekday === 0 || weekday === 3 || weekday === 6;
  if (employee.schedule === 'Sabados') return weekday !== 0;
  return weekday > 0 && weekday < 6;
}

function isInsideEmployment(date, employee) {
  const admission = parseDate(employee.admission);
  const termination = employee.termination ? parseDate(employee.termination) : null;
  return date >= admission && (!termination || date <= termination);
}

export function calculateEmployeeBenefits(employee, competency, documents = []) {
  const eligibleDays = getCompetencyDays(competency).filter((date) => isInsideEmployment(date, employee) && isWorkday(date, employee));
  const employeeDocuments = documents.filter((item) => item.employeeId === employee.id && item.type === 'Atestado');
  const vrDiscountDays = employeeDocuments.filter((item) => item.deductVr).reduce((total, item) => total + item.days, 0);
  const vtDiscountDays = employeeDocuments.filter((item) => item.deductVt).reduce((total, item) => total + item.days, 0);
  const vrDays = Math.max(eligibleDays.length - vrDiscountDays, 0);
  const directDays = eligibleDays.filter((date) => (date - parseDate(employee.admission)) / 86400000 < 5).length;
  const vrGross = eligibleDays.length * settings.vrDailyValue;
  const vrDiscount = Math.min(vrDiscountDays * settings.vrDailyValue, vrGross);
  const vtGross = eligibleDays.length * (settings.transportFares[employee.transport] || 0) * (employee.transportTrips || 0);
  const vtDiscountBase = Math.max(eligibleDays.length - vtDiscountDays, 0) * (settings.transportFares[employee.transport] || 0) * (employee.transportTrips || 0);
  const vtDiscount = Math.min(vtDiscountBase, employee.salary * (settings.vtDiscountPercent / 100));
  return { eligibleDays: eligibleDays.length, discountDays: vrDiscountDays, vrDiscountDays, vtDiscountDays, vrDays, directDays, vrGross, vrDiscount, vtGross, vtDiscount, vrNet: vrGross - vrDiscount, vtNet: vtGross - vtDiscount };
}

export function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

export function formatDate(value) {
  return new Intl.DateTimeFormat('pt-BR').format(parseDate(value));
}