# Requirements

1.0 Multi-tenant & Conven��es Prisma
1.1 Todos os modelos devem possuir `workspaceId` e �ndices `[workspaceId, ...]` para filtros frequentes.
1.2 Campos `createdAt`/`updatedAt` padr�o Prisma em todas as tabelas audit�veis.
1.3 Modelos sujeitos a recupera��o usam `deletedAt` (soft delete) com �ndices adequados.
1.4 Enums Prisma precisam ser re-exportados em `types/prisma.ts`.

2.0 Identidade & Acesso
2.1 `Workspace` armazena `name`, `slug`, `ownerId` (ref `UserProfile`).
2.2 `UserProfile` mant�m liga��o com Clerk via `clerkUserId` �nico.
2.3 `WorkspaceMember` gerencia `role` (enum `ADMIN`, `MANAGER`, `SELLER`, `VIEWER`) e timestamps de convite.
2.4 `SessionAudit` registra logins, IP e userAgent por workspace.

3.0 Empresas & Contatos
3.1 `Company` cont�m dados b�sicos, tags, endere�o e `document` para deduplica��o.
3.2 `Contact` pode ser independente ou vinculado � empresa, com flag `isPrimary`.
3.3 `CompanyNote` e `ContactNote` registram hist�rico textual com autor e data.

4.0 Produtos & Pre�os
4.1 `Product` guarda `sku`, `price`, `currency`, `unit`, `active`, `deletedAt`.
4.2 `PriceTable` pertence ao workspace e define `currency` e `active`.
4.3 `PriceTableItem` relaciona produto � tabela com ranges de quantidade e pre�o.

5.0 Pipeline & Deals
5.1 `Pipeline` define `name`, `description`, `isDefault`, `order`.
5.2 `PipelineStage` inclui `probability`, `order`, `slaDays`.
5.3 `Deal` re�ne `pipelineId`, `stageId`, `companyId`, `contactId`, `ownerId`, `value`, `status` (`OPEN|WON|LOST|ON_HOLD`).
5.4 `DealStageHistory` registra transi��es com `fromStageId`, `toStageId`, `changedById` e `changedAt`.
5.5 `DealItem` suporta itens livres (`productId?`), quantidade, desconto e moeda.
5.6 `DealFollower` liga usu�rios a deals para notifica��es.

6.0 Atividades & Logs
6.1 `Activity` suporta associa��o opcional a deal/company/contact e campos `type`, `priority`, `dueDate`, `completedAt`.
6.2 `ActivityAttachment` salva metadados do Uploadthing.
6.3 `EmailLog` vincula corpo/assunto/dire��o (`INBOUND|OUTBOUND`) a uma atividade.

7.0 Propostas & Documentos
7.1 `ProposalTemplate` cont�m `content` com placeholders (`{{ }}`) e `fields` serializados.
7.2 `Proposal` armazena `dealId`, `status` (`DRAFT|SENT|VIEWED|ACCEPTED|REJECTED`), timestamps e `publicToken`.
7.3 `ProposalItem` lista itens com `sortOrder`.
7.4 `ProposalSignature` guarda assinaturas com IP e status.

8.0 Workflows & Automa��es
8.1 `Workflow` referencia workspace, criador, `active`.
8.2 `WorkflowTrigger` define `type` (`DEAL_CREATED`, etc.) e `configJson`.
8.3 `WorkflowAction` define `type` (`CREATE_ACTIVITY`, etc.), `configJson`, `order`.
8.4 `WorkflowRun` e `WorkflowLog` armazenam execu��es, status e mensagens.

9.0 Campos Personalizados
9.1 `CustomFieldDefinition` tipa entidade (`COMPANY`, `CONTACT`, etc.), `type` (`TEXT`, `NUMBER`, ...), regras (`required`, `isUnique`).
9.2 `CustomFieldValue` suporta colunas espec�ficas (`valueString`, `valueNumber`, `valueDate`, `valueJson`).
9.3 Defini��es controlam visibilidade por meio de `visibilityJson` e `settingsJson`.

10.0 Relat�rios & Dashboards
10.1 `Dashboard` pode ser default e pertencer a usu�rio/ workspace.
10.2 `DashboardWidget` controla `type`, `configJson`, `order`, `size`.
10.3 `ReportSnapshot` mant�m agregados com range temporal.

11.0 Integra��es & API P�blica
11.1 `EmailIntegration` e `WhatsappIntegration` guardam `settingsJson`, `status`.
11.2 `WebhookEndpoint` + `WebhookDelivery` gerenciam webhooks configur�veis e retries.
11.3 `PublicApiKey` armazena hash da chave, limites por minuto/dia e status.
11.4 `ApiRequestLog` registra rota, m�todo, status e lat�ncia.

12.0 Auditoria & Seeds
12.1 `AuditLog` registra `actorId`, `entity`, `action`, `changesJson`, `createdAt`, `ip`.
12.2 Seeds devem criar workspace demo, pipelines, deals, produtos, campos personalizados e workflows.
12.3 Seeds precisam ser idempotentes usando `upsert`.
12.4 Migra��es nomeadas em kebab-case; `prisma/schema.prisma`, `prisma/seed.ts` organizados.
