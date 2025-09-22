# Requirements

1.0 Layout Global
1.1 `AppShell` deve renderizar sidebar fixa em desktop e drawer em mobile.
1.2 Topbar inclui seletor de workspace, busca, notifica��es e avatar com menu.
1.3 `ThemeToggle` permite alternar claro/escuro alinhado ao design system.

2.0 Design System
2.1 Componentes base (`Button`, `Input`, `Select`, `Badge`, `Card`) residem em `components/ui/` e seguem paleta pink.
2.2 Usar Tailwind 4 com tokens de `globals.css` e `tailwind-merge`/`clsx`.
2.3 Estados hover/active obedecem `pink-600`/`pink-700`; sucesso/erro usam `green-500`/`red-500`.

3.0 Navega��o & Routing
3.1 Rotas autenticadas: `/dashboard`, `/companies`, `/contacts`, `/deals`, `/deals/[id]`, `/activities`, `/products`, `/proposals`, `/automations`, `/reports`, `/settings`.
3.2 Rota p�blica `/p/[token]` exibe proposta com tema coerente.
3.3 Breadcrumbs din�micos refletem hierarquia (ex.: Companies > Empresa > Contato).

4.0 P�ginas & Componentes
4.1 `/dashboard` exibe widgets reorden�veis (`WidgetGrid`, `RevenueWidget`, `FunnelWidget`).
4.2 `/companies` e `/contacts` usam `DataTable` (TanStack Table) com filtros, buscas e modais CRUD.
4.3 `/deals` implementa Kanban drag-and-drop (dnd-kit) com colunas por est�gio.
4.4 P�gina de deal detalhado tem abas: Resumo, Timeline, Produtos, Propostas, Automations.
4.5 `/activities` exibe lista e calend�rio (day/week) com filtros e modais.
4.6 `/products` gerencia cat�logo e tabelas de pre�o com formul�rios inline.
4.7 `/proposals` oferece lista de templates, editor rich text e timeline de status.
4.8 `/automations` inclui builder visual com triggers/a��es arrast�veis.
4.9 `/reports` apresenta gr�ficos Recharts e tabelas export�veis.
4.10 `/settings` agrega tabs (Workspace, Integrations, API Keys, Appearance, Security).

5.0 Hooks & Stores
5.1 Criar hooks TanStack Query para cada rota principal (useCompanies, useDeals, etc.).
5.2 Zustand stores: `useWorkspaceStore`, `useModalStore`, `useKanbanStore`, `useReportFiltersStore`.
5.3 Stores persistentes (quando necess�rio) devem usar `zustand/middleware` (`persist`, `immer`).

6.0 Formul�rios & Campos Personalizados
6.1 Utilizar React Hook Form com `FormProvider` e componentes controlados.
6.2 `CustomFieldRenderer` recebe `CustomFieldDefinition` e decide input adequado.
6.3 Validar forms com schemas Zod via `zodResolver`.

7.0 Timeline & Auditoria
7.1 Criar `Timeline` component exibindo atividades, notas, mudan�as de est�gio e logs.
7.2 Integrar `AuditLog` a timelines com �cones e descri��es amig�veis.

8.0 Feedback & Estado
8.1 Exibir loaders/skeletons (`Skeleton`, `Spinner`) durante fetch.
8.2 Erros de query/mutation exibem toasts (`react-hot-toast`) e estados vazios contextuais.
8.3 Implementar banners de aviso para limites (API, integra��es).

9.0 Acessibilidade & i18n
9.1 Componentes interativos com ARIA roles e foco vis�vel.
9.2 Suporte a pt-BR (default) e en-US; strings centralizadas em `constants/i18n.ts` ou similar.

10.0 Testes de UI
10.1 Definir cen�rios Playwright para fluxos-chave (criar deal, mover pipeline, enviar proposta).
10.2 Componentes cr�ticos possuem testes unit�rios (React Testing Library) quando aplic�vel.
