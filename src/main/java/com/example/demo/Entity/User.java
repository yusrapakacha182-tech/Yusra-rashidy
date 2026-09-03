package com.example.demo.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")

public class User {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String email;

    //no arg constructor
    public User(){
    }

    //Ggetters and setters
    //setters(update operation)
    public void setName(String name){
        this.name=name;
    }
public void setEmail(String email){
    this.email=email;
}

//getters
public String getName(){
    return name;
}
public String getEmail(){
    return email;
}
public Long getId(){
    return id;

}

    
}
