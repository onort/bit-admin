import dayjs from "dayjs"

const defaultDateFormat = "DD.MM.YYYY"

// if date is converted already in cached data, it returns date as it is
export const convertISODate = (
  date: string,
  format: string = defaultDateFormat
) => (dayjs(date).isValid() ? dayjs(date).format(format) : date)

export const convertISODateFromData = (
  data: any[],
  format: string = defaultDateFormat
) => {
  return data.map(d => {
    const { createdAt, updatedAt } = d
    if (!createdAt && !updatedAt) return d
    if (d.createdAt) d.createdAt = convertISODate(d.createdAt, format)
    if (d.updatedAt) d.updatedAt = convertISODate(d.updatedAt, format)
    return d
  })
}
