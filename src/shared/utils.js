export const COLORS = {
    PIVOT: 'white',
    INACTIVE: 'gray',
    COMPARED: 'purple',
    SORTED: 'green',
    DEFAULT: 'gold' 
};

export function randomize(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

export function delay(ms){
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    })
} 

