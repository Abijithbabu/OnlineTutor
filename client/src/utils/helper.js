export const formatTime = (date) => {

    const dateObject = new Date(date);
    const hours = dateObject.getUTCHours();
    const minutes = dateObject.getUTCMinutes();

    // Format the time as HH:MM
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;

}