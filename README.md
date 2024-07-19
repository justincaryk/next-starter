This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

* First, install depedencies the development server:

```bash
yarn
```

* Second, spin up the local instance:

```bash
yarn dev
```

* Third, in a browser, either navigate to `localhost:3000` (this is just a list of all the available routes) or navigate to `localhost:3000/signup` to begin the user flow.

## Husky (optional, but recommended)

Husky is integrated to provide automated linting/formatting standards. To install husky and its hooks run the following command:

```bash
yarn husky:prepare
```

### UX Principles

The main consideration in customer acquisition is to reduce friction. Approaches vary, but a pretty consistent recommendation to reduce friction is to break onboarding into small easy steps. As such, this challenge breaks the onboard flow into 3 steps:

1. Collect email and password (this is the only absolutely critical information for account creation).
2. Collect the user's occupation, which can be used for demographic reporting as well as tailoring the subsequent interests collection step to be more targeted. The primary call to action is clear and obvious; however, in keeping with the theme of reducing friction, I included an option to skip this step.
3. Collect the user's interests. As above, the desired call to action is prominent, but a skip option is also included here.

### Form validation

- The signin form validates on submit as there is less need to reduce friction.
- The signup form validates validates each input onBlur to provide immediate and clear feedback.

### Passwords

I understand arbitrary requirements are the default (eg. minLength, upper, lower, special, number), but this discourages passphrase patterns, which can be as secure or more and have the benefit of being easier for users to remember.

Given time constraints and a lack of cryptography expertise, I integrated the `@zxcvbn-ts/core` package to test the password strength. Of all packages investigated, this received the [best score, as rated by snyk](https://snyk.io/advisor/npm-package/@zxcvbn-ts/core).

### Accessibility Checklist:

#### screen-reader

- keyboard navigation is fully supported
- forms:
  - `label.for` = `input.id` (tradeoff: the forms are super basic at this point, so it is just using the field name value. id collision concerns will need to be addressed if the app ever implemented multiple forms in a single DOM page)
  - `react-hook-form` recommends using A11y standard (screen reader):
    - `aria-invalid` - added to inputs
    - `role="alert"` - added to error fields
    - `aria-live="polite"` - added to password
    - linked password hint text with password input
- cards 
    - are composed with `<ul>`/`<li>`
    - added `role='button'` to communicate clickability

### color-blindness

- I did a quick check of the color theme for color blindness, but I didn't go too deeply into it. On my past teams, this has been handled by UX designers.
- Specific color choices may not be exceptional, but the differences between default, hover, and active states for components are clear and stark.

### Testing

- [] Input test
- [] Form Field test
- [] Progress bar test


### Thoughts & Considerations

- There is definitely some refactoring that would be done in a production app, including:
  - `components/[feature]/[chunk]`
  - `components/apis/[endpoint]` // typed wrappers around generic fetch component
  - `components/apis/base.ts` // an abstract fetch component
- Since there was no db requirement, the front end does not include an auth provider for route protection. I considered doing a proper implementation of something like `next-auth` to add this functionality, but it felt excessive given the requested scope.
- Since all auth APIs are just mocks, I added a few emails that can be added to trigger various validation results:
  - Signin
    - `email@exists.com` will return "ok" and move forward
    - `email@no-exist.com` will return "no user found"
    - all other will return "invalid credentials"
  - Signup
    - `email@exists.com` will return "email already exists"
    - all others will reutrn "ok" and move forward
- Given time considerations, I did not mock any APIs for interests or occupations. With more time, some things to build would be
  - Submitting occupation
  - On the interests page, the interests API could have:
    - Trimmed interest list based on user's occupation
    - Reordered the interests list such that likely interests given the user's occupation are presented first
- Mock data can be found in `/src/mocks.ts`

