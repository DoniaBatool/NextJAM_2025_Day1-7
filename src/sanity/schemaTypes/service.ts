import { defineType,defineField } from "sanity";

export const Service = defineType({
    name: "service",
    title: "Service",
    type: "document",
    fields:[
        defineField({
            name: "name",
            title: "Service Name",
            type: "string",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            validation: (rule) => rule.required(),
            options: {
                source: "name",
            }
        })
    ]
})