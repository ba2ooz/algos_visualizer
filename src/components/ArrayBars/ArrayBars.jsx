import styles from './ArrayBars.module.css';

export const arrayBarElements = document.getElementsByClassName(styles.bar);

export function ArrayBars({ payload, color }) {
    const barsCount = payload.length;

    // calculate gap between bars in pixels,
    // width of the array bars container in pixels 
    // and margin as half the gap on each side of the bar for even spacing of the array bars'
    const gap = 2;
    const containerWidth = 2000;
    const totalGap = gap * (barsCount - 1);
    const dynamicWidth = Math.round((containerWidth - totalGap) / barsCount);
    const dynamicMargin = gap / 2;

    return (
        <>
            <div className={styles.array}>
                {payload.map((value, id) => {
                    return (
                        <div
                            // set the key to the combination of 'id-array.length' 
                            // to force react see all bars as new at component re-render.
                            // if only set to id it does not re-render all the bars, 
                            // therefore some bars color remains as they've been set at the previous render.  
                            key={`${id}-${barsCount}`}
                            className={styles.bar}
                            style={{
                                height: value,
                                width: dynamicWidth,
                                marginLeft: (id === 0) ? 0 : dynamicMargin,
                                marginRight: (id === barsCount - 1) ? 0 : dynamicMargin,
                                backgroundColor: color
                            }} />
                    )
                })}
            </div>
        </>
    )
}