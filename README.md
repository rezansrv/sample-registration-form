# Registration Form

This project is a simple form that needs to be implemented with a focus on meeting the requirements of the Product team. 

More than simply passing the tests, it is crucial to first deeply understand the problem at hand. This understanding, coupled with your skill in design patterns, algorithms, and appropriate data structures, will be instrumental in maintaining and developing the form.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Cypress Component Testing

```sh
npm run test:unit:dev # or `npm run test:unit` for headless testing
```

### Run Headed Component Tests with [Cypress Component Testing](https://on.cypress.io/component)

```sh
npm run test:unit # or `npm run test:unit` for headless testing
```

## Request Overview
We need a registration form that has three steps.
1. Page Header: Based on the step, it should show following messages:
    - Step: username
    - Step: email
    - Step: review
2. Buttons:
    1. Next
      - button element: `id` = `btn-next`
      - disable in the last step
    2. Prev
      - button element: `id` = `btn-prev`
      - disable in the first step
3. Inputs
    - username
      - text
      - `id` = `username`
      - `name` = `username`
      - It should meet validations that exist in the test.
    - email
      - text
      - `id` = `email`
      - `name` = `email`
      - It should meet validations that exist in the test.
4. Implement Description Component `src/components/Description.vue` based on available tests. 
### Requirements:
- Use Vue3
- You have the freedom to choose between the two available methods, Option API or Composition API, for this project. Your expertise will guide this decision.
- Please avoid sending extra files and delete all additional files.
- Please `do not` modify the test files.
- Show each step of this form separately to the user as a wizard form.
- The user can move to the next and previous steps by clicking on the next step or previous step button.
- The next step button is active when the input value in that step is filled.
- By moving between the steps, the previous values entered in the inputs should remain.
- There is no need to add CSS styles.

## Bonus
- Modify the warning based on logs/interface messages during development.
- Implementation of a suitable interface using tailwind css.