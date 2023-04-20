import { useEffect } from 'react';
import type { ActionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useActionData } from '@remix-run/react';
import sgMail from '@sendgrid/mail';
import invariant from 'tiny-invariant';
import Navigation from '~/components/Navigation';
import Prose from '~/components/Prose';
import MainSection from '~/components/MainSection';
import {
  SocialMediaList,
  SocialMediaListItem,
} from '~/components/SocialMediaLinks';
import type {
  ContactFormErrors,
  ContactFormFields,
  ContactFormValidationMessages,
} from '~/components/ContactForm';
import ContactForm from '~/components/ContactForm';
import { hasValue, isEmail } from '~/validations';
import AnchorLink from '~/components/AnchorLink';

export async function action({ request }: ActionArgs) {
  const data = await request.formData();
  const form = Object.fromEntries(data);

  const { name, email, message } = form;
  const errors: ContactFormErrors = {};

  if (!hasValue(name)) {
    errors.name = 'Please provide your name.';
  }

  if (!hasValue(email)) {
    errors.email = 'Please provide your email address.';
  } else if (!isEmail(email)) {
    errors.email = 'Please provide a valid email address.';
  }

  if (!hasValue(message)) {
    errors.message = 'Please provide a message.';
  }

  invariant(typeof name === 'string', 'name should be a string');
  invariant(typeof email === 'string', 'email should be a string');
  invariant(typeof message === 'string', 'message should be a string');

  const values: ContactFormFields = {
    name,
    email,
    message,
  };

  if (Object.keys(errors).length > 0) {
    return json<ContactFormValidationMessages>(
      { success: false, errors, values },
      { status: 400 },
    );
  }

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const body = `
    Name: ${name}
    Email: ${email}
    Message: ${message}
  `;

  try {
    const result = await sgMail.send({
      to: 'hi@lodybo.nl',
      from: 'contactform@lodyborgers.nl',
      replyTo: email,
      subject: 'Contact form submission',
      text: body,
    });

    const { statusCode } = result[0];

    return json<ContactFormValidationMessages>(
      { success: true },
      { status: statusCode },
    );
  } catch (error: any) {
    console.error(`Error ${error.code}`, error.response.body.errors);

    const messages = error.response.body.errors
      .map((err: any) => err.message)
      .join(', ');
    throw new Error(messages);
  }
}

export default function ContactPage() {
  const data = useActionData() as ContactFormValidationMessages | undefined;
  let errors: ContactFormErrors = {};
  let values: ContactFormFields = {
    name: '',
    email: '',
    message: '',
  };

  if (data && !data.success) {
    errors = data.errors;
    values = data.values;
  }

  useEffect(() => {
    if (window.Calendly) {
      window.Calendly.initInlineWidget({
        url: 'https://calendly.com/lodybo/30min',
        parentElement: document.getElementById('calendly-lodybo'),
        prefill: {},
        utm: {},
      });
    }
  }, []);

  return (
    <>
      <Navigation />

      <MainSection className="mt-10">
        <Prose>
          <h1>Let's keep in touch!</h1>
          <p>
            I'm always happy to hear from you, and you can reach out to me (or
            follow me) on a number of different channels. You can always{' '}
            <AnchorLink href="#book">book a call</AnchorLink> with me, or{' '}
            <AnchorLink href="#contact-form">send me a message</AnchorLink>.
          </p>

          <p></p>

          <div className="flex flex-col gap-4">
            <h2>Socials</h2>
            <p>
              I'm using social media for different aspects of my life. So
              depending on <em>what</em> you want to contact me for, you might
              need to use a different channel.
            </p>
            <div className="flex-1 flex flex-row gap-4">
              <div className="flex-1">
                <h3 className="!mt-0">Music</h3>
                <div className="not-prose">
                  <SocialMediaList alignment="left">
                    <SocialMediaListItem
                      url="https://www.instagram.com/lodybo"
                      icon="instagram"
                      ariaLabel="My music Instagram profile"
                      title="@lodybo on Instagram"
                    />
                  </SocialMediaList>
                </div>
              </div>

              <div className="flex-1">
                <h3 className="!mt-0">Front-end</h3>
                <div className="not-prose">
                  <SocialMediaList alignment="left" stacked>
                    <SocialMediaListItem
                      url="https://twitter.com/lodybo"
                      icon="twitter"
                      ariaLabel="My Twitter profile"
                      title="Twitter"
                    />
                    <SocialMediaListItem
                      url="https://mastodon.social/@lodybo"
                      icon="mastodon"
                      ariaLabel="My Mastodon profile"
                      title="Mastodon"
                      rel="me"
                    />
                    <SocialMediaListItem
                      url="https://linkedin.com/in/lodybo"
                      icon="linkedin-in"
                      ariaLabel="My LinkedIn profile"
                      title="LinkedIn"
                    />
                  </SocialMediaList>
                </div>
              </div>
            </div>
          </div>

          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a id="book">
            <h2>Book 30 minutes with me</h2>
          </a>
          <p>
            Do you think I can help you with something or want to discuss
            something, I'm also available for 30 minute calls. Book a date in my
            calender and let's meet!
          </p>
          <div id="calendly-lodybo" className="w-full h-[64rem]" />

          {data && data.success ? (
            <>
              <h2>Thanks!</h2>
              <p>
                I'll get back to you as soon as I can, but please allow a few
                business days to pass..
              </p>
            </>
          ) : (
            <>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a id="contact-form">
                <h2>Or send me an email</h2>
              </a>
              <p>
                If you prefer, you can fill in the form to contact me through
                email. <br />
                <span className="text-sm">
                  <span className="text-nord-11">*</span> is required.
                </span>
              </p>

              <ContactForm action="/contact" errors={errors} values={values} />
            </>
          )}
        </Prose>
      </MainSection>

      <script
        type="text/javascript"
        src="https://assets.calendly.com/assets/external/widget.js"
        async
      ></script>
    </>
  );
}
