export function Spinner() {
  return (
    <div
      className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-current border-r-transparent border-solid align-[-0.125em] motion-reduce:animate-none'
      role='status'
    >
      <span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>
        Carregando…
      </span>
    </div>
  )
}
