import styles from './ArrayBars.module.css';

export function ArrayBars({ payload, backbgroundColors }) {
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
                            key={id}
                            className={styles.bar}
                            style={{
                                height: value,
                                width: dynamicWidth,
                                marginLeft: (id === 0) ? 0 : dynamicMargin,
                                marginRight: (id === barsCount - 1) ? 0 : dynamicMargin,
                                backgroundColor: backbgroundColors[id]
                            }} />
                    )
                })}
            </div>
        </>
    )
}