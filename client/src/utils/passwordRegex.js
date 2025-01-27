export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[^\s]{8,}$/;

// /^$/ = start/end of the string

// /(?=pattern)/ = positive lookahead. It only checks whether the next part of the string matches the pattern. It does not consume any characters, meaning it does not  include the condition in the result. It does not capture any characters but returns a Boolean.

// /.*/ = any character (.) zero or more times (*)

// /(?=.*[a-z])/ = at least one lowercase letter. Even though /.*/ states zero or more times, this does not override the condition of the positive lookahead, which states that at least one character in the pattern must be present. So this means there must be at least one lowercase character in the string.

// /[]/ = character set. It matches any one of the characters inside the square brackets.

// /(?=.*\W)/ = the string must contain at least one special character (non-word character). \W

// // /[^\s]{8,}/ = matches any character that is not a whitespace character, and it must be at least 8 characters long.
