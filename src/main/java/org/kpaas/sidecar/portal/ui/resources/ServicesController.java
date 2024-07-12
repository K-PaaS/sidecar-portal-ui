package org.kpaas.sidecar.portal.ui.resources;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.kpaas.sidecar.portal.ui.common.ConstantsUrl;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import static org.kpaas.sidecar.portal.ui.common.ConstantsUrl.URI_SC_DETAILS;

@Api(value = "ServicesController v1")
@Controller
public class ServicesController {
    private static final String BASE_URL = "sidecar/resources/";

    /**
     * Services 목록 페이지 이동(Go to the services list page)
     *
     * @return the view
     */
    @ApiOperation(value = "Services 목록 페이지 이동(Go to the services list page)", nickname = "getServicesList")
    @GetMapping(value = ConstantsUrl.URI_SC_RESOURCES_SERVICES )
    public String getServicesList() {
        return BASE_URL + "services";
    }

    /**
     * Services 상세 페이지 이동(Go to the services details page)
     *
     * @return the view
     */
    @ApiOperation(value = "Services 상세 페이지 이동(Go to the services details page)", nickname = "getServicesDetails")
    @GetMapping(value = ConstantsUrl.URI_SC_RESOURCES_SERVICES + URI_SC_DETAILS)
    public String getServicesDetails() {
        return BASE_URL + "servicesDetails";
    }
}
