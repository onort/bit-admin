import dayjs from "dayjs"

const defaultDateFormat = "DD.MM.YYYY"

export const convertISODate = (
  date: string,
  format: string = defaultDateFormat
) => dayjs(date).format(format)

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
