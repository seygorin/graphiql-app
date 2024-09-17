1. [Task](https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/tasks/final.md)
2. Screenshots:

<img width="1440" alt="main" src="https://github.com/user-attachments/assets/5f76deff-b5a6-4a35-bfb3-a1622cd26e16">
<img width="652" alt="test" src="https://github.com/user-attachments/assets/1b7e8ea0-cc4f-4564-8901-4ea602170cb0">

3. [Deploy](https://graphiql-app-seygorin.vercel.app/en)
4. [Link to repo](https://github.com/KsushaSher/graphiql-app)
5. [Video presentation in English](https://www.youtube.com/watch?v=IjEzV0k9bXE) \ [Video presentation in Russian](https://www.youtube.com/watch?v=EIxm9ngaLuA)
6. Done 15.09.2024 / deadline 02:59 AM 16.09.2024 8. Task completion percentage: 100% (full complete of all tasks)

### Points

#### Main route - max 50 points

- [x] The Main page should contain general information about the developers, project, and course. - **10 points**
- [x] In the upper right corner there are 2 buttons: Sign In and Sign Up. - **10 points**
- [x] If the login token is valid and unexpired, the Sign In and Sign Up buttons are replaced with the "Sign Out" button. - **10 points**
- [x] When the token expires - the user should be redirected to the Main page automatically. - **10 points**
- [x] Pressing the Sign In / Sign up button redirects a user to the route with the Sign In / Sign up form. - **10 points**

#### Sign In / Sign Up - max 50 points

- [x] Buttons for Sign In / Sign Up / Sign Out are everywhere where they should be. - **10 points**
- [x] Client-side validation is implemented. - **20 points**
- [x] Upon successful login, the user is redirected to the Main page. - **10 points**
- [x] If the user is already logged in and tries to reach these routes, they should be redirected to the Main page. - **10 points**

#### RESTfull client - max 130 points

- [x] Functional editor enabling query editing and prettifying, request body provided in the url as base64-encoded on focus out. - **40 points**
- [x] Functional read-only response section, with information about HTTP status and the code. - **30 points**
- [x] Method selector, shows all the valid HTTP verbs, value is provided in the url on change. - **10 points**
- [x] Input for the url, entered value is provided in base64-encoded way on change. - **15 points**
- [x] Variables section that can shown or hidden, specified variables are included in the body. - **15 points**
- [x] Headers section, value is provided in the url on header add/change. - **20 points**

#### GraphiQL route - max 80 points

- [x] Functional editor enabling query editing and prettifying, request body provided in the url as base64-encoded on focus out. - **35 points**
- [x] Read-only response section, with information about HTTP status and the code, reused from the RESTfull client. - **5 points**
- [x] Operational documentation explorer, visible only upon successful SDL request. - **20 points**
- [x] Variables section that can shown or hidden, specified variables are included in the body. - **10 points**
- [x] Header section that can be shown or hidden, value is provided in the url on header add/change. - **10 points**

#### History route - max 50 points

- [x] History shows informational message with links to the clients when there are no requests in the local storage. - **10 points**
- [x] User can navigate to the previoulsy executed HTTP request to the RESTfull client, HTTP method, url, body, headers, variables are restored. **20 points**
- [x] User can navigate to the previoulsy executed GraphQL request to the GraphiQL client, url, SDL url, body, headers, variables are restored. **20 points**

#### General requirements - max 50 points

- [x] Multiple (at least 2) languages support / i18n. - **30 points**
- [x] Sticky header. - **10 points**
- [x] Errors are displayed in the user friendly format. - **10 points**

### Penalties

- [x] Vite/NextJS default favicon **is not** used
- [x] HTTP 4xx and 5xx status codes displayed as errors **in the response section**
- [x] **No** presence of errors and warnings in the console
- [x] **No** presence in the console of the results of the console.log execution
- [x] **No** usage of @ts-ignore and **No** usage of any (search through GitHub repo)
- [x] Presence of code-smells (**No** usage of God-object, **No** usage of chunks of duplicate code), **No** usage of commented code sections
- [x] **No** commits after the deadline
- [x] Tests are present
- [x] Test coverage is above 80%
- [x] Linting is present
- [x] Prettier is present
- [x] Husky git hooks are present
- [x] Pull Request follows the guideline (including checkboxes in Score) [PR example:](https://docs.rs.school/#/en/pull-request-review-process?id=pull-request-description-must-contain-the-following)

## Total (410/410)

Please note that in the **RESTfull client** section the accrual of points for completed tasks is incorrectly indicated.
