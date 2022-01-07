import React, { useMemo, useState } from "react";
import { Button, Flex, Text } from "@fluentui/react-northstar";

export const Demo = () => {
    const [base, setBase] = useState(0);
    const [iterations, setIterations] = useState(0);

    const compute = (base: number, iterations: number) => {
        let total = 0;
        for (let i = 0; i < iterations; i++) {
            total += i * i * i;
        }

        console.log(`Call compute, base: ${base}, iterations: ${iterations}`);
        return total;
    };

    const memoizedValue = useMemo(
        () => compute(base, iterations),
        [base, iterations]
    );
    // const memoizedValue = compute(base, iterations);

    return (
        <Flex column>
            <Text>{`Total: ${memoizedValue}`}</Text>
            <Button
                onClick={() => {
                    setBase(100);
                    setIterations(100);
                }}
            >
                {`Base: 100, Iterations: 100`}
            </Button>
            <Button
                onClick={() => {
                    setBase(100);
                    setIterations(100);
                }}
            >
                {`Base: 100, Iterations: 100`}
            </Button>
            <Button
                onClick={() => {
                    setBase(50);
                    setIterations(100);
                }}
            >
                {`Base: 50, Iterations: 100`}
            </Button>
        </Flex>
    );
};
