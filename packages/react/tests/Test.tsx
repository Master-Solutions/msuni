import React from "react";

export interface ITestProps {
    name?: string
}
export const Test = (props: ITestProps) => <div role="t">Test: {props.name || "default"}</div>;