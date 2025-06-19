package com.productmanager.service;

import com.productmanager.dto.ProductDto;
import com.productmanager.mapper.ProductMapper;
import com.productmanager.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductMapper productMapper;

    private final ProductRepository productRepository;


    public List<ProductDto> getAllProducts(){
        return productMapper.toDtoList(productRepository.findAll());
    }

    public ProductDto getById(Long id){
        var product = productRepository.findById(id).orElseThrow(null);
        return productMapper.toDto(product);
    }

    public ProductDto update(Long id, ProductDto dto){
       var product = productRepository.findById(id).orElseThrow(null);
       var updatedProduct = productMapper.partialUpdate(dto, product);
       return productMapper.toDto(updatedProduct);
    }

    public void delete(Long id){
        var product = productRepository.findById(id).orElseThrow(null);
        productRepository.delete(product);
    }



}
