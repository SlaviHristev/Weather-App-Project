export function clearWeatherInfo() {
    // get all the needed elements and clear them from the page after inputing a new name
    const currentWeatherDiv = document.getElementById('currentWeatherDiv');
    const hourlyTable = document.getElementById('hourly');
    const upcommingTableEl = document.getElementById('upcomming');
    const containerEl = document.querySelector('.container');
    const upcomingDiv = document.getElementById('upcommingWeatherDiv');

    if(containerEl){
        containerEl.remove();
    }
    if(upcomingDiv){
        upcomingDiv.remove();
    }
    if (currentWeatherDiv) {
        currentWeatherDiv.remove(); 
    }

    if (hourlyTable) {
        hourlyTable.remove();
    }

    if (upcommingTableEl) {
        upcommingTableEl.remove(); 
    }
 }