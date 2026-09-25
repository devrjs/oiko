interface FormErrorProps {
  message?: string
  id?: string
  className?: string
}

function baseClass(className?: string) {
  return className ?? 'min-h-4 text-destructive text-xs'
}

/**
 * Padrão único de erro de formulário.
 * - Com mensagem: anuncia via `role="alert"` + `aria-live="assertive"`.
 * - Sem mensagem: espaçador `aria-hidden` para preservar o layout sem poluir o leitor de tela.
 */
export function FormError({ message, id, className }: FormErrorProps) {
  const classes = baseClass(className)

  if (!message) {
    return <span aria-hidden='true' className={classes} />
  }

  return (
    <span id={id} role='alert' aria-live='assertive' className={classes}>
      {message}
    </span>
  )
}
