package org.kpaas.sidecar.portal.ui.managements;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.kpaas.sidecar.portal.ui.common.ConstantsUrl;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import static org.kpaas.sidecar.portal.ui.common.ConstantsUrl.URI_SC_DETAILS;


@Api(value = "OrganizationsController v1")
@Controller
public class OrganizationsController {
    private static final String BASE_URL = "sidecar/managements/";

    /**
     * Organizations 목록 페이지 이동(Go to the organizations list page)
     *
     * @return the view
     */
    @ApiOperation(value = "Organizations 목록 페이지 이동(Go to the organizations list page)", nickname = "getOrganizationsList")
    @GetMapping(value = ConstantsUrl.URI_SC_MANAGEMENTS_ORGANIZATIONS )
    public String getOrganizationsList() {
        return BASE_URL + "organizations";
    }

    /**
     * Organizations 상세 페이지 이동(Go to the organizations details page)
     *
     * @return the view
     */
    @ApiOperation(value = "Organizations 상세 페이지 이동(Go to the organizations details page)", nickname = "getOrganizationsDetails")
    @GetMapping(value = ConstantsUrl.URI_SC_MANAGEMENTS_ORGANIZATIONS + URI_SC_DETAILS)
    public String getOrganizationsDetails() {
        return BASE_URL + "organizationsDetails";
    }
}
