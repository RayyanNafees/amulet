import { toast } from "sonner";
import type React from "preact/compat";
import { signal } from "@preact/signals";

const IconInput = ({
  label,
  name,
  type = "text",
  placeholder,
  children,
  textarea = false,
  ...props
}: {
  label: string;
  name: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder: string;
  children: React.ReactNode;
  textarea?: boolean;
}) => (
  <label class="block mx-auto px-2">
    <span class="text-gray-700">{label}</span>
    <div class="relative">
      <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-gray-400"
          viewBox="0 0 24 24"
        >
          {children}
        </svg>
      </div>
      {textarea ? (
        <textarea
          type={type}
          name={name}
          class="mt-1 block w-full rounded-md border-gray-300 pl-10 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder={placeholder}
          {...props}
        />
      ) : (
        <input
          type={type}
          name={name}
          class="mt-1 block w-full rounded-md border-gray-300 pl-10 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder={placeholder}
          {...props}
        />
      )}
    </div>
  </label>
);

const loading = signal(false);

const onFormSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
  e.preventDefault();
  loading.value = true;
  const form = new FormData(e.currentTarget);
  const password = form.get("password") as string;
  const email = form.get("email") as string;

  console.log("Create Account", {
    password,
    identity: email,
  });
  await fetch(
    "https://hospital.pockethost.io/api/collections/users/auth-with-password",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        identity: email,
      }),
    },
  )
    .then((r) => r.json())
    .then((user) => {
      localStorage.setItem("user", JSON.stringify(user));
      window.location.href = "/dashboard";
      toast.success("Signed up successfully");
    })
    .catch(() => toast.error("Failed to sign up"))
    .finally(() => {
      loading.value = false;
    });
};

const Login = () => (
  <div class="divide-gray-300/50 divide-y-2">
    <form
      onSubmit={onFormSubmit}
      class="space-y-3 py-8 text-base leading-7 text-gray-600"
    > 
      <div class="space-y-1">
        <p class="text-xl">Login to your account</p>
        <p class="pb-5 text-md italic text-neutral-500">
          Don't have an account ? <a href="/signup" class="text-sky-400 underline">Create Account</a>
        </p>
      </div>

      <IconInput
        label="Email"
        name="email"
        type="email"
        placeholder="joe@example.com"
      >
        <path
          fill="currentColor"
          d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2zm-2 0l-8 5l-8-5zm0 12H4V8l8 5l8-5z"
        />
      </IconInput>
      <IconInput
        label="Password"
        type="password"
        name="password"
        placeholder="N00bMa$ter69"
      >
        <path
          fill="currentColor"
          d="M12 17a2 2 0 0 1-2-2c0-1.11.89-2 2-2a2 2 0 0 1 2 2a2 2 0 0 1-2 2m6 3V10H6v10zm0-12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10c0-1.11.89-2 2-2h1V6a5 5 0 0 1 5-5a5 5 0 0 1 5 5v2zm-6-5a3 3 0 0 0-3 3v2h6V6a3 3 0 0 0-3-3"
        />
      </IconInput>

      <div class="block">
        <div class="mt-2">
          <div>
            <label class="inline-flex items-center">
              <input
                type="checkbox"
                class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 focus:ring-offset-0"
                checked
              />
              <span class="ml-2">
                I accept your
                <a href="tnc" class="underline">
                  Terms & Conditions
                </a>
                &
                <a href="privacy" class="underline">
                  Privacy Policy
                </a>
              </span>
            </label>
          </div>
        </div>
      </div>
      <button
        type="submit"
        class="container block self-center rounded-md border-2 bg-sky-500 py-2 text-neutral-100"
      >
        {!loading.value ? (
          <div>Login</div>
        ) : (
          <div class=" container flex items-center justify-center gap-2">
            <LoadingSpinner />
            please wait...
          </div>
        )}
      </button>
    </form>

    <div class="container text-nowrap pt-8 font-semibold">
      <a
        href="https://tailwindcss.com/docs"
        class="container flex items-center justify-center rounded border-2 border-sky-500 py-2 text-sky-500 hover:text-sky-600"
      >
        <GoogleLogo />
        Login with Google
      </a>
    </div>
  </div>
);

const GoogleLogo = () => (
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    class="mr-1 size-4"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27c3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10c5.35 0 9.25-3.67 9.25-9.09c0-1.15-.15-1.81-.15-1.81"
    />
  </svg>
);

const LoadingSpinner = () => (
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    class="size-6 animate-spin"
    viewBox="0 0 24 24"
  >
    <path fill="currentColor" d="M12 4V2A10 10 0 0 0 2 12h2a8 8 0 0 1 8-8" />
  </svg>
);

export default Login;
