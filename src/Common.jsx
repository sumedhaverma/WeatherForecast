import { memo } from "react";

export const Celsius = memo(({ temp }) => {
    return (temp-273.15).toFixed() + '℃ ';
});