package com.productmanager.exception;

public class ProductNotFoundException extends RuntimeException{
    public ProductNotFoundException() {
        super("Product Not Found !!");
    }
}
