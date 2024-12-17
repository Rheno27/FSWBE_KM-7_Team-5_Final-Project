import * as React from "react";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setToken } from "../../../redux/slices/auth";
import { toast } from "react-toastify";

export const Route = createLazyFileRoute("/users/private/googleAuth")({
    component: RouteComponent,
});

function RouteComponent() {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        data: response,
        isSuccess,
        isError,
    } = useQuery({
        queryKey: ["googleAuth"],
        queryFn: () =>
            axios
                .get(
                    `${import.meta.env.VITE_API_URL}/auth/google/callback?code=${code}`
                )
                .catch(() => {
                    toast.error("Ada kesalahan, mohon coba lagi nanti", {
                        position: "bottom-center",
                    });
                    navigate({ to: "/" });
                }),
        enabled: !!code,
    });

    React.useEffect(() => {
        if (isSuccess) {
            localStorage.setItem("token", response.data.data.token);
            dispatch(setToken(response.data.data.token));
            toast.success("Authentikasi berhasil", {
                position: "bottom-center",
            });
            navigate({ to: "/" });
            return;
        }
        if (isError) {
            navigate({ to: "/" });
        }
    }, [isSuccess, isError]);

    return <></>;
}
