export const convertDate = ( date ) => {
    const d = new Date(date);
    const dateString = d.toString().split(" ");
    return `${dateString[0]}, ${dateString[2]} ${dateString[1]}`;
}