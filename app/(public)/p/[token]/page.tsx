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
            Token p�blico:
            <span className="ml-1 font-mono text-xs text-pink-600">
              {params.token}
            </span>
          </p>
        </div>
        <div className="space-y-4 text-sm text-muted-foreground">
          <p>
            Essa p�gina p�blica hospeda o conte�do da proposta selecionada. Assim
            que a automa��o de propostas estiver implementada, o cliente poder�
            revisar, aceitar ou recusar a oferta diretamente por aqui.
          </p>
          <p>
            Enquanto o fluxo completo n�o est� conclu�do, utilize essa tela como
            refer�ncia para o layout p�blico exigido nas especifica��es.
          </p>
        </div>
      </div>
    </main>
  );
}