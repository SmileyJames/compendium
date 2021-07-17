import { Suspense, lazy } from "react";

const withSuspense = (Component) => (props) => (
  <Suspense fallback="Loading...">
    <Component {...props}/>
  </Suspense>
)

const Host = withSuspense(lazy(() => import("./Host")))
const Guest = withSuspense(lazy(() => import("./Guest")))

export { Host, Guest }
