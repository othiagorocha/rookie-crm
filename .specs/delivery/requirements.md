# Requirements

1.0 Planejamento & Marcos
1.1 Estabelecer roadmap em marcos alinhados ao cronograma (Fundamentos, CRM b�sico, Propostas, Integra��es, Qualidade).
1.2 Cada marco deve possuir crit�rios de aceite objetivos.
1.3 Adotar estrat�gia incremental/feature flags quando necess�rio.

2.0 Qualidade de C�digo
2.1 Configurar CI rodando `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`.
2.2 Manter cobertura m�nima acordada para testes unit/integration (definir meta >=70%).
2.3 Garantir `eslint`, `tailwind`, `prettier` (se aplic�vel) alinhados.

3.0 Dados & Ambiente
3.1 Docker Compose com servi�os `app`, `supabase-db`, `supabase-studio` funciona com `docker compose up`.
3.2 `.env.example` atualizado com vari�veis necess�rias (Clerk, Supabase, Uploadthing, etc.).
3.3 Scripts Prisma (`prisma:migrate-dev`, `prisma:gen`, `prisma db seed`) executam sem erros.

4.0 Testes
4.1 Unit tests para schemas Zod, utils (`getErrorMessage`, stores Zustand).
4.2 Integration tests para server actions principais (`createDeal`, `updateDealStage`, `acceptProposal`).
4.3 E2E (Playwright) cobrindo fluxos principais (deal E2E, proposta p�blica, webhook entrega).
4.4 Scripts de mock (webhooks) e seed devem ser test�veis repetidamente.

5.0 Documenta��o
5.1 `README.md` atualizado para refletir stack Rookie.
5.2 Criar `/docs/ARCHITECTURE.md`, `API.md`, `WEBHOOKS.md`, `SECURITY.md`.
5.3 Especifica��es em `.specs/` atualizadas quando requisitos mudarem.

6.0 Acessibilidade & Performance
6.1 Rodar auditoria (Lighthouse/axe) garantindo foco vis�vel e contraste suficiente.
6.2 Monitorar m�tricas Core Web Vitals e otimizar carregamento cr�tico (lazy load, Suspense).

7.0 Release & Deploy
7.1 Preparar scripts de deploy (Vercel/Supabase) e validar preview com usu�rio demo.
7.2 Validar limpeza de logs ruidosos e configura��o de vari�veis seguras para produ��o.
7.3 Checklist final: seeds consistentes, migrations aplicadas, monitoramento ativo.
