# Requirements

1.0 Eventos & Dispatcher
1.1 Implementar `emitWorkflowEvent` centralizando publicação dos eventos internos (deal, proposal, activity).
1.2 Definir payload padrão de eventos com metadados (`id`, `event`, `occurredAt`, `data`).

2.0 Workflows
2.1 Builder aceita múltiplos triggers por workflow com `configJson` validado.
2.2 Ações suportadas: `CREATE_ACTIVITY`, `SEND_EMAIL`, `MOVE_STAGE`, `CALL_WEBHOOK`, `UPDATE_FIELD`.
2.3 Execução sequencial assíncrona com logging em `WorkflowRun` e `WorkflowLog`.
2.4 Retries para falhas devem atualizar status (`FAILED`) e mensagem no log.

3.0 Webhooks
3.1 Endpoints configuráveis (`url`, `secret`, `eventTypes`, `isActive`).
3.2 Payload JSON segue contrato do prompt com assinatura HMAC `sha256`.
3.3 Deliveries registrados em `WebhookDelivery` com retries exponenciais (1m, 5m, 15m).
3.4 UI permite pausar/ativar, reenviar manualmente, consultar histórico e última resposta.

4.0 Integração de E-mail (Mock)
4.1 Configuração suporta provedores `GMAIL`, `OUTLOOK`, `GENERIC` com campos de credencial simulados.
4.2 Envio usa `lib/mailer.ts` (mock) que registra `EmailLog` e imprime no console dev.
4.3 Webhook de recebimento (`/api/integrations/email/webhook`) cria `Activity` tipo `EMAIL` (`direction=INBOUND`).

5.0 Integração WhatsApp (Mock)
5.1 Configuração semelhante ao e-mail, armazenando `settingsJson` e `status`.
5.2 Endpoint `/api/integrations/whatsapp/webhook` cria atividades (`CALL` ou `NOTE`).
5.3 Envio manual gera `Activity` associada ao contato/deal.

6.0 API Pública
6.1 Rotas `/api/public/v1/...` autenticadas via header `x-api-key` com validação de hash.
6.2 Rate limit: 60 req/minuto, 10k req/dia por chave, com contagem em `ApiRequestLog`.
6.3 Endpoints iniciais: `GET/POST /companies`, `GET/POST /deals`, `PATCH /deals/:id`, `GET /activities`.
6.4 Erros retornam `{ "error": { "code", "message" } }` e status HTTP adequados.

7.0 Segurança
7.1 Segredos armazenados em variáveis de ambiente; `.env.example` documenta campos.
7.2 Middlwares validam origem de webhooks (assinatura + IP allowlist opcional).
7.3 Conteúdo HTML sanitizado antes de envio em e-mails/propostas.

8.0 Observabilidade
8.1 `logError` armazena contexto (action, payload) em `WorkflowLog`/`WebhookDelivery`.
8.2 `lib/telemetry.ts` coleta tempos de execução e contadores (stub inicial).

9.0 Testes & Ferramentas
9.1 Scripts `scripts/mock-webhooks.ts` para disparar eventos de teste.
9.2 Testes unitários cobrem geração/verificação de HMAC.
9.3 Testes de integração validam fluxo completo (workflow ? webhook ? delivery logging).
