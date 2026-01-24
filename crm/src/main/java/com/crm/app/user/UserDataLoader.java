package com.crm.app.user;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class UserDataLoader {

    @Bean
    CommandLineRunner loadAdminUser(UserRepository userRepository) {
        return args -> {

            if (userRepository.findByEmail("admin@gmail.com").isEmpty()) {

                User admin = new User();
                admin.setName("Admin");
                admin.setEmail("admin@gmail.com");
                admin.setPassword("admin123"); // TEMP – will encrypt later
                admin.setRole(Role.ADMIN);
                admin.setActive(true);

                userRepository.save(admin);
            }
        };
    }
}
