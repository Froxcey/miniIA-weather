/**
 * Foreach loop, queued concurrency
 * @param input Array of data to process
 * @param action Function to process data
 * @param limit Number of concurrent actions
 */
export default async function prllCtrl<Type>(input: Array<Type>, action: (data: Type) => any, limit = 5) {
  for (let i = 0; i < input.length; i += limit) {
    const chunk = input.slice(i, i + limit);
    await Promise.all(chunk.map((data) => action(data)));
  }
}
