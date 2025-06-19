package com.productmanager.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@RequiredArgsConstructor
@NoArgsConstructor
public class ProductDto implements Serializable {
    Long id;
    String name;
    String description;
    Long quantity;
}