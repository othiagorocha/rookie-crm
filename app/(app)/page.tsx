export default function DashboardPage() {
  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-1">
        <p className="text-sm font-medium text-muted-foreground">Bem-vindo ao Rookie CRM</p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Dashboard
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Configure seus pipelines, convide seu time e acompanhe as oportunidades em tempo real.
        </p>
      </header>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-base font-semibold text-foreground">Comece por aqui</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Crie sua primeira empresa, cadastre contatos e monte seu pipeline para visualizar o fluxo de vendas.
          </p>
        </div>
      </div>
    </section>
  );
}