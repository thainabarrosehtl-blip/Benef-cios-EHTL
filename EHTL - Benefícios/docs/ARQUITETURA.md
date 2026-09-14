# EHTL Beneficios

## 1. Arquitetura

O prototipo usa HTML, CSS e JavaScript modular. O estado atual fica em um repositorio em memoria com dados ficticios; os servicos recebem dependencias por funcao para que o repositorio possa ser trocado por uma API sem alterar as telas.

Camadas previstas:

1. `ui`: navegacao, componentes de tela, tabelas, formularios e feedback visual.
2. `domain`: calculos de dias elegiveis, beneficios, pendencias e validacoes.
3. `data`: repositorios locais no prototipo e, futuramente, clientes HTTP.
4. `integrations`: adaptadores isolados para Kairos e Crowe.
5. `config`: valores e regras editaveis pelo RH, sem numeros espalhados pelo codigo.

O backend futuro deve ser o responsavel por autenticacao, autorizacao, LGPD, segredos, auditoria e integracoes externas. O navegador nunca deve receber chaves de API.

## 2. Estrutura de pastas

```text
/
  index.html
  README.md
  docs/ARQUITETURA.md
  src/
    css/styles.css
    js/app.js
    js/data/mock-data.js
    js/domain/calculations.js
    js/ui/views.js
```

## 3. Modelo de banco de dados futuro

- `employees`: id, nome, cpf_hash, matricula, cargo, departamento, admissao, desligamento, salario, contrato, jornada_id, escala_id, horario, transporte_id, status.
- `dependents`: id, employee_id, nome, cpf_hash, nascimento, parentesco, amil, odonto, salario_familia, ir, crowe_status, enviado_em, observacoes.
- `documents`: id, employee_id, tipo, inicio, fim, dias, desconta_vr, desconta_vt, crowe_status, kairos_status, observacoes.
- `benefit_enrollments`: id, employee_id, beneficio, adesao, plano, plataforma_status, incluido_em, status.
- `transport_fares`: id, nome, tipo, valor, ativo, vigencia_inicio, vigencia_fim.
- `competencies`: id, ano, mes, status, fechado_em, fechado_por.
- `benefit_calculations`: id, competency_id, employee_id, beneficio, dias_elegiveis, dias_desconto, valor_bruto, desconto, pagamento_direto, calculado_em.
- `pendings`: id, tipo, employee_id, dependent_id, document_id, severidade, status, prazo, resolvido_em.
- `integration_logs`: id, sistema, operacao, referencia, status, payload_hash, erro, criado_em.
- `audit_logs`: id, usuario_id, entidade, entidade_id, acao, antes, depois, criado_em.

CPF deve ser protegido no armazenamento e mascarado na interface. Os registros operacionais precisam manter trilha de auditoria.

## 4. Fluxo dos modulos

- **Colaboradores:** cadastrar dados funcionais e escala; ao salvar, derivar pendencias de transporte, Amil e beneficios opcionais.
- **Beneficios:** controlar adesao, plano, titular/dependentes, inclusao na plataforma e status.
- **Dependentes:** vincular ao colaborador e gerar pendencia quando o envio para Crowe estiver incompleto.
- **Atestados:** registrar periodo, tipo, descontos e status Crowe/Kairos; declaracoes nao entram nos descontos.
- **Competencias:** selecionar mes, gerar dias da escala, aplicar limites contratuais, afastamentos, feriados e regras configuradas; revisar e fechar.
- **Pendencias:** centralizar tarefas com severidade, origem, responsavel e resolucao.
- **Relatorios:** filtrar dados normalizados e exportar CSV; no backend, gerar XLSX e arquivos de intercambio Crowe.

## 5. Regras de calculo

1. O periodo elegivel e a intersecao entre a competencia e o vinculo ativo.
2. A escala individual decide quais dias contam; nao se assume segunda a sexta.
3. Cada jornada deve ser representada por uma estrategia configuravel: semanal, plantao, 12x36, noturna ou calendario customizado.
4. VR = dias elegiveis x valor diario - descontos de documentos que tenham `desconta_vr`.
5. VT = deslocamentos por dia x tarifa aplicavel x dias elegiveis; o desconto de folha usa o percentual configurado e nunca deve ultrapassar o valor bruto.
6. Os cinco primeiros dias apos a admissao sao marcados como pagamento direto, sem alterar a quantidade elegivel.
7. Declaracoes nao geram desconto de VR/VT. Atestados so geram desconto quando marcados explicitamente.
8. Feriados, ferias e afastamentos devem ser fontes configuraveis do calendario, nunca regras escondidas no frontend.
9. Toda alteracao de regra deve registrar versao e usuario para permitir reprocessamento e auditoria.

## 6. Telas da entrega por etapas

Etapa 1: Dashboard, Colaboradores e Beneficios.

Etapa 2: Dependentes, Atestados e Pendencias.

Etapa 3: Competencias, calculo detalhado e fechamento.

Etapa 4: Relatorios, exportacao CSV/XLSX e Configuracoes.

Etapa 5: autenticacao, perfis, API, auditoria e integracoes.

## 7. Kairos e Crowe

O frontend deve chamar apenas a API propria. No backend, `KairosClient` encapsula endpoints de colaboradores, marcacoes, jornadas, escalas, faltas, atestados, ferias, afastamentos e horas extras. Um job sincroniza por cursor e grava `integration_logs`.

Para a Crowe, `CroweExportService` monta arquivos a partir de uma competencia revisada, valida campos obrigatorios, gera protocolo e marca os registros enviados. Falhas ficam reprocessaveis sem duplicar dados.

As credenciais ficam em variaveis de ambiente ou secret manager, com rotacao, escopo minimo e mascaramento de logs.