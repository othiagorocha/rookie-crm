interface ProposalPublicPageProps {
  params: {
    token: string;
  };
}

export default function ProposalPublicPage({ params }: ProposalPublicPageProps) {
  return (
    <main className="min-h-screen bg-background px-6 py-14">
      <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-card p-10 shadow-sm">
        <div className="mb-8 space-y-2 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.32em] text-pink-500">
            Rookie CRM
          </p>
          <h1 className="text-3xl font-semibold text-foreground">Proposta</h1>
          <p className="text-sm text-muted-foreground">
            Token público:
            <span className="ml-1 font-mono text-xs text-pink-600">
              {params.token}
            </span>
          </p>
        </div>
        <div className="space-y-4 text-sm text-muted-foreground">
          <p>
            Essa página pública hospeda o conteúdo da proposta selecionada. Assim
            que a automação de propostas estiver implementada, o cliente poderá
            revisar, aceitar ou recusar a oferta diretamente por aqui.
          </p>
          <p>
            Enquanto o fluxo completo não está concluído, utilize essa tela como
            referência para o layout público exigido nas especificações.
          </p>
        </div>
      </div>
    </main>
  );
}