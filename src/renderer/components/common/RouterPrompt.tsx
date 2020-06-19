import * as React from 'react';
import { Prompt } from 'react-router-dom';

export interface RouterPromptProps {
    shouldPrompt?: boolean;
}

// todo Use customized Modal component
export const RouterPrompt: React.FC<RouterPromptProps> = ({ shouldPrompt }) => {
    const checkDuplicate = (location: any) => {
        if (location.pathname === window.location.pathname) {
            return false;
        }
        return 'All unsaved changes will be lost. Sure to proceed?';
    };

    return (
        <>
            <Prompt message={checkDuplicate} when={shouldPrompt || false} />
        </>
    );
};
