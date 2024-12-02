import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { Provider } from "react-redux";
import { store } from './redux/store';
import { Provider } from 'react-redux'
import { routeTree } from "./routeTree.gen";
import "bootstrap/dist/css/bootstrap.min.css";

// Create the router instance
const router = createRouter({ routeTree });
// Create a client
const queryClient = new QueryClient();
// Render the app
const rootElement = document.getElementById("root");
if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <StrictMode>
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <RouterProvider router={router} />
                </QueryClientProvider>
            </Provider>
        </StrictMode>
    );
}