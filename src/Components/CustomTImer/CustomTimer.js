import React from 'react';

function CustomTimer() {
    const [counter, setCounter] = React.useState(30);

    React.useEffect(() => {
        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    }, [counter]);

    return (
        <>
            in {counter} seconds
        </>
    )
}

export default CustomTimer;