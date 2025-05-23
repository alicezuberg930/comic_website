'use client'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/locales/i18n'
import React from 'react'

export default function CustomI18nextProvider({ children }: { children: React.ReactNode }) {
    return (
        <I18nextProvider i18n={i18n}>
            {children}
        </I18nextProvider>
    )
}