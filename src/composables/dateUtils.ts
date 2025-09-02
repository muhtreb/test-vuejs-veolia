export function useDateUtils() {
  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(date))
  }

  return { formatDate }
}
