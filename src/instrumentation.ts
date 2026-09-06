/**
 * Next.js Server Instrumentation
 * 
 * This module is automatically loaded by Next.js at server startup.
 * It provides hooks for observability, error tracking, and telemetry.
 * 
 * @see https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation
 */

export async function register() {
  // Only run on the Node.js runtime (not Edge)
  if (process.env.NEXT_RUNTIME === "nodejs") {
    console.log("[instrumentation] Server-side instrumentation registered");
    
    // Hook into global error handling for structured logging
    const originalConsoleError = console.error;
    console.error = (...args: unknown[]) => {
      const error = args[0];
      const context = args[1] as Record<string, unknown> | undefined;
      
      const structuredLog = {
        timestamp: new Date().toISOString(),
        level: "error",
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        route: context?.route ?? "unknown",
        ...(typeof context === "object" && context !== null ? context : {}),
      };
      
      originalConsoleError(JSON.stringify(structuredLog));
    };
  }
}

/**
 * Called when a request-level error occurs during rendering or data fetching.
 * Next.js 16+ invokes this hook automatically.
 */
export async function onRequestError(
  err: Error & { digest?: string },
  request: {
    path: string;
    method: string;
    headers?: Record<string, string>;
  },
  context: {
    routerKind: string;
    routePath: string;
    routeType: string;
    renderSource: string;
  },
): Promise<void> {
  const logEntry = {
    timestamp: new Date().toISOString(),
    level: "error",
    type: "request_error",
    message: err.message,
    digest: err.digest,
    stack: err.stack,
    request: {
      path: request.path,
      method: request.method,
    },
    context: {
      routerKind: context.routerKind,
      routePath: context.routePath,
      routeType: context.routeType,
      renderSource: context.renderSource,
    },
  };
  
  console.error(JSON.stringify(logEntry));
}
