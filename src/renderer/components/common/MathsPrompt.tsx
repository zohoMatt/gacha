import * as React from 'react';
import { InlineMath } from 'react-katex';

const MathsPrompt: React.FunctionComponent<any> = () => {
    return <InlineMath>\int_0^\infty x^2 dx</InlineMath>;
};

export { MathsPrompt };
