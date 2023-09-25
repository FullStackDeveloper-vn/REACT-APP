import { useEffect } from 'react';

export function useInterval(onTick, delay) {


    let fx = () => {
        console.log('✅ Setting up an interval with delay ', delay)

        const id = setInterval(onTick, delay);

        return () => {
            console.log('❌ Clearing an interval with delay ', delay)

            clearInterval(id);
        };
    }


    return useEffect(fx, [delay]);


}
