/**
 * Parses a CSV string into headers and data
 * @param csvContent The CSV content as a string
 * @returns An object containing headers and data arrays
 */
export function parseCSV(csvContent: string) {
  // Handle different line endings
  const lines = csvContent
    .split(/\r\n|\n|\r/)
    .filter((line) => line.trim() !== '')

  if (lines.length === 0) {
    return { headers: [], data: [] }
  }

  // Parse the headers (first line)
  const headers = parseCSVLine(lines[0])

  // Parse the data (remaining lines)
  const data = lines.slice(1).map((line) => parseCSVLine(line))

  return { headers, data }
}

/**
 * Parses a single CSV line, handling quoted values and commas within quotes
 * @param line A single line from a CSV file
 * @returns An array of values from the line
 */
function parseCSVLine(line: string): string[] {
  const result: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]

    if (char === '"') {
      // Handle escaped quotes (two double quotes in a row)
      if (i + 1 < line.length && line[i + 1] === '"') {
        current += '"'
        i++ // Skip the next quote
      } else {
        // Toggle quote mode
        inQuotes = !inQuotes
      }
    } else if (char === ',' && !inQuotes) {
      // End of field
      result.push(current.trim())
      current = ''
    } else {
      // Add character to current field
      current += char
    }
  }

  // Add the last field
  result.push(current.trim())

  return result
}

/**
 * Detects the delimiter used in a CSV file
 * @param csvContent The CSV content as a string
 * @returns The detected delimiter (comma, semicolon, tab)
 */
export function detectDelimiter(csvContent: string): string {
  const firstLine = csvContent.split(/\r\n|\n|\r/)[0]

  const delimiters = [',', ';', '\t']
  const counts = delimiters.map((delimiter) => {
    return {
      delimiter,
      count: (firstLine.match(new RegExp(delimiter, 'g')) || []).length,
    }
  })

  // Sort by count in descending order
  counts.sort((a, b) => b.count - a.count)

  // Return the delimiter with the highest count
  return counts[0].count > 0 ? counts[0].delimiter : ','
}
