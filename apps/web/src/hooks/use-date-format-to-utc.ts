export function dateFormatToUTC(date_str: string) {
  const parts = date_str.split('/')
  const new_date_str = `${parts[2]}/${parts[1]}/${parts[0]}`

  return new_date_str
}
