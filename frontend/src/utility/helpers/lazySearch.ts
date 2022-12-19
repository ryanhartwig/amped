export const lazySearch = (query: string, ...items: string[]) => {
  return !query.length 
    || query.toLowerCase().split(' ').every(
      (subQuery) => 
        items.some(i => i.toLowerCase().includes(subQuery))
    )
}