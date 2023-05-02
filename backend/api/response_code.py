class ApiResponseCode:
    AUTHORIZE_URL_GENERATE_ERROR = 'An error occurred while generating authorize url'
    REQUIRE_AUTHORIZATION_CODE = 'Authorization code is required'
    TOKEN_RETRIEVE_ERROR = 'An error occurred while retrieving access token'
    TOKEN_DECODE_ERROR = 'An error occurred while decoding access token'
    INVALID_ACCESS_TOKEN = 'Access token is invalid'
    INVALID_DECODED_SUB = 'sub is missing in decoded access token'
    PERSON_DATA_DECRYPT_ERROR = 'An error occurred while decrypting person data'
