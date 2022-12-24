import Geocode from "react-geocode";

Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_API_KEY!);
Geocode.setLanguage("en")


export const siteNameToLatLng = async (siteName: string | undefined) => {
  if (siteName === undefined) {
    return undefined
  }
  return Geocode.fromAddress(siteName).then((res) => {
    const { lat, lng } = res.results[0].geometry.location;
    return { lat, lng }
  })
}