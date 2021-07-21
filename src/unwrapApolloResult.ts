import { ApolloQueryResult, FetchResult } from "@apollo/client"

export default function unwrapApolloResult(result: ApolloQueryResult<any> | FetchResult<any>) {
    //console.debug('GQL result:', result)
    //@ts-ignore
    if(result.error) {
        //@ts-ignore
        throw result.error
    } 
    //@ts-ignore
    if(result.errors) {
        //@ts-ignore
        throw result.errors
    }
    return result.data
}