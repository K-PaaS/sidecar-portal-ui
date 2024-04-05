package org.kpaas.sidecar.portal.ui.resources;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.kpaas.sidecar.portal.ui.common.ConstantsUrl;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import static org.kpaas.sidecar.portal.ui.common.ConstantsUrl.URI_SC_DETAILS;

@Api(value = "DomainsController v1")
@Controller
public class DomainsController {
    private static final String BASE_URL = "sidecar/resources/";

    /**
     * Domains 목록 페이지 이동(Go to the domains list page)
     *
     * @return the view
     */
    @ApiOperation(value = "Domains 목록 페이지 이동(Go to the domains list page)", nickname = "getDomainsList")
    @GetMapping(value = ConstantsUrl.URI_SC_RESOURCES_DOMAINS )
    public String getDomainsList() {
        return BASE_URL + "domains";
    }

    /**
     * Domains 상세 페이지 이동(Go to the domains details page)
     *
     * @return the view
     */
    @ApiOperation(value = "Domains 상세 페이지 이동(Go to the domains details page)", nickname = "getDomainsDetails")
    @GetMapping(value = ConstantsUrl.URI_SC_RESOURCES_DOMAINS + URI_SC_DETAILS)
    public String getDomainsDetails() {return BASE_URL + "domainsDetails"; }

}
