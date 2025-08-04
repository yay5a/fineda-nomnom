# Copilot Instructions for Good Eats (MERN Recipe App)

## Big Picture Architecture

-   **MERN Stack**: MongoDB, Express, React, Node.js
-   **Monorepo Structure**: `server/` (Node/Express/Apollo GraphQL), `client/` (React)
-   **GraphQL API**: Apollo Server v4, schema in `server/schemas/typeDefs.js`, resolvers in `server/schemas/resolvers.js`
-   **Authentication**: JWT-based, handled in GraphQL mutations and context (`server/utils/auth.js`, `client/src/context/authContext.js`)
-   **Recipe Data**: Fetched from Edamam API, mapped and stored in MongoDB (`server/schemas/resolvers.js`)
-   **Frontend**: React 18+, Material-UI v6, React Router v7, Apollo Client v3

## Developer Workflows

-   **Start Both Servers**: `npm run develop` from project root (runs server and client concurrently)
-   **Server Only**: `cd server && npm start` or `npm run watch` (nodemon)
-   **Client Only**: `cd client && npm start`
-   **Database Seeding**: `cd server && node populateDb.js` (run after initial install)
-   **Testing**: Client uses React Testing Library (`npm test` in `client/`)
-   **Build for Production**: `cd client && npm run build` (static assets served by Express in production)

## Project-Specific Patterns & Conventions

-   **GraphQL**: All API access via GraphQL (`/graphql` endpoint). Mutations for login/register, queries for recipes/users.
-   **JWT Auth**: Token attached to user object on login/register, sent via `authorization` header (see `client/src/apolloClient.js`)
-   **Custom React Hooks**: Form handling via `useForm` in `client/src/utils/hooks.js`
-   **Material-UI**: Used for all UI components, custom styles in CSS files (e.g., `App.css`, `Features.css`)
-   **Context API**: Auth state managed via `AuthContext` (`client/src/context/authContext.js`)
-   **Recipe Cards & Modal**: UI pattern for displaying recipes (`client/src/components/recipeCard.js`, `client/src/components/modal.js`)
-   **Search/Autocomplete**: SearchComponent uses GraphQL for autocomplete suggestions

## Integration Points

-   **Edamam API**: External recipe data source, API keys in `.env`
-   **MongoDB**: Models in `server/models/`, connection in `server/config/connection.js`
-   **Apollo Client**: Configured in `client/src/apolloClient.js`, uses JWT from localStorage
-   **Routing**: React Router v7, routes in `client/src/App.js`

## Examples

-   **Add a GraphQL Query**: Update `typeDefs.js` and `resolvers.js`, then query from client via Apollo Client
-   **Add a Page**: Create React component in `client/src/pages/`, add route in `client/src/App.js`, link in `Navbar.js`
-   **Add a Model Field**: Update Mongoose model in `server/models/`, update GraphQL schema and resolvers

## Key Files/Directories

-   `server/schemas/typeDefs.js` (GraphQL schema)
-   `server/schemas/resolvers.js` (API logic)
-   `server/models/` (Mongoose models)
-   `client/src/App.js` (routing)
-   `client/src/context/authContext.js` (auth state)
-   `client/src/apolloClient.js` (API config)
-   `client/src/components/` (UI components)
-   `client/src/pages/` (main pages)

---

If you add new features, follow the patterns above for API, UI, and data flow. For questions, see `README.md` and `reactREADME.md` for more context.
