export interface LoginResponse {
    responsecode: string;
    message: string;
    token: string;
    refresh_token: string;
    expires_in: string;
    token_type: string;
    data: {
        username: String,
        first_name: String,
        last_name: String,
        email_address: String,
        account_status: String,
        customer_type: String,
        country_code: String,
        preferred_language: String,
    }
}