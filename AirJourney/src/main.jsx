import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { BrowserRouter } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { Provider } from "react-redux";
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
            {/* <Provider store={store}> */}
                <QueryClientProvider client={queryClient}>
                    <BrowserRouter>
                    <RouterProvider router={router} />
                    </BrowserRouter>
                </QueryClientProvider>
            {/* </Provider> */}
        </StrictMode>
    );
}
