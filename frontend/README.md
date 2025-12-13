## Tests

The backend is covered by automated Jest tests that exercise the core API flow end-to-end. These tests are designed to validate real application behavior rather than isolated units.

### How to Run Tests

```bash
cd backend
npm test
```
## Testing Overview

The main end-to-end test suite is tests/auth.sweets.test.ts. It validates the full authentication and sweets workflow against the same MongoDB instance used by the application.

*Covered scenarios:*

* Connects to the application’s MongoDB instance.
* Clears existing users and sweets before execution to ensure a clean test state.
* Registers an admin user via POST /api/auth/register.
* Logs in as the admin using POST /api/auth/login and verifies receipt of a JWT.
* Creates a new sweet through the admin-only endpoint POST /api/sweets.
* Lists sweets using GET /api/sweets and confirms the newly created sweet appears in the response.

These tests provide confidence that authentication, authorization, and sweets creation/listing work correctly end-to-end. A more detailed summary of the latest run is available in backend/TEST_REPORT.md.

---

## AI Usage Disclosure

AI tools were used as *supplementary coding assistants* during development, primarily to speed up debugging and validate architectural decisions. All final implementation choices and code were written, reviewed, and integrated manually.

### Tools Used

* GitHub Copilot, ChatGPT


### How AI Was Used

* *Backend architecture:* Used AI for high-level guidance on structuring the Node.js/TypeScript backend, including separation of app.ts and server.ts, and correct wiring of routes and middleware. Final structure and implementation decisions were made and coded by me.

* *API implementation review:* Used AI to review and validate Express routes for authentication, sweets CRUD, search, purchase, and restock, ensuring alignment with the assignment specification rather than generating complete solutions.

* *Frontend integration:* Took assistance in connecting the React/Vite frontend to the backend API, especially for search filters (name, category, price range) and admin-only actions, while implementing the logic myself.

* *Testing support:* Used AI to help design and refine the Jest + Supertest setup, including the auth.sweets.test.ts end-to-end workflow (admin registration, login, sweet creation, and listing verification).

* *Debugging assistance:* Used AI to interpret runtime and configuration errors (JWT environment variables, Mongoose connection timeouts, etc.) and to suggest targeted fixes rather than wholesale code generation.

### Reflection

Using AI in this way mirrors how modern development teams use tools such as Copilot or internal LLMs to improve productivity while maintaining clear ownership of the codebase. AI suggestions were treated strictly as guidance and were always reviewed, modified, and integrated manually.

During development, I was able to explain, modify, and reproduce every part of the implementation without AI assistance. The final architecture, data models, routes, React components, and test cases were designed and implemented by me, with quality and clarity improved through selective AI-assisted feedback.