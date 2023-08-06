"use client";

import {useState} from "react";
import {useForm} from "react-hook-form";
import * as zod from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Store} from "@prisma/client";
import {Trash} from "lucide-react";

import {Heading} from "@/components/ui/heading";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel, FormMessage
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";

interface SettingsFormProps {
    initialData: Store
}

const formSchema = zod.object({
    name: zod.string().min(1),
});

// this is so that we do not have to write zod.infer<typeof formSchema> every single time,
// we can just use SettingsFormValues when we need it
type SettingsFormValues = zod.infer<typeof formSchema>

export const SettingsForm: React.FC<SettingsFormProps> = ({
    initialData
}) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const form = useForm<SettingsFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
    });

    const onSubmit = async (data: SettingsFormValues) => {
        console.log(data);
    }

    return(
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title="Settings"
                    description="Manage store preferences"
                />
                <Button
                    disabled={loading}
                    variant="destructive"
                    size="icon"
                    onClick={() => setOpen(true)}
                >
                    <Trash className="h-4 w-4 " />
                </Button>
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                    <div className="grid cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Store Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button disabled={loading} className="ml-auto" typeof="submit">
                        Save Changes
                    </Button>
                </form>
            </Form>
        </>
    );
}