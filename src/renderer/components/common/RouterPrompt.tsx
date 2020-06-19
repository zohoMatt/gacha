import * as React from 'react';
import { Prompt } from 'react-router-dom';

export interface RouterPromptProps {
    shouldPrompt?: boolean;
}

// todo Use customized Modal component
export const RouterPrompt: React.FC<RouterPromptProps> = ({ shouldPrompt }) => {
    return (
        <>
            <Prompt
                message="All unsaved changes will be lost. Sure to proceed?"
                when={shouldPrompt || false}
                />
        </>
    );
};
