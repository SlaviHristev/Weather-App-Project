const apiKey = 'f6a000fd8ec7467f8452ac982226ef7b';
const apiUrl = `https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}`;



    export async function fetchUserCity() {
      try {
        const response = await fetch(apiUrl);
        if (response.ok) {
          const data = await response.json();
          return data.city;
        } else {
          console.error('Failed to fetch user city:', response.statusText);
          return null;
        }
      } catch (error) {
        console.error('Error fetching user city:', error);
        return null;
      }
    }