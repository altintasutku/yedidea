"use client"

import React from 'react'
import { z } from 'zod';
import AutoForm, { AutoFormSubmit } from './ui/auto-form';

const formSchema = z.object({
    name: z
        .string({
            required_error: "Proje adı zorunludur.",
        })
        .describe("Proje Adı"),
    sector: z.string({
        required_error: "Sektör zorunludur.",
    }).describe("Sektör"),
});

const FirmaForm = () => {
    return (
        <AutoForm
            formSchema={formSchema}
            onSubmit={async (values) => {

            }}
        >
            <AutoFormSubmit>Ekle</AutoFormSubmit>
        </AutoForm>
    )
}

export default FirmaForm