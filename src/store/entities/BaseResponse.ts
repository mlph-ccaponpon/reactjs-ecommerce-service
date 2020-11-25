export interface BaseResponse<T = {}> {
    result?: T,
    success: boolean,
    errorMessage?: string
}