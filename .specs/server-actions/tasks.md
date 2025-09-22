[] - Configurar helpers `lib/authz.ts`, `lib/workspace.ts` e `lib/tanstack-helpers.ts` com validações de membership e query keys.
  _Requirements 1.5, 2.2, 3.2, 14.1
[] - Criar schemas Zod iniciais (`workspace-schema.ts`, `member-schema.ts`) e implementar `createWorkspaceAction` + seeds default.
  _Requirements 1.3, 4.1, 12.3
[] - Implementar actions de membros (invite/update/remove) com envio mock e auditoria.
  _Requirements 1.2, 1.4, 2.3, 4.2, 2.3
[] - Construir CRUD de empresas/contatos e notas com deduplicação e logs.
  _Requirements 1.2, 1.3, 5.1, 5.2, 5.3
[] - Implementar actions de campos personalizados (create/update/order/set values) com transações.
  _Requirements 1.3, 6.1, 6.2, 6.3, 14.2
[] - Desenvolver `product` e `price-table` actions garantindo integridade e ranges válidos.
  _Requirements 7.1, 7.2, 14.2
[] - Implementar pipeline/deal actions incluindo histórico, followers e triggers de status.
  _Requirements 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 8.2, 8.3, 8.4, 8.5
[] - Criar actions de atividades (create, complete, attach file, log email) alinhadas a Uploadthing e EmailLog.
  _Requirements 6.1, 6.2, 6.3, 9.1, 9.2, 9.3, 9.4
[] - Implementar fluxo de propostas (create from deal, update content, send, accept, generate PDF).
  _Requirements 7.1, 7.2, 7.3, 7.4, 10.1, 10.2, 10.3, 10.4, 10.5
[] - Desenvolver CRUD e execução de workflows com logging e simulação.
  _Requirements 8.1, 8.2, 8.3, 8.4, 11.1, 11.2, 11.3
[] - Construir actions de relatórios/dashboards (widgets, snapshots, export CSV) com caching.
  _Requirements 12.1, 12.2, 12.3
[] - Implementar integrações e API keys (create/revoke/rotate), webhooks e logging associado.
  _Requirements 13.1, 13.2, 13.3, 13.4
[] - Criar hooks TanStack Query para listas/mutações principais, invalidando keys corretas.
  _Requirements 1.2, 3.1, 3.2, 14.2
[] - Adicionar sanitização de conteúdo em actions relevantes (propostas/notas) e logging padronizado.
  _Requirements 1.4, 14.3
