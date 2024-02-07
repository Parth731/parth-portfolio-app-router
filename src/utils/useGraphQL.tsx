import request from "graphql-request";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import {
  QueryFunctionContext,
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryResult,
  useQuery,
  type UseQueryResult,
} from "@tanstack/react-query";

// export function useGraphQL<TResult, TVariables>(
//   document: TypedDocumentNode<TResult, TVariables>,
//   ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
// ): UseQueryResult<TResult> {
//   return useQuery(
//     [(document?.definitions[0] as any)?.name?.value, variables],
//     async ({ queryKey }) =>
//       request(
//         process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://localhost:1337/graphql",
//         document,
//         queryKey[1] ? queryKey[1] : undefined
//       )
//   );
// }

export function useGraphQL<TResult, TVariables>(
  document: TypedDocumentNode<TResult, TVariables>,
  ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
): UseQueryResult<TResult> {
  return useQuery({
    queryKey: [(document?.definitions[0] as any)?.name?.value, variables],
    queryFn: async ({ queryKey }: any) =>
      request(
        process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://localhost:1337/graphql",
        document,
        queryKey[1] ? queryKey[1] : undefined
      ),
  });
}

type ExcludePageParam<T> = "pageParam" extends keyof T
  ? Omit<T, "pageParam">
  : T;

// export function useInfiniteGraphQL<TResult, TVariables>(
//   document: TypedDocumentNode<TResult, TVariables>,
//   ...[variables]: ExcludePageParam<TVariables> extends Record<string, never>
//     ? []
//     : [ExcludePageParam<TVariables>]
// ): UseInfiniteQueryResult<TResult> {
//   // console.log([(document?.definitions[0] as any)?.name?.value, variables]);
//   return useInfiniteQuery({
//     queryKey: [(document?.definitions[0] as any)?.name?.value, variables],
//     queryFn: async ({ queryKey, pageParam = 1 }) =>
//       request(
//         process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://localhost:1337/graphql",
//         document,
//         queryKey[1] ? { ...queryKey[1], pageParam } : { pageParam }
//       ),
//   });
// }

export function useInfiniteGraphQL<TResult, TVariables>(
  document: TypedDocumentNode<TResult, TVariables>,
  ...[variables]: ExcludePageParam<TVariables> extends Record<string, never>
    ? []
    : [ExcludePageParam<TVariables>]
): UseInfiniteQueryResult<TResult> {
  const obj: any = {
    queryKey: [(document?.definitions[0] as any)?.name?.value, variables],
    queryFn: async ({ queryKey, pageParam = 1 }: any) => {
      const response: any = await request(
        process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://localhost:1337/graphql",
        document,
        queryKey[1] ? { ...queryKey[1], pageParam } : { pageParam }
      );
      return response.data; // Adjust this based on your API response structure
    },
  };
  return useInfiniteQuery(obj);
}
