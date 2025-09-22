# Requirements

1.0 Padr�es Gerais
1.1 Server Actions residem em `actions/<feature>-actions.ts` com exporta��es nomeadas.
1.2 Todas as actions usam `try/catch` e retornam dados v�lidos; erros relan�ados com `new Error(getErrorMessage(err))`.
1.3 Inputs validados com Zod (`validations/<feature>-schema.ts`) usando `safeParse`.
1.4 Logs de erro passam por `logError(error, context)` em ambientes n�o produtivos.
1.5 Helpers de autoriza��o (`requireWorkspaceMember`, `authorize`) centralizados em `lib/authz.ts`.

2.0 Autentica��o & Contexto
2.1 Actions verificam `auth()` (Clerk) e garantem `userId` presente.
2.2 Workspace ativo identificado por slug/id e validado contra membership.
2.3 A��es cr�ticas registram `AuditLog` ap�s sucesso.

3.0 Hooks TanStack Query
3.1 Cada action de listagem deve ter hook partner em `hooks/` com `useQuery`/`useInfiniteQuery` e `queryKey` documentado.
3.2 Actions de muta��o invalidam queries relevantes via `queryClient.invalidateQueries`.

4.0 Dom�nio Workspace & Usu�rios
4.1 `createWorkspaceAction` cria workspace, owner member e recursos default.
4.2 `inviteMemberAction`, `updateMemberRoleAction`, `removeMemberAction` obedecem roles e enviam emails (mock).
4.3 `getMembersAction` suporta pagina��o e filtros.

5.0 Empresas & Contatos
5.1 CRUD completo com deduplica��o (`document`, `email`).
5.2 Capacidade de anexar/destacar contatos de empresas.
5.3 Notas criadas/removidas com auditoria.

6.0 Campos Personalizados
6.1 Actions para criar/atualizar/ordenar defini��es.
6.2 `setCustomFieldValueAction` aceita m�ltiplos valores e usa transa��es.
6.3 Regras de obrigatoriedade e unicidade validadas antes de persistir.

7.0 Produtos & Pre�os
7.1 `createProductAction`, `updateProductAction`, `archiveProductAction` mant�m integridade com deals.
7.2 `addPriceTableItemAction`, `updatePriceTableItemAction`, `removePriceTableItemAction` validam ranges.

8.0 Pipeline & Deals
8.1 Actions para criar pipeline e est�gios respeitam ordem incremental.
8.2 `createDealAction` aceita itens, calcula totais e lan�a auditoria.
8.3 `updateDealStageAction` registra `DealStageHistory` e dispara workflows.
8.4 `updateDealStatusAction` gerencia motivos de perda e triggers de vit�ria.
8.5 `addDealFollowerAction` / `removeDealFollowerAction` gerenciam assinaturas.

9.0 Atividades
9.1 `createActivityAction` valida relacionamento principal.
9.2 `completeActivityAction` registra `completedAt` e agenda follow-up opcional.
9.3 `attachFileToActivityAction` salva metadados de Uploadthing.
9.4 `logEmailReplyAction` registra `EmailLog` associado.

10.0 Propostas
10.1 `createProposalFromDealAction` gera itens com base em `DealItem`.
10.2 `updateProposalContentAction` valida placeholders existentes.
10.3 `sendProposalAction` gera link p�blico, marca status `SENT`, dispara email mock.
10.4 `acceptProposalAction` verifica token, atualiza status, dispara workflows e auditoria.
10.5 `generateProposalPdfAction` integra com servi�o de upload.

11.0 Workflows
11.1 CRUD de workflows, triggers e actions com valida��o granular do `configJson`.
11.2 Execu��o sequencial com logging em `WorkflowRun`/`WorkflowLog`.
11.3 `simulateWorkflowAction` executa run isolado sem efeitos permanentes.

12.0 Relat�rios & Dashboards
12.1 Actions para widgets consultam Prisma com agrega��es e caching (`revalidateTag`/`revalidatePath`).
12.2 `exportReportCsvAction` gera arquivos tempor�rios e retorna URL.

13.0 Integra��es & API
13.1 Actions para integra��es email/WhatsApp salvam configs e disparam testes mock.
13.2 Webhooks: registrar endpoint, ativar/desativar, reenfileirar entregas.
13.3 API keys: criar, revogar, rotacionar, armazenar hash.
13.4 `logWebhookDeliveryAction` e `logApiRequestAction` chamados internamente.

14.0 Seguran�a & Resili�ncia
14.1 Todas as queries filtram por `workspaceId` do contexto.
14.2 Lidar com conflitos usando transa��es e optimistic updates.
14.3 Sanitizar conte�do HTML (propostas/notas) antes de persistir.
