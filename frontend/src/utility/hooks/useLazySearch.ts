export const useLazySearch = (query: string, ...items: string[]) => {
  return !query.length 
    || query.toLowerCase().split(' ').every(
      (subQuery) => 
        items.some(i => i.toLowerCase().includes(subQuery))
    )
  
    // && (!query.length 
    //   || query.toLowerCase().split(' ')
    //       .every(str => exercise.name.toLowerCase().split(' ').some(ex => ex.includes(str)) || exercise.muscle_target.toLowerCase().includes(str)));
}