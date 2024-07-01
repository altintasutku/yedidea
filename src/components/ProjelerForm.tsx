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
    companyName: z.string({
        required_error: "Firma adı zorunludur.",
    }).describe("Firma Adı"),
    startDate: z.coerce.date().describe("Başlangıç Tarihi"),
    endDate: z.coerce.date().describe("Bitiş Tarihi"),
    price: z.coerce.number().describe("Fiyat"),
});

const ProjelerForm = () => {
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

export default ProjelerForm