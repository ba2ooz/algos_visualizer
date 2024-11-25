export function Controls({ select, buttons }) {
    return (
        <>
            <div className="controls">
                <button onClick={buttons.handleSortPlay}>Sort</button>

                <select
                    name={select.label}
                    id={select.label}
                    onChange={select.onChange}
                >
                    {select.options.map((option, id) => {
                        return (
                            <option
                                key={id}
                                value={id}
                            >
                                {option.name}
                            </option>
                        )
                    })}
                </select>
                <label htmlFor={select.label}>{select.label}</label>
            </div>
        </>
    )
}