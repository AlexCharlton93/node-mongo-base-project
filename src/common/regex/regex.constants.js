export const regex = {
    /* Match 0-9 and A-F only, 8 chars - 4 chars - 4 chars - 4 chars - 12 chars */
    uuidv4: /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
    /* Match only digits, one or more times, 1 decimal point & negative values */
    currency: /^-?\d*\.?\d+$/,
    /* Match a-z any case, period, all numbers, up to 150 characters */
    imageURL: /^[a-zA-Z0-9.]{0,150}$/,
    /* Date format in either DD-MM-YYYY or DD/MM/YYYY */
    date: /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/,
    user: {
        /* Match a-z in any case, up to 150 characters */
        firstName: /^[a-zA-Z]{0,150}$/,
        /* Match a-z in any case, up to 150 characters */
        surname: /^[a-zA-Z]{0,150}$/,
        // TODO: For now we are keeping this rule pretty open as it's hard to validate an email address
        emailAddress: /\S+@\S+\.\S+/,
        contactNumber: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
        /*  Match only a-z characters in any case, 0-9, and limiting the other characters */
        /* And between 0 and 150 characters in length */
        addressLine1: /^[a-zA-Z0-9\s,'-.]{0,150}$/,
        addressLine2: /^[a-zA-Z0-9\s,'-.]{0,150}$/,
        addressLine3: /^[a-zA-Z0-9\s,'-.]{0,150}$/,
        country: /^[a-zA-Z0-9\s,'-.]{0,150}$/,
        /* Match a-z characters in any case, with spaces and numbers allowed */
        /* Limited to 13 characters */
        postcode: /^[a-zA-Z0-9'\-\w\s]{0,13}$/,
        /* Match 1 digit, either 0, 1 or 2 (Customer / Publisher / Admin ) */
        role: /^[0-2]{1}$/,
        /*  Match only a-z characters in any case, 0-9, and limiting the other characters */
        /* And between 0 and 65 characters in length */
        verificationCode: /^[a-zA-Z0-9\s,'-.]{0,65}$/
    }
};
