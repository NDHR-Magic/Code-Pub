export const format_date = (date) => {
    const month = `${new Date(date).getMonth() + 1}`;
    const days = `${new Date(date).getDate()}`;

    return `${parseInt(month) < 10 ? "0" + month : month}/${parseInt(days) < 10 ? "0" + days : "days"}/${new Date(date).getFullYear()}`;
};