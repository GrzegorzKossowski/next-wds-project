"use client";
import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";
import { registerUser } from "./actions";
import { toast } from "sonner";

export default function SignUpForm() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      const result = await registerUser(formState);

      if (result.success) {
        toast.success("Konto utworzone! Możesz się zalogować.");
        router.push("/sign-in");
      } else {
        toast.error(result.error || "Coś poszło nie tak.");
      }
    });
  };

  return (
    <div className="m-4">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2 w-[350px] p-4 border">
        <input
          type="text"
          name="name"
          placeholder="Imię"
          onChange={handleChange}
          value={formState.name}
          className="w-full bg-zinc-500/30"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={formState.email}
          className="w-full bg-zinc-500/30"
        />
        <input
          type="password"
          name="password"
          placeholder="Hasło"
          onChange={handleChange}
          value={formState.password}
          className="w-full bg-zinc-500/30"
        />
        <button
          type="submit"
          disabled={isPending}
          className="bg-orange-400/30 text-white px-4 py-2 rounded"
        >
          {isPending ? "Rejestruję..." : "Zarejestruj się"}
        </button>
      </form>
    </div>
  );
}
