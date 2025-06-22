package com.productmanager.controller;

import com.productmanager.dto.ProductDto;
import com.productmanager.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/product")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping
    @Operation(security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<List<ProductDto>> getAllProducts(){
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping("/{id}")
    @Operation(security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<ProductDto> getProductById(@PathVariable("id") Long id){
        return ResponseEntity.ok(productService.getById(id));
    }

    @PostMapping
    @Operation(security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<ProductDto> addProduct(@Valid @RequestBody ProductDto dto){
        return ResponseEntity.status(HttpStatus.CREATED).body(productService.add(dto));
    }

    @PutMapping("/{id}")
    @Operation(security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<ProductDto> updateProduct(@PathVariable("id") Long id,@Valid @RequestBody ProductDto dto){
        return ResponseEntity.ok(productService.update(id,dto));
    }

    @DeleteMapping("/{id}")
    @Operation(security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<Void> deleteProduct(@PathVariable("id") Long id){
        productService.delete(id);
        return ResponseEntity.ok().build();
    }




}
