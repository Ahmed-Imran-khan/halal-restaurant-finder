import Papa from 'papaparse'

export function sheetParser(csvText) {
  const result = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
  })

  return result.data.map((row) => {
    const lat = parseFloat(row['lat'] || row['latitude'] || '')
    const lng = parseFloat(row['lng'] || row['longitude'] || '')

    return {
      name: row['name'] || '',
      address: row['address'] || '',
      city: row['city'] || '',
      lat: isNaN(lat) ? 0 : lat,
      lng: isNaN(lng) ? 0 : lng,
      cuisine: row['cuisine'] || '',
      halal_status: row['halal_status'] || '',
      phone: row['phone'] || '',
      website: row['website'] || '',
      hours: row['hours'] || '',
    }
  })
}