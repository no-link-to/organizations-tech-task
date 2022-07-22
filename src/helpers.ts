import { format } from 'date-fns'

export const formatDate = (value: string) => format(new Date(value), "dd.MM.yyyy");