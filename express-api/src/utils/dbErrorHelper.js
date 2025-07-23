/*This function maps the error returned 
by the DB to a http status code*/

export function mapDbErrorToStatusCode(error) {
    if (!error || !error.code) {
        return 500; // fallback if no error or no code property
    }
    switch (error.code) {
        case 'ER_DUP_ENTRY': // duplicate key
            return 409; // Conflict
        case 'ER_NO_REFERENCED_ROW_2': // foreign key fails
            return 400; // Bad Request
        case 'ER_BAD_FIELD_ERROR':
            return 400;
        default:
            return 500; // fallback server error
    }
}
