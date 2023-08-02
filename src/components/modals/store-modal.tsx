"use client";

import * as zod from "zod";
import axios from "axios";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useState} from "react";
import {toast} from "react-hot-toast";

import {Modal} from "@/components/ui/modal";
import {useStoreModal} from "@/../hooks/use-store-modal";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

const formSchema = zod.object({
    name: zod.string().min(1),
});

export const StoreModal = () => {
    const storeModal = useStoreModal();

    const [loading, setLoading] = useState(false);

    const form = useForm<zod.infer<typeof formSchema>>({
       resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });

    const onSubmit = async (values: zod.infer<typeof formSchema>) => {
        try {
            setLoading(true);
            // Throwing a new error for testing purposes
            // throw new Error("Error");

            const response = await axios.post('/api/stores', values);

            // this is better than nextjs redirect() because it works asynchronously, and this way the submission to the
            // database is sure to execute BEFORE being redirected to another page.
            window.location.assign(`/${response.data.id}`);
        } catch (error) {
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Modal
            title="Create Store"
            description="Add a new store to manage products and categories"
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}
        >
            <div>
                <div className="space-y-4 py-2 pb-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={loading}
                                                placeholder="E-commerce" {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="pt-6 space-x-2 items-center justify-end w-full">
                                <Button
                                    disabled={loading}
                                    variant="outline"
                                    onClick={storeModal.onClose}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    disabled={loading}
                                    type="submit"
                                >
                                    Continue
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </Modal>
    );
}