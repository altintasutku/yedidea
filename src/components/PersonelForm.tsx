"use client"

import React from 'react'
import { z } from 'zod';
import AutoForm, { AutoFormSubmit } from './ui/auto-form';

const formSchema = z.object({
    name: z
        .string({
            required_error: "İsim zorunludur.",
        })
        .describe("İsim"),
    sector: z.string({
        required_error: "Sektör zorunludur.",
    }).describe("Sektör"),
    age: z.coerce.number().min(1, "Yaş 1'den büyük olmalıdır.").describe("Yaş"),
    resume: z.string().describe("Özgeçmiş"),
});

const PersonelForm = () => {
    return (
        <AutoForm
            formSchema={formSchema}
            onSubmit={async (values) => {

            }}
            fieldConfig={{
                resume: {
                    fieldType: "file",
                },
            }}
        >
            <AutoFormSubmit>Ekle</AutoFormSubmit>
        </AutoForm>
    )
}

export default PersonelForm