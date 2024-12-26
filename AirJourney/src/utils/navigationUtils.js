export const navigateWithTimeout = (navigate, to, delay = 3000) => {
    const timer = setTimeout(() => {
        navigate({ to });
    }, delay);

    // Clear the timeout if the component unmounts or re-renders
    return () => clearTimeout(timer);
};
  