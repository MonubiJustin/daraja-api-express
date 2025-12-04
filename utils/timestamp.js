export const getTimestamp = () => {
    const date_string = new Date().toLocaleString("en-US", {
        timeZone: "Africa/Nairobi"
    });
    const date = new Date(date_string);
    const year = String(date.getFullYear());
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDay()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getMinutes()).padStart(2, '0');

    return year+month+day+hours+minutes+seconds;
}