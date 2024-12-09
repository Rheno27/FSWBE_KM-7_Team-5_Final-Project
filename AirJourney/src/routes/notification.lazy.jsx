import { createLazyFileRoute } from "@tanstack/react-router";
import Notification from "../components/Notification";

export const Route = createLazyFileRoute("/notification")({
  component: Notification,
});
