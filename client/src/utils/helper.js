export const formatTime = (date) => {

    const dateObject = new Date(date);
    const hours = dateObject.getUTCHours();
    const minutes = dateObject.getUTCMinutes();

    // Format the time as HH:MM
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;

}

export function randomID(len) {
    let result = '';
    if (result) return result;
    var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
      maxPos = chars.length,
      i;
    len = len || 5;
    for (i = 0; i < len; i++) {
      result += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return result;
  }