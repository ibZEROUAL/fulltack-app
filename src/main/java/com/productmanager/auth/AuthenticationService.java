package com.productmanager.auth;


import com.productmanager.config.JwtService;
import com.productmanager.enums.Role;
import com.productmanager.exception.UserNotFoundException;
import com.productmanager.model.User;
import com.productmanager.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    final private UserRepository userRepository;

    final private PasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;


    public AuthenticationResponse register(RegisterRequest registerRequest) {

        User newUser = new User(registerRequest.getFullName(),registerRequest.getUsername(),passwordEncoder.encode(registerRequest.getPassword()));

        userRepository.save(newUser);
        return getAuthenticationResponse(newUser);
    }


    public AuthenticationResponse authenticate(AuthenticationRequest authenticationRequest) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(),authenticationRequest.getPassword())
        );

        User user = userRepository.findByUsername(authenticationRequest.getUsername()).orElseThrow(UserNotFoundException::new);
        return getAuthenticationResponse(user);
    }


    private AuthenticationResponse getAuthenticationResponse(User user) {

        String authorities = user.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        Map<String,String> userAuthorities = new HashMap<>();

        userAuthorities.put("authorities",authorities);

        var jwtToken = jwtService.generateToken(userAuthorities, user);
        return AuthenticationResponse.builder().jwtToken(jwtToken).build();
    }

}
