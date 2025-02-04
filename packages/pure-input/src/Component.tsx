import React, { InputHTMLAttributes, useRef } from 'react';
import cn from 'classnames';
import mergeRefs from 'react-merge-refs';
import { useFocus } from '@alfalab/hooks';

import styles from './index.module.css';

export type PureInputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'size' | 'type' | 'enterKeyHint'
> & {
    /**
     * Растягивает компонент на ширину контейнера
     */
    block?: boolean;

    /**
     * Атрибут type
     */
    type?: 'number' | 'card' | 'email' | 'hidden' | 'money' | 'password' | 'tel' | 'text';

    /**
     * Размер компонента
     */
    size?: 's' | 'm' | 'l' | 'xl';

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};

export const PureInput = React.forwardRef<HTMLInputElement, PureInputProps>(
    ({ size = 's', type = 'text', block = false, className, dataTestId, ...restProps }, ref) => {
        const inputRef = useRef<HTMLInputElement>(null);

        const [focusVisible] = useFocus(inputRef, 'keyboard');

        return (
            <input
                {...restProps}
                className={cn(
                    styles.component,
                    styles[size],
                    {
                        [styles.block]: block,
                        [styles.focusVisible]: focusVisible,
                    },
                    className,
                )}
                ref={mergeRefs([ref, inputRef])}
                type={type}
                data-test-id={dataTestId}
            />
        );
    },
);

/**
 * Для отображения в сторибуке
 */
PureInput.defaultProps = {
    size: 's',
    type: 'text',
    block: false,
};
