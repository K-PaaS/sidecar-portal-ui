package org.kpaas.sidecar.portal.ui.resources;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.kpaas.sidecar.portal.ui.common.ConstantsUrl;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import static org.kpaas.sidecar.portal.ui.common.ConstantsUrl.URI_SC_DETAILS;

@Api(value = "RoutesController v1")
@Controller
public class RoutesController {
    private static final String BASE_URL = "sidecar/resources/";

    /**
     * Routes 목록 페이지 이동(Go to the routes list page)
     *
     * @return the view
     */
    @ApiOperation(value = "Routes 목록 페이지 이동(Go to the routes list page)", nickname = "getRoutesList")
    @GetMapping(value = ConstantsUrl.URI_SC_RESOURCES_ROUTES )
    public String getRoutesList() {
        return BASE_URL + "routes";
    }

    /**
     * Routes 상세 페이지 이동(Go to the routes details page)
     *
     * @return the view
     */
    @ApiOperation(value = "Routes 상세 페이지 이동(Go to the routes details page)", nickname = "getRoutesDetails")
    @GetMapping(value = ConstantsUrl.URI_SC_RESOURCES_ROUTES + URI_SC_DETAILS)
    public String getRoutesDetails() {
        return BASE_URL + "routesDetails";
    }

}
