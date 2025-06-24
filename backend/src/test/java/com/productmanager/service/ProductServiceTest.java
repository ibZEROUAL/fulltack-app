package com.productmanager.service;

import com.productmanager.dto.ProductDto;
import com.productmanager.exception.ProductNotFoundException;
import com.productmanager.mapper.ProductMapper;
import com.productmanager.model.Product;
import com.productmanager.repository.ProductRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;


@ExtendWith(MockitoExtension.class)
class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @Mock
    private ProductMapper productMapper;

    @InjectMocks
    private ProductService productService;

    @Test
    void getAllProducts() {
        List<Product> products = List.of(
                new Product(1L, "Product 1", "Description 1", 10.0, 2L),
                new Product(2L, "Product 2", "Description 2", 20.0, 3L)
        );

        List<ProductDto> productDtos = List.of(
                new ProductDto(1L, "Product 1", "Description 1", 10.0, 2L),
                new ProductDto(2L, "Product 2", "Description 2", 20.0, 3L)
        );

        when(productRepository.findAll()).thenReturn(products);
        when(productMapper.toDtoList(products)).thenReturn(productDtos);

        List<ProductDto> result = productService.getAllProducts();

        Assertions.assertEquals(2, result.size());
        Assertions.assertEquals("Product 1", result.get(0).getName());
    }

    @Test
    void getById() {
        Long id = 1L;
        Product product = new Product(id, "Test", "Test Desc", 99.9, 1L);
        ProductDto dto = new ProductDto(id, "Test", "Test Desc", 99.9, 1L);

        when(productRepository.findById(id)).thenReturn(Optional.of(product));
        when(productMapper.toDto(product)).thenReturn(dto);

        ProductDto result = productService.getById(id);

        Assertions.assertEquals(dto.getId(), result.getId());
        Assertions.assertEquals(dto.getName(), result.getName());
    }

    @Test
    void add() {
        ProductDto dto = new ProductDto(null, "New Product", "New Desc", 59.99, 5L);
        Product entity = new Product(null, "New Product", "New Desc", 59.99, 5L);
        Product savedEntity = new Product(10L, "New Product", "New Desc", 59.99, 5L);
        ProductDto resultDto = new ProductDto(10L, "New Product", "New Desc", 59.99, 5L);

        when(productMapper.toEntity(dto)).thenReturn(entity);
        when(productRepository.save(entity)).thenReturn(savedEntity);
        when(productMapper.toDto(savedEntity)).thenReturn(resultDto);

        ProductDto result = productService.add(dto);

        Assertions.assertNotNull(result.getId());
        Assertions.assertEquals("New Product", result.getName());
    }

    @Test
    void update() {
        Long id = 5L;
        Product existing = new Product(id, "Old", "Old Desc", 25.0, 2L);
        ProductDto updateDto = new ProductDto(id, "Updated", "Updated Desc", 30.0, 2L);
        Product updatedEntity = new Product(id, "Updated", "Updated Desc", 30.0, 2L);

        when(productRepository.findById(id)).thenReturn(Optional.of(existing));
        when(productMapper.partialUpdate(updateDto, existing)).thenReturn(updatedEntity);
        when(productRepository.save(updatedEntity)).thenReturn(updatedEntity);
        when(productMapper.toDto(updatedEntity)).thenReturn(updateDto);

        ProductDto result = productService.update(id, updateDto);

        Assertions.assertEquals("Updated", result.getName());
        Assertions.assertEquals(30.0, result.getPrice());
    }

    @Test
    void delete() {
        Long id = 3L;
        Product existing = new Product(id, "Delete Me", "Desc", 20.0, 2L);

        when(productRepository.findById(id)).thenReturn(Optional.of(existing));

        productService.delete(id);

        verify(productRepository).delete(existing);
    }

    @Test
    void getById_notFound() {
        when(productRepository.findById(100L)).thenReturn(Optional.empty());

        Assertions.assertThrows(ProductNotFoundException.class, () -> productService.getById(100L));
    }
}