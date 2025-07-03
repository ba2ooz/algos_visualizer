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

export async function delay(ms){
    // allow browser to render the frame before applying the delay
    await new Promise(requestAnimationFrame);

    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    })
} 

