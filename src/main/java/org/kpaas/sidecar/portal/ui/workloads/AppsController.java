package org.kpaas.sidecar.portal.ui.workloads;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.kpaas.sidecar.portal.ui.common.ConstantsUrl;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import static org.kpaas.sidecar.portal.ui.common.ConstantsUrl.URI_SC_DETAILS_INSTANCES;

@Api(value = "AppsController v1")
@Controller
public class AppsController {

    private static final String BASE_URL = "sidecar/workloads/";

    /**
     * Apps 목록 페이지 이동(Go to the apps list page)
     *
     * @return the view
     */
    @ApiOperation(value = "Apps 목록 페이지 이동(Go to the apps list page)", nickname = "getAppsList")
    @GetMapping(value = ConstantsUrl.URI_SC_WORKLOADS_APPS )
    public String getAppsList() { return BASE_URL + "apps"; }

    /**
     * Apps 상세 페이지 이동(Go to the apps details page)
     *
     * @return the view
     */
    @ApiOperation(value = "Apps 상세 페이지 - Instances 이동(Go to the apps details page)", nickname = "getAppsDetailsInstances")
    @GetMapping(value = ConstantsUrl.URI_SC_DETAILS_INSTANCES)
    public String getAppsDetailsInstances() {
        return BASE_URL + "appsDetails" + "Instances";
    }

    @ApiOperation(value = "Apps 상세 페이지 - Instances 이동(Go to the apps details page)", nickname = "getAppsDetailsServices")
    @GetMapping(value = ConstantsUrl.URI_SC_DETAILS_SERVICES)
    public String getAppsDetailsServices() {
        return BASE_URL + "appsDetails" + "Services";
    }

    @ApiOperation(value = "Apps 상세 페이지 - Instances 이동(Go to the apps details page)", nickname = "getAppsDetailsEnvironment")
    @GetMapping(value = ConstantsUrl.URI_SC_DETAILS_ENVIRONMENT)
    public String getAppsDetailsEnvironment() {
        return BASE_URL + "appsDetails" + "Environment";
    }

    @ApiOperation(value = "Apps 상세 페이지 - Instances 이동(Go to the apps details page)", nickname = "getAppsDetailsRoutes")
    @GetMapping(value = ConstantsUrl.URI_SC_DETAILS_ROUTES)
    public String getAppsDetailsRoutes() {
        return BASE_URL + "appsDetails" + "Routes";
    }

    @ApiOperation(value = "Apps 상세 페이지 - Instances 이동(Go to the apps details page)", nickname = "getAppsDetailsInstances")
    @GetMapping(value = ConstantsUrl.URI_SC_DETAILS_LOG)
    public String getAppsDetailsLog() {
        return BASE_URL + "appsDetails" + "Log";
    }

    @ApiOperation(value = "Apps 상세 페이지 - Instances 이동(Go to the apps details page)", nickname = "getAppsDetailsEnvironment")
    @GetMapping(value = ConstantsUrl.URI_SC_WORKLOADS_APPS + "/appsDetails")
    public String getAppsDetails() {
        return BASE_URL + "appsDetails";
    }
}
