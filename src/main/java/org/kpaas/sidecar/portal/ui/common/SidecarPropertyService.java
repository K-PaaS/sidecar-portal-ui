package org.kpaas.sidecar.portal.ui.common;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

/**
 * Property Service 클래스
 *
 * @author jjy
 * @version 1.0
 * @since 2020.08.25
 */
@Service
@Data
public class SidecarPropertyService {

    @Value("${sidecar.portalUrl}")
    private String sidecarPortalUrl;

    @Value("${sidecar.rootNamespace}")
    private String rootNamespace;

    @Value("${sidecar.roleAdmin}")
    private String sidecarRoleAdmin;

    @Value("${sidecar.roleUser}")
    private String sidecarRoleUser;

    @Value("${sidecar.targetCluster}")
    private String targetCluster;

    @Value("${sidecar.sidecarApiUrl}")
    private String sidecarApiUrl;

}
