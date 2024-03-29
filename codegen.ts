import type { CodegenConfig } from "@graphql-codegen/cli";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  documents: "src/graphql/**/*.graphql",
  debug: true,
  generates: {
    "src/gql/": {
      preset: "client",
      plugins: [],
    },
  },
  watch: true,
};

export default config;
