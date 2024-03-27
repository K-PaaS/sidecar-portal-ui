package org.kpaas.sidecar.portal.ui.config.security;

import org.springframework.context.annotation.*;
import org.springframework.core.annotation.Order;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


/**
 * {@link Configuration} related to the dashboard security.
 *
 * @author Sebastien Gerard
 */
@Configuration
@Order(2)
@ComponentScan(basePackages = "org.container.platform.web.ui, org.kpaas.sidecar.web.ui")
//@ComponentScan(basePackages = "org.kpaas.sidecar.web.ui")
public class SidecarSecurityConfiguration {


    private static final Logger logger = LoggerFactory.getLogger(SidecarSecurityConfiguration.class);

}
