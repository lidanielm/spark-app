import { ErrorBoundary } from "react-error-boundary";
import { FallbackProps } from "react-error-boundary";

const FallbackComponent = ({ error, resetErrorBoundary }: FallbackProps) => {
    // Call resetErrorBoundary() to reset the error boundary and retry the render.

    return (
        <div role="alert">
            <p>Something went wrong:</p>
            <pre style={{ color: "red" }}>{error.message}</pre>
        </div>
    );
}

export default FallbackComponent;