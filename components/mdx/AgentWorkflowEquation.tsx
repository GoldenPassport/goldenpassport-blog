const workflowPatterns = [
  {
    title: "Prompt chaining",
    description:
      "Sequential model calls with a programmatic check between steps. Concierge: understand the request, draft the reply, check it for tone and compliance.",
  },
  {
    title: "Routing",
    description:
      "Classify the input and send it down a specialised path. Concierge: is this a question, a self-service task or a handover, and to whom?",
  },
  {
    title: "Parallelisation",
    description:
      "Independent sub-tasks run at once, or the same task run several times and voted on. Concierge: check identity and fetch account context at the same time.",
  },
  {
    title: "Orchestrator-workers",
    description:
      "A central model breaks a task into sub-tasks it could not predict in advance, delegates them and synthesises the results. Concierge: a customer with three things to sort in one visit.",
  },
  {
    title: "Evaluator-optimiser",
    description:
      "One model generates, another evaluates, and they loop until the output passes. Concierge: every customer-facing message checked against the bank's tone and the regulator's rules before it is sent.",
  },
];

export function AgentWorkflowEquation() {
  return (
    <div className="not-prose font-serif text-ink-soft">
      <section className="rounded-lg border border-gold/35 bg-cream-200/55 px-5 py-5 text-center sm:px-7">
        <p className="mb-2 font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-gold-deep">
          The building block
        </p>
        <h3 className="m-0 font-serif text-2xl font-semibold leading-tight text-ink sm:text-3xl">
          The augmented LLM
        </h3>
        <p className="mx-auto mb-0 mt-2 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
          A model with retrieval, tools and memory attached. The building block for everything else.
        </p>
      </section>

      <EquationSymbol symbol="=" />

      <section className="rounded-lg border border-ink/10 bg-white/55 px-5 py-5 sm:px-7">
        <h4 className="m-0 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold-deep">
          Agents
        </h4>
        <p className="mb-0 mt-3 text-base leading-relaxed sm:text-lg">
          <strong className="font-semibold text-ink">The agent loop.</strong>{" "}
          The model acts, observes the result and decides its next move, with tools as its hands.
          Concierge: the open-ended &quot;meet and understand&quot; conversation.
        </p>
      </section>

      <EquationSymbol symbol="+" />

      <section className="rounded-lg border border-ink/10 bg-white/55 px-5 py-5 sm:px-7">
        <h4 className="m-0 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold-deep">
          Workflows
        </h4>
        <ol className="mb-0 mt-4 list-none space-y-4 p-0">
          {workflowPatterns.map((pattern, index) => (
            <li key={pattern.title} className="grid grid-cols-[2rem_1fr] items-start gap-3">
              <span
                aria-hidden="true"
                className="mt-0.5 grid h-8 w-8 place-items-center rounded-full bg-gold-deep font-sans text-sm font-semibold leading-none text-cream"
              >
                {index + 1}
              </span>
              <p className="m-0 text-base leading-relaxed sm:text-lg">
                <strong className="font-semibold text-ink">{pattern.title}.</strong>{" "}
                {pattern.description}
              </p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}

function EquationSymbol({ symbol }: { symbol: "=" | "+" }) {
  return (
    <div
      aria-hidden="true"
      className="flex h-12 items-center justify-center font-serif text-3xl font-semibold leading-none text-gold-deep"
    >
      {symbol}
    </div>
  );
}
