declare module "path-params" {
  export default function pathParams<P = unknown>(url: string, params: P): string;
}
