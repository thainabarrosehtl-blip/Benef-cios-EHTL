export const settings = {
  vrDailyValue: 44,
  vtDiscountPercent: 6,
  childcareValue: 536.22,
  smashCardValue: 100,
  dentalPlans: {
    'Doc': 14.63,
    'Doc White': 38.15,
    'Premium Top': 69.52
  },
  transportFares: {
    'Integracao': 9.4,
    'Intermunicipal': 12.8,
    'Onibus': 5.2,
    'Metro/trem': 5.0,
    'Outros': 0
  }
};

export const employees = [
  {
    id: 'emp-001', name: 'Marina Costa', cpf: '***.482.***-**', registration: 'EHT-1042', role: 'Analista de Reservas', department: 'Operacoes', admission: '2023-04-10', salary: 4380, contract: 'CLT', schedule: 'Segunda a sexta', workHours: '09:00 - 18:00', transport: 'Metro/trem', transportTrips: 2, status: 'Ativo', birthday: '1992-09-22', amil: 'Concluido', dental: 'Pendente', totalpass: 'Concluido', smashCard: false
  },
  {
    id: 'emp-002', name: 'Rafael Nunes', cpf: '***.193.***-**', registration: 'EHT-1088', role: 'Coordenador de Tecnologia', department: 'Tecnologia', admission: '2024-02-01', salary: 8200, contract: 'CLT', schedule: '12x36', workHours: '07:00 - 19:00', transport: 'Onibus', transportTrips: 2, status: 'Ativo', birthday: '1988-09-08', amil: 'Concluido', dental: 'Nao aderiu', totalpass: 'Pendente', smashCard: false
  },
  {
    id: 'emp-003', name: 'Bianca Almeida', cpf: '***.726.***-**', registration: 'EHT-1115', role: 'Executiva Comercial', department: 'Comercial', admission: '2026-09-15', salary: 5120, contract: 'CLT', schedule: 'Segunda a sexta', workHours: '08:00 - 17:00', transport: '', transportTrips: 0, status: 'Ativo', birthday: '1995-09-29', amil: 'Pendente', dental: 'Pendente', totalpass: 'Pendente', smashCard: false
  },
  {
    id: 'emp-004', name: 'Caio Martins', cpf: '***.551.***-**', registration: 'EHT-0991', role: 'Assistente Financeiro', department: 'Financeiro', admission: '2022-07-18', salary: 3650, contract: 'CLT', schedule: 'Segunda a sexta', workHours: '08:00 - 17:00', transport: 'Integracao', transportTrips: 2, status: 'Desligado', termination: '2026-09-05', birthday: '1990-04-16', amil: 'Concluido', dental: 'Concluido', totalpass: 'Concluido', smashCard: false
  },
  {
    id: 'emp-005', name: 'Luciana Freitas', cpf: '***.840.***-**', registration: 'EHT-1063', role: 'Analista de Pessoas', department: 'Recursos Humanos', admission: '2023-11-06', salary: 4760, contract: 'CLT', schedule: 'Segunda a sexta', workHours: '09:00 - 18:00', transport: 'Intermunicipal', transportTrips: 2, status: 'Ativo', birthday: '1987-09-03', amil: 'Concluido', dental: 'Concluido', totalpass: 'Concluido', smashCard: true
  }
];

export const dependents = [
  { id: 'dep-001', employeeId: 'emp-001', name: 'Theo Costa', birthDate: '2019-02-14', relationship: 'Filho', amil: true, dental: false, familyAllowance: false, ir: true, sentToCrowe: true },
  { id: 'dep-002', employeeId: 'emp-003', name: 'Lia Almeida', birthDate: '2021-06-08', relationship: 'Filha', amil: false, dental: false, familyAllowance: true, ir: true, sentToCrowe: false }
];

export const documents = [
  { id: 'doc-001', employeeId: 'emp-002', type: 'Atestado', start: '2026-09-11', end: '2026-09-12', days: 2, deductVr: true, deductVt: true, sentToCrowe: false, kairos: false },
  { id: 'doc-002', employeeId: 'emp-001', type: 'Declaracao', start: '2026-09-04', end: '2026-09-04', days: 1, deductVr: false, deductVt: false, sentToCrowe: true, kairos: true }
];