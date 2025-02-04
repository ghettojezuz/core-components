import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { ReactElement } from 'react';
import { act } from 'react-dom/test-utils';

export const asyncRender = async (
    ui: ReactElement,
    options?: Omit<RenderOptions, 'queries'>,
): Promise<RenderResult> => {
    let result;

    await act(async () => {
        result = await render(ui, options);
    });

    return (result as unknown) as RenderResult;
};
