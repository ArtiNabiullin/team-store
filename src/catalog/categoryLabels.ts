const categoryLabels: Record<string, string> = {
  "soft-toys": "Мягкие игрушки",
  "educational-toys": "Развивающие игрушки",
  vehicles: "Машинки",
};

export function getCategoryLabel(category: string): string {
  return categoryLabels[category] ?? category;
}
