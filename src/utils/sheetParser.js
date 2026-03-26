import Papa from 'papaparse'

export function sheetParser(csvText) {
  const result = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
  })

  return result.data.map((row) => ({
    name: row['name'] || '',
    address: row['address'] || '',
    city: row['city'] || '',
    lat: parseFloat(row['latitude']) || 0,
    lng: parseFloat(row['longitude']) || 0,
    cuisine: row['cuisine'] || '',
    halal_status: row['halal_status'] || '',
    phone: row['phone'] || '',
    website: row['website'] || '',
    hours: row['hours'] || '',
  }))
}