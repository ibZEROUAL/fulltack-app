package com.productmanager.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@RequiredArgsConstructor
public class ProductDto implements Serializable {
    Long id;

    @NotNull(message = "Name cannot be null")
    @Size(min = 3, max = 20, message = "Name must be between 3 and 20 characters")
    String name;

    @NotNull(message = "Description cannot be null")
    @Size(min = 20, max = 100, message = "Description must be between 20 and 100 characters")
    String description;

    @NotNull(message = "Quantity cannot be null")
    @Positive
    Long quantity;
}