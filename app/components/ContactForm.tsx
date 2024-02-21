import { Form } from '@remix-run/react';
import Label from '~/components/Label';
import { Input, TextArea } from '~/components/Inputs';

interface BaseResponse {
  success: boolean;
}

export interface ErrorResponse extends BaseResponse {
  success: false;
  errors: ContactFormErrors;
  values: ContactFormFields;
}

export type ContactFormErrors = {
  name?: string;
  email?: string;
  message?: string;
};

export type ContactFormFields = {
  name: string | undefined;
  email: string | undefined;
  message: string | undefined;
};

export interface SuccessResponse extends BaseResponse {
  success: true;
}

export type ContactFormValidationMessages = SuccessResponse | ErrorResponse;

type Props = {
  /**
   * The action to perform when the form is submitted.
   */
  action?: string;

  /**
   * Optional error data
   */
  errors?: ContactFormErrors;

  /**
   * Optional values
   */
  values?: ContactFormFields;
};

export default function ContactForm({ action, errors, values }: Props) {
  // TODO: incorporate client side validations
  return (
    <Form
      className="flex flex-row flex-wrap gap-5"
      action={action}
      method="post"
      noValidate
    >
      <Label>
        <span>
          Your name <span className="text-nord-11">*</span>
        </span>
        <Input
          type="text"
          id="name"
          name="name"
          autoComplete="name"
          defaultValue={values?.name}
          aria-invalid={errors?.name ? true : undefined}
          aria-describedby="name-error"
        />
        {errors?.name ? (
          <p id="name-error" className="text-nord-11">
            {errors.name}
          </p>
        ) : null}
      </Label>

      <Label>
        <span>
          Your email <span className="text-nord-11">*</span>
        </span>
        <Input
          type="email"
          id="email"
          name="email"
          autoComplete="email"
          defaultValue={values?.email}
          aria-invalid={errors?.email ? true : undefined}
          aria-describedby="email-error"
        />
        {errors?.email ? (
          <p id="email-error" className="text-nord-11">
            {errors.email}
          </p>
        ) : null}
      </Label>

      <Label className="hidden">
        <span>
          4 + 4 = ? <span className="text-nord-11">*</span>
        </span>
        <Input type="text" id="anti-spam" name="anti-spam" />
      </Label>

      <Label>
        <span>
          Message <span className="text-nord-11">*</span>
        </span>
        <TextArea
          id="message"
          name="message"
          defaultValue={values?.message}
          aria-invalid={errors?.message ? true : undefined}
          aria-describedby="message-error"
        />
        {errors?.message ? (
          <p id="message-error" className="text-nord-11">
            {errors.message}
          </p>
        ) : null}
      </Label>

      <div className="flex-none w-full flex justify-center items-center">
        <button
          className="px-6 py-3 bg-nord-frost-2-300 text-nord-0 transition hover:bg-nord-frost-2-500 hover:text-nord-6"
          type="submit"
        >
          Send
        </button>
      </div>
    </Form>
  );
}

Input.displayName = 'Input';

TextArea.displayName = 'TextArea';
