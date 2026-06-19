"use server";

function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

export async function addItemToServer(
  pizzaId: string,
  quantity: number
): Promise<{ success: boolean; error?: string }> {
  void pizzaId;
  void quantity;
  await delay(1200);

  if (Math.random() < 0.5) {
    return { success: false, error: "Error al agregar: no se pudo conectar con el servidor." };
  }

  return { success: true };
}

export async function removeItemFromServer(
  pizzaId: string
): Promise<{ success: boolean; error?: string }> {
  void pizzaId;
  await delay(800);

  if (Math.random() < 0.5) {
    return { success: false, error: "Error al eliminar: no se pudo conectar con el servidor." };
  }

  return { success: true };
}

export async function updateQuantityOnServer(
  pizzaId: string,
  quantity: number
): Promise<{ success: boolean; error?: string }> {
  void pizzaId;
  void quantity;
  await delay(800);

  if (Math.random() < 0.5) {
    return { success: false, error: "Error al actualizar: no se pudo conectar con el servidor." };
  }

  return { success: true };
}

export async function clearOrderOnServer(): Promise<{ success: boolean; error?: string }> {
  await delay(1000);

  if (Math.random() < 0.5) {
    return { success: false, error: "Error al vaciar: no se pudo conectar con el servidor." };
  }

  return { success: true };
}
