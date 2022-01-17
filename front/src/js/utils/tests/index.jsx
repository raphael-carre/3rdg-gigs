import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from '@js/core/store'

export const store = configureStore({ reducer: rootReducer })

export const render = (ui, options) => {
    const Wrapper = ({children}) => (
        <MemoryRouter {...options}>
            <Provider store={store}>{children}</Provider>
        </MemoryRouter>
    )

    rtlRender(ui, {wrapper: Wrapper})
}