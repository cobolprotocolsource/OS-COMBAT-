// frontend/src/utils/csv.js
// CSV parser using PapaParse for robust CSV handling in browser.

import Papa from 'papaparse'

export function parseCSV(text) {
  const result = Papa.parse(text, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (h) => h.trim(),
  })
  if (result.errors && result.errors.length) {
    // throw first error for simplicity, caller can catch
    throw new Error(result.errors[0].message || 'CSV parse error')
  }
  // Normalize keys to lowercase for easier mapping (nrp, nama, pangkat)
  return result.data.map((row) => {
    const normalized = {}
    Object.keys(row).forEach((k) => {
      normalized[k.trim().toLowerCase()] = row[k]
    })
    return normalized
  })
}
