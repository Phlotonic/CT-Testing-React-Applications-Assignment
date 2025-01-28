export const BrowserRouter = ({ children }) => <div>{children}</div>;
export const Routes = ({ children }) => <div>{children}</div>;
export const Route = ({ path, element }) => <div>{element}</div>;
export const Link = ({ to, children }) => <a href={to}>{children}</a>;