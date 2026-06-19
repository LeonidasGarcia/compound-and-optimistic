function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

export async function addToServer(
  prevState: { items: Array<{ pizzaId: string; quantity: number }> },
  item: { pizzaId: string; quantity: number }
): Promise<{ success: boolean; error?: string }> {
  void prevState;
  void item;
  await delay(1200);

  if (Math.random() < 0.5) {
    return { success: false, error: "Network error: could not reach server." };
  }

  return { success: true };
}

export async function removeFromServer(
  pizzaId: string
): Promise<{ success: boolean; error?: string }> {
  void pizzaId;
  await delay(800);

  if (Math.random() < 0.15) {
    return { success: false, error: "Network error: could not remove item." };
  }

  return { success: true };
}

export async function clearServerOrder(): Promise<{ success: boolean; error?: string }> {
  await delay(1000);

  if (Math.random() < 0.1) {
    return { success: false, error: "Network error: could not clear order." };
  }

  return { success: true };
}
