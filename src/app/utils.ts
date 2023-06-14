
export const randomColor = () => {
    return '#xxxxxx'.replace(/x/g, y => (Math.random() * 16 | 0).toString(16));
}