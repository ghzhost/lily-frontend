 import "@testing-library/jest-dom/vitest";
 import { render, screen, waitFor } from "@testing-library/react";
 import userEvent from "@testing-library/user-event";
 import { describe, expect, it, vi } from "vitest";

 import { useFormAction, type FormActionState } from "../../lib/forms/use-form-action";

 interface DemoProps {
   action: (
     prev: FormActionState<{ greeting: string }>,
     payload: FormData,
   ) => Promise<FormActionState<{ greeting: string }>>;
 }

 function DemoForm({ action }: DemoProps) {
   const { state, pending, submit } = useFormAction<{ greeting: string }>(action);

   return (
     <form action={submit}>
       <input name="name" defaultValue="" />
       <button type="submit" disabled={pending}>
         {pending ? "Submitting..." : "Submit"}
       </button>
       {state.formError && <p data-testid="form-error">{state.formError}</p>}
       {state.fieldErrors?.name && (
         <p data-testid="field-error">{state.fieldErrors.name.join(", ")}</p>
       )}
       {state.data?.greeting && (
         <p data-testid="success">{state.data.greeting}</p>
       )}
     </form>
   );
 }

 describe("useFormAction", () => {
   it("surfaces field errors returned by the action", async () => {
     const action = vi.fn(async () => ({
       fieldErrors: { name: ["Name is required"] },
       formError: null,
       data: null,
     }));

     render(<DemoForm action={action} />);
     await userEvent.click(screen.getByRole("button"));

     await waitFor(() => {
       expect(screen.getByTestId("field-error")).toHaveTextContent(
         "Name is required",
       );
     });
   });

   it("shows pending state while the action resolves", async () => {
     let resolveAction: (value: FormActionState<{ greeting: string }>) => void;
     const action = vi.fn(
       () =>
         new Promise<FormActionState<{ greeting: string }>>((resolve) => {
           resolveAction = resolve;
         }),
     );

     render(<DemoForm action={action} />);
     await userEvent.click(screen.getByRole("button"));

     expect(screen.getByRole("button")).toHaveTextContent("Submitting...");

     // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
     resolveAction!({ fieldErrors: null, formError: null, data: { greeting: "Hi" } });

     await waitFor(() => {
       expect(screen.getByTestId("success")).toHaveTextContent("Hi");
     });
   });


   it("captures thrown errors as form-level failures", async () => {
     const action = vi.fn(async () => {
       throw new Error("Network down");
     });

     render(<DemoForm action={action} />);
     await userEvent.click(screen.getByRole("button"));

     await waitFor(() => {
       expect(screen.getByTestId("form-error")).toHaveTextContent("Network down");
     });
   });

   it("resets state without re-executing action", async () => {
    function ResetDemo({ action }: DemoProps) {
      const { state, submit, reset } = useFormAction<{ greeting: string }>(action);
      return (
        <form action={submit}>
          <button type="submit">Submit</button>
          <button type="button" onClick={reset}>Reset</button>
          {state.formError && <p data-testid="form-error">{state.formError}</p>}
        </form>
      );
    }

    const action = vi.fn(async () => {
      throw new Error("Failure");
    });

    render(<ResetDemo action={action} />);
    await userEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(screen.getByTestId("form-error")).toHaveTextContent("Failure");
    });
    expect(action).toHaveBeenCalledTimes(1);

    await userEvent.click(screen.getByRole("button", { name: "Reset" }));

    await waitFor(() => {
      expect(screen.queryByTestId("form-error")).toBeNull();
    });
    expect(action).toHaveBeenCalledTimes(1);
  });
 });
