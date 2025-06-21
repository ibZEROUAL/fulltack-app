package com.productmanager.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationRequest {

    @NotNull(message = "username cannot be null")
    @Size(min = 3, max = 20, message = "username must be between 3 and 20 characters")
    @Email(message = "Email should be valid")
    private String username;

    @NotNull(message = "password cannot be null")
    @Size(min = 8, max = 20, message = "password must be between 8 and 20 characters")
    private String password;

}
