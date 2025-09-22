# Requirements

1.0 Planejamento & Marcos
1.1 Estabelecer roadmap em marcos alinhados ao cronograma (Fundamentos, CRM básico, Propostas, Integrações, Qualidade).
1.2 Cada marco deve possuir critérios de aceite objetivos.
1.3 Adotar estratégia incremental/feature flags quando necessário.

2.0 Qualidade de Código
2.1 Configurar CI rodando `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`.
2.2 Manter cobertura mínima acordada para testes unit/integration (definir meta >=70%).
2.3 Garantir `eslint`, `tailwind`, `prettier` (se aplicável) alinhados.

3.0 Dados & Ambiente
3.1 Docker Compose com serviços `app`, `supabase-db`, `supabase-studio` funciona com `docker compose up`.
3.2 `.env.example` atualizado com variáveis necessárias (Clerk, Supabase, Uploadthing, etc.).
3.3 Scripts Prisma (`prisma:migrate-dev`, `prisma:gen`, `prisma db seed`) executam sem erros.

4.0 Testes
4.1 Unit tests para schemas Zod, utils (`getErrorMessage`, stores Zustand).
4.2 Integration tests para server actions principais (`createDeal`, `updateDealStage`, `acceptProposal`).
4.3 E2E (Playwright) cobrindo fluxos principais (deal E2E, proposta pública, webhook entrega).
4.4 Scripts de mock (webhooks) e seed devem ser testáveis repetidamente.

5.0 Documentação
5.1 `README.md` atualizado para refletir stack Rookie.
5.2 Criar `/docs/ARCHITECTURE.md`, `API.md`, `WEBHOOKS.md`, `SECURITY.md`.
5.3 Especificações em `.specs/` atualizadas quando requisitos mudarem.

6.0 Acessibilidade & Performance
6.1 Rodar auditoria (Lighthouse/axe) garantindo foco visível e contraste suficiente.
6.2 Monitorar métricas Core Web Vitals e otimizar carregamento crítico (lazy load, Suspense).

7.0 Release & Deploy
7.1 Preparar scripts de deploy (Vercel/Supabase) e validar preview com usuário demo.
7.2 Validar limpeza de logs ruidosos e configuração de variáveis seguras para produção.
7.3 Checklist final: seeds consistentes, migrations aplicadas, monitoramento ativo.
