import type React from 'react'
import { LoadingState } from '~/enums/LoadingState.ts'

interface ComponentWithLoaderProps {
    loading: LoadingState
    onLoading: React.ReactNode
    onError: React.ReactNode
    children: React.ReactNode
}

export const ComponentWithLoader: React.FC<ComponentWithLoaderProps> = (
    props: ComponentWithLoaderProps
) => {
    const { loading, onLoading, onError, children } = props
    switch (loading) {
        case LoadingState.LOADING:
            return onLoading
        case LoadingState.LOADED:
            return children
        case LoadingState.ERROR:
            return onError
        default: {
            /* Empty */
        }
    }
}
