# Requirements

1.0 Layout & Providers
1.1 O `app/layout.tsx` deve envolver toda a �rvore com `ClerkProvider`, `ThemeProvider`, `QueryProvider` e `Toaster`.
1.2 O `QueryProvider` precisa injetar um `QueryClient` com `staleTime` m�nimo de 60s e `refetchOnWindowFocus=false`.
1.3 O `ThemeProvider` deve respeitar tokens de `globals.css`, suportar dark mode e sincronizar com `next-themes`.
1.4 O layout raiz precisa expor `body` com classes de fontes Geist e `antialiased`.

2.0 Navega��o & Shell
2.1 Criar um shell autenticado com sidebar persistente e topbar responsiva seguindo a paleta pink.
2.2 Sidebar deve conter navega��o principal (Dashboard, Companies, Contacts, Deals, Activities, Products, Proposals, Automations, Reports, Settings).
2.3 Topbar inclui seletor de workspace, busca global e avatar do usu�rio.
2.4 Vers�o mobile deve transformar a sidebar em drawer com gestos ou bot�o hamburger.

3.0 Estrutura de Pastas & Providers
3.1 Garantir que pastas `constants/`, `hooks/`, `stores/`, `actions/`, `validations/` existam em kebab-case.
3.2 Criar `components/layout/` contendo `sidebar.tsx`, `topbar.tsx`, `app-shell.tsx`.
3.3 Adicionar `components/providers/theme-provider.tsx` encapsulando `ThemeProvider` custom.

4.0 Autentica��o & Contexto de Workspace
4.1 Integrar Clerk protegendo rotas autenticadas via `ClerkProvider` e `SignedIn/SignedOut`.
4.2 Implementar `useWorkspaceStore` em `stores/use-workspace-store.ts` com workspace ativo, lista de workspaces e m�todo `switchWorkspace`.
4.3 `AppShell` deve receber `workspace` do store e fornecer callbacks para troca.
4.4 Preparar middleware ou layout segmentado para rotas p�blicas (ex.: propostas) fora do shell autenticado.

5.0 Feedback & Notifica��es
5.1 Configurar `react-hot-toast` global com estilos alinhados ao design system.
5.2 Garantir tratamento de erros globais exibindo toasts com mensagens de `getErrorMessage`.
