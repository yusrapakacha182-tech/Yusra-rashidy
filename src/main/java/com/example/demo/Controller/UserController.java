package com.example.demo.Controller;

import java.util.List;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.example.demo.Entity.User;
import com.example.demo.Repository.UserRepository;
@CrossOrigin(origins="*")
@RestController
@RequestMapping("/api/students")
public class UserController {

    private final UserRepository userRepo;

    // Dependency injection - constructor injection
    public UserController(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    // Add new student
    @PostMapping
    public User addstudent(@RequestBody User user) {
        return userRepo.save(user);
    }

    // Get all students
    @GetMapping
    public List<User> getAllstudents() {
        return userRepo.findAll();
    }

    // Get one student by ID
    @GetMapping("/{id}")
    public User getStudent(@PathVariable Long id) {

        return userRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Student with ID: " + id + " not found"
                ));
    }
    // Update student
@PutMapping("/{id}")
public User updateStudent(@PathVariable Long id, @RequestBody User user) {

    User existingStudent = userRepo.findById(id)
            .orElseThrow(() -> new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Student with ID: " + id + " not found"
            ));

    existingStudent.setName(user.getName());
    existingStudent.setEmail(user.getEmail());

    return userRepo.save(existingStudent);
}

    // Delete student
    @DeleteMapping("/{id}")
    public void deleteStudent(@PathVariable Long id) {

        // Check if student exists
        boolean existing = userRepo.existsById(id);

        if (!existing) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Student with ID: " + id + " not found"
            );
        }

        userRepo.deleteById(id);
    }
}
    

