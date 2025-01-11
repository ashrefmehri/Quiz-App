"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { signIn } from 'next-auth/react'
import axios from "axios";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide.",
  }),
  password: z.string().min(8, {
    message: "Le mot de passe doit comporter au moins 8 caractères.",
  }),
  role: z.enum(["STUDENT", "TEACHER"], {
    required_error: "Veuillez sélectionner un rôle.",
  }),
});

export function SignInForm() {
  const [isTeacher, setIsTeacher] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {

      email: "",
      password: "",
      role: "STUDENT",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError("");
    try {
        const result = await signIn('credentials', {
            redirect: false,
            email:values.email,
            password:values.password,
          })
          if (result?.error) {
            console.error(result.error)
          } else {
            router.push('/')
          }
    } catch (error) {
        console.error(error)

    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-md py-14 w-full mx-auto space-y-6">
      <div className="space-y-2 flex flex-col items-center text-center">
        <div className="flex  space-x-2">

        <h1 className="md:text-5xl text-4xl text-blue-600 font-bold">Bienvenue sur</h1>
          <Image src="/logo.svg" alt="logo" width={130} height={50} className="md:w-32 w-24 " />

            </div>{" "}
        <p className="text-gray-600  dark:text-gray-400">
        Connectez-vous pour accéder à vos quiz personnalisés        </p>
      </div>

      {error && (
        <div className="w-full border border-red-500  space-x-2  flex items-center justify-center rounded-lg px-6 py-4">
          <Image
            src="/warning-open.svg"
            alt="warning"
            height={20}
            width={20}
            className=""
          />
          <span className="text-red-500 md:text-[17px] text-[19px] font-medium">
            {error}
          </span>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="md:text-[17px] text-[19px]">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    className="font-medium md:text-[17px] text-[19px] outline-blue-600"
                    type="email"
                    placeholder="john@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="md:text-[17px] text-[19px]">
                  Mot de passe
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    className="font-medium md:text-[17px] text-[19px] outline-blue-600"
                    type="password"
                    placeholder="********"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="md:text-[17px] text-[19px] ">
                  Je suis:
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => {
                      field.onChange(value);
                      setIsTeacher(value === "teacher");
                    }}
                    defaultValue={field.value}
                    className="flex  space-x-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="STUDENT" />
                      </FormControl>
                      <FormLabel className="font-normal  md:text-[17px] text-[19px]">
                        Éleve
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="TEACHER" />
                      </FormControl>
                      <FormLabel className="font-normal  md:text-[17px] text-[19px]">
                        Enseignant
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {isTeacher && (
            <FormItem>
              <FormDescription className="text-gray-600 font-medium">
                En tant qu'enseignant, notre équipe devra vous contacter pour
                obtenir des informations supplémentaires. Veuillez soumettre le
                formulaire, et nous vous contacterons bientôt.
              </FormDescription>
            </FormItem>
          )}
          <Button
            disabled={isLoading}
            type="submit"
            className="w-full md:text-[17px] text-[19px] bg-blue-600 hover:bg-blue-600/90"
          >
            S'inscrire
          </Button>
          <Button
            disabled={isLoading}
            variant="secondary"
            className="border md:text-[17px] text-[19px] py-1.5 rounded-lg w-full flex items-center justify-center"
          >
            <Image src="/google1.svg" alt="google" height={20} width={20} />
            <span>Continuer avec Google</span>
          </Button>
        </form>
      </Form>
    </div>
  );
}
