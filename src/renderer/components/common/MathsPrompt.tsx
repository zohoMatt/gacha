import * as React from 'react';
import { InlineMath } from 'react-katex';

export interface MathsPromptProps {
    literal: string;
}

export const MathsPrompt: React.FunctionComponent<MathsPromptProps> = ({ literal }) => {
    return <InlineMath>{literal}</InlineMath>;
};
