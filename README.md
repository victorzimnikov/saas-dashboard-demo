# SaaS Dashboard workspace

Monorepo for dashboard implementations in different frontend frameworks.

### Preview

[Vue](https://victorzimnikov.github.io/saas-dashboard-demo/vue/#/)

## Structure

```text
apps/
  vue/       # Vue application
  react/     # planned React application
  angular/   # planned Angular application
```

All directories matching `apps/*` are pnpm workspace packages.

## Commands

Install dependencies from the repository root:

```sh
pnpm install
```

Run the Vue application:

```sh
pnpm dev
```

Build all workspace applications:

```sh
pnpm build
```

Framework-specific commands are also available as `pnpm dev:vue`,
`pnpm build:vue`, and `pnpm preview:vue`.
