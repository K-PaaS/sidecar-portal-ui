package org.kpaas.sidecar.portal.ui.workloads;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.kpaas.sidecar.portal.ui.common.ConstantsUrl;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import static org.kpaas.sidecar.portal.ui.common.ConstantsUrl.URI_SC_DETAILS;

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
    @ApiOperation(value = "Apps 상세 페이지 이동(Go to the apps details page)", nickname = "getAppsDetails")
    @GetMapping(value = ConstantsUrl.URI_SC_WORKLOADS_APPS + URI_SC_DETAILS)
    public String getAppsDetails() {
        return BASE_URL + "appsDetails";
    }

}
