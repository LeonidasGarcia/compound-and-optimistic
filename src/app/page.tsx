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
          Un demo práctico de dos patrones de React trabajando juntos:{" "}
          <strong>Compound Components</strong> (estado compartido via Context) y{" "}
          <strong>useOptimistic</strong> (actualizaciones instantáneas con sincronización asíncrona).
        </p>
      </header>

      <PizzaOrder.Root>
        <PizzaOrder.Header />
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
        <PatternCard title="Compound Components" badge="patrón">
          <p>
            La familia de componentes <CodeTag>PizzaOrder</CodeTag> comparte
            estado implícito mediante React Context. Componentes hijos como{" "}
            <CodeTag>PizzaOrder.Menu</CodeTag>,{" "}
            <CodeTag>PizzaOrder.MenuItem</CodeTag>,{" "}
            <CodeTag>PizzaOrder.CurrentOrder</CodeTag> y{" "}
            <CodeTag>PizzaOrder.Total</CodeTag> consumen el mismo estado del pedido
            sin prop drilling. Esta es la esencia del patrón{" "}
            <strong>Compound Component</strong>: un padre orquesta el
            estado, y los hijos declarativos lo renderizan.
          </p>
        </PatternCard>

        <PatternCard title="useOptimistic" badge="hook">
          <p>
            El hook <CodeTag>useOptimistic</CodeTag> (React 19) permite que la
            UI refleje las mutaciones <strong>antes</strong> de que el servidor
            las confirme. Cuando agregas o eliminas una pizza, el carrito se
            actualiza al instante mientras{" "}
            <CodeTag>addToServer</CodeTag> / <CodeTag>removeFromServer</CodeTag>{" "}
            se ejecutan en segundo plano (simulado con una demora + 50% de fallo
            aleatorio). En caso de error, el estado optimista se descarta y se
            muestra el error — el usuario nunca espera la red.
          </p>
        </PatternCard>
      </section>

      <section className="rounded-lg border border-zinc-200 bg-white p-5 text-sm text-zinc-600 leading-relaxed">
        <h2 className="font-semibold text-zinc-800 mb-2">Cómo se combinan</h2>
        <p>
          El <CodeTag>PizzaOrderProvider</CodeTag> (dentro de{" "}
          <CodeTag>PizzaOrder.Root</CodeTag>) posee tanto el estado
          autoritativo <CodeTag>order</CodeTag> (via <CodeTag>useState</CodeTag>)
          como el espejo optimista (via <CodeTag>useOptimistic</CodeTag>).
          Las mutaciones primero actualizan el estado optimista (instantáneo),
          luego llaman a la API simulada. En éxito, el estado autoritativo se
          actualiza; en fallo, el estado optimista se revierte. Todos los
          sub-componentes leen de <CodeTag>optimisticOrder</CodeTag> para que la
          UI siempre se sienta rápida.
        </p>
      </section>

      <footer className="text-center text-xs text-zinc-400 pb-6">
        Construido con Next.js 16 &middot; React 19 &middot; Tailwind CSS 3.4
      </footer>
    </div>
  );
}
