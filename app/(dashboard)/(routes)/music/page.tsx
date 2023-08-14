"use client"

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import axios from "axios";

import { ChatCompletionRequestMessage } from "openai";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { MusicIcon } from "lucide-react";

import { useRouter } from "next/navigation";

import { formSchema } from "./constants";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/heading";
import { Empty } from "@/components/empty";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Loader } from "@/components/loader";
import { useProModel } from "@/hooks/use-pro-model";
import { toast } from "react-hot-toast";



// Conversations UI
const MusicPage = () => {
    const proModel = useProModel();
    const router = useRouter();
    const[music, setMusic] = useState<string>();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setMusic(undefined);

            const response = await axios.post("/api/music", values);

            setMusic(response.data.audio);
            form.reset();
        } catch (error: any) {
            if (error?.response?.status === 403) {
                proModel.onOpen();
            } else {
                toast.error("Something went wrong")
            }
        } finally {
          router.refresh();
        }
        
    };


    return (
        <div>
            <Heading 
                title="Music Generation"
                description="Turn your prompt into music."
                icon={MusicIcon}
                iconColor="text-emerald-500"
                bgColor="bg-emerald-500/10"
            />
            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form}>
                        <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="rounded-lg border w-full p-4 px-3 md:px-6 focus-whitin:shadow-sm
                                    grid grid-cols-12 gap-2"
                        >
                            <FormField 
                                name="prompt"
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-10">
                                        <FormControl className="m-0 p-0">
                                            <Input 
                                            className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparant"
                                            disabled={isLoading}
                                            placeholder="Piano solo"
                                            {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
                                Generate
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className="space-y-4 mt-4">
                    {isLoading && (
                        <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                            <Loader />
                        </div>
                    )}
                    {!music && !isLoading && (
                        <div>
                            <Empty
                            label="No music generated."
                            />
                        </div>
                    )}
                    {music && (
                        <audio controls className="w-full mt-8">
                            <source src={music}/>

                        </audio>
                    )}
                </div>
            </div>
        </div>
    );
}
 
export default MusicPage;