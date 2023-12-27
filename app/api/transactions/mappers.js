export function transactionMapper({ amount, tags, created_at, updated_at, ...transaction }) {
  tags = tags.map(tag => ({
    id: tag.tag_id ?? tag.id,
    name: tag.tag?.name ?? tag.name,
    added_at: tag?.added_at,
  }));

  return { ...transaction, amount: Number(amount), tags, created_at, updated_at };
}
