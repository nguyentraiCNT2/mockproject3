package com.guardiannestshop.backend.Mapper;

import com.guardiannestshop.backend.Mapper.Opject.*;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class Applicaltionconfig {
    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }
    @Bean
    public UserMapper userMapper(ModelMapper modelMapper){
        return new UserMapper(modelMapper );
    }
    @Bean
    public UserAddressMapper userAddressMapper(ModelMapper modelMapper){
        return new UserAddressMapper(modelMapper );
    }
    @Bean
    public ShoppingCartMapper shoppingCartMapper(ModelMapper modelMapper){
        return new ShoppingCartMapper(modelMapper );
    }
    @Bean
    public Shipmapper shipmapper(ModelMapper modelMapper){
        return new Shipmapper(modelMapper );
    }
    @Bean
    public RoleMapper roleMapper(ModelMapper modelMapper){
        return new RoleMapper(modelMapper );
    }
    @Bean
    public ReveiwMapper reveiwMapper(ModelMapper modelMapper){
        return new ReveiwMapper(modelMapper );
    }
    @Bean
    public Productsmapper productsmapper(ModelMapper modelMapper){
        return new Productsmapper(modelMapper );
    }
    @Bean
    public OrderMapper orderMapper(ModelMapper modelMapper){
        return new OrderMapper(modelMapper );
    }
    @Bean
    public OrderdetailsMapper orderdetailsMapper(ModelMapper modelMapper){
        return new OrderdetailsMapper(modelMapper );
    }

    @Bean
    public CustomersMapper customersMapper(ModelMapper modelMapper){
        return new CustomersMapper(modelMapper );
    }
    @Bean
    public ColorMappper colorMappper(ModelMapper modelMapper){
        return new ColorMappper(modelMapper );
    }
    @Bean
    public CategoryMapper categoryMapper(ModelMapper modelMapper){
        return new CategoryMapper(modelMapper );
    }
    @Bean
    public CategoryLV2Mapper categoryLV2Mapper(ModelMapper modelMapper){
        return new CategoryLV2Mapper(modelMapper );
    }
    @Bean
    public ImportdetailsMapper importdetailsMapper(ModelMapper modelMapper){
        return new ImportdetailsMapper(modelMapper );
    }
}
