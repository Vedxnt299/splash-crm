package com.crm.app.user;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class UserDataLoader {

    @Bean
    CommandLineRunner loadAdminUser(UserRepository userRepository,
                                    PasswordEncoder passwordEncoder) {
        return args -> {

            if (userRepository.findByEmail("admin@gmail.com").isEmpty()) {

                User admin = new User();
                admin.setName("Admin");
                admin.setEmail("admin@gmail.com");
                admin.setPassword(passwordEncoder.encode("admin123")); // ✅ ENCODED
                admin.setRole(Role.ADMIN);
                admin.setActive(true);

                userRepository.save(admin);
                System.out.println("✅ Admin user created");
            }
        };
    }
}
