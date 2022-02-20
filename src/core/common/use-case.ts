
export interface UseCaseRequest {

}

export interface UseCaseResponse {

}

export interface UseCase<T, U> {
  execute (request: T) : Promise<U> | U;
}


