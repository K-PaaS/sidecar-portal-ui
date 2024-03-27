package org.kpaas.sidecar.portal.ui;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
public class SidecarUiApplication {


    public static void main(String[] args) {
        SpringApplication.run(SidecarUiApplication.class, args);

    }
}
