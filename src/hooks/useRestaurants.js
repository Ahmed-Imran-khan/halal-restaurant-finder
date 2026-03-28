import { useState, useEffect } from 'react'
import { sheetParser } from '../utils/sheetParser'

const SHEET_CSV_URL =
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vQZ5ewZpT_FcAuxKGMpe_MbX5oKwAvZyunvXDC6qvwAy_h5tlzVAVYAZK1Y7KvZ4S08XXZCLfp9Ssri/pub?output=csv'

const FALLBACK_DATA = [
    { name: "Sultan's Feast Helsinki", address: "Fredrikinkatu 22", city: "Helsinki", lat: 60.1699, lng: 24.9384, cuisine: "Turkish", halal_status: "Fully Halal", phone: "+358 9 123 4567", website: "", hours: "Mon-Sun 11:00-22:00" },
    { name: "Habibi Helsinki", address: "Urho Kekkosen katu 1", city: "Helsinki", lat: 60.1675, lng: 24.9320, cuisine: "Lebanese & Middle Eastern", halal_status: "Fully Halal", phone: "+358 9 234 5678", website: "", hours: "Mon-Sun 11:00-21:00" },
    { name: "Petra Oasis", address: "Jordanian Gulmuki 2", city: "Helsinki", lat: 60.1728, lng: 24.9410, cuisine: "Arabic", halal_status: "Fully Halal", phone: "+358 9 345 6789", website: "", hours: "Mon-Sun 12:00-22:00" },
    { name: "Tampere Kebab House", address: "Hämeenkatu 10", city: "Tampere", lat: 61.4978, lng: 23.7610, cuisine: "Turkish", halal_status: "Fully Halal", phone: "+358 3 111 2222", website: "", hours: "Mon-Sun 10:00-23:00" },
    { name: "Oulu Halal Kitchen", address: "Kajaaninkatu 5", city: "Oulu", lat: 65.0121, lng: 25.4651, cuisine: "Pakistani", halal_status: "Fully Halal", phone: "+358 8 222 3333", website: "", hours: "Mon-Sat 11:00-21:00" },
    { name: "Turku Spice Garden", address: "Yliopistonkatu 8", city: "Turku", lat: 60.4518, lng: 22.2666, cuisine: "Indian", halal_status: "Halal Options", phone: "+358 2 333 4444", website: "", hours: "Mon-Sun 11:00-22:00" },
    { name: "Jyväskylä Shawarma", address: "Kauppakatu 15", city: "Jyväskylä", lat: 62.2426, lng: 25.7473, cuisine: "Syrian", halal_status: "Fully Halal", phone: "+358 14 444 5555", website: "", hours: "Mon-Sun 10:00-22:00" },
    { name: "Espoo Halal Grill", address: "Tapiolantie 3", city: "Espoo", lat: 60.2052, lng: 24.6559, cuisine: "Turkish Special", halal_status: "Fully Halal", phone: "+358 9 555 6666", website: "", hours: "Mon-Sun 11:00-23:00" },
    { name: "Vantaa Afghan Kitchen", address: "Tikkurilantie 12", city: "Vantaa", lat: 60.2934, lng: 25.0378, cuisine: "Afghan", halal_status: "Fully Halal", phone: "+358 9 666 7777", website: "", hours: "Mon-Sat 12:00-21:00" },
    { name: "Helsinki Somali Restaurant", address: "Kontulantie 4", city: "Helsinki", lat: 60.2310, lng: 25.0842, cuisine: "Somali", halal_status: "Fully Halal", phone: "+358 9 777 8888", website: "", hours: "Mon-Sun 11:00-21:00" },
]

export function useRestaurants() {
    const [restaurants, setRestaurants] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch(SHEET_CSV_URL)
            .then((res) => res.text())
            .then((csvText) => {
                const data = sheetParser(csvText)
                console.log('RAW sheet data:', data)  // ADD THIS
                const validFromSheet = data.filter(r => r.lat && r.lng)
                console.log('Valid from sheet:', validFromSheet)  // ADD THIS
                const sheetNames = validFromSheet.map(r => r.name.toLowerCase())
                const uniqueFallback = FALLBACK_DATA.filter(r => !sheetNames.includes(r.name.toLowerCase()))
                const merged = [...validFromSheet, ...uniqueFallback]
                setRestaurants(merged)
                setLoading(false)
            })
            .catch(() => {
                setRestaurants(FALLBACK_DATA)
                setLoading(false)
            })
    }, [])

    return { restaurants, loading, error }
}