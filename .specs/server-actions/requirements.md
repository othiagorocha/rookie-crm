# Requirements

1.0 Padrões Gerais
1.1 Server Actions residem em `actions/<feature>-actions.ts` com exportações nomeadas.
1.2 Todas as actions usam `try/catch` e retornam dados válidos; erros relançados com `new Error(getErrorMessage(err))`.
1.3 Inputs validados com Zod (`validations/<feature>-schema.ts`) usando `safeParse`.
1.4 Logs de erro passam por `logError(error, context)` em ambientes não produtivos.
1.5 Helpers de autorização (`requireWorkspaceMember`, `authorize`) centralizados em `lib/authz.ts`.

2.0 Autenticação & Contexto
2.1 Actions verificam `auth()` (Clerk) e garantem `userId` presente.
2.2 Workspace ativo identificado por slug/id e validado contra membership.
2.3 Ações críticas registram `AuditLog` após sucesso.

3.0 Hooks TanStack Query
3.1 Cada action de listagem deve ter hook partner em `hooks/` com `useQuery`/`useInfiniteQuery` e `queryKey` documentado.
3.2 Actions de mutação invalidam queries relevantes via `queryClient.invalidateQueries`.

4.0 Domínio Workspace & Usuários
4.1 `createWorkspaceAction` cria workspace, owner member e recursos default.
4.2 `inviteMemberAction`, `updateMemberRoleAction`, `removeMemberAction` obedecem roles e enviam emails (mock).
4.3 `getMembersAction` suporta paginação e filtros.

5.0 Empresas & Contatos
5.1 CRUD completo com deduplicação (`document`, `email`).
5.2 Capacidade de anexar/destacar contatos de empresas.
5.3 Notas criadas/removidas com auditoria.

6.0 Campos Personalizados
6.1 Actions para criar/atualizar/ordenar definições.
6.2 `setCustomFieldValueAction` aceita múltiplos valores e usa transações.
6.3 Regras de obrigatoriedade e unicidade validadas antes de persistir.

7.0 Produtos & Preços
7.1 `createProductAction`, `updateProductAction`, `archiveProductAction` mantêm integridade com deals.
7.2 `addPriceTableItemAction`, `updatePriceTableItemAction`, `removePriceTableItemAction` validam ranges.

8.0 Pipeline & Deals
8.1 Actions para criar pipeline e estágios respeitam ordem incremental.
8.2 `createDealAction` aceita itens, calcula totais e lança auditoria.
8.3 `updateDealStageAction` registra `DealStageHistory` e dispara workflows.
8.4 `updateDealStatusAction` gerencia motivos de perda e triggers de vitória.
8.5 `addDealFollowerAction` / `removeDealFollowerAction` gerenciam assinaturas.

9.0 Atividades
9.1 `createActivityAction` valida relacionamento principal.
9.2 `completeActivityAction` registra `completedAt` e agenda follow-up opcional.
9.3 `attachFileToActivityAction` salva metadados de Uploadthing.
9.4 `logEmailReplyAction` registra `EmailLog` associado.

10.0 Propostas
10.1 `createProposalFromDealAction` gera itens com base em `DealItem`.
10.2 `updateProposalContentAction` valida placeholders existentes.
10.3 `sendProposalAction` gera link público, marca status `SENT`, dispara email mock.
10.4 `acceptProposalAction` verifica token, atualiza status, dispara workflows e auditoria.
10.5 `generateProposalPdfAction` integra com serviço de upload.

11.0 Workflows
11.1 CRUD de workflows, triggers e actions com validação granular do `configJson`.
11.2 Execução sequencial com logging em `WorkflowRun`/`WorkflowLog`.
11.3 `simulateWorkflowAction` executa run isolado sem efeitos permanentes.

12.0 Relatórios & Dashboards
12.1 Actions para widgets consultam Prisma com agregações e caching (`revalidateTag`/`revalidatePath`).
12.2 `exportReportCsvAction` gera arquivos temporários e retorna URL.

13.0 Integrações & API
13.1 Actions para integrações email/WhatsApp salvam configs e disparam testes mock.
13.2 Webhooks: registrar endpoint, ativar/desativar, reenfileirar entregas.
13.3 API keys: criar, revogar, rotacionar, armazenar hash.
13.4 `logWebhookDeliveryAction` e `logApiRequestAction` chamados internamente.

14.0 Segurança & Resiliência
14.1 Todas as queries filtram por `workspaceId` do contexto.
14.2 Lidar com conflitos usando transações e optimistic updates.
14.3 Sanitizar conteúdo HTML (propostas/notas) antes de persistir.
