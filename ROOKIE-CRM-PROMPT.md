# Rookie CRM

Quero que você gere um **CRM web completo** chamado **Rookie**, inspirado nas funcionalidades do Ploomes. O sistema deve seguir rigorosamente o **stack tecnológico**, as **convenções de código/arquitetura**, a **paleta de cores** e as **funcionalidades listadas** abaixo.

---

## 🚀 Tecnologias (Stacks)

* **Framework:** Next.js 15+ (App Router)
* **Linguagem:** TypeScript (strict mode)
* **Estilização:** Tailwind CSS 4.0
* **Banco de Dados:** Prisma (inicialmente com conexão no Supabase)
* **Gerenciamento de Estado:** Zustand
* **Gerenciamento de Dados/Cache:** TanStack Query
* **Tabelas:** TanStack Table
* **Validação de Schemas:** Zod
* **Formulários:** React Hook Form
* **Autenticação:** Clerk (OAuth Google e Magic Link)
* **Upload de Arquivos:** Uploadthing

---

## 📂 Padrões de Código e Arquitetura

### Estrutura de pastas (usar kebab-case):

```bash
- app/
- app/api/
- components/
- lib/
- actions/ (Server Actions)
- constants/
- hooks/
- stores/ (Zustand)
- types/
- validations/ (Zod)
```

### Convenções

* **TypeScript estrito**: evitar `any`.
* **Modelos Prisma**: importar/re-exportar em `/types/`.
* **Nomenclatura:** tudo em kebab-case.
* **Banco:** nunca usar classes para serviços → sempre funções.
* **Server Actions:** todas operações em arquivos semânticos (`users-actions.ts`).
* **Validação:** inputs sempre validados com Zod.

---

## ⚙️ Server Actions (padrão obrigatório)

* Sempre `try/catch`.
* Validar inputs com Zod.
* Retornar dados no `try`.
* Em `catch`, lançar `new Error(getErrorMessage(error))`.

Exemplo:

```ts
import { auth } from "@clerk/nextjs"
import { db } from "@/lib/db"
import { createWorkspaceSchema, CreateWorkspaceSchema } from "@/validations/workspace-schema"
import { getErrorMessage } from "@/lib/handle-error"

export async function createWorkspaceAction(input: CreateWorkspaceSchema) {
  try {
    const { userId } = auth()
    if (!userId) throw new Error("Usuário não autenticado")

    const { data, error } = createWorkspaceSchema.safeParse(input)
    if (!data || error) throw new Error(getErrorMessage(error))

    const workspace = await db.workspace.create({
      data: {
        name: data.name,
        userId,
      },
    })

    return workspace
  } catch (error) {
    throw new Error(getErrorMessage(error))
  }
}
```

---

## 🛠 Utilitários

Criar `lib/handle-error.ts`:

```ts
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { z } from "zod";

export function getErrorMessage(err: unknown) {
  const unknownError = "Something went wrong, please try again later.";

  if (err instanceof z.ZodError) {
    return err.issues.map((issue) => issue.message).join("\n");
  }

  if (err instanceof Error) {
    return err.message;
  }

  if (isRedirectError(err)) {
    throw err;
  }

  return unknownError;
}
```

---

## 🔄 Hooks

* Criar hooks baseados em **TanStack Query** para consumir Server Actions.
* Ex.: `useGetUsers`, `useCreateDeal`, etc.

---

## 📊 Reusabilidade

* Usar `/constants/` para valores fixos como strings, roles, URLs de API.

---

## 🎨 Design System & Paleta de Cores

* **Base:** utilizar a paleta `pink` do Tailwind CSS 4.0 como cor primária (`pink-500` como principal).
* **Aplicação de cores:**

  * **Primária (botões principais, highlights):** `pink-500`
  * **Primária hover:** `pink-600`
  * **Primária active:** `pink-700`
  * **Primária clara (backgrounds suaves):** `pink-50` / `pink-100`
  * **Bordas/detalhes:** `pink-200` / `pink-300`
  * **Texto destacado:** `pink-700`
* **Secundárias/neutras:** escala `gray` do Tailwind para contraste (ex.: backgrounds `gray-50`, textos `gray-700`, bordas `gray-200`).
* **Feedback:**

  * Sucesso → `green-500`
  * Aviso → `yellow-500`
  * Erro → `red-500`
* **Dark mode:** usar `pink-400`/`pink-300` para botões/textos, backgrounds em `gray-900`.

Todos os **componentes de UI (botões, inputs, tabelas, modais, cards, etc.)** devem seguir esse design system, garantindo identidade visual do Rookie CRM.

---

## 📌 Funcionalidades Rookie CRM

Implemente os módulos a seguir:

1. **Usuários & Papéis** (via Clerk + roles customizadas: Admin, Gerente, Vendedor, Leitor).
2. **Empresas & Contatos** com campos padrão e **campos personalizados**.
3. **Produtos & Tabelas de Preço**.
4. **Oportunidades (Deals)**

   * Pipelines múltiplos, estágios configuráveis.
   * Kanban drag-and-drop.
   * Métricas: tempo por estágio, ageing, motivos de perda.
5. **Atividades** (tarefas, ligações, e-mails logados, reuniões).
6. **Propostas/Documentos**

   * Templates com placeholders (`{{cliente.nome}}`, `{{proposta.total}}`).
   * Geração de PDF.
   * Aceite/recusa via link público.
7. **Automações (Workflows)**

   * Gatilhos: criação/atualização de deal, mudança de estágio, proposta aceita.
   * Ações: criar atividade, enviar e-mail, mover estágio, chamar webhook.
8. **Campos Personalizados**

   * Tipos: texto, número, moeda, data, select, CPF/CNPJ, e-mail, telefone, checkbox.
   * Configuração: obrigatoriedade, chaves para deduplicação, condições de visibilidade.
9. **Relatórios e Dashboards**

   * Funil de conversão, receita por período, ticket médio, tempo médio de ciclo.
   * Exportar CSV.
10. **Integrações (mockadas inicialmente)**

* E-mail (IMAP/SMTP simulado).
* WhatsApp (webhooks fake).
* Webhooks configuráveis.

11. **API Pública** com chave e rate limit.

12. **Auditoria**: log de quem fez o quê e quando.

---

## 📑 Entregáveis

1. Estrutura de projeto com pastas definidas.
2. **Prisma schema** + migrations + seed (pipelines, estágios, produtos, contatos demo).
3. **Rotas API** em `app/api/...`.
4. **Server Actions** organizadas em `actions/`.
5. **Components**: Kanban de Deals, Form Builder, Editor de Templates de Proposta, Relatórios (gráficos com Recharts/TanStack Table).
6. **UI**: Dashboard, Companies, Contacts, Deals, Activities, Products, Proposals, Automations, Reports, Settings.
7. **Docker Compose** (app + Supabase).
8. **Docs** em `/docs/` com: `ARCHITECTURE.md`, `API.md`, `WEBHOOKS.md`, `SECURITY.md`.

---

## 📌 Fluxo E2E de Referência

1. Criar empresa/contato → criar deal no pipeline → adicionar itens de produto.
2. Enviar proposta → gerar PDF → aceitar via link público.
3. Ao aceitar → automação move deal para “Ganho”, cria atividade e dispara webhook.
4. Dashboard reflete a receita
