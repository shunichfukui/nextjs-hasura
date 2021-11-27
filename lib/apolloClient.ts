import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client'
import 'cross-fetch/polyfill'

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined

const createApolloClient = () => {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
      uri: 'https://tender-crayfish-72.hasura.app/v1/graphql',
    }),
    cache: new InMemoryCache(),
  })
}
export const initializeApollo = (initialState = null) => {
  const _apolloClient = apolloClient ?? createApolloClient()
  // サーバー用
  if (typeof window === 'undefined') return _apolloClient
  // クライアント用 一度目の処理ではapolloClientを入れて、以降は再利用する
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}
