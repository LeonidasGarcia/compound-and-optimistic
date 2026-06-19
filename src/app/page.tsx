"use client";

import * as PizzaOrder from "@/components/pizza-order";
import { PIZZAS } from "@/components/pizza-order/types";

function CodeTag({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-amber-300 font-mono">
      {children}
    </code>
  );
}

function PatternCard({
  title,
  badge,
  children,
}: {
  title: string;
  badge: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="rounded bg-zinc-800 px-2 py-0.5 text-xs font-mono font-semibold uppercase tracking-wider text-white">
          {badge}
        </span>
        <h3 className="font-semibold text-zinc-800">{title}</h3>
      </div>
      <div className="text-sm text-zinc-600 leading-relaxed">{children}</div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex-1 w-full max-w-5xl mx-auto px-4 py-10 space-y-10">
      <header className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          Compound <span className="text-zinc-400">&amp;</span> Optimistic
        </h1>
        <p className="text-zinc-500 max-w-xl mx-auto text-sm">
          A hands-on demo of two React patterns working together:{" "}
          <strong>Compound Components</strong> (shared state via Context) and{" "}
          <strong>useOptimistic</strong> (instant UI updates with async sync).
        </p>
      </header>

      <PizzaOrder.Root>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <PizzaOrder.Menu>
              {PIZZAS.map((pizza) => (
                <PizzaOrder.MenuItem key={pizza.id} pizza={pizza} />
              ))}
            </PizzaOrder.Menu>
          </div>

          <div className="lg:col-span-2">
            <PizzaOrder.CurrentOrder />
            <PizzaOrder.Total />
            <div className="mt-4">
              <PizzaOrder.Actions />
            </div>
          </div>
        </div>
      </PizzaOrder.Root>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PatternCard title="Compound Components" badge="pattern">
          <p>
            The <CodeTag>PizzaOrder</CodeTag> component family shares implicit
            state via React Context. Children like{" "}
            <CodeTag>PizzaOrder.Menu</CodeTag>,{" "}
            <CodeTag>PizzaOrder.MenuItem</CodeTag>,{" "}
            <CodeTag>PizzaOrder.CurrentOrder</CodeTag>, and{" "}
            <CodeTag>PizzaOrder.Total</CodeTag> all consume the same order state
            without prop drilling. This is the essence of the{" "}
            <strong>Compound Component</strong> pattern: a parent orchestrates
            state, and declarative children render it.
          </p>
        </PatternCard>

        <PatternCard title="useOptimistic" badge="hook">
          <p>
            The <CodeTag>useOptimistic</CodeTag> hook (React 19) lets the UI
            reflect mutations <strong>before</strong> the server confirms them.
            When you add or remove a pizza, the cart updates instantly while
            <CodeTag>addToServer</CodeTag> / <CodeTag>removeFromServer</CodeTag>{" "}
            run in the background (simulated with a delay + 15-20% random
            failure). On error, the optimistic state is discarded and the error
            is shown — the user never waits for the network.
          </p>
        </PatternCard>
      </section>

      <section className="rounded-lg border border-zinc-200 bg-white p-5 text-sm text-zinc-600 leading-relaxed">
        <h2 className="font-semibold text-zinc-800 mb-2">How they combine</h2>
        <p>
          The <CodeTag>PizzaOrderProvider</CodeTag> (inside{" "}
          <CodeTag>PizzaOrder.Root</CodeTag>) owns both the authoritative{" "}
          <CodeTag>order</CodeTag> state (via <CodeTag>useState</CodeTag>) and
          the optimistic mirror (via <CodeTag>useOptimistic</CodeTag>).
          Mutations first update the optimistic state (instant), then call the
          simulated API. On success, the authoritative state catches up; on
          failure, the optimistic state reverts. All sub-components read from{" "}
          <CodeTag>optimisticOrder</CodeTag> so the UI always feels snappy.
        </p>
      </section>

      <footer className="text-center text-xs text-zinc-400 pb-6">
        Built with Next.js 16 &middot; React 19 &middot; Tailwind CSS 3.4
      </footer>
    </div>
  );
}
