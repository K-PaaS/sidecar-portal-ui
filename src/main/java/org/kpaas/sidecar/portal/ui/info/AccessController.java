package org.kpaas.sidecar.portal.ui.info;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.kpaas.sidecar.portal.ui.common.ConstantsUrl;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import static org.kpaas.sidecar.portal.ui.common.ConstantsUrl.URI_SC_DETAILS;

@Api(value = "AccessController v1")
@Controller
public class AccessController {
    private static final String BASE_URL = "sidecar/info/";

    /**
     * Access 목록 페이지 이동(Go to the access list page)
     *
     * @return the view
     */
    @ApiOperation(value = "Access 목록 페이지 이동(Go to the access list page)", nickname = "getAccessList")
    @GetMapping(value = ConstantsUrl.URI_SC_INFO_ACCESS )
    public String getAccessList() {
        return BASE_URL + "access";
    }

    /**
     * Access 상세 페이지 이동(Go to the access details page)
     *
     * @return the view
     */
    @ApiOperation(value = "Access 상세 페이지 이동(Go to the access details page)", nickname = "getAccessDetails")
    @GetMapping(value = ConstantsUrl.URI_SC_INFO_ACCESS + URI_SC_DETAILS)
    public String getAccessDetails() {
        return BASE_URL + "accessDetails";
    }
}
