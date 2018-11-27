import {
  ContentState,
  EditorState,
  convertFromHTML,
  convertToRaw
} from "draft-js"
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
  if (!data) return []
  return data.map(d => {
    const { createdAt, updatedAt } = d
    if (!createdAt && !updatedAt) return d
    if (d.createdAt) d.createdAt = convertISODate(d.createdAt, format)
    if (d.updatedAt) d.updatedAt = convertISODate(d.updatedAt, format)
    return d
  })
}

export const editorStateToString = (editorState: EditorState): string => {
  const rawContent = convertToRaw(editorState.getCurrentContent())
  return JSON.stringify(rawContent)
}

export const covnertBitDataToInitialValues = (data: any) => {
  const bit = { ...data }
  const blocksFromHTML = convertFromHTML(data.contentHTML)
  const state = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  )
  bit.editorState = EditorState.createWithContent(state)
  return bit
}
