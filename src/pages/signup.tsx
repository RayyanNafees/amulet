import { toast } from "sonner";
import { useState } from "preact/hooks";
import type React from "preact/compat";

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
  <label class="block">
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

const IconLayout = ({
  label,
  isActive,
  children,
  onClick,
  className
}: {
  label: string;
  isActive: boolean;
  children: React.ReactNode;
  onClick: () => void;
  className?: string
}) => (
  <button
    type="button"
    onClick={onClick}
    class={`col-span-1 p-2 flex flex-col justify-center container items-center hover:cursor-pointer rounded-md border-2 border-sky-800 text-sky-800 shadow hover:shadow-md transition-shadow hover:bg-sky-50 transition-color ${isActive && "bg-sky-200"} ${className}`}
  >
    {children}
    <span class="py-1">{label}</span>
  </button>
);

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [isDoc, setIsDoc] = useState(false);
  return (
    <div class="divide-y divide-gray-300/50">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setLoading(true);
          const form = new FormData(e.currentTarget);
          const name = form.get("name") as string;
          const password = form.get("password") as string;
          const email = form.get("email") as string;
          const confirmPass = form.get("password-confirm") as string;

          console.log("Create Account", {
            name,
            password,
            email,
            confirmPass,
          });
          await fetch(
            "https://hospital.pockethost.io/api/collections/users/records",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name,
                password,
                email,
                passwordConfirm: confirmPass,
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
              setLoading(false);
            });
        }}
        class="space-y-3 py-8 text-base leading-7 text-gray-600"
      >
        <div class="space-y-1">
          <p class="text-xl font-light">Create your Account</p>
          <p class="pb-5 text-sm text-neutral-500 italic">
            Already have an account ? <a href="/login" class="text-sky-400 underline">Login</a>
          </p>
        </div>

        <div class="grid grid-cols-2 gap-0 my-8 mx-auto">
          <IconLayout
            label="Doctor"
            onClick={() => setIsDoc(true)}
            isActive={isDoc}
          >
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 15 15"
            >
              <path
                fill="currentColor"
                d="M5.5 7A2.5 2.5 0 0 1 3 4.5v-2a.5.5 0 0 1 .5-.5H4a.5.5 0 0 0 0-1h-.5A1.5 1.5 0 0 0 2 2.5v2a3.49 3.49 0 0 0 1.51 2.87A4.4 4.4 0 0 1 5 10.5a3.5 3.5 0 1 0 7 0v-.57a2 2 0 1 0-1 0v.57a2.5 2.5 0 0 1-5 0a4.4 4.4 0 0 1 1.5-3.13A3.49 3.49 0 0 0 9 4.5v-2A1.5 1.5 0 0 0 7.5 1H7a.5.5 0 0 0 0 1h.5a.5.5 0 0 1 .5.5v2A2.5 2.5 0 0 1 5.5 7m6 2a1 1 0 1 1 0-2a1 1 0 0 1 0 2"
              />
            </svg>
          </IconLayout>
          <IconLayout
            label="Patient"
            onClick={() => setIsDoc(false)}
            isActive={!isDoc}
          >
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <g fill="none" stroke="currentColor" stroke-width="1.5">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 20.25a8.25 8.25 0 1 0 0-16.5a8.25 8.25 0 0 0 0 16.5M13.75.75h-3.5m1.75 0v3m-6.718-.942L4.045 4.045L2.808 5.282m1.237-1.237l2.121 2.121M.75 10.25v3.5m0-1.75h3m-.942 6.718l1.237 1.237l1.237 1.237m-1.237-1.237l2.121-2.121m4.084 5.416h3.5m-1.75 0v-3m6.718.942l1.237-1.237l1.237-1.237m-1.237 1.237l-2.121-2.121m5.416-4.084v-3.5m0 1.75h-3m.942-6.718l-1.237-1.237l-1.237-1.237m1.237 1.237l-2.121 2.121"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9.5 11.25a1.75 1.75 0 1 0 0-3.5a1.75 1.75 0 0 0 0 3.5"
                />
                <path d="M12.75 17a.375.375 0 0 1 0-.75m0 .75a.375.375 0 0 0 0-.75m4-3.625a.375.375 0 0 1 0-.75m0 .75a.375.375 0 0 0 0-.75" />
              </g>
            </svg>
          </IconLayout>
        </div>

        <IconInput
          label="Full name"
          name="name"
          type="text"
          placeholder={`${isDoc ? 'Dr. ' : ''}John Doe`}
        >
          <path
            fill="currentColor"
            d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 2a2 2 0 0 0-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2m0 7c2.67 0 8 1.33 8 4v3H4v-3c0-2.67 5.33-4 8-4m0 1.9c-2.97 0-6.1 1.46-6.1 2.1v1.1h12.2V17c0-.64-3.13-2.1-6.1-2.1"
          />
        </IconInput>
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
        <IconInput
          label="Confirm Password"
          type="password"
          name="password-confirm"
          placeholder="N00bMa$ter69"
        >
          <path
            fill="currentColor"
            d="M12 17a2 2 0 0 1-2-2c0-1.11.89-2 2-2a2 2 0 0 1 2 2a2 2 0 0 1-2 2m6 3V10H6v10zm0-12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10c0-1.11.89-2 2-2h1V6a5 5 0 0 1 5-5a5 5 0 0 1 5 5v2zm-6-5a3 3 0 0 0-3 3v2h6V6a3 3 0 0 0-3-3"
          />
        </IconInput>

        <div class="block">
          <div class="mt-6">
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
          class="container block self-center rounded-md border-2 bg-sky-500 p-2 text-neutral-100"
        >
          {!loading ? (
            <div>Create an account</div>
          ) : (
            <div class="container flex items-center justify-center gap-2">
              <LoadingSpinner />
              please wait...
            </div>
          )}
        </button>
      </form>
      <div class="container text-nowrap pt-8 font-semibold">
        <a
          href="https://tailwindcss.com/docs"
          class="container flex items-center justify-center rounded border-2 border-sky-500 p-2 text-sky-500 hover:text-sky-600"
        >
          <GoogleLogo />
          Login with Google
        </a>
      </div>{" "}
    </div>
  );
};

const GoogleLogo = () => (
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    class="mr-1.5 size-4"
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

export default Signup;
