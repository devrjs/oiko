/**
 * Este arquivo serve como um Shim (adaptador) para contornar um problema de geração de código do Kubb.
 * O plugin `@kubb/plugin-react-query` gera arquivos que tentam importar a função `mutationOptions`
 * diretamente de `@tanstack/react-query`, porém ela não é exportada nativamente pela biblioteca.
 *
 * Ao mapear `@tanstack/react-query` para este arquivo no `tsconfig.json` (via path aliases),
 * conseguimos re-exportar todos os membros legítimos da biblioteca e fornecer a implementação
 * da função `mutationOptions` sem precisar modificar manualmente os arquivos gerados.
 */
import type { UseMutationOptions } from '../../node_modules/@tanstack/react-query/build/modern/index.js'

export * from '@tanstack/query-core'
export * from '../../node_modules/@tanstack/react-query/build/modern/index.js'

// Shim para a função mutationOptions ausente no `@tanstack/react-query`
export function mutationOptions<
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown,
>(
  options: UseMutationOptions<TData, TError, TVariables, TContext>
): UseMutationOptions<TData, TError, TVariables, TContext> {
  return options
}
